// ===================================================================
// パーソナルトレーニング (PERSONAL) — 自重のみ
// ===================================================================

import { SVG2 } from './svg-library.js';

const DB_PERSONAL = [
  // ============== LOWER BODY (24種) ==============
  {
    id:'pt_squat_basic', name:'ベーシックスクワット', courses:['personal'],
    targetProblems:['anteriorPelvicTilt','posteriorPelvicTilt','kneeValgus'],
    category:'training', technique:'strength', bodyPart:'leg', intensity:2,
    equipment:'なし', position:'standing', duration:'15回 × 3セット',
    illustration: SVG2.squat,
    purpose:'下半身の王道。臀筋・大腿四頭筋・体幹を総合的に。',
    how:['足を肩幅。つま先は軽く外。','お尻を後ろに引きながら膝を曲げる。','太ももが床と平行まで。15回。'],
    cues:{do:'膝とつま先は同方向。',dont:'膝が内に入らない。'},
    why:'人類最古の機能的動作。代謝アップに最強。'
  },
  {
    id:'pt_sumo_squat', name:'スモウスクワット', courses:['personal'],
    targetProblems:['kneeValgus','lateralAsymmetry'],
    category:'training', technique:'strength', bodyPart:'leg', intensity:2,
    equipment:'なし', position:'standing', duration:'12回 × 3セット',
    illustration: SVG2.squat,
    purpose:'内転筋・大臀筋下部を強化。',
    how:['足を肩幅の1.5倍に。つま先45度外。','お尻を真下に下ろす。','12回。'],
    cues:{do:'膝はつま先方向。',dont:'背中を丸めない。'},
    why:'内ももの引き締め・美脚効果。'
  },
  {
    id:'pt_box_squat', name:'ボックススクワット', courses:['personal'],
    targetProblems:['anteriorPelvicTilt','kneeValgus'],
    category:'training', technique:'strength', bodyPart:'leg', intensity:2,
    equipment:'椅子', position:'standing', duration:'12回 × 3セット',
    illustration: SVG2.squat,
    purpose:'椅子にタッチで深さを安定させる入門種目。',
    how:['椅子の前に立つ。お尻を後ろに引いて椅子にタッチ。','立ち上がる。','12回。'],
    cues:{do:'お尻が触れたらすぐ立つ。',dont:'座り込まない。'},
    why:'スクワット初心者の最初の処方。'
  },
  {
    id:'pt_pause_squat', name:'ポーズスクワット', courses:['personal'],
    targetProblems:['anteriorPelvicTilt'],
    category:'training', technique:'strength', bodyPart:'leg', intensity:3,
    equipment:'なし', position:'standing', duration:'10回 × 3セット',
    illustration: SVG2.squat,
    purpose:'ボトムで3秒静止し筋力UP。',
    how:['通常のスクワットで一番下まで。','3秒静止して立ち上がる。','10回。'],
    cues:{do:'ボトムで力を抜かない。',dont:'反動を使わない。'},
    why:'瞬発力でなく純粋筋力を鍛える。'
  },
  {
    id:'pt_jump_squat', name:'ジャンプスクワット', courses:['personal'],
    targetProblems:['posteriorPelvicTilt'],
    category:'training', technique:'plyometric', bodyPart:'leg', intensity:3,
    equipment:'なし', position:'standing', duration:'10回 × 3セット',
    illustration: SVG2.squat,
    purpose:'瞬発力と心肺機能を同時に。',
    how:['スクワットから爆発的にジャンプ。','膝を柔らかく着地。','10回。'],
    cues:{do:'着地は静かに。',dont:'膝が内に入らない。'},
    why:'代謝アップ・脂肪燃焼の即効種目。'
  },
  {
    id:'pt_split_squat', name:'スプリットスクワット', courses:['personal'],
    targetProblems:['lateralAsymmetry','kneeValgus'],
    category:'training', technique:'strength', bodyPart:'leg', intensity:3,
    equipment:'なし', position:'standing', duration:'各12回 × 3セット',
    illustration: SVG2.lungeStretch,
    purpose:'片脚で安定性と筋力を。',
    how:['足を前後に大きく開く。','後ろ膝が床に近づくまで下げる。','12回。反対も。'],
    cues:{do:'体は垂直に。',dont:'前膝がつま先を超えない。'},
    why:'左右差を整える基本種目。'
  },
  {
    id:'pt_reverse_lunge', name:'リバースランジ', courses:['personal'],
    targetProblems:['lateralAsymmetry','anteriorPelvicTilt'],
    category:'training', technique:'strength', bodyPart:'leg', intensity:2,
    equipment:'なし', position:'standing', duration:'各12回 × 3セット',
    illustration: SVG2.lungeStretch,
    purpose:'膝に優しい片脚種目。',
    how:['直立から片足を大きく後ろへ。','後ろ膝が床に近づくまで。','戻る。各12回。'],
    cues:{do:'前膝はつま先方向。',dont:'前傾しない。'},
    why:'スクワットより腰負担が少ない。'
  },
  {
    id:'pt_walking_lunge', name:'ウォーキングランジ', courses:['personal'],
    targetProblems:['kneeValgus'],
    category:'training', technique:'strength', bodyPart:'leg', intensity:3,
    equipment:'なし', position:'standing', duration:'各10歩 × 3セット',
    illustration: SVG2.lungeStretch,
    purpose:'動きながら下半身全体を強化。',
    how:['前に1歩大きく踏み出しランジ。','立ち上がって反対脚で次のランジ。','各10歩。'],
    cues:{do:'体幹を立てる。',dont:'リズムを乱さない。'},
    why:'実生活動作に最も近いトレーニング。'
  },
  {
    id:'pt_lateral_lunge', name:'サイドランジ', courses:['personal'],
    targetProblems:['kneeValgus','lateralAsymmetry'],
    category:'training', technique:'strength', bodyPart:'leg', intensity:2,
    equipment:'なし', position:'standing', duration:'各12回 × 3セット',
    illustration: SVG2.lungeStretch,
    purpose:'内転筋と臀筋の横方向強化。',
    how:['足を肩幅2倍に。片側に体重を移し膝を曲げる。','反対脚は伸ばしたまま。','各12回。'],
    cues:{do:'お尻を後ろに引く。',dont:'反対膝を曲げない。'},
    why:'横の動きに強い体を作る。'
  },
  {
    id:'pt_curtsy_lunge', name:'カーツィランジ', courses:['personal'],
    targetProblems:['kneeValgus','lateralAsymmetry'],
    category:'training', technique:'strength', bodyPart:'leg', intensity:2,
    equipment:'なし', position:'standing', duration:'各12回 × 3セット',
    illustration: SVG2.lungeStretch,
    purpose:'臀筋中部を狙う斜めランジ。',
    how:['直立から片足を斜め後ろにクロス。','膝を曲げる(お辞儀のように)。','戻る。各12回。'],
    cues:{do:'前膝はつま先方向。',dont:'背中を丸めない。'},
    why:'お尻の側面を引き締める。'
  },
  {
    id:'pt_glute_bridge', name:'グルートブリッジ', courses:['personal','seitai','pilates'],
    targetProblems:['anteriorPelvicTilt','posteriorPelvicTilt','swayBack'],
    category:'training', technique:'strength', bodyPart:'hip', intensity:2,
    equipment:'マット', position:'supine', duration:'15回 × 3セット',
    illustration: SVG2.bridgeBase,
    purpose:'眠った大臀筋を再活性化。',
    how:['仰向けで膝を立てる。','お尻を持ち上げ膝〜肩を一直線に。','15回。'],
    cues:{do:'お尻でしっかり押し上げる。',dont:'腰で反らない。'},
    why:'臀筋健忘症の最初の処方。'
  },
  {
    id:'pt_single_glute_bridge', name:'シングルレッグブリッジ', courses:['personal','pilates'],
    targetProblems:['lateralAsymmetry','anteriorPelvicTilt'],
    category:'training', technique:'strength', bodyPart:'hip', intensity:3,
    equipment:'マット', position:'supine', duration:'各10回 × 3セット',
    illustration: SVG2.bridgeBase,
    purpose:'片側ずつ大臀筋を強化。',
    how:['ブリッジの姿勢から片脚を伸ばす。','片脚でお尻を上下。','各10回。'],
    cues:{do:'骨盤が傾かない。',dont:'反り腰にならない。'},
    why:'左右差の解消に最強。'
  },
  {
    id:'pt_hip_thrust', name:'ヒップスラスト(自重)', courses:['personal'],
    targetProblems:['anteriorPelvicTilt'],
    category:'training', technique:'strength', bodyPart:'hip', intensity:2,
    equipment:'ソファ/椅子', position:'sitting', duration:'15回 × 3セット',
    illustration: SVG2.bridgeBase,
    purpose:'大臀筋に最も効く種目。',
    how:['ソファの縁に肩甲骨を乗せる。','膝を90度。お尻を持ち上げ床と平行。','15回。'],
    cues:{do:'頂点で1秒キープ。',dont:'反り腰にならない。'},
    why:'ヒップアップの王道。'
  },
  {
    id:'pt_donkey_kick', name:'ドンキーキック', courses:['personal','seitai'],
    targetProblems:['anteriorPelvicTilt','swayBack'],
    category:'training', technique:'strength', bodyPart:'hip', intensity:2,
    equipment:'マット', position:'quadruped', duration:'各15回 × 3セット',
    illustration: SVG2.glutesPunch,
    purpose:'大臀筋上部繊維をピンポイント強化。',
    how:['四つん這い。片足を膝90度のまま天井へ蹴り上げる。','お尻で持ち上げる感覚。','各15回。'],
    cues:{do:'背中はフラット。',dont:'腰を反らない。'},
    why:'お尻の上部を集中強化。'
  },
  {
    id:'pt_fire_hydrant', name:'ファイアハイドラント', courses:['personal'],
    targetProblems:['kneeValgus','lateralAsymmetry'],
    category:'training', technique:'strength', bodyPart:'hip', intensity:2,
    equipment:'マット', position:'quadruped', duration:'各15回 × 3セット',
    illustration: SVG2.glutesPunch,
    purpose:'中臀筋を集中強化。',
    how:['四つん這い。片膝を90度のまま横に開く。','腰の高さまで。','各15回。'],
    cues:{do:'骨盤は水平。',dont:'体を傾けない。'},
    why:'ヒップ横の引き締め＆Knee-in予防。'
  },
  {
    id:'pt_clamshell', name:'クラムシェル', courses:['personal','seitai','pilates'],
    targetProblems:['kneeValgus','lateralAsymmetry'],
    category:'training', technique:'strength', bodyPart:'hip', intensity:2,
    equipment:'マット', position:'side-lying', duration:'各15回 × 3セット',
    illustration: SVG2.bridgeBase,
    purpose:'中臀筋・深層外旋六筋を活性化。',
    how:['横向きで膝を90度に重ねる。','足は付けたまま上の膝を開く。','各15回。'],
    cues:{do:'骨盤を後ろに倒さない。',dont:'勢いで開かない。'},
    why:'Knee-in予防の基本中の基本。'
  },
  {
    id:'pt_single_dl', name:'シングルレッグデッドリフト', courses:['personal','pilates'],
    targetProblems:['lateralAsymmetry','anteriorPelvicTilt'],
    category:'training', technique:'strength', bodyPart:'leg', intensity:3,
    equipment:'なし', position:'standing', duration:'各10回 × 3セット',
    illustration: SVG2.forwardFold,
    purpose:'片脚バランス＋ハム＋臀筋。',
    how:['片脚立ち。反対脚を後ろに伸ばしながら上体を前傾。','床と平行まで。','各10回。'],
    cues:{do:'骨盤を水平に保つ。',dont:'背中を丸めない。'},
    why:'バランス・筋力・柔軟性のオールインワン。'
  },
  {
    id:'pt_single_squat', name:'シングルレッグスクワット', courses:['personal'],
    targetProblems:['lateralAsymmetry','kneeValgus'],
    category:'training', technique:'strength', bodyPart:'leg', intensity:3,
    equipment:'椅子', position:'standing', duration:'各8回 × 3セット',
    illustration: SVG2.squat,
    purpose:'片脚スクワットで左右差解消。',
    how:['椅子の前で片足立ち。','椅子にお尻をタッチして立ち上がる。','各8回。'],
    cues:{do:'膝はつま先方向。',dont:'反対脚が床につかないように。'},
    why:'左右差を一発で解消。'
  },
  {
    id:'pt_step_up', name:'ステップアップ', courses:['personal'],
    targetProblems:['lateralAsymmetry','kneeValgus'],
    category:'training', technique:'strength', bodyPart:'leg', intensity:2,
    equipment:'階段/台', position:'standing', duration:'各12回 × 3セット',
    illustration: SVG2.squat,
    purpose:'階段や台を使った片脚種目。',
    how:['台の前に立つ。片足を乗せ反対脚で押し上がる。','下ろす。各12回。'],
    cues:{do:'お尻と前脚で押す。',dont:'反動を使わない。'},
    why:'実生活直結のトレーニング。'
  },
  {
    id:'pt_wall_sit', name:'ウォールシット', courses:['personal'],
    targetProblems:['kneeValgus','anteriorPelvicTilt'],
    category:'training', technique:'strength', bodyPart:'leg', intensity:2,
    equipment:'壁', position:'standing', duration:'45秒 × 3セット',
    illustration: SVG2.squat,
    purpose:'壁を使った下半身耐久力。',
    how:['壁に背中をつけて膝90度に。','背中は壁にぴったり。','45秒キープ。'],
    cues:{do:'呼吸を続ける。',dont:'膝が内に入らない。'},
    why:'スクワットの体感持久版。'
  },
  {
    id:'pt_calf_raise', name:'カーフレイズ', courses:['personal'],
    targetProblems:['ankleStiffness','swelling'],
    category:'training', technique:'strength', bodyPart:'leg', intensity:1,
    equipment:'なし', position:'standing', duration:'20回 × 3セット',
    illustration: SVG2.calfStretch,
    purpose:'ふくらはぎを引き締める。',
    how:['直立でかかとを上げ最大限つま先立ち。','ゆっくり下ろす。','20回。'],
    cues:{do:'最大限上げる。',dont:'反動を使わない。'},
    why:'美脚作り＋第二の心臓の強化。'
  },
  {
    id:'pt_single_calf', name:'シングルレッグカーフレイズ', courses:['personal'],
    targetProblems:['ankleStiffness','lateralAsymmetry'],
    category:'training', technique:'strength', bodyPart:'leg', intensity:2,
    equipment:'なし', position:'standing', duration:'各15回 × 3セット',
    illustration: SVG2.calfStretch,
    purpose:'片脚で集中強化。',
    how:['片足立ちでかかとを上下。','各15回。','反対も。'],
    cues:{do:'バランスを保つ。',dont:'勢いで上げない。'},
    why:'左右差解消＋足首安定。'
  },
  {
    id:'pt_inner_squat', name:'インナースクワット', courses:['personal'],
    targetProblems:['kneeValgus'],
    category:'training', technique:'strength', bodyPart:'leg', intensity:2,
    equipment:'クッション', position:'standing', duration:'15回 × 3セット',
    illustration: SVG2.squat,
    purpose:'内ももを強化(内転筋)。',
    how:['足を肩幅。膝の間にクッションを挟む。','クッションをつぶし続けながらスクワット。','15回。'],
    cues:{do:'内ももの収縮を意識。',dont:'クッションを落とさない。'},
    why:'X脚改善・内もも引き締め。'
  },
  {
    id:'pt_pulse_squat', name:'パルススクワット', courses:['personal'],
    targetProblems:['kneeValgus'],
    category:'training', technique:'strength', bodyPart:'leg', intensity:3,
    equipment:'なし', position:'standing', duration:'30秒 × 3セット',
    illustration: SVG2.squat,
    purpose:'スクワットボトムで小さく上下し焼き切る。',
    how:['スクワットボトムで止まる。','10cm程度の小さな上下を繰り返す。','30秒。'],
    cues:{do:'呼吸を止めない。',dont:'立ち上がらない。'},
    why:'代謝アップに即効。'
  },

  // ============== UPPER BODY (16種) ==============
  {
    id:'pt_pushup', name:'プッシュアップ', courses:['personal'],
    targetProblems:['roundedShoulders','thoracicKyphosis'],
    category:'training', technique:'strength', bodyPart:'chest', intensity:3,
    equipment:'なし', position:'prone', duration:'10回 × 3セット',
    illustration: SVG2.pushup,
    purpose:'胸・肩・三頭筋・体幹の総合。',
    how:['プランクの姿勢から肘を曲げ胸を床へ。','肘は45度方向に。','10回。'],
    cues:{do:'体は一直線。',dont:'腰を反らない。'},
    why:'上半身自重の王道。'
  },
  {
    id:'pt_knee_pushup', name:'膝つきプッシュアップ', courses:['personal'],
    targetProblems:['roundedShoulders'],
    category:'training', technique:'strength', bodyPart:'chest', intensity:2,
    equipment:'マット', position:'prone', duration:'15回 × 3セット',
    illustration: SVG2.pushup,
    purpose:'プッシュアップの入門版。',
    how:['膝を床について四つん這い。','肘を曲げ胸を床へ。','15回。'],
    cues:{do:'体幹を引き締める。',dont:'お尻を突き出さない。'},
    why:'プッシュアップ習得の階段。'
  },
  {
    id:'pt_incline_pushup', name:'インクラインプッシュアップ', courses:['personal'],
    targetProblems:['roundedShoulders'],
    category:'training', technique:'strength', bodyPart:'chest', intensity:2,
    equipment:'机/壁', position:'standing', duration:'12回 × 3セット',
    illustration: SVG2.pushup,
    purpose:'机や壁を使った中強度版。',
    how:['机に手をつき体を斜めに。','肘を曲げ胸を机へ。','12回。'],
    cues:{do:'体を一直線。',dont:'腰を反らない。'},
    why:'肩の負担を抑えつつ強化。'
  },
  {
    id:'pt_diamond_pushup', name:'ダイヤモンドプッシュアップ', courses:['personal'],
    targetProblems:['roundedShoulders'],
    category:'training', technique:'strength', bodyPart:'chest', intensity:3,
    equipment:'なし', position:'prone', duration:'8回 × 3セット',
    illustration: SVG2.pushup,
    purpose:'三頭筋・内側胸筋を狙う。',
    how:['両手で菱形を作って胸の前。','肘を体に沿わせて曲げる。','8回。'],
    cues:{do:'肘を脇に。',dont:'肘が外に開かない。'},
    why:'二の腕引き締めに直結。'
  },
  {
    id:'pt_pike_pushup', name:'パイクプッシュアップ', courses:['personal'],
    targetProblems:['roundedShoulders','thoracicKyphosis'],
    category:'training', technique:'strength', bodyPart:'shoulder', intensity:3,
    equipment:'マット', position:'prone', duration:'10回 × 3セット',
    illustration: SVG2.downDog,
    purpose:'肩を中心に三角筋を強化。',
    how:['ダウンドッグの姿勢から肘を曲げ頭を床へ近づける。','押し戻す。','10回。'],
    cues:{do:'肩関節中心。',dont:'腰を引かない。'},
    why:'自重で肩の三角筋を鍛える唯一級の種目。'
  },
  {
    id:'pt_plank_press', name:'プランクプレス', courses:['personal'],
    targetProblems:['roundedShoulders','thoracicKyphosis'],
    category:'training', technique:'strength', bodyPart:'shoulder', intensity:3,
    equipment:'マット', position:'prone', duration:'各10回 × 3セット',
    illustration: SVG2.plankBasic,
    purpose:'プランク姿勢で肘から手のひらまで上下。',
    how:['プランクから片肘を手のひらに置き換える。','反対も。これで4回。','各10回。'],
    cues:{do:'腰がブレない。',dont:'お尻が左右に揺れない。'},
    why:'体幹と肩を同時強化。'
  },
  {
    id:'pt_inverted_row', name:'インバーテッドロウ', courses:['personal'],
    targetProblems:['roundedShoulders','thoracicKyphosis'],
    category:'training', technique:'strength', bodyPart:'back', intensity:3,
    equipment:'机/バー', position:'supine', duration:'10回 × 3セット',
    illustration: SVG2.shoulderBlade,
    purpose:'背中の引く動作で猫背改善。',
    how:['頑丈な机の下に仰向け。机の縁を持つ。','体を一直線に保ち胸を机に近づける。','10回。'],
    cues:{do:'肩甲骨を寄せる。',dont:'お尻を持ち上げない。'},
    why:'自重で背中を鍛えられる貴重な種目。'
  },
  {
    id:'pt_superman', name:'スーパーマン', courses:['personal','pilates'],
    targetProblems:['roundedShoulders','thoracicKyphosis'],
    category:'training', technique:'strength', bodyPart:'back', intensity:2,
    equipment:'マット', position:'prone', duration:'12回 × 3セット',
    illustration: SVG2.spineExt,
    purpose:'背中・お尻の伸展筋を活性化。',
    how:['うつ伏せで両腕両脚を伸ばす。','胸・腕・脚を同時に持ち上げる。','12回。'],
    cues:{do:'お尻と背中で持ち上げる。',dont:'首を強く反らない。'},
    why:'猫背改善の基本処方。'
  },
  {
    id:'pt_swimmer', name:'スイマー', courses:['personal','pilates'],
    targetProblems:['lateralAsymmetry','thoracicKyphosis'],
    category:'training', technique:'strength', bodyPart:'back', intensity:2,
    equipment:'マット', position:'prone', duration:'30秒 × 3セット',
    illustration: SVG2.spineExt,
    purpose:'うつ伏せ泳ぐような対角動作。',
    how:['スーパーマン姿勢から対角の手脚を交互に。','水泳のリズムで。','30秒。'],
    cues:{do:'呼吸を続ける。',dont:'動きが小さくならない。'},
    why:'背中の連動性を高める。'
  },
  {
    id:'pt_back_extension', name:'バックエクステンション', courses:['personal','pilates'],
    targetProblems:['thoracicKyphosis','swayBack'],
    category:'training', technique:'strength', bodyPart:'back', intensity:2,
    equipment:'マット', position:'prone', duration:'12回 × 3セット',
    illustration: SVG2.spineExt,
    purpose:'脊柱起立筋を強化。',
    how:['うつ伏せで両手を頭の後ろ。','上体をゆっくり持ち上げる。','12回。'],
    cues:{do:'胸椎で持ち上げる。',dont:'首を強く反らない。'},
    why:'腰痛予防の基本。'
  },
  {
    id:'pt_y_t_w', name:'Y-T-W', courses:['personal','pilates'],
    targetProblems:['roundedShoulders','thoracicKyphosis'],
    category:'training', technique:'strength', bodyPart:'back', intensity:2,
    equipment:'マット', position:'prone', duration:'各10回 × 3セット',
    illustration: SVG2.shoulderBlade,
    purpose:'肩甲骨周りの細かい筋を狙う。',
    how:['うつ伏せで腕を「Y」字に上げる10回。','「T」字に開く10回。','「W」字に曲げて寄せる10回。'],
    cues:{do:'親指を天井へ。',dont:'首を上げない。'},
    why:'下部僧帽筋・菱形筋に効く。'
  },
  {
    id:'pt_scapular_pushup', name:'スキャプラプッシュアップ', courses:['personal','pilates'],
    targetProblems:['roundedShoulders'],
    category:'training', technique:'strength', bodyPart:'shoulder', intensity:2,
    equipment:'マット', position:'prone', duration:'15回 × 3セット',
    illustration: SVG2.shoulderBlade,
    purpose:'肘は伸ばしたまま肩甲骨だけ動かす。',
    how:['プランクの姿勢。肘は伸ばしたまま。','肩甲骨を寄せ→開く。','15回。'],
    cues:{do:'前鋸筋を意識。',dont:'肘を曲げない。'},
    why:'肩の安定性を司る前鋸筋を活性化。'
  },
  {
    id:'pt_wall_pushoff', name:'ウォールプッシュオフ', courses:['personal'],
    targetProblems:['roundedShoulders'],
    category:'training', technique:'strength', bodyPart:'chest', intensity:1,
    equipment:'壁', position:'standing', duration:'15回 × 3セット',
    illustration: SVG2.pushup,
    purpose:'プッシュアップ最入門。',
    how:['壁から1歩離れる。手をついて肘を曲げ胸を壁へ。','押し戻す。','15回。'],
    cues:{do:'体を一直線。',dont:'お尻を引かない。'},
    why:'高齢者・初心者でも安全。'
  },
  {
    id:'pt_dive_bomber', name:'ダイブボマー', courses:['personal'],
    targetProblems:['roundedShoulders','thoracicKyphosis'],
    category:'training', technique:'strength', bodyPart:'fullbody', intensity:3,
    equipment:'マット', position:'prone', duration:'8回 × 3セット',
    illustration: SVG2.cobra,
    purpose:'動的に胸郭を開きながら上半身強化。',
    how:['ダウンドッグから頭→胸→腰の順に床近く通す。','コブラの姿勢へ。','戻る。8回。'],
    cues:{do:'なめらかに。',dont:'関節に痛みを感じない範囲で。'},
    why:'モビリティと筋力の融合。'
  },
  {
    id:'pt_tricep_dip', name:'トライセップディップ', courses:['personal'],
    targetProblems:['roundedShoulders'],
    category:'training', technique:'strength', bodyPart:'arm', intensity:2,
    equipment:'椅子', position:'sitting', duration:'12回 × 3セット',
    illustration: SVG2.pushup,
    purpose:'二の腕を引き締める。',
    how:['椅子の縁を後ろ手で持つ。','お尻を前にずらし肘を曲げる。','12回。'],
    cues:{do:'肩を下げる。',dont:'肩がすくまない。'},
    why:'二の腕のたるみ改善。'
  },
  {
    id:'pt_arm_circle', name:'アームサークル', courses:['personal'],
    targetProblems:['roundedShoulders'],
    category:'training', technique:'endurance', bodyPart:'shoulder', intensity:2,
    equipment:'なし', position:'standing', duration:'各30秒',
    illustration: SVG2.shoulderRoll,
    purpose:'肩の持久力を鍛える。',
    how:['両腕を水平に。','小さな円で前回し30秒・後ろ回し30秒。','慣れたら円を大きく。'],
    cues:{do:'肩は下げる。',dont:'肘を曲げない。'},
    why:'肩こり改善＋持久力UP。'
  },

  // ============== CORE (16種) ==============
  {
    id:'pt_plank', name:'プランク', courses:['personal','pilates'],
    targetProblems:['anteriorPelvicTilt','swayBack'],
    category:'training', technique:'isometric', bodyPart:'core', intensity:2,
    equipment:'マット', position:'prone', duration:'45秒 × 3セット',
    illustration: SVG2.plankBasic,
    purpose:'体幹全体の安定。',
    how:['前腕を床につけ体を一直線に。','頭〜かかとが直線。','45秒。'],
    cues:{do:'お尻と腹を引き締める。',dont:'腰を落とさない。'},
    why:'最も基本的な体幹種目。'
  },
  {
    id:'pt_side_plank', name:'サイドプランク', courses:['personal','pilates'],
    targetProblems:['lateralAsymmetry','swayBack'],
    category:'training', technique:'isometric', bodyPart:'core', intensity:3,
    equipment:'マット', position:'side-lying', duration:'各30秒 × 3セット',
    illustration: SVG2.sidePlank,
    purpose:'体側の腹斜筋・腰方形筋を強化。',
    how:['横向きで前腕を床に。','体を持ち上げ一直線に。','30秒。反対も。'],
    cues:{do:'お尻を高く保つ。',dont:'落ちないよう体幹で支える。'},
    why:'左右差・腰痛予防に必須。'
  },
  {
    id:'pt_dead_bug', name:'デッドバグ', courses:['personal','pilates','seitai'],
    targetProblems:['anteriorPelvicTilt','swayBack'],
    category:'training', technique:'strength', bodyPart:'core', intensity:2,
    equipment:'マット', position:'supine', duration:'各10回 × 3セット',
    illustration: SVG2.deadBugBase,
    purpose:'体幹の対角動作で腹横筋を活性化。',
    how:['仰向けで両膝90度・両腕天井へ。','対角の手脚を伸ばす。','戻して反対。各10回。'],
    cues:{do:'腰は床に押し付ける。',dont:'腰が浮かない。'},
    why:'反り腰改善の鉄板。'
  },
  {
    id:'pt_bird_dog', name:'バードドッグ', courses:['personal','pilates','seitai'],
    targetProblems:['lateralAsymmetry','anteriorPelvicTilt'],
    category:'training', technique:'strength', bodyPart:'core', intensity:2,
    equipment:'マット', position:'quadruped', duration:'各12回 × 3セット',
    illustration: SVG2.deadBugBase,
    purpose:'四つん這いから対角の手脚を伸ばす。',
    how:['四つん這い。右手と左脚を同時に伸ばす。','3秒キープして戻る。','反対も。各12回。'],
    cues:{do:'背中をフラットに。',dont:'お尻が傾かない。'},
    why:'腰痛予防のエビデンス豊富。'
  },
  {
    id:'pt_mountain_climber', name:'マウンテンクライマー', courses:['personal'],
    targetProblems:['anteriorPelvicTilt'],
    category:'training', technique:'cardio', bodyPart:'core', intensity:3,
    equipment:'マット', position:'prone', duration:'30秒 × 3セット',
    illustration: SVG2.plankBasic,
    purpose:'体幹＋有酸素。',
    how:['プランクの姿勢から膝を交互に胸へ。','リズミカルに。','30秒。'],
    cues:{do:'お尻が浮かない。',dont:'スピードに溺れない。'},
    why:'代謝アップ＋体幹強化。'
  },
  {
    id:'pt_bicycle_crunch', name:'バイシクルクランチ', courses:['personal'],
    targetProblems:['anteriorPelvicTilt','lateralAsymmetry'],
    category:'training', technique:'strength', bodyPart:'core', intensity:2,
    equipment:'マット', position:'supine', duration:'各15回 × 3セット',
    illustration: SVG2.bicycleAb,
    purpose:'腹斜筋を回旋で狙う。',
    how:['仰向けで両手を頭の後ろ。','右肘と左膝を寄せる。','次に左肘と右膝。各15回。'],
    cues:{do:'肘で引っ張らない。',dont:'首を強く曲げない。'},
    why:'くびれ作りの定番。'
  },
  {
    id:'pt_russian_twist', name:'ロシアンツイスト', courses:['personal'],
    targetProblems:['lateralAsymmetry'],
    category:'training', technique:'strength', bodyPart:'core', intensity:3,
    equipment:'マット', position:'sitting', duration:'各15回 × 3セット',
    illustration: SVG2.bicycleAb,
    purpose:'体を捻る腹斜筋強化。',
    how:['膝を曲げて座り上体を後傾。','両手を合わせて左右にタッチ。','各15回。'],
    cues:{do:'背筋は伸ばす。',dont:'丸めて捻らない。'},
    why:'くびれの黄金種目。'
  },
  {
    id:'pt_hollow_hold', name:'ホロウホールド', courses:['personal','pilates'],
    targetProblems:['anteriorPelvicTilt','swayBack'],
    category:'training', technique:'isometric', bodyPart:'core', intensity:3,
    equipment:'マット', position:'supine', duration:'30秒 × 3セット',
    illustration: SVG2.deadBugBase,
    purpose:'体幹の全方位を引き締める。',
    how:['仰向けで両腕両脚を伸ばす。','腰を床に押しつけ手脚を少し床から浮かす。','30秒。'],
    cues:{do:'腰を床から離さない。',dont:'反らない。'},
    why:'体操選手の体幹基礎種目。'
  },
  {
    id:'pt_leg_raise', name:'レッグレイズ', courses:['personal','pilates'],
    targetProblems:['anteriorPelvicTilt'],
    category:'training', technique:'strength', bodyPart:'core', intensity:2,
    equipment:'マット', position:'supine', duration:'12回 × 3セット',
    illustration: SVG2.abLift,
    purpose:'下腹を集中強化。',
    how:['仰向けで両脚を揃え天井へ。','ゆっくり下ろし床手前で止める。','12回。'],
    cues:{do:'腰を床に押し付ける。',dont:'腰が反る前に戻す。'},
    why:'下腹ぽっこり対策。'
  },
  {
    id:'pt_flutter_kick', name:'フラッターキック', courses:['personal'],
    targetProblems:['anteriorPelvicTilt'],
    category:'training', technique:'endurance', bodyPart:'core', intensity:2,
    equipment:'マット', position:'supine', duration:'30秒 × 3セット',
    illustration: SVG2.abLift,
    purpose:'下腹の持久力強化。',
    how:['仰向けで両脚を伸ばし床から30cm。','小さく交互に上下。','30秒。'],
    cues:{do:'腰は床。',dont:'勢いに頼らない。'},
    why:'下腹引き締めの即効性。'
  },
  {
    id:'pt_v_up', name:'Vアップ', courses:['personal'],
    targetProblems:['anteriorPelvicTilt'],
    category:'training', technique:'strength', bodyPart:'core', intensity:3,
    equipment:'マット', position:'supine', duration:'10回 × 3セット',
    illustration: SVG2.abLift,
    purpose:'上半身と下半身を同時に持ち上げV字に。',
    how:['仰向けで両腕両脚を伸ばす。','同時に上体と脚を持ち上げ手と脚を合わせる。','10回。'],
    cues:{do:'腹筋で持ち上げる。',dont:'勢いだけ使わない。'},
    why:'お腹全体の総合種目。'
  },
  {
    id:'pt_reverse_crunch', name:'リバースクランチ', courses:['personal'],
    targetProblems:['anteriorPelvicTilt'],
    category:'training', technique:'strength', bodyPart:'core', intensity:2,
    equipment:'マット', position:'supine', duration:'15回 × 3セット',
    illustration: SVG2.abLift,
    purpose:'骨盤を巻き上げて下腹を狙う。',
    how:['仰向けで膝を90度。','骨盤を巻き込んで膝を胸に。','戻す。15回。'],
    cues:{do:'腹で巻き上げる。',dont:'勢いで上げない。'},
    why:'反り腰に最も効く腹筋種目。'
  },
  {
    id:'pt_pallof_press', name:'パロフプレス(自重)', courses:['personal'],
    targetProblems:['lateralAsymmetry','anteriorPelvicTilt'],
    category:'training', technique:'isometric', bodyPart:'core', intensity:2,
    equipment:'なし', position:'standing', duration:'各15秒 × 3セット',
    illustration: SVG2.plankBasic,
    purpose:'回旋に対する抵抗で深層体幹。',
    how:['立位で胸の前に両手を合わせ前へ伸ばす。','体は捻らずに15秒キープ。','反対側も。'],
    cues:{do:'肩はリラックス。',dont:'肩で押さない。'},
    why:'スポーツに直結する体幹安定。'
  },
  {
    id:'pt_jackknife', name:'ジャックナイフ', courses:['personal'],
    targetProblems:['anteriorPelvicTilt'],
    category:'training', technique:'strength', bodyPart:'core', intensity:3,
    equipment:'マット', position:'supine', duration:'12回 × 3セット',
    illustration: SVG2.abLift,
    purpose:'対角動作で腹斜筋＋直筋。',
    how:['仰向けで両手両脚を伸ばす。','右肘と左膝を合わせる。','反対も。各12回。'],
    cues:{do:'体幹で動かす。',dont:'肩で引っ張らない。'},
    why:'くびれ＋下腹同時。'
  },
  {
    id:'pt_burpee_easy', name:'バーピー(易しい版)', courses:['personal'],
    targetProblems:['posteriorPelvicTilt'],
    category:'training', technique:'cardio', bodyPart:'fullbody', intensity:3,
    equipment:'なし', position:'standing', duration:'10回 × 3セット',
    illustration: SVG2.plankBasic,
    purpose:'全身有酸素＋筋力。',
    how:['立位→しゃがむ→脚を後ろに伸ばしプランク→戻す→立つ。','ジャンプは省略。','10回。'],
    cues:{do:'リズミカルに。',dont:'最後まで集中。'},
    why:'10分で体が変わる王道。'
  },
  {
    id:'pt_jumping_jack', name:'ジャンピングジャック', courses:['personal'],
    targetProblems:['general'],
    category:'training', technique:'cardio', bodyPart:'fullbody', intensity:2,
    equipment:'なし', position:'standing', duration:'30秒 × 3セット',
    illustration: SVG2.jumpingJack,
    purpose:'有酸素ウォームアップ。',
    how:['直立から脚を開き腕を頭上で合わせる。','戻す。30秒。','リズミカルに。'],
    cues:{do:'柔らかく着地。',dont:'膝が内に入らない。'},
    why:'最も簡単な全身有酸素。'
  },
];

export { DB_PERSONAL };
