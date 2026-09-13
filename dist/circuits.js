// Circuit roster. Pure data (no three.js) so layouts can be validated in node.
// Every layout starts at (0,0) heading -z on a main straight along x=0 (pit lane on the left, grandstands on the right).
// layout: [x, z, corner radius] in travel order. style: trackside rules used by buildTrack.
// theme: look & feel used by world.js.
export const circuits=[
 {id:'costa',name:'코스타 아줄',title:'COSTA AZUL CIRCUIT',short:'COSTA AZUL',location:'PORTUGAL · ATLANTIC COAST',weather:['☀','24°','DRY'],
  layout:[[0,-720,26],[210,-720,80],[340,-850,90],[600,-850,55],[600,-560,110],[880,-560,45],[880,380,22],[770,380,22],[770,120,50],[560,120,40],[560,300,70],[380,300,35],[380,470,30],[230,470,20],[170,440,20],[0,440,95]],
  style:{wall:17,outer:[46,36,28],runoff:['asphalt','gravel'],innerExtra:4},
  stands:[[1,70],[4,60],[7,80],[8,60],[14,70],[16,70]],
  theme:{scenery:'coast',skyTop:'#28434e',skyBottom:'#edcfa4',fog:'#aeb5a2',fogDensity:.00055,hemi:['#d1e7e7','#48533c',2.2],sun:['#fff0ce',3.5],sunOffset:[-120,170,-150],exposure:1.12,ground:'#59644a',grass:['#5f7f45','#6b8c4d'],apron:'#3f6b55',kerb:['#c8372d','#efefe9'],bands:['#2f63b8','#bf3a2f'],walls:'sponsor',sponsors:['KYRVEX','HALDRA','NOVIQ','OSTRAL'],asphaltRoughness:.91}},
 {id:'noctis',name:'녹티스 하버',title:'NOCTIS HARBOUR STREET CIRCUIT',short:'NOCTIS HARBOUR',location:'HARBOUR CITY · NIGHT RACE',weather:['☾','29°','NIGHT'],
  layout:[[0,-600,20],[260,-600,18],[260,-760,22],[620,-760,30],[620,-420,18],[440,-420,18],[440,-160,25],[820,-160,40],[820,520,20],[560,520,20],[560,300,18],[300,300,18],[300,540,22],[0,540,26]],
  style:{wall:11.5,outer:[20,17,15],runoff:['asphalt','asphalt'],innerExtra:0},
  stands:[[1,60],[4,50],[8,70],[9,60],[14,60]],
  theme:{scenery:'city',night:true,skyTop:'#05080f',skyBottom:'#2a3160',fog:'#131a2e',fogDensity:.0008,hemi:['#6d80b8','#1b1a22',1.25],sun:['#fff1dc',2.3],sunOffset:[-30,190,-50],exposure:1.3,ground:'#24262b',grass:['#44474d','#4a4d54'],apron:'#55585e',kerb:['#d23a2e','#f1f1ea'],bands:null,walls:'street',sponsors:['NOCTIS','KYRVEX','LUMEN','VARO'],asphaltRoughness:.8}},
 {id:'safra',name:'사프라 듄스',title:'SAFRA DUNES INTERNATIONAL',short:'SAFRA DUNES',location:'ARABIAN GULF · DESERT',weather:['◐','31°','DUSK'],
  layout:[[0,-820,30],[180,-820,40],[180,-960,40],[520,-960,180],[820,-700,150],[1000,-700,26],[1000,460,24],[860,460,24],[860,120,70],[600,120,110],[600,-240,40],[380,-240,40],[380,140,100],[200,140,50],[200,620,45],[0,620,60]],
  style:{wall:19,outer:[52,44,36],runoff:['asphalt','asphalt'],innerExtra:6},
  stands:[[1,70],[6,60],[7,80],[12,60],[16,70]],
  theme:{scenery:'desert',skyTop:'#2a2a5c',skyBottom:'#f0874a',fog:'#d49a6c',fogDensity:.00048,hemi:['#f5c9a3','#6b4a2a',1.9],sun:['#ffab66',3.1],sunOffset:[-420,90,-120],exposure:1.05,ground:'#b48a56',grass:['#bf9660','#c9a16a'],apron:'#9b7446',kerb:['#cf3b2f','#f3efe4'],bands:['#c7382d','#f0ede4'],walls:'sponsor',sponsors:['SAFRA','KYRVEX','ORYX','DUNEWAY'],asphaltRoughness:.93}},
 {id:'valdenoir',name:'발데누아르',title:'VALDENOIR FOREST RING',short:'VALDENOIR',location:'ARDENNES · FOREST',weather:['☁','14°','OVERCAST'],
  layout:[[0,-720,45],[220,-760,160],[480,-940,100],[760,-900,60],[880,-640,220],[860,-200,130],[980,120,35],[760,260,200],[520,120,70],[430,330,50],[560,560,140],[300,640,28],[240,600,24],[0,600,70]],
  style:{wall:15,outer:[32,28,24],runoff:['gravel','gravel'],innerExtra:3},
  stands:[[1,60],[7,60],[12,70]],
  theme:{scenery:'forest',skyTop:'#66757c',skyBottom:'#bcc5c2',fog:'#a9b3af',fogDensity:.0015,hemi:['#d3dcda','#34432f',2.6],sun:['#e8eeee',1.3],sunOffset:[-100,200,-60],exposure:1.1,ground:'#3d4f34',grass:['#4d693b','#57743f'],apron:'#4a5e44',kerb:['#c8372d','#efefe9'],bands:null,walls:'armco',sponsors:['VALDENOIR','KYRVEX','BRUMA','PINEWALL'],asphaltRoughness:.62}}
];
export const circuitById=id=>circuits.find(c=>c.id===id)||circuits[0];
