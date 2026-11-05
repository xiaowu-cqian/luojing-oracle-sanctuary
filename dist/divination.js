import {tri,stems,branches} from './data.js';
export const mod=(n,m)=>(n%m+m)%m;
export function randomInt(n){if(!Number.isSafeInteger(n)||n<1)throw Error('Invalid random range');const max=Math.floor(4294967296/n)*n,a=new Uint32Array(1);do{crypto.getRandomValues(a)}while(a[0]>=max);return a[0]%n}
export function drawUnique(total,count){const pool=Array.from({length:total},(_,i)=>i);for(let i=0;i<count;i++){const j=i+randomInt(total-i);[pool[i],pool[j]]=[pool[j],pool[i]]}return pool.slice(0,count)}
export function coinReading(values){if(values.length!==6||values.some(v=>![6,7,8,9].includes(v)))throw Error('Six line values required');let code=0,mask=0;values.forEach((v,i)=>{if(v%2)code|=1<<i;if(v===6||v===9)mask|=1<<i});return {code,changed:code^mask,moving:values.flatMap((v,i)=>v===6||v===9?[i]:[]),values}}
export const castCoins=()=>coinReading(Array.from({length:6},()=>6+randomInt(2)+randomInt(2)+randomInt(2)));
export const trigramNumber=[7,3,5,1,6,2,4,0];
export function plumNumbers(a,b,c){if([a,b,c].some(n=>!Number.isSafeInteger(n)||n<1||n>999999))throw Error('请输入 1–999999 的整数');const up=trigramNumber[mod(a-1,8)],low=trigramNumber[mod(b-1,8)],line=mod(a+b+c-1,6),code=(up<<3)|low;return {code,changed:code^(1<<line),moving:[line],steps:[`上卦：${a} 除以 8 取余，余零按 8，得${tri[up][0]}。`,`下卦：${b} 除以 8 取余，余零按 8，得${tri[low][0]}。`,`动爻：(${a}+${b}+${c}) 除以 6 取余，余零按上爻，得第 ${line+1} 爻。`]}}
export function mutualHex(code){return (((code>>2)&7)<<3)|((code>>1)&7)}
const palaceMasks=[0,1,3,7,15,31,23,16],world=[5,0,1,2,3,4,3,2];
const triElement=[2,0,4,3,2,1,0,3],branchElement=[4,2,0,0,2,1,1,2,3,3,2,4],elementNames=['木','火','土','金','水'];
const inner=[[7,5,3],[0,2,4],[2,4,6],[5,3,1],[4,6,8],[3,1,11],[1,11,9],[0,2,4]],outer=[[1,11,9],[6,8,10],[8,10,0],[11,9,7],[10,0,2],[9,7,5],[7,5,3],[6,8,10]];
export function sixYao(code,dayStem=0){let palace,rank;for(let t=0;t<8;t++){const r=palaceMasks.indexOf(code^(t*9));if(r>=0){palace=t;rank=r;break}}const base=triElement[palace],spiritStart=[0,0,1,1,2,3,4,4,5,5][dayStem],spirits=['青龙','朱雀','勾陈','螣蛇','白虎','玄武'];const rows=Array.from({length:6},(_,i)=>{const b=i<3?inner[code&7][i]:outer[code>>3][i-3],e=branchElement[b],delta=mod(e-base,5),relation=['兄弟','子孙','妻财','官鬼','父母'][delta];return {i,branch:branches[b],element:elementNames[e],relation,spirit:spirits[(spiritStart+i)%6],role:i===world[rank]?'世':i===(world[rank]+3)%6?'应':''}});return {palace:tri[palace][0],rank:['本宫','一世','二世','三世','四世','五世','游魂','归魂'][rank],rows}}
export const smallNames=['大安','留连','速喜','赤口','小吉','空亡'];
export const smallNotes=['象征安定与守持，可借此检查现有安排是否稳妥。','象征牵连与延宕，可借此梳理尚未处理的阻力。','象征快速变化与消息，可借此反思行动节奏。','象征表达中的碰撞，可借此留意分歧与沟通方式。','象征小处的协调，可借此看见能够改善的具体细节。','象征不确定与落空，可借此检查期待与事实的距离。'];
export function smallSix(month,day,hour){if(month<1||month>12||day<1||day>30||hour<1||hour>12||[month,day,hour].some(n=>!Number.isInteger(n)))throw Error('请检查农历月、日和时辰');const m=mod(month-1,6),d=mod(m+day-1,6),h=mod(d+hour-1,6);return {monthIndex:m,dayIndex:d,index:h,steps:[`正月从大安起，数至 ${month} 月：${smallNames[m]}。`,`以月落宫起初一，数至 ${day} 日：${smallNames[d]}。`,`以日落宫起子时，数至第 ${hour} 个时辰：${smallNames[h]}。`]}}
export const palaceLayout=[4,9,2,3,5,7,8,1,6],palaceNames={1:'坎 · 北',2:'坤 · 西南',3:'震 · 东',4:'巽 · 东南',5:'中宫',6:'乾 · 西北',7:'兑 · 西',8:'艮 · 东北',9:'离 · 南'};
export function qimenGround(ju,yang=true){if(!Number.isInteger(ju)||ju<1||ju>9)throw Error('局数为 1–9');const instruments=['戊','己','庚','辛','壬','癸','丁','丙','乙'],map={};instruments.forEach((v,i)=>map[mod(ju-1+(yang?i:-i),9)+1]=v);return map}
export function liurenBase(dayStem,dayBranch,general,hour){const shift=mod(general-hour,12),sky=Array.from({length:12},(_,i)=>mod(i+shift,12)),lodging=[2,4,5,7,5,7,8,10,11,1],s1=sky[lodging[dayStem]],s2=sky[s1],s3=sky[dayBranch],s4=sky[s3];return {sky,lessons:[{base:stems[dayStem],top:branches[s1]},{base:branches[s1],top:branches[s2]},{base:branches[dayBranch],top:branches[s3]},{base:branches[s3],top:branches[s4]}]}}
export function goldenFour(dayStem,ground,general,hour,noble){const start=(dayStem%5)*2,human=mod(start+ground,10),god=mod(ground+general-hour,12);return {human:stems[human],noble,god:branches[god],ground:branches[ground]}}
export const methods=[
{id:'tarot',name:'塔罗',animal:'灵狐',glyph:'☾',color:'#bd9cf4',brief:'78 张牌 · 三牌探索',scope:'完整牌组，注释为原创的反思提示。'},
{id:'qimen',name:'奇门遁甲',animal:'玄鸮',glyph:'✧',color:'#a7bbec',brief:'九宫地盘 · 三奇六仪',scope:'基础排盘：手动选择阴阳遁与局数，显示地盘三奇六仪；不含天盘、九星、八门和值符值使。'},
{id:'liuren',name:'大六壬',animal:'星枭',glyph:'✦',color:'#97c8d5',brief:'月将加时 · 天地盘四课',scope:'基础排盘：按所选月将与时支布天盘，按日干寄宫起四课；不含九宗门三传与天将。'},
{id:'golden',name:'金口诀',animal:'赤虎',glyph:'焰',color:'#efa47c',brief:'四位组课 · 参数可查',scope:'基础组课：将神按月将加时取地分上神，人元用五子遁；贵神由你手动录入，不代算贵人顺逆。'},
{id:'sixyao',name:'六爻',animal:'竹灵',glyph:'☷',color:'#a7cbae',brief:'铜钱起卦 · 纳支六亲世应',scope:'显示本卦、变卦、动爻、八宫、纳支、六亲、六神与世应；未作月建日辰旺衰、伏神或用神判断。'},
{id:'coins',name:'金钱卦',animal:'月狸',glyph:'◈',color:'#d7c68f',brief:'三枚铜钱 · 六次成卦',scope:'每枚铜钱独立等概率取 2 或 3；六次结果自初爻向上记录，6、9 为动爻。'},
{id:'small',name:'小六壬',animal:'玉兔',glyph:'卯',color:'#d6c5ec',brief:'农历月日 · 六宫掌诀',scope:'采用大安起正月、月上起日、日上起时的常见掌诀；古本与门派存在异例。'},
{id:'plum',name:'梅花易数',animal:'花鹿',glyph:'✿',color:'#edb1c9',brief:'三数成象 · 本互变卦',scope:'数起体验式：前两数分别除 8 定上下卦，三数之和除 6 定动爻；余零按 8 或 6。'},
{id:'lenormand',name:'雷诺曼',animal:'星犬',glyph:'♧',color:'#b7c1e8',brief:'36 张象征牌 · 三牌联想',scope:'36 张象征牌不放回抽取；注释为原创的关键词联想，不代替事实判断。'}];
