// ===================================================================
// ART DIAGRAMS — 2コマ＋矢印の指導図エンジン
// 関節座標(側面図)を与えて人体を描く再利用ポーザー。
// 各図は twoPanel(開始, 動作) で 410x205 の2コマSVGを返す。
// ここに登録したキーは svg-library.js が最優先で採用する。
// 座標系: 各パネル 0..200(x) / 0..205(y)、床は下・y増加で下方向。
// ===================================================================
const NS = 'http://www.w3.org/2000/svg';
const C = { skin:'#f4d3a8', body:'#3b4a5a', line:'#2b3642', accent:'#ea5b0c',
  arrow:'#e23b2e', guide:'#9aa7b4', floor:'#c7ccd1', prop:'#b9c2cc' };

// P: {head,neck,hip,sh,el,ha, kn,ft,  el2,ha2,kn2,ft2}（2=反対/対角側）
function fig(P, opt = {}) {
  const g = [], w = opt.limbW || 7, tw = opt.torsoW || 16;
  const L = (a,b,col,width) => `<path d="M${a[0]},${a[1]} L${b[0]},${b[1]}" stroke="${col}" stroke-width="${width}" fill="none" stroke-linecap="round"/>`;
  if (P.neck && P.hip) g.push(L(P.neck,P.hip,C.body,tw));
  if (P.hip && P.kn)  g.push(L(P.hip,P.kn,C.line,w));
  if (P.kn && P.ft)   g.push(L(P.kn,P.ft,C.line,w));
  if (P.kn2){ g.push(L(P.hip,P.kn2,opt.leg2Accent?C.accent:C.line,w)); if(P.ft2)g.push(L(P.kn2,P.ft2,opt.leg2Accent?C.accent:C.line,w)); }
  const foot = (k,f) => { if(!k||!f) return ''; const dx=Math.sign(f[0]-k[0])||1; return `<path d="M${f[0]},${f[1]} L${f[0]+dx*10},${f[1]}" stroke="${C.line}" stroke-width="${w}" stroke-linecap="round"/>`; };
  g.push(foot(P.kn,P.ft)); if(P.kn2) g.push(foot(P.kn2,P.ft2));
  const sh = P.sh || P.neck;
  if (sh && P.el) g.push(L(sh,P.el,opt.armAccent?C.accent:C.line,w));
  if (P.el && P.ha) g.push(L(P.el,P.ha,opt.armAccent?C.accent:C.line,w));
  if (P.el2){ g.push(L(sh,P.el2,opt.arm2Accent?C.accent:C.line,w)); if(P.ha2)g.push(L(P.el2,P.ha2,opt.arm2Accent?C.accent:C.line,w)); }
  if (P.head) g.push(`<circle cx="${P.head[0]}" cy="${P.head[1]}" r="${opt.headR||13}" fill="${C.skin}" stroke="${C.line}" stroke-width="2.5"/>`);
  return g.join('');
}
const floor = (y, x0=8, x1=192) => `<line x1="${x0}" y1="${y}" x2="${x1}" y2="${y}" stroke="${C.floor}" stroke-width="4" stroke-linecap="round"/>`;
const wall  = (x, y0=18, y1=182) => `<line x1="${x}" y1="${y0}" x2="${x}" y2="${y1}" stroke="${C.prop}" stroke-width="5" stroke-linecap="round"/>`;
const chair = (x,y) => `<path d="M${x},${y} l0,-34 l30,0 l0,34 M${x+30},${y-34} l0,-26" stroke="${C.prop}" stroke-width="5" fill="none" stroke-linecap="round"/>`;
const arrow = (a,b) => `<path d="M${a[0]},${a[1]} L${b[0]},${b[1]}" stroke="${C.arrow}" stroke-width="5" fill="none" stroke-linecap="round" marker-end="url(#ar)"/>`;
const arc = (cx,cy,r) => `<path d="M${cx-r},${cy} A${r},${r} 0 1 1 ${cx+r},${cy}" stroke="${C.arrow}" stroke-width="4" fill="none" marker-end="url(#ar)"/>`;
const guide = (a,b) => `<path d="M${a[0]},${a[1]} L${b[0]},${b[1]}" stroke="${C.guide}" stroke-width="2.5" stroke-dasharray="4 4" fill="none"/>`;
const badge = (n,x=18,y=22) => `<circle cx="${x}" cy="${y}" r="12" fill="${C.accent}"/><text x="${x}" y="${y+4}" font-size="14" fill="#fff" text-anchor="middle" font-weight="700">${n}</text>`;
const cap = (t,x=100) => `<text x="${x}" y="198" font-size="11.5" fill="#6a747d" text-anchor="middle">${t}</text>`;
const DEF = `<defs><marker id="ar" viewBox="0 0 12 12" refX="9" refY="6" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M1,1 L11,6 L1,11 z" fill="${C.arrow}"/></marker></defs>`;
const twoPanel = (p1,p2) => `<svg viewBox="0 0 410 205" xmlns="${NS}">${DEF}<g>${p1}</g><g transform="translate(210,0)">${p2}</g><line x1="205" y1="15" x2="205" y2="190" stroke="#e5e7eb" stroke-width="2"/></svg>`;

// ---- 姿勢プリセット(開始姿勢のjoint dictを返す。必要な関節だけ上書きして使う) ----
const P = {
  standing: () => ({head:[100,42],neck:[100,58],hip:[100,110],sh:[100,58],el:[100,88],ha:[100,110],kn:[100,142],ft:[100,175]}),
  supineBent: () => ({head:[40,150],neck:[58,150],hip:[120,150],sh:[58,150],el:[70,158],ha:[86,158],kn:[150,120],ft:[150,158]}),
  supineFlat: () => ({head:[40,150],neck:[58,150],hip:[130,150],sh:[58,150],el:[74,150],ha:[92,150],kn:[168,150],ft:[186,150]}),
  quadruped: () => ({head:[150,110],neck:[135,112],hip:[70,112],sh:[135,112],el:[135,148],ha:[135,150],kn:[70,148],ft:[70,150]}),
  prone: () => ({head:[150,140],neck:[135,144],hip:[64,150],sh:[135,144],el:[150,152],ha:[164,150],kn:[40,152],ft:[24,152]}),
  seatedFloor: () => ({head:[60,90],neck:[62,104],hip:[70,150],sh:[62,104],el:[78,126],ha:[120,150],kn:[120,150],ft:[168,150]}),
  seatedChair: () => ({head:[86,74],neck:[88,90],hip:[96,132],sh:[88,90],el:[92,112],ha:[96,132],kn:[130,132],ft:[130,170]}),
  sideLying: () => ({head:[40,132],neck:[56,134],hip:[130,138],sh:[56,134],el:[92,120],ha:[110,118],kn:[150,150],ft:[128,150],kn2:[150,150],ft2:[128,150]}),
};

// ============ 図の登録 (key -> 2コマSVG文字列) ============
const D = {};

// 1. bridge / bridgeBase — お尻上げ
D.bridge = twoPanel(
  floor(160)+fig(P.supineBent())+badge(1)+cap('①あお向け・ひざを立てる'),
  floor(160)+guide([58,150],[150,120])+fig(Object.assign(P.supineBent(),{hip:[118,120],neck:[58,148]}))+arrow([112,150],[112,116])+badge(2)+cap('②お尻を持ち上げる'));
D.bridgeBase = D.bridge;

// 2. pushup — ひざつき腕立て
D.pushup = twoPanel(
  floor(160)+fig({head:[168,120],neck:[152,122],hip:[92,138],sh:[152,122],el:[150,158],ha:[150,160],kn:[70,150],ft:[54,160]})+badge(1)+cap('①ひざつき・腕をのばす'),
  floor(160)+guide([54,158],[168,130])+fig({head:[168,134],neck:[152,136],hip:[92,144],sh:[152,136],el:[156,152],ha:[150,160],kn:[70,150],ft:[54,160]})+arrow([164,120],[164,140])+badge(2)+cap('②ひじを曲げ胸を下ろす'));
D.pushupBasic = D.pushup; D.plankBasic = D.pushup;

// 3. breathing — 腹式呼吸(あお向け・お腹上下)
D.breathing = twoPanel(
  floor(160)+fig(Object.assign(P.supineBent(),{ha:[112,150],el:[92,150]}))+`<circle cx="112" cy="146" r="4" fill="${C.accent}"/>`+badge(1)+cap('①鼻から吸ってお腹をふくらませる'),
  floor(160)+fig(Object.assign(P.supineBent(),{ha:[112,150],el:[92,150]}))+arrow([112,138],[112,124])+badge(2)+cap('②口から吐いてお腹をへこませる'));

// 4. meditation / savasana — 座って呼吸 / 休息
D.meditation = twoPanel(
  floor(158)+fig({head:[100,66],neck:[100,82],hip:[100,140],sh:[100,82],el:[80,116],ha:[74,138],el2:[120,116],ha2:[126,138],kn:[70,150],ft:[130,150],kn2:[130,150],ft2:[70,150]})+badge(1)+cap('①あぐらで背すじを伸ばす'),
  floor(158)+fig({head:[100,64],neck:[100,80],hip:[100,140],sh:[100,80],el:[80,116],ha:[74,138],el2:[120,116],ha2:[126,138],kn:[70,150],ft:[130,150],kn2:[130,150],ft2:[70,150]})+guide([100,44],[100,140])+badge(2)+cap('②背すじを伸ばしゆっくり呼吸'));
D.savasana = twoPanel(
  floor(150)+fig(Object.assign(P.supineFlat(),{el:[74,150],ha:[92,150]}))+badge(1)+cap('①あお向けで全身をゆるめる'),
  floor(150)+fig(Object.assign(P.supineFlat(),{el:[70,142],ha:[64,150]}))+`<text x="150" y="70" font-size="18" fill="${C.guide}">zzz</text>`+badge(2)+cap('②自然な呼吸で休む'));

// 5. squat / squatHold — スクワット
D.squat = twoPanel(
  floor(175)+fig(Object.assign(P.standing(),{headR:12}))+badge(1)+cap('①足を肩幅で立つ'),
  floor(175)+chair(126,175)+guide([100,142],[100,175])+fig({head:[78,60],neck:[82,74],hip:[104,120],sh:[82,74],el:[92,96],ha:[112,104],kn:[100,140],ft:[100,175]},{headR:12})+arrow([120,110],[126,138])+badge(2)+cap('②お尻を後ろへ引いてしゃがむ'));
D.squatHold = twoPanel(
  floor(175)+fig(Object.assign(P.standing(),{headR:12}))+badge(1)+cap('①足を肩幅で立つ'),
  floor(175)+guide([100,142],[100,175])+fig({head:[80,62],neck:[84,76],hip:[104,120],sh:[84,76],el:[94,96],ha:[120,100],kn:[100,140],ft:[100,175]},{headR:12})+`<text x="150" y="120" font-size="13" fill="${C.guide}">keep</text>`+badge(2)+cap('②しゃがんだ姿勢でキープ'));

// 6. plank — ひじつきキープ
D.plank = twoPanel(
  floor(160)+fig({head:[168,120],neck:[152,122],hip:[92,132],sh:[152,122],el:[150,158],ha:[168,158],kn:[70,148],ft:[54,158]})+badge(1)+cap('①ひじとつま先で支える'),
  floor(160)+guide([54,150],[172,124])+fig({head:[172,122],neck:[156,124],hip:[96,132],sh:[156,124],el:[154,158],ha:[172,158],kn:[74,148],ft:[54,158]})+badge(2)+cap('②頭〜かかとを一直線にキープ'));

// 7. forwardFold — 座位前屈
D.forwardFold = twoPanel(
  floor(152)+fig(P.seatedFloor())+badge(1)+cap('①脚を前に伸ばして座る'),
  floor(152)+fig({head:[92,118],neck:[80,116],hip:[62,150],sh:[80,116],el:[110,132],ha:[150,146],kn:[120,148],ft:[168,148]})+arrow([100,110],[130,132])+badge(2)+cap('②股関節から上体を前へ倒す'));

// 8. vsit — V字(座って足を浮かす)
D.vsit = twoPanel(
  floor(152)+fig(Object.assign(P.seatedFloor(),{hip:[70,150]}))+badge(1)+cap('①座ってひざを立てる'),
  floor(152)+fig({head:[54,96],neck:[60,108],hip:[80,150],sh:[60,108],el:[86,120],ha:[120,120],kn:[120,120],ft:[150,96]})+arrow([140,140],[150,104])+badge(2)+cap('②上体を倒し足を浮かせV字に'));

// 9. shoulderOpen — 胸を開く(立位・腕を後ろへ)
D.shoulderOpen = twoPanel(
  floor(178)+fig(Object.assign(P.standing(),{el:[92,86],ha:[86,110],ft:[100,178],headR:12}))+badge(1)+cap('①まっすぐ立つ'),
  floor(178)+fig(Object.assign(P.standing(),{el:[112,84],ha:[122,104],ft:[100,178],headR:12}))+arrow([120,74],[136,70])+guide([100,58],[100,110])+badge(2)+cap('②肩と腕を後ろへ引き胸を開く'));

// 10. sideStretch — 体側のばし(座位)
D.sideStretch = twoPanel(
  floor(158)+fig(Object.assign(P.seatedChair(),{el:[76,112],ha:[72,90]}))+badge(1)+cap('①片手を天井へ上げる'),
  floor(158)+fig({head:[74,80],neck:[80,94],hip:[96,132],sh:[80,94],el:[70,110],ha:[60,88],kn:[130,132],ft:[130,170]})+arrow([64,84],[48,92])+badge(2)+cap('②上体を真横へ倒す'));

// 11. shoulderRoll — 肩回し
D.shoulderRoll = twoPanel(
  floor(178)+fig(Object.assign(P.standing(),{ft:[100,178],headR:12}))+badge(1)+cap('①腕の力を抜いて立つ'),
  floor(178)+arc(100,72,20)+fig(Object.assign(P.standing(),{ft:[100,178],headR:12}))+badge(2)+cap('②肩を大きく後ろへ回す'));

// 12. shoulderBlade — 肩甲骨寄せ
D.shoulderBlade = twoPanel(
  floor(170)+fig({head:[100,52],neck:[100,68],hip:[100,120],sh:[100,68],el:[80,92],ha:[80,116],el2:[120,92],ha2:[120,116],kn:[100,150],ft:[100,170],headR:12})+badge(1)+cap('①ひじを軽く曲げる'),
  floor(170)+fig({head:[100,52],neck:[100,68],hip:[100,120],sh:[100,68],el:[78,88],ha:[86,110],el2:[122,88],ha2:[114,110],kn:[100,150],ft:[100,170],headR:12})+arrow([120,90],[134,90])+arrow([80,90],[66,90])+badge(2)+cap('②左右のひじを背中側へ引く'));

// 13. cobra — うつ伏せ上体反らし
D.cobra = twoPanel(
  floor(154)+fig(P.prone())+badge(1)+cap('①うつ伏せ・手は胸の横'),
  floor(154)+fig({head:[152,108],neck:[140,118],hip:[64,150],sh:[140,118],el:[150,140],ha:[160,150],kn:[40,152],ft:[24,152]})+arrow([120,116],[136,96])+badge(2)+cap('②胸を起こす(お腹は床)'));

// 14. legRaise / legLower — 脚上げ下ろし
D.legRaise = twoPanel(
  floor(160)+fig(Object.assign(P.supineFlat(),{el:[74,150],ha:[92,150]}))+badge(1)+cap('①あお向け・脚をそろえる'),
  floor(160)+fig({head:[40,150],neck:[58,150],hip:[120,150],sh:[58,150],el:[74,150],ha:[92,150],kn:[150,108],ft:[166,80]})+arrow([176,140],[176,96])+badge(2)+cap('②脚を天井へ上げる'));
D.legLower = twoPanel(
  floor(160)+fig({head:[40,150],neck:[58,150],hip:[120,150],sh:[58,150],el:[74,150],ha:[92,150],kn:[150,108],ft:[166,80]})+badge(1)+cap('①脚を天井へ上げる'),
  floor(160)+guide([120,150],[176,150])+fig({head:[40,150],neck:[58,150],hip:[120,150],sh:[58,150],el:[74,150],ha:[92,150],kn:[150,130],ft:[176,126]})+arrow([176,100],[176,132])+badge(2)+cap('②腰が反る手前までゆっくり下ろす'));

// 15. butterflyHip — がっせき(座位・ひざ開き)
D.butterflyHip = twoPanel(
  floor(158)+fig({head:[100,84],neck:[100,98],hip:[100,142],sh:[100,98],el:[86,120],ha:[86,140],el2:[114,120],ha2:[114,140],kn:[72,132],ft:[100,150],kn2:[128,132],ft2:[100,150]})+badge(1)+cap('①足の裏を合わせて座る'),
  floor(158)+fig({head:[100,84],neck:[100,98],hip:[100,142],sh:[100,98],el:[86,120],ha:[86,140],el2:[114,120],ha2:[114,140],kn:[66,144],ft:[100,150],kn2:[134,144],ft2:[100,150]})+arrow([66,132],[60,144])+arrow([134,132],[140,144])+badge(2)+cap('②ひざを床のほうへ下ろす'));

// 16. clamShell — 貝の口(横向きひざ開き)
D.clamShell = twoPanel(
  floor(154)+fig({head:[36,128],neck:[52,132],hip:[128,138],sh:[52,132],el:[86,134],ha:[104,134],kn:[152,126],ft:[132,150],kn2:[152,126],ft2:[132,150]})+badge(1)+cap('①横向き・ひざを重ねて曲げる'),
  floor(154)+fig({head:[36,128],neck:[52,132],hip:[128,138],sh:[52,132],el:[86,134],ha:[104,134],kn:[152,126],ft:[132,150],kn2:[150,104],ft2:[132,148]},{leg2Accent:true})+arrow([154,120],[156,102])+badge(2)+cap('②かかとを付けたまま上のひざを開く'));

// 17. spineTwist — 寝ねじり
D.spineTwist = twoPanel(
  floor(158)+fig(Object.assign(P.supineBent(),{el:[58,132],ha:[36,132],el2:[58,168],ha2:[36,168],kn:[150,124],ft:[150,150]}))+badge(1)+cap('①あお向け・両手を横に広げる'),
  floor(158)+fig({head:[40,150],neck:[58,150],hip:[120,150],sh:[58,150],el:[58,132],ha:[36,132],kn:[130,168],ft:[110,178]})+arrow([150,120],[140,160])+badge(2)+cap('②両ひざを片側へ倒す'));

// 18. warrior — 戦士(立位・前後開脚)
D.warrior = twoPanel(
  floor(178)+fig(Object.assign(P.standing(),{ft:[100,178],headR:12}))+badge(1)+cap('①後ろへ一歩引いて立つ'),
  floor(178)+fig({head:[92,52],neck:[92,68],hip:[92,110],sh:[92,68],el:[92,44],ha:[92,26],el2:[92,44],ha2:[92,26],kn:[124,142],ft:[124,178],kn2:[64,150],ft2:[40,178]})+guide([92,20],[92,110])+badge(2)+cap('②前ひざを曲げ腕を上げる'));

// 19. lungeStretch / lunge — ランジ(股関節前のばし)
D.lungeStretch = twoPanel(
  floor(178)+fig({head:[100,64],neck:[100,80],hip:[100,120],sh:[100,80],el:[100,104],ha:[100,124],kn:[132,150],ft:[132,178],kn2:[64,150],ft2:[40,178],headR:12})+badge(1)+cap('①片ひざを立てた片ひざ立ち'),
  floor(178)+guide([64,150],[64,120])+fig({head:[104,66],neck:[104,82],hip:[108,122],sh:[104,82],el:[104,106],ha:[104,126],kn:[136,150],ft:[136,178],kn2:[60,150],ft2:[36,178],headR:12})+arrow([100,124],[120,130])+badge(2)+cap('②体を前へ移し前ももを伸ばす'));
D.lunge = D.lungeStretch;

// 20. calfStretch — ふくらはぎ(壁)
D.calfStretch = twoPanel(
  wall(30)+floor(178)+fig({head:[70,60],neck:[74,74],hip:[80,120],sh:[74,74],el:[52,96],ha:[34,104],kn:[80,150],ft:[80,178],headR:12})+badge(1)+cap('①壁に手をつく'),
  wall(30)+floor(178)+guide([120,150],[150,178])+fig({head:[66,64],neck:[72,78],hip:[86,120],sh:[72,78],el:[50,98],ha:[34,104],kn:[86,150],ft:[86,178],kn2:[122,150],ft2:[150,178]},{leg2Accent:true})+arrow([150,164],[150,180])+badge(2)+cap('②後ろ足を引きかかとを床へ'));

// 21. deadBug — デッドバグ
D.deadBug = twoPanel(
  floor(160)+fig({head:[40,140],neck:[58,140],hip:[120,140],sh:[58,140],el:[58,120],ha:[58,104],kn:[120,108],ft:[136,108]})+badge(1)+cap('①手足を天井へ上げる'),
  floor(160)+fig({head:[40,140],neck:[58,140],hip:[120,140],sh:[58,140],el:[46,124],ha:[30,118],el2:[58,120],ha2:[58,104],kn:[150,120],ft:[168,124],kn2:[120,108],ft2:[136,108]},{armAccent:true,leg2Accent:true})+arrow([30,116],[20,112])+arrow([168,122],[180,124])+badge(2)+cap('②対角の手と脚を伸ばす'));

// 22. swimming — うつ伏せ手足交互
D.swimming = twoPanel(
  floor(154)+fig({head:[150,140],neck:[135,144],hip:[64,150],sh:[135,144],el:[150,136],ha:[168,132],kn:[40,152],ft:[24,150]})+badge(1)+cap('①うつ伏せ・手足をのばす'),
  floor(154)+fig({head:[150,138],neck:[135,142],hip:[64,150],sh:[135,142],el:[152,128],ha:[168,120],kn:[40,140],ft:[24,132]},{armAccent:true,leg2Accent:true})+arrow([168,116],[172,106])+arrow([24,128],[20,118])+badge(2)+cap('②対角の手足を軽く持ち上げ交互に'));

// 23. neckRotation / neckSide / neckTilt — 首
D.neckRotation = twoPanel(
  floor(170)+fig(Object.assign(P.seatedChair(),{head:[96,60],headR:13}))+badge(1)+cap('①背すじを伸ばして座る'),
  floor(170)+fig(Object.assign(P.seatedChair(),{head:[108,60],headR:13}))+arc(96,44,14)+badge(2)+cap('②ゆっくり首を横へ向ける'));
D.neckSide = twoPanel(
  floor(170)+fig(Object.assign(P.seatedChair(),{head:[96,60],headR:13}))+badge(1)+cap('①背すじを伸ばして座る'),
  floor(170)+fig(Object.assign(P.seatedChair(),{head:[84,64],headR:13}))+arrow([84,48],[74,54])+badge(2)+cap('②耳を肩へ近づける'));
D.neckTilt = D.neckSide;

// 24. shoulderBridge alias / hundred
D.hundred = twoPanel(
  floor(160)+fig({head:[40,146],neck:[58,146],hip:[120,146],sh:[58,146],el:[74,138],ha:[92,138],kn:[120,112],ft:[136,112]})+badge(1)+cap('①頭と肩を軽く上げ脚を上げる'),
  floor(160)+fig({head:[46,138],neck:[62,138],hip:[120,146],sh:[62,138],el:[80,132],ha:[98,132],kn:[120,112],ft:[136,112]})+arrow([98,126],[98,116])+arrow([98,144],[98,134])+badge(2)+cap('②腕を小刻みに上下に振る'));

// ============ 第2バッチ ============
// birdDog
D.birdDog = twoPanel(
  floor(150)+fig(P.quadruped())+badge(1)+cap('①四つ這い（背中を水平に）'),
  floor(150)+guide([40,108],[178,108])+fig({head:[150,108],neck:[135,110],hip:[70,110],sh:[135,110],el:[168,86],ha:[184,80],kn:[70,146],ft:[70,150],kn2:[40,132],ft2:[24,126]},{armAccent:true,leg2Accent:true})+arrow([150,74],[186,66])+arrow([46,120],[18,112])+badge(2)+cap('②対角の手と脚を伸ばす'));
// catCowPose — 四つ這い 背中丸める⇄反らす
D.catCowPose = twoPanel(
  floor(150)+`<path d="M70,112 Q102,86 135,112" stroke="${C.body}" stroke-width="16" fill="none" stroke-linecap="round"/>`+fig({head:[146,122],neck:[135,116],hip:[70,116],sh:[135,116],el:[135,148],ha:[135,150],kn:[70,148],ft:[70,150]},{torsoW:0})+arrow([102,80],[102,66])+badge(1)+cap('①背中を丸めて上へ'),
  floor(150)+`<path d="M70,110 Q102,132 135,110" stroke="${C.body}" stroke-width="16" fill="none" stroke-linecap="round"/>`+fig({head:[150,110],neck:[135,112],hip:[70,112],sh:[135,112],el:[135,148],ha:[135,150],kn:[70,148],ft:[70,150]},{torsoW:0})+arrow([102,138],[102,152])+badge(2)+cap('②背中を反らせて下へ'));
// threadNeedle — 四つ這いで腕を通す
D.threadNeedle = twoPanel(
  floor(152)+fig(P.quadruped())+badge(1)+cap('①四つ這い'),
  floor(152)+fig({head:[128,140],neck:[128,128],hip:[70,112],sh:[128,128],el:[100,140],ha:[70,146],el2:[128,100],ha2:[128,84],kn:[70,148],ft:[70,150]},{armAccent:true})+arrow([120,138],[92,146])+badge(2)+cap('②片腕を反対側の下へ通す'));
// superman — うつ伏せ手足上げキープ
D.superman = twoPanel(
  floor(152)+fig(P.prone())+badge(1)+cap('①うつ伏せ・手足をのばす'),
  floor(152)+fig({head:[150,132],neck:[135,136],hip:[64,146],sh:[135,136],el:[150,124],ha:[168,116],kn:[40,140],ft:[24,130]},{armAccent:true,leg2Accent:true})+arrow([168,112],[172,100])+arrow([24,126],[20,114])+badge(2)+cap('②手と脚を軽く持ち上げキープ'));
D.YTW = D.superman; D.locust = D.superman;
// sphinx — 前腕で低く胸を起こす
D.sphinx = twoPanel(
  floor(152)+fig(P.prone())+badge(1)+cap('①うつ伏せ・ひじは肩の下'),
  floor(152)+fig({head:[150,116],neck:[138,124],hip:[64,150],sh:[138,124],el:[150,150],ha:[168,150],kn:[40,152],ft:[24,152]})+arrow([120,120],[134,104])+badge(2)+cap('②前腕で支え胸を起こす'));
// crunch — 頭と肩を丸めて起こす
D.crunch = twoPanel(
  floor(160)+fig(Object.assign(P.supineBent(),{el:[58,138],ha:[58,124]}))+badge(1)+cap('①あお向け・手は頭の後ろ'),
  floor(160)+fig({head:[52,138],neck:[66,140],hip:[120,150],sh:[66,140],el:[62,128],ha:[70,120],kn:[150,120],ft:[150,158]})+arrow([70,128],[80,118])+badge(2)+cap('②頭と肩を丸めて起こす'));
// reverseCrunch — ひざを胸へ
D.reverseCrunch = twoPanel(
  floor(160)+fig({head:[40,150],neck:[58,150],hip:[120,150],sh:[58,150],el:[74,150],ha:[92,150],kn:[150,116],ft:[168,116]})+badge(1)+cap('①ひざを直角に上げる'),
  floor(160)+fig({head:[40,150],neck:[58,150],hip:[118,142],sh:[58,150],el:[74,150],ha:[92,150],kn:[110,110],ft:[92,116]})+arrow([132,124],[112,116])+badge(2)+cap('②ひざを胸のほうへ引き寄せる'));
// toeTap — 仰向けつま先タップ
D.toeTap = twoPanel(
  floor(160)+fig({head:[40,150],neck:[58,150],hip:[120,150],sh:[58,150],el:[74,150],ha:[92,150],kn:[150,116],ft:[168,116]})+badge(1)+cap('①ひざを直角に上げる'),
  floor(160)+guide([120,150],[186,150])+fig({head:[40,150],neck:[58,150],hip:[120,150],sh:[58,150],el:[74,150],ha:[92,150],kn:[150,120],ft:[178,146]})+arrow([182,124],[182,144])+badge(2)+cap('②片方のつま先を床へ下ろす'));
D.abLift = D.legRaise; D.doubleLegStretch = D.legRaise; D.singleLegStretch = D.reverseCrunch;
D.scissors = D.legRaise;
// bicycle / bicycleAb — 自転車こぎ
D.bicycle = twoPanel(
  floor(160)+fig({head:[46,140],neck:[62,140],hip:[120,146],sh:[62,140],el:[58,128],ha:[58,112],kn:[112,112],ft:[128,110],kn2:[150,132],ft2:[172,140]},{leg2Accent:true})+badge(1)+cap('①頭を上げ片ひざを胸へ'),
  floor(160)+fig({head:[46,140],neck:[62,140],hip:[120,146],sh:[62,140],el:[58,128],ha:[58,112],kn:[150,116],ft:[172,112],kn2:[112,132],ft2:[128,138]},{leg2Accent:true})+arrow([150,130],[150,118])+badge(2)+cap('②脚を入れかえ交互にこぐ'));
D.bicycleAb = D.bicycle;
// pelvicTilt — 骨盤の傾け
D.pelvicTilt = twoPanel(
  floor(160)+guide([58,150],[120,150])+fig(P.supineBent())+badge(1)+cap('①あお向け・ひざを立てる'),
  floor(160)+fig(Object.assign(P.supineBent(),{hip:[116,144]}))+arrow([100,138],[110,150])+badge(2)+cap('②腰を床に押しつけ骨盤を丸める'));
// happyBaby — 仰向けで足裏を持つ
D.happyBaby = twoPanel(
  floor(158)+fig({head:[40,148],neck:[58,148],hip:[120,148],sh:[58,148],el:[70,140],ha:[86,140],kn:[130,112],ft:[150,112]})+badge(1)+cap('①ひざを持ち上げる'),
  floor(158)+fig({head:[40,150],neck:[58,150],hip:[118,150],sh:[58,150],el:[92,130],ha:[112,116],kn:[104,116],ft:[124,104]})+arrow([120,128],[126,116])+badge(2)+cap('②足の外側を持ちひざをわきへ'));
// sidePlank — 横向き・ひじで支えお尻を上げる
D.sidePlank = twoPanel(
  floor(158)+fig({head:[172,120],neck:[156,124],hip:[70,150],sh:[156,124],el:[156,158],ha:[172,158],kn:[40,152],ft:[24,152]})+badge(1)+cap('①横向き・下ひじで支える'),
  floor(158)+guide([24,150],[172,126])+fig({head:[172,120],neck:[156,124],hip:[74,134],sh:[156,124],el:[156,158],ha:[172,158],kn:[40,150],ft:[24,152]})+arrow([90,150],[90,132])+badge(2)+cap('②お尻を持ち上げ体を一直線に'));
D.reversePlank = twoPanel(
  floor(158)+fig({head:[40,120],neck:[56,124],hip:[120,150],sh:[56,124],el:[42,140],ha:[30,152],kn:[160,150],ft:[178,150]})+badge(1)+cap('①手を後ろについて座る'),
  floor(158)+guide([30,150],[178,132])+fig({head:[40,116],neck:[56,120],hip:[120,132],sh:[56,120],el:[42,140],ha:[30,152],kn:[160,148],ft:[178,150]})+arrow([110,148],[110,130])+badge(2)+cap('②お尻を上げ体を一直線に'));
// sideLeg — 横向き上の脚上げ / innerThighLift(下の脚)
D.sideLeg = twoPanel(
  floor(156)+fig({head:[36,132],neck:[52,134],hip:[140,140],sh:[52,134],el:[92,138],ha:[110,138],kn:[168,146],ft:[186,150],kn2:[168,146],ft2:[186,150]})+badge(1)+cap('①横向き・脚をそろえる'),
  floor(156)+fig({head:[36,132],neck:[52,134],hip:[140,140],sh:[52,134],el:[92,138],ha:[110,138],kn:[168,148],ft:[186,150],kn2:[168,116],ft2:[186,108]},{leg2Accent:true})+arrow([190,132],[190,110])+badge(2)+cap('②上の脚をまっすぐ上げる'));
D.sideLeg = D.sideLeg;
D.innerThighLift = twoPanel(
  floor(156)+fig({head:[36,132],neck:[52,134],hip:[140,140],sh:[52,134],el:[92,138],ha:[110,138],kn:[150,120],ft:[132,126],kn2:[168,146],ft2:[186,150]})+badge(1)+cap('①上の脚を前に置き支える'),
  floor(156)+fig({head:[36,132],neck:[52,134],hip:[140,140],sh:[52,134],el:[92,138],ha:[110,138],kn:[150,120],ft:[132,126],kn2:[172,132],ft2:[190,126]},{leg2Accent:true})+arrow([190,148],[190,128])+badge(2)+cap('②下の脚を持ち上げる'));
// fireHydrant / donkeyKick — 四つ這い脚
D.fireHydrant = twoPanel(
  floor(150)+fig(P.quadruped())+badge(1)+cap('①四つ這い'),
  floor(150)+fig({head:[150,110],neck:[135,112],hip:[70,112],sh:[135,112],el:[135,148],ha:[135,150],kn:[70,148],ft:[70,150],kn2:[52,120],ft2:[40,108]},{leg2Accent:true})+arrow([48,128],[40,110])+badge(2)+cap('②ひざを曲げたまま横へ開く'));
D.donkeyKick = twoPanel(
  floor(150)+fig(P.quadruped())+badge(1)+cap('①四つ這い'),
  floor(150)+guide([70,112],[40,100])+fig({head:[150,110],neck:[135,112],hip:[70,112],sh:[135,112],el:[135,148],ha:[135,150],kn:[70,148],ft:[70,150],kn2:[44,104],ft2:[30,116]},{leg2Accent:true})+arrow([50,110],[36,100])+badge(2)+cap('②かかとを天井へ蹴り上げる'));
D.glutesPunch = D.donkeyKick;
// figure4 / hipOpener — 仰向け数字の4
D.figure4 = twoPanel(
  floor(158)+fig({head:[40,150],neck:[58,150],hip:[120,150],sh:[58,150],el:[74,150],ha:[92,150],kn:[150,116],ft:[150,150],kn2:[128,120],ft2:[160,120]})+badge(1)+cap('①足首を反対のひざにのせる'),
  floor(158)+fig({head:[40,150],neck:[58,150],hip:[118,148],sh:[58,150],el:[92,130],ha:[112,124],kn:[132,104],ft:[132,138],kn2:[112,110],ft2:[144,112]},{leg2Accent:true})+arrow([132,128],[126,112])+badge(2)+cap('②太ももを胸へ引き寄せる'));
D.hipOpener = D.figure4; D.pigeonRest = D.figure4;
// childPose — 正座から前へ伏せる
D.childPose = twoPanel(
  floor(158)+fig({head:[100,88],neck:[100,102],hip:[100,140],sh:[100,102],el:[92,120],ha:[92,140],kn:[130,140],ft:[150,150]})+badge(1)+cap('①正座になる'),
  floor(158)+`<path d="M60,150 Q90,120 128,132" stroke="${C.body}" stroke-width="16" fill="none" stroke-linecap="round"/>`+fig({head:[52,148],kn:[128,140],ft:[148,150]},{})+arrow([94,116],[70,140])+badge(2)+cap('②お尻をかかとへ・上体を前へ伏せる'));
// seatedTwist / twist / seatedForwardFold
D.seatedTwist = twoPanel(
  floor(158)+fig(Object.assign(P.seatedChair(),{head:[96,60]}))+badge(1)+cap('①背すじを伸ばして座る'),
  floor(158)+fig({head:[108,62],neck:[96,80],hip:[96,132],sh:[96,80],el:[118,96],ha:[126,80],el2:[78,96],ha2:[70,110],kn:[130,132],ft:[130,170]})+arc(96,64,12)+badge(2)+cap('②上体をゆっくり後ろへねじる'));
D.twist = D.seatedTwist;
D.seatedForwardFold = D.forwardFold;
// calfRaise — 立ってかかと上げ
D.calfRaise = twoPanel(
  wall(24)+floor(178)+fig(Object.assign(P.standing(),{ft:[100,178],el:[62,86],ha:[30,104],headR:12}))+badge(1)+cap('①壁に手を添えて立つ'),
  wall(24)+floor(178)+fig(Object.assign(P.standing(),{hip:[100,104],neck:[100,52],head:[100,36],sh:[100,52],kn:[100,136],ft:[100,170],el:[62,80],ha:[30,100],headR:12}))+arrow([120,168],[120,150])+badge(2)+cap('②かかとを高く上げる'));
D.calfRaiseUp = D.calfRaise;
// treePose / singleLegBalance / balance — 片脚バランス
D.treePose = twoPanel(
  floor(178)+fig(Object.assign(P.standing(),{ft:[100,178],headR:12}))+badge(1)+cap('①まっすぐ立つ'),
  floor(178)+fig({head:[100,42],neck:[100,58],hip:[100,110],sh:[100,58],el:[82,80],ha:[92,66],el2:[118,80],ha2:[108,66],kn:[100,142],ft:[100,178],kn2:[128,120],ft2:[104,138]},{leg2Accent:true})+badge(2)+cap('②片足を反対のふくらはぎへ'));
D.singleLegBalance = D.treePose;
// stand / standing / tadasana — 立ち姿勢
D.stand = twoPanel(
  wall(150)+floor(178)+fig(Object.assign(P.standing(),{ft:[100,178],headR:12}))+badge(1)+cap('①足を腰幅で立つ'),
  wall(150)+floor(178)+guide([100,42],[100,178])+fig(Object.assign(P.standing(),{ft:[100,178],headR:12}))+badge(2)+cap('②頭を上へ・背すじを伸ばす'));
D.standing = D.stand;
// rollDown — 立って背中を丸めて下ろす
D.rollDown = twoPanel(
  floor(178)+fig(Object.assign(P.standing(),{ft:[100,178],headR:12}))+badge(1)+cap('①まっすぐ立つ'),
  floor(178)+`<path d="M100,120 Q96,90 108,74" stroke="${C.body}" stroke-width="16" fill="none" stroke-linecap="round"/>`+fig({head:[112,66],hip:[100,120],kn:[100,150],ft:[100,178]},{})+`<path d="M108,74 L108,110" stroke="${C.line}" stroke-width="7" stroke-linecap="round"/>`+arrow([120,80],[124,108])+badge(2)+cap('②頭から順に背中を丸めて下ろす'));
D.spineFlex = D.rollDown;
// marchHighKnee / sideStep / stepUp — 立位の動き
D.marchHighKnee = twoPanel(
  floor(178)+fig(Object.assign(P.standing(),{ft:[100,178],headR:12}))+badge(1)+cap('①まっすぐ立つ'),
  floor(178)+fig({head:[100,42],neck:[100,58],hip:[100,112],sh:[100,58],el:[84,84],ha:[80,104],el2:[116,84],ha2:[120,104],kn:[100,144],ft:[100,178],kn2:[128,112],ft2:[120,132]},{leg2Accent:true})+arrow([128,128],[128,112])+badge(2)+cap('②ひざを腰の高さまで上げ交互に'));
D.sideStep = twoPanel(
  floor(178)+fig({head:[100,50],neck:[100,66],hip:[100,110],sh:[100,66],el:[86,88],ha:[74,104],el2:[114,88],ha2:[126,104],kn:[100,142],ft:[100,178],headR:12})+badge(1)+cap('①中腰で構える'),
  floor(178)+fig({head:[110,52],neck:[110,68],hip:[112,110],sh:[110,68],el:[96,88],ha:[84,104],el2:[124,88],ha2:[136,104],kn:[132,142],ft:[150,178],kn2:[92,142],ft2:[70,178]},{})+arrow([120,150],[146,166])+badge(2)+cap('②中腰のまま横へ一歩'));
D.stepUp = D.marchHighKnee;
// quadStretch — 立って前ももを伸ばす
D.quadStretch = twoPanel(
  wall(24)+floor(178)+fig(Object.assign(P.standing(),{ft:[100,178],el:[60,84],ha:[30,100],headR:12}))+badge(1)+cap('①壁に手を添えて立つ'),
  wall(24)+floor(178)+fig({head:[100,44],neck:[100,60],hip:[100,112],sh:[100,60],el:[122,88],ha:[140,110],kn:[100,144],ft:[100,178],kn2:[112,138],ft2:[128,104]},{leg2Accent:true})+arrow([128,112],[132,98])+badge(2)+cap('②足首を持ちかかとをお尻へ'));
// triangle — 三角のポーズ
D.triangle = twoPanel(
  floor(178)+fig({head:[100,50],neck:[100,66],hip:[100,110],sh:[100,66],el:[74,80],ha:[54,88],el2:[126,80],ha2:[146,88],kn:[64,144],ft:[44,178],kn2:[136,144],ft2:[156,178]})+badge(1)+cap('①足を大きく開き腕を横に'),
  floor(178)+fig({head:[62,96],neck:[74,90],hip:[118,110],sh:[74,90],el:[64,112],ha:[54,132],el2:[80,66],ha2:[86,44],kn:[54,144],ft:[40,178],kn2:[140,144],ft2:[160,178]})+arrow([56,120],[52,138])+badge(2)+cap('②上体を横へ倒し下の手を下ろす'));
// sumoSquat / chairPose / wallSquat / wallSit
D.sumoSquat = twoPanel(
  floor(178)+fig({head:[100,50],neck:[100,66],hip:[100,108],sh:[100,66],el:[86,88],ha:[74,104],el2:[114,88],ha2:[126,104],kn:[70,140],ft:[52,178],kn2:[130,140],ft2:[148,178],headR:12})+badge(1)+cap('①足を大きく開き つま先は外'),
  floor(178)+fig({head:[100,58],neck:[100,74],hip:[100,120],sh:[100,74],el:[88,96],ha:[100,116],el2:[112,96],ha2:[100,116],kn:[66,140],ft:[52,178],kn2:[134,140],ft2:[148,178],headR:12})+arrow([100,124],[100,140])+badge(2)+cap('②お尻を真下へ落とす'));
D.chairPose = D.squat; D.wallSquat = D.squatHold; D.wallSit = D.squatHold;
// downDog — ダウンドッグ
D.downDog = twoPanel(
  floor(178)+fig(P.quadruped())+badge(1)+cap('①四つ這い'),
  floor(178)+`<path d="M40,178 L104,60 L168,178" stroke="none" fill="none"/>`+fig({head:[96,74],neck:[104,66],hip:[104,60],sh:[104,66],el:[70,120],ha:[40,176],kn:[136,120],ft:[168,176]},{})+arrow([104,48],[104,36])+badge(2)+cap('②お尻を高く上げ三角形に'));
D.upDog = D.cobra;
// camel — ひざ立ち後屈
D.camel = twoPanel(
  floor(170)+fig({head:[100,54],neck:[100,70],hip:[100,120],sh:[100,70],el:[100,96],ha:[100,120],kn:[100,150],ft:[124,150],headR:12})+badge(1)+cap('①ひざ立ちになる'),
  floor(170)+fig({head:[116,64],neck:[108,76],hip:[96,120],sh:[108,76],el:[112,100],ha:[122,120],kn:[96,150],ft:[120,150],headR:12})+arrow([120,72],[130,84])+badge(2)+cap('②胸を開き上体を後ろへ'));
D.fish = D.camel; D.standBackbend = D.camel; D.wheel = D.camel; D.halfMoon = D.triangle;
// chestOpener / wallAngel / wallPushup / incline
D.chestOpener = D.shoulderOpen;
D.wallAngel = twoPanel(
  wall(150)+floor(178)+fig({head:[126,60],neck:[126,76],hip:[126,120],sh:[126,76],el:[108,64],ha:[108,44],el2:[144,64],ha2:[144,44],kn:[126,150],ft:[126,178],headR:12})+badge(1)+cap('①壁に背中をつけWの形'),
  wall(150)+floor(178)+fig({head:[126,60],neck:[126,76],hip:[126,120],sh:[126,76],el:[112,48],ha:[112,28],el2:[140,48],ha2:[140,28],kn:[126,150],ft:[126,178],headR:12})+arrow([112,44],[112,30])+badge(2)+cap('②壁に沿って腕を上げ下げ'));
D.wallPushup = twoPanel(
  wall(30)+floor(178)+fig({head:[74,72],neck:[80,84],hip:[100,130],sh:[80,84],el:[56,86],ha:[34,88],kn:[120,150],ft:[140,178],headR:12})+badge(1)+cap('①壁に手をつき体を斜めに'),
  wall(30)+floor(178)+fig({head:[64,74],neck:[74,86],hip:[100,132],sh:[74,86],el:[50,84],ha:[34,88],kn:[120,150],ft:[140,178],headR:12})+arrow([88,80],[74,84])+badge(2)+cap('②ひじを曲げ胸を壁へ近づける'));
D.tableTop = twoPanel(
  floor(158)+fig({head:[40,120],neck:[56,124],hip:[120,150],sh:[56,124],el:[42,140],ha:[30,152],kn:[160,150],ft:[178,150]})+badge(1)+cap('①手とお尻を床につく'),
  floor(158)+guide([30,150],[160,124])+fig({head:[40,116],neck:[56,120],hip:[120,124],sh:[56,120],el:[42,140],ha:[30,152],kn:[160,124],ft:[160,150]})+arrow([120,146],[120,126])+badge(2)+cap('②お尻を上げテーブルの形に'));
// 顔・手足まわり（座位・部位ケア）
D.jawRelease = twoPanel(
  floor(170)+fig(Object.assign(P.seatedChair(),{head:[96,60],el:[90,78],ha:[92,64]}))+`<circle cx="90" cy="66" r="3" fill="${C.accent}"/>`+badge(1)+cap('①あご関節に指を当てる'),
  floor(170)+fig(Object.assign(P.seatedChair(),{head:[96,60],el:[90,78],ha:[92,64]}))+arc(90,60,7)+badge(2)+cap('②小さな円でやさしくほぐす'));
D.faceMassage = D.jawRelease; D.scalpMassage = D.jawRelease; D.eyeCare = D.jawRelease; D.neckLymph = D.jawRelease;
D.handOpen = twoPanel(
  floor(170)+fig(Object.assign(P.seatedChair(),{el:[112,110],ha:[132,112]}))+`<circle cx="136" cy="112" r="6" fill="none" stroke="${C.accent}" stroke-width="2.5"/>`+badge(1)+cap('①手を前に出しグーをつくる'),
  floor(170)+fig(Object.assign(P.seatedChair(),{el:[112,110],ha:[132,112]}))+`<g stroke="${C.accent}" stroke-width="2.5" stroke-linecap="round"><path d="M136,112 l10,-6 M136,112 l12,-1 M136,112 l11,5 M136,112 l6,9"/></g>`+badge(2)+cap('②指を大きく開く（グーパー）'));
D.wristStretch = twoPanel(
  floor(170)+fig(Object.assign(P.seatedChair(),{el:[110,108],ha:[136,108]}))+badge(1)+cap('①腕を前に伸ばす'),
  floor(170)+fig(Object.assign(P.seatedChair(),{el:[110,108],ha:[136,108]}))+arrow([146,102],[146,116])+`<path d="M136,108 l10,6" stroke="${C.accent}" stroke-width="4" stroke-linecap="round"/>`+badge(2)+cap('②反対の手で指先を手前へ反らす'));
D.footToes = twoPanel(
  floor(168)+fig(Object.assign(P.seatedChair(),{ft:[136,168]}))+badge(1)+cap('①椅子に座り足を床に'),
  floor(168)+fig(Object.assign(P.seatedChair(),{ft:[136,168]}))+`<g stroke="${C.accent}" stroke-width="2.5" stroke-linecap="round"><path d="M146,168 l6,-6 M150,168 l7,-3 M152,168 l8,1"/></g>`+arrow([150,158],[150,150])+badge(2)+cap('②足の指を大きく開く・そらす'));
D.ankleRotation = twoPanel(
  floor(168)+fig({head:[86,74],neck:[88,90],hip:[96,132],sh:[88,90],el:[92,110],ha:[110,128],kn:[120,132],ft:[150,132],kn2:[128,150],ft2:[150,168]})+badge(1)+cap('①足首を反対のももにのせる'),
  floor(168)+fig({head:[86,74],neck:[88,90],hip:[96,132],sh:[88,90],el:[92,110],ha:[110,128],kn:[120,132],ft:[150,132],kn2:[128,150],ft2:[150,168]})+arc(150,128,9)+badge(2)+cap('②足首を大きく回す'));
// stretches
D.quadStretch = D.quadStretch;
D.adductorStretch = D.butterflyHip; D.itbStretch = D.sideStretch;
D.hipShift = D.stand; D.ninetyNinety = D.seatedTwist; D.mermaid = D.sideStretch;
D.ribBreath = D.breathing; D.humming = D.meditation; D.alternateNostril = D.meditation; D.lionBreath = D.meditation;
D.supineTwist = D.spineTwist; D.handMassage = D.handOpen;

// ============ 第3バッチ（残り・リリース系＋高難度種のエイリアス）============
const roller = (cx,cy) => `<ellipse cx="${cx}" cy="${cy}" rx="12" ry="8" fill="${C.prop}" stroke="${C.line}" stroke-width="2"/>`;
// foamRoll / ballRelease — あお向けで筒(ボール)を当てて転がす/ほぐす
D.foamRoll = twoPanel(
  floor(162)+roller(120,150)+fig({head:[44,138],neck:[60,138],hip:[120,140],sh:[60,138],el:[74,146],ha:[92,150],kn:[152,120],ft:[152,158]})+badge(1)+cap('①ほぐす所の下に筒を当てる'),
  floor(162)+`<path d="M96,168 H150" stroke="${C.guide}" stroke-width="2.5" stroke-dasharray="4 4"/>`+roller(104,150)+fig({head:[40,138],neck:[56,138],hip:[112,140],sh:[56,138],el:[70,146],ha:[88,150],kn:[150,120],ft:[150,158]})+arrow([132,168],[100,168])+arrow([100,176],[132,176])+badge(2)+cap('②体重を乗せ前後にゆっくり転がす'));
D.ballRelease = twoPanel(
  floor(162)+`<circle cx="118" cy="150" r="9" fill="${C.prop}" stroke="${C.line}" stroke-width="2"/>`+fig({head:[44,138],neck:[60,138],hip:[120,140],sh:[60,138],el:[74,146],ha:[92,150],kn:[152,120],ft:[152,158]})+badge(1)+cap('①こりの下にボールを当てる'),
  floor(162)+`<circle cx="118" cy="150" r="9" fill="${C.prop}" stroke="${C.line}" stroke-width="2"/>`+fig({head:[44,138],neck:[60,138],hip:[120,140],sh:[60,138],el:[74,146],ha:[92,150],kn:[152,120],ft:[152,158]})+arc(118,138,10)+badge(2)+cap('②体重を乗せ小さく円を描く'));
// tricepsDip — 椅子で二の腕
D.tricepsDip = twoPanel(
  floor(178)+chair(150,150)+fig({head:[80,86],neck:[86,100],hip:[112,130],sh:[86,100],el:[92,116],ha:[110,132],kn:[140,150],ft:[168,178]})+badge(1)+cap('①椅子のふちに手をつき腰を前へ'),
  floor(178)+chair(150,150)+fig({head:[76,92],neck:[84,106],hip:[110,142],sh:[84,106],el:[100,120],ha:[112,132],kn:[140,150],ft:[168,178]})+arrow([104,150],[104,164])+badge(2)+cap('②ひじを曲げお尻を下ろす'));
// 高難度/除外種は近い既存図へ割り当て（カタログ表示用・処方はされない）
D.deadBugBase = D.deadBug;
D.warrior1 = D.warrior; D.reverseWarrior = D.warrior; D.warrior3 = D.treePose;
D.boatPose = D.vsit;
D.singleLegSquat = D.squat; D.jumpSquat = D.squat; D.sumoSquat = D.sumoSquat;
D.cossackSquat = D.sumoSquat; D.sideLunge = D.lungeStretch; D.curtseyLunge = D.lungeStretch;
D.spineExt = D.sphinx; D.pikePushup = D.downDog;
D.bearCrawl = D.plank; D.crabWalk = D.tableTop; D.burpee = D.squat;
D.singleLegDeadlift = D.treePose; D.reverseNordic = D.camel;
D.jumpingJack = twoPanel(
  floor(178)+fig({head:[100,48],neck:[100,64],hip:[100,110],sh:[100,64],el:[100,88],ha:[100,110],kn:[100,142],ft:[100,178],headR:12})+badge(1)+cap('①足を閉じて立つ'),
  floor(178)+fig({head:[100,44],neck:[100,60],hip:[100,106],sh:[100,60],el:[84,42],ha:[70,26],el2:[116,42],ha2:[130,26],kn:[74,140],ft:[52,178],kn2:[126,140],ft2:[148,178],headR:12})+arrow([70,34],[60,24])+badge(2)+cap('②手足を横へ大きく開く'));
D.pullup = twoPanel(
  floor(178)+`<line x1="40" y1="24" x2="160" y2="24" stroke="${C.prop}" stroke-width="5" stroke-linecap="round"/>`+fig({head:[100,64],neck:[100,80],hip:[100,130],sh:[100,80],el:[92,52],ha:[92,26],el2:[108,52],ha2:[108,26],kn:[100,160],ft:[100,182],headR:12})+badge(1)+cap('①バーにぶら下がる'),
  floor(178)+`<line x1="40" y1="24" x2="160" y2="24" stroke="${C.prop}" stroke-width="5" stroke-linecap="round"/>`+fig({head:[100,50],neck:[100,64],hip:[100,116],sh:[100,64],el:[90,44],ha:[92,26],el2:[110,44],ha2:[108,26],kn:[100,146],ft:[100,168],headR:12})+arrow([120,90],[120,74])+badge(2)+cap('②体を引き上げる'));
D.bow = twoPanel(
  floor(154)+fig(P.prone())+badge(1)+cap('①うつ伏せになる'),
  floor(154)+`<path d="M150,110 Q100,150 46,110" stroke="none" fill="none"/>`+fig({head:[150,108],neck:[138,116],hip:[70,140],sh:[138,116],el:[120,124],ha:[96,120],kn:[46,110],ft:[70,120]},{armAccent:true,leg2Accent:true})+arrow([90,116],[80,104])+badge(2)+cap('②足首を持ち胸と脚を引き上げる'));

export { D as DIAGRAMS };
