// An authored, Silverstone-inspired silhouette, not a survey or replica.
// Broad compound bends and alternating S turns are drawn with tangent handles.
// Reference: https://www.formula1.com/en/racing/2022/great-britain
// Start/finish is relocated to the long outer straight for the existing pit complex.
const start=[210,355];
const authored=[
 {to:[210,245],c1:[130,311.521739],c2:[155,278]},
 {to:[278,204.2]},
 {to:[300,125],c1:[319,179.6],c2:[322,149]},
 {to:[326,63],c1:[283.5,107],c2:[297,88]},
 {to:[407,37],c1:[355,38],c2:[381,19]},
 {to:[593,165.769231]},
 {to:[623,282],c1:[619,183.769231],c2:[628,240]},
 {to:[629,350],c1:[618,324],c2:[613,330]},
 {to:[661,390]},
 {to:[648,440],c1:[701,440],c2:[697,423.2]},
 {to:[659,489],c1:[594,458.514286],c2:[604,489]},
 {to:[735,480],c1:[700,489],c2:[719,498]},
 {to:[898,296.625]},
 {to:[892,204],c1:[930,260.625],c2:[928,206]},
 {to:[907,134],c1:[840,201.111111],c2:[867,130]},
 {to:[1034,215],c1:[958,139.1],c2:[1026,155]},
 {to:[1069,477.5]},
 {to:[1005,535],c1:[1077,537.5],c2:[1050,526]},
 {to:[828,563],c1:[951,545.8],c2:[875,558]},
 {to:[763,583],c1:[800,565.978723],c2:[785,597]},
 {to:[676,565],c1:[741,569],c2:[702,550]},
 {to:[602,601],c1:[644.8,583],c2:[632,616]},
 {to:[532,530],c1:[572,586],c2:[562,546.304348]},
 {to:start},
];
const home=authored.at(-2).to,dx=start[0]-home[0],dy=start[1]-home[1],len=Math.hypot(dx,dy),fx=dx/len,fy=dy/len;
const origin=[(home[0]+start[0])/2,(home[1]+start[1])/2],scale=1.8;
const transform=([x,y])=>({x:((x-origin[0])*-fy+(y-origin[1])*fx)*scale,z:-((x-origin[0])*fx+(y-origin[1])*fy)*scale});
// Per-bend handle lengths keep apex radii broad without changing the silhouette's anchors.
const handles=[[.5,.8],[.9,.7],[.4,1.2],[1.4,.4],[.6,1.6],[.4,1],[.4,.4],[.5,.6],[.4,1.3],[1.4,.7],[1,1.6],[1.6,.5],[.4,.9],[1.5,.5],[.6,1.2],[.8,1],[.7,1],[1,.9]];
let previous=start,index=0;
const along=(a,b,f)=>[a[0]+(b[0]-a[0])*f,a[1]+(b[1]-a[1])*f];
export const costaPath={start:transform(start),segments:authored.map(s=>{const h=s.c1?handles[index++]:null,segment={to:transform(s.to),...(h?{c1:transform(along(previous,s.c1,h[0])),c2:transform(along(s.to,s.c2,h[1]))}:{})};previous=s.to;return segment;})};
export const costaMapRotation=Math.atan2(fx,-fy);
