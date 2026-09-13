export const ROAD_HALF=8;
export const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
export const angleDiff=(a,b)=>Math.atan2(Math.sin(a-b),Math.cos(a-b));
export function formatTime(seconds){if(!Number.isFinite(seconds))return '—';const ms=Math.max(0,Math.floor(seconds*1000));return `${Math.floor(ms/60000)}:${String(Math.floor(ms/1000)%60).padStart(2,'0')}.${String(ms%1000).padStart(3,'0')}`;}
export function nearestPoint(points,x,z){let best=Infinity,index=0,offset=0,fraction=0;for(let i=0;i<points.length;i++){const a=points[i],b=points[(i+1)%points.length],dx=b.x-a.x,dz=b.z-a.z,l2=dx*dx+dz*dz;const t=clamp(((x-a.x)*dx+(z-a.z)*dz)/l2,0,1),ex=x-a.x-dx*t,ez=z-a.z-dz*t,d=ex*ex+ez*ez;if(d<best){best=d;index=i;fraction=t;offset=(ex*(-dz)+ez*dx)/Math.sqrt(l2);}}return {index,fraction,offset,distance:Math.sqrt(best),progress:(index+fraction)/points.length};}
export class LapTimer{
 constructor(){this.reset();}
 reset(){this.elapsed=0;this.active=false;this.invalid=false;this.lap=0;this.sectors=[];this.checkpoint=0;this.previous=.985;this.last=null;this.samples=[];this.sampleAt=0;this.sectorElapsed=0;this.carryInvalid=false;}
 invalidate(carry=false){this.invalid=true;if(carry)this.carryInvalid=true;}
 update(dt,p){if(this.active)this.elapsed+=dt;let completed=null;const crossed=this.previous>.96&&p<.04;
  if(crossed){if(this.active&&this.checkpoint>=23){const sectors=[...this.sectors,this.elapsed-this.sectorElapsed];completed={time:this.elapsed,sectors,valid:!this.invalid,samples:this.samples.slice()};this.last=completed;}else if(this.active){this.invalid=true;}
   const carry=this.carryInvalid;this.active=true;this.invalid=carry;this.carryInvalid=false;this.elapsed=0;this.lap++;this.checkpoint=0;this.sectors=[];this.sectorElapsed=0;this.samples=[];this.sampleAt=0;
  }
  const cp=Math.floor(p*24);if(cp===this.checkpoint+1)this.checkpoint=cp;
  if(this.active){if(this.checkpoint>=8&&this.sectors.length===0){this.sectors.push(this.elapsed);this.sectorElapsed=this.elapsed;}if(this.checkpoint>=16&&this.sectors.length===1){this.sectors.push(this.elapsed-this.sectorElapsed);this.sectorElapsed=this.elapsed;}if(p>=this.sampleAt&&p-this.sampleAt<.05){this.samples.push([p,this.elapsed]);this.sampleAt=p+.005;}}
  this.previous=p;return completed;
 }
}
export class Simulation{
 constructor(points){this.points=points;this.timer=new LapTimer();this.reset();}
 reset(){this.speed=0;this.steer=0;this.timer.reset();this.teleport(.99);this.throttle=0;this.brake=0;this.hit=0;}
 teleport(p){const i=Math.floor(p*this.points.length)%this.points.length,a=this.points[i],b=this.points[(i+2)%this.points.length];this.x=a.x;this.z=a.z;this.heading=Math.atan2(b.x-a.x,-(b.z-a.z));this.speed=0;this.steer=0;this.location=nearestPoint(this.points,this.x,this.z);this.timer.previous=this.location.progress;}
 recover(){this.teleport(this.location.progress);this.timer.invalidate(this.location.progress>.92);}
 step(dt,input){dt=Math.min(dt,1/30);this.throttle=input.throttle?1:0;this.brake=input.brake?1:0;const target=(input.right?1:0)-(input.left?1:0);this.steer+=(target-this.steer)*(1-Math.exp(-dt*7));const off=this.location.distance>ROAD_HALF+.5;
  const acceleration=this.throttle*(14*(1-this.speed/112))-(this.brake?27:0)-.35-this.speed*this.speed*.00055-(off?this.speed*.75:0);
  this.speed=clamp(this.speed+acceleration*dt,0,96);
  const steeringAngle=this.steer*(.43/(1+this.speed*.035));let yaw=this.speed/3.6*Math.tan(steeringAngle);const maxYaw=(10+this.speed*this.speed*.0034)/Math.max(6,this.speed);yaw=clamp(yaw,-maxYaw,maxYaw);
  this.heading+=yaw*dt;this.x+=Math.sin(this.heading)*this.speed*dt;this.z-=Math.cos(this.heading)*this.speed*dt;
  this.location=nearestPoint(this.points,this.x,this.z);
  if(this.location.distance>ROAD_HALF-2){const wheels=[[-.98,-1.8],[.98,-1.8],[-.98,1.7],[.98,1.7]],c=Math.cos(this.heading),s=Math.sin(this.heading);const allOut=wheels.every(([x,z])=>nearestPoint(this.points,this.x+x*c-z*s,this.z+x*s+z*c).distance>ROAD_HALF+.16);if(allOut)this.timer.invalidate(this.location.progress>.94);}
  if(this.location.distance>15.5){const a=this.points[this.location.index],b=this.points[(this.location.index+1)%this.points.length],t=this.location.fraction,px=a.x+(b.x-a.x)*t,pz=a.z+(b.z-a.z)*t;this.x=px+(this.x-px)*15.3/this.location.distance;this.z=pz+(this.z-pz)*15.3/this.location.distance;this.speed*=.65;this.hit=1;this.timer.invalidate(this.location.progress>.94);}
  this.hit=Math.max(0,this.hit-dt*2);return this.timer.update(dt,this.location.progress);
 }
}
