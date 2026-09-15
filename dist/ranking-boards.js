// How KYRVEX appears in ssalmuk_ranking. Must match supabase/ranking-boards.sql (checked by tests/ranking.test.mjs).
export const RANKING_GAME = 'kyrvex';
// One board per circuit layout revision, mirroring the local record key (kyrvex.records.<id>.v<revision>):
// a layout change bumps the revision, so laps on old and new layouts never share a board.
export const boardIdFor = circuit => `${circuit.id}-r${circuit.revision || 2}`;
// Lap time in milliseconds; lower wins. min = 85% of the lap length (room for cutting inside corners)
// at the 96 m/s speed cap in simulation.js. max = 30 minutes.
export const BOARDS = [
  { id: 'costa-r4', name: '코스타 아줄', higherIsBetter: false, min: 50225, max: 1_800_000 },
  { id: 'noctis-r3', name: '녹티스 하버', higherIsBetter: false, min: 45033, max: 1_800_000 },
  { id: 'safra-r3', name: '사프라 듄스', higherIsBetter: false, min: 59003, max: 1_800_000 },
  { id: 'valdenoir-r3', name: '발데누아르', higherIsBetter: false, min: 47540, max: 1_800_000 },
];
