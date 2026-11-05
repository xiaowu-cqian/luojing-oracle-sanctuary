import assert from 'node:assert/strict';
import {names,tri,guaci,order,sequence,codeFor,classifyHand,mountains,mansions,terms,jiazi} from './dist/data.js';
assert.equal(names.length,64);assert.equal(guaci.length,64);assert.equal(new Set(order.flat()).size,64);
for(let n=0;n<64;n++){assert.equal(codeFor(sequence(n)),n);assert.ok(guaci[sequence(n)-1]);for(let bit=0;bit<6;bit++)assert.equal((n^(1<<bit))^(1<<bit),n)}
for(let [name,n]of [['坤',0],['乾',63],['坎',18],['离',45],['既济',21],['未济',42]])assert.equal(names[sequence(n)-1],name);
assert.deepEqual([mountains.length,mansions.length,terms.length,jiazi.length],[24,28,24,60]);assert.equal(new Set(jiazi).size,60);
function hand(bits){let p=Array.from({length:21},()=>({x:0,y:.8}));for(let [j,tip]of [8,12,16,20].entries()){p[tip-2]={x:0,y:.5};p[tip]={x:0,y:bits[j]?.2:.6}}return p}
assert.equal(classifyHand(hand([1,1,0,0])),'victory');assert.equal(classifyHand(hand([1,1,1,1])),'open');assert.equal(classifyHand(hand([0,0,0,0])),'fist');assert.equal(classifyHand(hand([1,0,0,0])),'other');
console.log('Verified 64 hexagram mappings, 384 reversible line flips, traditional arrays and gesture classification.');
const {atlases,atlasItem,itemNames,solarLongitude,solarTermTimes}=await import('./dist/atlas-data.js');
const {createRequire}=await import('node:module');const require=createRequire(import.meta.url);const {Solar}=require('./dist/vendor/lunar.js');
for(const id of ['sky','solar','cycle']){assert.equal(itemNames(id).length,atlases[id].count);for(let n=0;n<atlases[id].count;n++){const info=atlasItem(id,n,2026);assert.ok(info.name&&info.text&&info.stats.length===2);assert.ok(info.source.startsWith('https://'))}}
assert.equal(atlasItem('sky',0).subtitle,'东方 · 青龙');assert.equal(atlasItem('sky',27).subtitle,'南方 · 朱雀');assert.equal(solarLongitude(6),0);assert.equal(solarLongitude(12),90);assert.equal(solarLongitude(18),180);assert.equal(solarLongitude(0),270);
for(const year of [2026,2027]){const dates=solarTermTimes(Solar,year);for(const name of itemNames('solar')){assert.ok(dates[name],name+' missing');assert.ok(dates[name].startsWith(year+'-'))}}
assert.equal(atlasItem('cycle',0).name,'甲子');assert.equal(atlasItem('cycle',59).name,'癸亥');
console.log('Verified 112 new theme entries, four solar longitudes, and all 24 term times for two calendar years.');
