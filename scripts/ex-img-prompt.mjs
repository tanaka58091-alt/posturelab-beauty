// ===================================================================
// 種目 → 画像生成プロンプト（固定ブロック＋可変ブロック）
//   固定ブロック: 画風・人物・服・背景・配色・禁止事項。全カット完全に同じ文言。
//   可変ブロック: その1枚の内容（種目名・手順・部位・構図）だけ。
// 使い方: node scripts/ex-img-prompt.mjs <exerciseId> [--noref]
// ===================================================================
import { fileURLToPath } from 'node:url';
import { ALL_EXERCISES_LIST } from '../prescription-matrix.js';

const BODY_JA = {
  core:'お腹・体幹', leg:'脚', legs:'脚', hip:'お尻・股関節', glutes:'お尻', back:'背中', spine:'背骨',
  chest:'胸', neck:'首', shoulder:'肩', arm:'腕', arms:'腕', hand:'手', foot:'足', ankle:'足首',
  hamstring:'太ももの裏', fullbody:'全身', fullBody:'全身', whole:'全身', breath:'呼吸（お腹・胸）', face:'顔',
};
const POS_JA = {
  supine:'あお向け', prone:'うつ伏せ', standing:'立位', seated:'座位', sitting:'座位', chair:'椅子に座る',
  quadruped:'四つ這い', kneeling:'ひざ立ち', sidelying:'横向きに寝る', 'side-lying':'横向きに寝る', side:'横向きに寝る',
  plank:'腕で支える', lunge:'片脚を前に出す', wall:'壁を使う', floor:'床',
};
const EQUIP_JA = (eq) => {
  const e = String(eq||'');
  if (!e || /なし/.test(e)) return '';
  if (/マット/.test(e)) return '濃いグレーのヨガマットの上で行う。';
  if (/椅子|イス/.test(e)) return 'シンプルな木製の椅子を使う。';
  if (/壁/.test(e)) return '無地の壁を使う。';
  if (/タオル/.test(e)) return '白いタオルを使う。';
  return `道具: ${e}。`;
};

export function composition(ex){
  const d = String(ex.duration||''), t = String(ex.technique||''), n = `${ex.displayName||''}${ex.name||''}`;
  if (/回し|回旋|ぐるぐる|サークル|周|時計/.test(n) || /周/.test(d)) return 'circle';
  if (/回|歩|往復|セット/.test(d) && !/秒|分/.test(d)) return 'two';
  if (/stretch|release|breath|pranayama|meditation|restorative|isometric|massage/.test(t) || /秒|分/.test(d)) return 'one';
  return 'two';
}

export function fixedBlock(withRef){
  const head = withRef
    ? '添付の参考画像と完全に同じ画風・同じ女性・同じ服・同じ背景で、別のエクササイズの解説イラストを1枚生成してください。'
    : '次のスタイルで、エクササイズの解説イラストを1枚生成してください。';
  return `${head}

【厳守するスタイル（全カット共通）】
- 背景: クリーム色の無地（#faf6ee系）。横長ワイド（横:縦 = 約2:1）。影は最小限。
- 人物: 若い日本人女性1名。髪は低いお団子。白のフィットしたスポーツトップ ＋ くすみピンクのレギンス ＋ 白スニーカー。清潔感のある半写実イラスト、やわらかい質感。
- 効いている筋肉の部位だけを、半透明のピンク／ローズで淡くハイライトする。
- 動きの矢印: 開始→終了のあいだに赤い点線の方向矢印。動作の方向に沿った赤いカーブ矢印。
- 文字・数字・ラベル・ロゴ・透かしは画像内に一切入れない（日本語も英語も禁止）。純粋にイラストのみ。
- 真横または斜め前からの分かりやすいアングルで、全身が切れずに入る。`;
}

export function variableBlock(ex){
  const comp = composition(ex);
  const how = (ex.how||[]).slice(0, 3).map((s,i)=>`手順${i+1}: ${String(s).replace(/\s+/g,' ').slice(0, 110)}`).join('／');
  const body = BODY_JA[ex.bodyPart] || ex.bodyPart || '';
  const pos = POS_JA[String(ex.position||'').toLowerCase()] || '';
  const compText = comp === 'two'
    ? '2パネル構成。左パネル＝開始姿勢（手順1）、右パネル＝動いた後の姿勢（手順2〜3）。2枚のあいだに左→右の赤い点線矢印を置く。人物・服・背景は左右で完全に同一。'
    : comp === 'circle'
    ? '1パネルで完成ポーズを大きく1つ。動かす部位のまわりに円形（回転）の赤い矢印を添える。'
    : '1パネルで完成ポーズを大きく1つ。効いている部位を淡いピンクで示し、伸びる／力が入る方向に赤い矢印を1本添える。';
  return `【この種目の内容】
${ex.displayName || ex.name}。${pos ? `姿勢: ${pos}。` : ''}${EQUIP_JA(ex.equipment)}
${how}
主に効かせる部位: ${body}（ここを淡いピンクでハイライト）。

【構図】
${compText}

生成後、この作業ディレクトリに ${ex.id}.png という名前で確実に保存すること。余計なファイルは作らない。`;
}

export function buildPrompt(id, { withRef = true } = {}){
  const ex = ALL_EXERCISES_LIST.find(e => e.id === id);
  if (!ex) throw new Error('unknown exercise id: ' + id);
  return `${fixedBlock(withRef)}\n\n${variableBlock(ex)}`;
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]){
  const id = process.argv[2];
  const noref = process.argv.includes('--noref');
  console.log(buildPrompt(id, { withRef: !noref }));
}
