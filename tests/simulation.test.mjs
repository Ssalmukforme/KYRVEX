import test from 'node:test';
import assert from 'node:assert/strict';
import {LapTimer,Simulation,nearestPoint,formatTime} from '../dist/simulation.js';
const circle=Array.from({length:720},(_,i)=>({x:200*Math.cos(i/720*Math.PI*2),z:200*Math.sin(i/720*Math.PI*2)}));
function start(t){t.update(.01,.99);t.update(.01,.001);}
function complete(t,invalid=false){start(t);for(let i=1;i<240;i++){if(invalid&&i===120)t.invalidate();t.update(.25,i/240);}return t.update(.25,.001);}
test('time formatting keeps millisecond precision',()=>{assert.equal(formatTime(83.427),'1:23.427');assert.equal(formatTime(Infinity),'—');});
test('complete ordered valid lap has 3 sectors summing to lap time',()=>{const t=new LapTimer(),r=complete(t);assert.equal(r.valid,true);assert.equal(r.sectors.length,3);assert.ok(Math.abs(r.sectors.reduce((a,b)=>a+b,0)-r.time)<1e-8);assert.equal(t.lap,2);});
test('track limits invalidation stays for the full lap',()=>{const t=new LapTimer(),r=complete(t,true);assert.equal(r.valid,false);assert.equal(t.invalid,false);});
test('finish-line oscillation and skipped sectors never create a record',()=>{const t=new LapTimer();start(t);t.update(1,.97);assert.equal(t.update(1,.001),null);t.update(1,.1);t.update(1,.99);assert.equal(t.update(1,.001),null);});
test('last-sector violation also invalidates next lap',()=>{const t=new LapTimer();start(t);for(let i=1;i<24;i++)t.update(1,i/24);t.invalidate(true);t.update(1,.99);assert.equal(t.update(1,.001).valid,false);assert.equal(t.invalid,true);});
test('nearest path projects onto segment',()=>{const result=nearestPoint([{x:0,z:0},{x:0,z:-100},{x:100,z:-100},{x:100,z:0}],4,-50);assert.equal(result.distance,4);assert.equal(result.progress,.125);});
test('throttle accelerates, braking stops and cannot reverse',()=>{const s=new Simulation(circle);for(let i=0;i<120;i++)s.step(1/120,{throttle:true});assert.ok(s.speed>10);for(let i=0;i<240;i++)s.step(1/120,{brake:true});assert.equal(s.speed,0);});
test('right steering rotates heading right; reset invalidates lap',()=>{const s=new Simulation(circle);s.speed=12;const h=s.heading;s.step(1/120,{right:true});assert.ok(s.heading>h);s.recover();assert.equal(s.timer.invalid,true);assert.equal(s.speed,0);});
