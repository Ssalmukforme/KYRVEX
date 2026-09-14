// Circuit roster. Pure data (no three.js) so layouts can be validated in node.
// Every layout starts at (0,0) heading -z on a main straight along x=0 (pit lane on the left, grandstands on the right).
// layout: [x, z, corner radius] in travel order. style: trackside rules used by buildTrack.
// theme: look & feel used by world.js.
export const circuits=[
 {id:'costa',name:'코스타 아줄',title:'COSTA AZUL CIRCUIT',short:'COSTA AZUL',location:'PORTUGAL · ATLANTIC COAST',weather:['☀','24°','DRY'],
  revision:3,
  layout:[[0,-720,95],[230,-940,180],[600,-920,140],[790,-700,140],[720,-470,100],[950,-260,65],[930,450,50],[765,480,50],[740,120,90],[490,80,105],[350,300,130],[420,560,80],[180,690,85],[0,590,130]],
  style:{wall:17,outer:[46,36,28],runoff:['asphalt','gravel'],innerExtra:4},
  stands:[[1,70],[4,60],[7,80],[8,60],[12,70],[14,70]],
  theme:{scenery:'coast',skyTop:'#28434e',skyBottom:'#edcfa4',fog:'#aeb5a2',fogDensity:.00055,hemi:['#d1e7e7','#48533c',2.2],sun:['#fff0ce',3.5],sunOffset:[-120,170,-150],exposure:1.12,ground:'#59644a',grass:['#5f7f45','#6b8c4d'],apron:'#3f6b55',kerb:['#c8372d','#efefe9'],bands:['#2f63b8','#bf3a2f'],walls:'sponsor',sponsors:['KYRVEX','HALDRA','NOVIQ','OSTRAL'],asphaltRoughness:.91}},
 {id:'noctis',name:'녹티스 하버',title:'NOCTIS HARBOUR STREET CIRCUIT',short:'NOCTIS HARBOUR',location:'HARBOUR CITY · NIGHT RACE',weather:['☾','29°','NIGHT'],
  revision:3,
  layout:[[0,-650,55],[280,-740,80],[360,-910,65],[700,-870,80],[790,-490,65],[510,-420,70],[540,-150,90],[900,20,105],[870,600,65],[580,680,80],[500,390,65],[310,330,85],[210,620,75],[0,570,100]],
  style:{wall:11.5,outer:[20,17,15],runoff:['asphalt','asphalt'],innerExtra:0},
  stands:[[1,60],[4,50],[8,70],[9,60],[14,60]],
  theme:{scenery:'city',night:true,skyTop:'#05080f',skyBottom:'#2a3160',fog:'#131a2e',fogDensity:.0008,hemi:['#6d80b8','#1b1a22',1.25],sun:['#fff1dc',2.3],sunOffset:[-30,190,-50],exposure:1.3,ground:'#24262b',grass:['#44474d','#4a4d54'],apron:'#55585e',kerb:['#d23a2e','#f1f1ea'],bands:null,walls:'street',sponsors:['NOCTIS','KYRVEX','LUMEN','VARO'],asphaltRoughness:.8}},
 {id:'safra',name:'사프라 듄스',title:'SAFRA DUNES INTERNATIONAL',short:'SAFRA DUNES',location:'ARABIAN GULF · DESERT',weather:['◐','31°','DUSK'],
  revision:3,
  layout:[[0,-850,65],[230,-1030,125],[480,-940,160],[760,-1070,150],[1090,-810,120],[1210,-560,90],[1160,570,65],[920,600,65],[870,190,120],[660,80,100],[560,-230,80],[340,-160,85],[390,200,100],[250,360,105],[210,770,95],[0,680,110]],
  style:{wall:19,outer:[52,44,36],runoff:['asphalt','asphalt'],innerExtra:6},
  stands:[[1,70],[6,60],[7,80],[12,60],[16,70]],
  theme:{scenery:'desert',skyTop:'#2a2a5c',skyBottom:'#f0874a',fog:'#d49a6c',fogDensity:.00048,hemi:['#f5c9a3','#6b4a2a',1.9],sun:['#ffab66',3.1],sunOffset:[-420,90,-120],exposure:1.05,ground:'#b48a56',grass:['#bf9660','#c9a16a'],apron:'#9b7446',kerb:['#cf3b2f','#f3efe4'],bands:['#c7382d','#f0ede4'],walls:'sponsor',sponsors:['SAFRA','KYRVEX','ORYX','DUNEWAY'],asphaltRoughness:.93}},
 {id:'valdenoir',name:'발데누아르',title:'VALDENOIR FOREST RING',short:'VALDENOIR',location:'ARDENNES · FOREST',weather:['☁','14°','OVERCAST'],
  revision:3,
  layout:[[0,-780,120],[240,-1020,230],[560,-1140,180],[860,-910,180],[1010,-610,260],[880,-230,210],[1070,170,100],[800,390,190],[540,200,135],[380,420,120],[480,740,120],[250,900,75],[140,700,65],[0,620,130]],
  style:{wall:15,outer:[32,28,24],runoff:['gravel','gravel'],innerExtra:3},
  stands:[[1,60],[7,60],[12,70]],
  theme:{scenery:'forest',skyTop:'#66757c',skyBottom:'#bcc5c2',fog:'#a9b3af',fogDensity:.0015,hemi:['#d3dcda','#34432f',2.6],sun:['#e8eeee',1.3],sunOffset:[-100,200,-60],exposure:1.1,ground:'#3d4f34',grass:['#4d693b','#57743f'],apron:'#4a5e44',kerb:['#c8372d','#efefe9'],bands:null,walls:'armco',sponsors:['VALDENOIR','KYRVEX','BRUMA','PINEWALL'],asphaltRoughness:.62}}
];
export const circuitById=id=>circuits.find(c=>c.id===id)||circuits[0];
