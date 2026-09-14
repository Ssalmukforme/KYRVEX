// True straights joined by clothoid / circular / clothoid corners. Curvature ramps
// up and down, avoiding an instant steering change where a straight meets a bend.
// Pure JS (no three.js) so the geometry can be tested in node. +side = driver's right.
import {ROAD_HALF} from './simulation.js';
import {circuits} from './circuits.js';
export {ROAD_HALF};
const TRANSITION=.22,CORNER_STEPS=256;
function cornerHeading(u){const a=TRANSITION;if(u<a)return u*u/(2*a*(1-a));if(u>1-a)return 1-(1-u)*(1-u)/(2*a*(1-a));return (u-a/2)/(1-a);}
function curvedFillet(f,corner){
 // Integrate unit-speed headings. Symmetry keeps the endpoint on both original
 // tangent lines, so adding transitions never consumes more adjacent straight.
 const path=[{x:0,z:0}],head0=Math.atan2(f.uz,f.ux);let x=0,z=0;
 for(let i=1;i<=CORNER_STEPS;i++){const h0=head0+f.turn*cornerHeading((i-1)/CORNER_STEPS),h1=head0+f.turn*cornerHeading(i/CORNER_STEPS);x+=(Math.cos(h0)+Math.cos(h1))/(2*CORNER_STEPS);z+=(Math.sin(h0)+Math.sin(h1))/(2*CORNER_STEPS);path.push({x,z});}
 const len=Math.hypot(f.bx-f.ax,f.bz-f.az)/Math.hypot(x,z);
 for(const p of path){p.x=f.ax+p.x*len;p.z=f.az+p.z*len;}
 path[CORNER_STEPS]={x:f.bx,z:f.bz};
 return {type:'arc',corner,sign:f.sign,r:len*(1-TRANSITION)/Math.abs(f.turn),len,path,head0,turn:f.turn};
}
export function buildTrack(circuit=circuits[0],samples=1800){
 const V=circuit.layout.map(([x,z,r])=>({x,z,r})),n=V.length,style=circuit.style,segs=[];
 const fil=V.map((v,i)=>{const a=V[(i+n-1)%n],b=V[(i+1)%n];let ux=v.x-a.x,uz=v.z-a.z,wx=b.x-v.x,wz=b.z-v.z;const lu=Math.hypot(ux,uz),lw=Math.hypot(wx,wz);ux/=lu;uz/=lu;wx/=lw;wz/=lw;
  const turn=Math.atan2(ux*wz-uz*wx,ux*wx+uz*wz),d=v.r*Math.tan(Math.abs(turn)/2),s=Math.sign(turn);const ax=v.x-ux*d,az=v.z-uz*d;
  return {turn,d,sign:s,r:v.r,ax,az,bx:v.x+wx*d,bz:v.z+wz*d,ux,uz};});
 for(let i=0;i<n;i++){const f=fil[i],g=fil[(i+1)%n];
  segs.push(curvedFillet(f,i));
  const lx=g.ax-f.bx,lz=g.az-f.bz,len=Math.hypot(lx,lz);if(f.d+g.d>Math.hypot(V[(i+1)%n].x-V[i].x,V[(i+1)%n].z-V[i].z)+1e-6)throw Error(`${circuit.id}: corner ${i+1} and ${(i+1)%n+1} overlap`);
  segs.push({type:'line',x:f.bx,z:f.bz,tx:lx/len,tz:lz/len,len});}
 let total=0;for(const s of segs){s.s0=total;total+=s.len;}
 // Put s=0 on the start line: project (0,0) onto the final straight.
 const home=segs[segs.length-1],startOffset=home.s0+((0-home.x)*home.tx+(0-home.z)*home.tz);
 const raw=s=>{s=((s%total)+total)%total;let lo=0,hi=segs.length-1;while(lo<hi){const m=(lo+hi+1)>>1;if(segs[m].s0<=s)lo=m;else hi=m-1;}const g=segs[lo],l=s-g.s0;
  if(g.type==='line')return {x:g.x+g.tx*l,z:g.z+g.tz*l,tx:g.tx,tz:g.tz,curvature:0,seg:g};
  const u=Math.max(0,Math.min(1,l/g.len)),j=u*CORNER_STEPS,k=Math.min(CORNER_STEPS-1,Math.floor(j)),f=j-k,a=g.path[k],b=g.path[k+1],heading=g.head0+g.turn*cornerHeading(u);
  const ramp=Math.min(1,u/TRANSITION,(1-u)/TRANSITION);
  return {x:a.x+(b.x-a.x)*f,z:a.z+(b.z-a.z)*f,tx:Math.cos(heading),tz:Math.sin(heading),curvature:g.sign/g.r*ramp,seg:g};};
 const at=t=>raw(startOffset+t*total);
 const corners=segs.filter(s=>s.type==='arc').map(s=>{const a=((s.s0-startOffset)%total+total)%total;return {index:s.corner+1,sign:s.sign,radius:s.r,start:a/total,end:(a+s.len)/total,length:s.len,straightBefore:segs[(segs.indexOf(s)+segs.length-1)%segs.length].len};});
 const points=Array.from({length:samples},(_,i)=>{const p=at(i/samples);return {x:p.x,z:p.z};});
 // Per-sample trackside profile: wall distance per side, run-off surface and kerbs, blended around each corner.
 const dist=(a,b)=>{let d=(b-a)*total;d-=Math.round(d/total)*total;return d;};
 const smooth=(e0,e1,x)=>{const t=Math.min(1,Math.max(0,(x-e0)/(e1-e0)));return t*t*(3-2*t);};
 const base=style.wall,[tightWall,midWall,fastWall]=style.outer,[tightRunoff,fastRunoff]=style.runoff;
 const edges=points.map((_,i)=>{const t=i/samples,side={'-1':{wall:base,runoff:'grass',kerb:false},'1':{wall:base,runoff:'grass',kerb:false}};
  for(const c of corners){const into=dist(c.start,t),out=into-c.length;const outer=-c.sign,inner=c.sign,tight=c.radius<60;
   const reach=smooth(-70,-15,into)*(1-smooth(90,150,out)),wall=tight?tightWall:c.radius<130?midWall:fastWall;
   if(reach>0){side[outer].wall=Math.max(side[outer].wall,base+(wall-base)*reach);if(c.radius>40)side[inner].wall=Math.max(side[inner].wall,base+style.innerExtra*reach);}
   if(into>-35&&out<110)side[outer].runoff=tight?tightRunoff:fastRunoff;
   if(into>-6&&out<10)side[inner].kerb=true;
   if(out>-c.length*.35&&out<28)side[outer].kerb=true;}
  // Pit wall and pit lane along the left of the main straight.
  const p=points[i];if(Math.abs(p.x)<1&&p.z<300&&p.z>-360){const f=smooth(300,240,p.z)*smooth(-360,-300,p.z),left=side['-1'];left.wall+=(10.5-left.wall)*f;left.pit=f>.5;if(f>.5)left.runoff='grass';}
  for(const e of Object.values(side))e.limit=e.wall-(e.runoff!=='grass'?2.2:1.3);
  return side;});
 // DRS on every straight long enough to matter: opens 60 m after the corner, closes 140 m before the next.
 const drsZones=segs.filter(s=>s.type==='line'&&s.len>600).map(s=>{const a=((s.s0-startOffset)%total+total)%total;return {start:(a+60)/total%1,end:(a+s.len-140)/total%1};});
 return {circuit,points,length:total,corners,edges,drsZones,at,segments:segs};
}
