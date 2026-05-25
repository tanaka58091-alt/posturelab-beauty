// ===================================================================
// ヨガ (YOGA) — アサナ・呼吸法・瞑想
// ===================================================================

import { SVG2 } from './svg-library.js';

const DB_YOGA = [
  // ============== STANDING ASANAS (14種) ==============
  {
    id:'yg_mountain', name:'タダーサナ(山のポーズ)', courses:['yoga'],
    targetProblems:['general','swayBack'],
    category:'asana', technique:'standing', bodyPart:'fullbody', intensity:1,
    equipment:'マット', position:'standing', duration:'1分',
    illustration: SVG2.treePose,
    purpose:'全ヨガの基礎。立ち姿の整列を作る。',
    how:['足を揃え両足裏4点(かかと2点・指の付け根2点)に均等に。','尾骨を下げ頭頂を天井へ。','両手は体側で1分。'],
    cues:{do:'呼吸を深く。',dont:'反り腰にならない。'},
    why:'すべての立位アサナの土台。'
  },
  {
    id:'yg_warrior1', name:'ウォリアーI', courses:['yoga'],
    targetProblems:['anteriorPelvicTilt','swayBack','roundedShoulders'],
    category:'asana', technique:'standing', bodyPart:'fullbody', intensity:2,
    equipment:'マット', position:'standing', duration:'各45秒',
    illustration: SVG2.warrior,
    purpose:'力強さと安定感の代表アサナ。',
    how:['足を前後に大きく開き前膝90度。','後ろ脚を伸ばしつま先を斜めに。','両腕を頭上に伸ばし45秒。反対も。'],
    cues:{do:'骨盤は正面。',dont:'前膝が内に入らない。'},
    why:'股関節屈筋を伸ばしながら全身を活性化。'
  },
  {
    id:'yg_warrior2', name:'ウォリアーII', courses:['yoga'],
    targetProblems:['kneeValgus','lateralAsymmetry'],
    category:'asana', technique:'standing', bodyPart:'fullbody', intensity:2,
    equipment:'マット', position:'standing', duration:'各45秒',
    illustration: SVG2.warrior,
    purpose:'下半身強化＋胸郭オープン。',
    how:['足を大きく開き前膝90度。','骨盤を横向きに開き両腕を水平に。','視線は前手の先。45秒。反対も。'],
    cues:{do:'肩はリラックス。',dont:'前膝がつま先より前に出ない。'},
    why:'内転筋・臀筋を強化しKnee-in改善。'
  },
  {
    id:'yg_warrior3', name:'ウォリアーIII', courses:['yoga'],
    targetProblems:['lateralAsymmetry','posteriorPelvicTilt'],
    category:'asana', technique:'standing', bodyPart:'fullbody', intensity:3,
    equipment:'マット', position:'standing', duration:'各30秒',
    illustration: SVG2.forwardFold,
    purpose:'片脚立ちで全身バランス強化。',
    how:['片脚立ちから反対脚を後ろに伸ばす。','上体を前に倒し床と平行に。','両腕を前に伸ばす。30秒。反対も。'],
    cues:{do:'軸足は安定。',dont:'お尻が傾かない。'},
    why:'バランス感覚＋臀筋＋ハム強化。'
  },
  {
    id:'yg_triangle', name:'トリコナーサナ(三角)', courses:['yoga'],
    targetProblems:['lateralAsymmetry','thoracicKyphosis'],
    category:'asana', technique:'standing', bodyPart:'fullbody', intensity:2,
    equipment:'マット', position:'standing', duration:'各45秒',
    illustration: SVG2.triangle,
    purpose:'体側を伸ばし胸郭を開く。',
    how:['足を大きく開き前足は90度・後ろ足45度。','骨盤から前足側に倒し下の手を脛に。','上の手は天井へ。45秒。反対も。'],
    cues:{do:'体は一枚の板に。',dont:'前に倒れ込まない。'},
    why:'内臓マッサージ・腰側面ストレッチ。'
  },
  {
    id:'yg_revolved_triangle', name:'リバースド三角', courses:['yoga'],
    targetProblems:['lateralAsymmetry','thoracicKyphosis'],
    category:'asana', technique:'standing', bodyPart:'fullbody', intensity:3,
    equipment:'マット', position:'standing', duration:'各30秒',
    illustration: SVG2.spineTwist,
    purpose:'三角ポーズに回旋を加える。',
    how:['足を開き反対の手を前足の外側へ。','上の手を天井へ伸ばし胸を捻る。','30秒。反対も。'],
    cues:{do:'まず脚を安定。',dont:'背中を丸めない。'},
    why:'胸椎回旋＋ハムストリング。'
  },
  {
    id:'yg_chair', name:'ウトカターサナ(椅子)', courses:['yoga'],
    targetProblems:['posteriorPelvicTilt','roundedShoulders'],
    category:'asana', technique:'standing', bodyPart:'leg', intensity:2,
    equipment:'マット', position:'standing', duration:'45秒',
    illustration: SVG2.squat,
    purpose:'下半身強化＋背中の引き上げ。',
    how:['両足を揃え膝を曲げる(架空の椅子に座る)。','両腕を頭上に伸ばす。','45秒。'],
    cues:{do:'膝はつま先より前に出ない。',dont:'背中を丸めない。'},
    why:'脚と背中の同時強化。'
  },
  {
    id:'yg_tree', name:'ヴルクシャーサナ(木)', courses:['yoga'],
    targetProblems:['lateralAsymmetry','general'],
    category:'asana', technique:'standing', bodyPart:'leg', intensity:2,
    equipment:'マット', position:'standing', duration:'各45秒',
    illustration: SVG2.treePose,
    purpose:'片脚バランス＋集中力。',
    how:['片脚立ちで反対脚の足裏を内ももに。','両手を胸前で合わせる(または頭上)。','45秒。反対も。'],
    cues:{do:'目線は一点。',dont:'膝に足を置かない(内もも or 脛)。'},
    why:'バランス感覚と精神集中。'
  },
  {
    id:'yg_eagle', name:'ガルダーサナ(鷲)', courses:['yoga'],
    targetProblems:['roundedShoulders','lateralAsymmetry'],
    category:'asana', technique:'standing', bodyPart:'fullbody', intensity:3,
    equipment:'マット', position:'standing', duration:'各30秒',
    illustration: SVG2.treePose,
    purpose:'肩甲骨・股関節を同時に絞る。',
    how:['軽く膝を曲げ片脚を反対脚に絡める。','腕も逆の手で絡め胸前で合わせる。','30秒。反対も。'],
    cues:{do:'背筋を伸ばす。',dont:'肩がすくまない。'},
    why:'肩甲骨間の凝りを解放。'
  },
  {
    id:'yg_dancer', name:'ナタラージャ(踊り子)', courses:['yoga'],
    targetProblems:['anteriorPelvicTilt','roundedShoulders'],
    category:'asana', technique:'standing', bodyPart:'fullbody', intensity:3,
    equipment:'マット', position:'standing', duration:'各30秒',
    illustration: SVG2.treePose,
    purpose:'胸を開きながらバランス。',
    how:['片脚立ちから後ろの足首を同側の手で掴む。','反対の手を前へ伸ばし後ろ脚を高く。','30秒。反対も。'],
    cues:{do:'胸を前へ。',dont:'反り腰になりすぎない。'},
    why:'股関節屈筋ストレッチ＋胸オープン。'
  },
  {
    id:'yg_half_moon', name:'アルダチャンドラ(半月)', courses:['yoga'],
    targetProblems:['lateralAsymmetry'],
    category:'asana', technique:'standing', bodyPart:'fullbody', intensity:3,
    equipment:'マット', position:'standing', duration:'各30秒',
    illustration: SVG2.warrior,
    purpose:'体側ストレッチ＋片脚バランス。',
    how:['三角ポーズから前手を床へ。','後ろ脚を床と平行に持ち上げる。','上の手は天井へ。30秒。'],
    cues:{do:'体は1枚の板。',dont:'お尻が下がらない。'},
    why:'バランス・柔軟性・筋力の融合。'
  },
  {
    id:'yg_side_angle', name:'パールシュヴァコナ(横の伸び)', courses:['yoga'],
    targetProblems:['thoracicKyphosis','lateralAsymmetry'],
    category:'asana', technique:'standing', bodyPart:'fullbody', intensity:2,
    equipment:'マット', position:'standing', duration:'各45秒',
    illustration: SVG2.triangle,
    purpose:'体側を伸ばし下半身を強化。',
    how:['足を大きく開き前膝90度。','前肘を前膝に乗せ上の手を耳の横へ。','体側の伸びを感じる。45秒。'],
    cues:{do:'天井から床へ斜め直線。',dont:'前に倒れない。'},
    why:'体側＋脚＋胸郭の総合。'
  },
  {
    id:'yg_wide_squat', name:'マラーサナ(花輪)', courses:['yoga'],
    targetProblems:['kneeValgus','ankleStiffness'],
    category:'asana', technique:'standing', bodyPart:'hip', intensity:2,
    equipment:'マット', position:'squat', duration:'1分',
    illustration: SVG2.squatHold,
    purpose:'深い股関節屈曲。',
    how:['足を肩幅より広く・つま先外。','深くしゃがみ両手を胸前で合わせる。','肘で内ももを押す。1分。'],
    cues:{do:'背筋を伸ばす。',dont:'かかとが浮かないように。'},
    why:'股関節と足首の全モビリティ。'
  },
  {
    id:'yg_forward_fold_std', name:'立位前屈', courses:['yoga'],
    targetProblems:['posteriorPelvicTilt'],
    category:'asana', technique:'standing', bodyPart:'leg', intensity:2,
    equipment:'マット', position:'standing', duration:'1分',
    illustration: SVG2.forwardFold,
    purpose:'背中・ハム全体をリセット。',
    how:['足を揃え骨盤から前傾。','膝は少し緩めてOK。','頭を脱力させ1分。'],
    cues:{do:'息を吐きながら深く。',dont:'反動を使わない。'},
    why:'血流逆転で頭スッキリ。'
  },

  // ============== SEATED ASANAS (12種) ==============
  {
    id:'yg_easy_pose', name:'スカ(あぐら)', courses:['yoga'],
    targetProblems:['general'],
    category:'asana', technique:'seated', bodyPart:'hip', intensity:1,
    equipment:'マット', position:'sitting', duration:'2分',
    illustration: SVG2.meditation,
    purpose:'瞑想・呼吸法の基本姿勢。',
    how:['あぐらをかき背筋を伸ばす。','両手を膝の上に。','2分。'],
    cues:{do:'坐骨で座る。',dont:'背中を丸めない。'},
    why:'すべての座位アサナの土台。'
  },
  {
    id:'yg_butterfly_yoga', name:'バッダコナーサナ(蝶)', courses:['yoga'],
    targetProblems:['kneeValgus','posteriorPelvicTilt'],
    category:'asana', technique:'seated', bodyPart:'hip', intensity:1,
    equipment:'マット', position:'sitting', duration:'2分',
    illustration: SVG2.butterflyHip,
    purpose:'股関節を開く基本ポーズ。',
    how:['足裏を合わせて座る。','膝を床に近づける。','背筋を伸ばし前傾。2分。'],
    cues:{do:'呼吸を深く。',dont:'反動で押さない。'},
    why:'股関節内側の柔軟性。'
  },
  {
    id:'yg_seated_fold_y', name:'パスチモッターナ(前屈)', courses:['yoga'],
    targetProblems:['posteriorPelvicTilt'],
    category:'asana', technique:'seated', bodyPart:'leg', intensity:2,
    equipment:'マット', position:'sitting', duration:'1分',
    illustration: SVG2.forwardFold,
    purpose:'背中とハムを深く伸ばす。',
    how:['長座。背筋を伸ばす。','骨盤から前傾し手を脚の方へ。','1分。'],
    cues:{do:'息を吐きながら。',dont:'膝を曲げて先に倒れない。'},
    why:'柔軟性の代表指標。'
  },
  {
    id:'yg_seated_twist_y', name:'マリーチアーサナ(座位ツイスト)', courses:['yoga'],
    targetProblems:['thoracicKyphosis','lateralAsymmetry'],
    category:'asana', technique:'seated', bodyPart:'back', intensity:2,
    equipment:'マット', position:'sitting', duration:'各45秒',
    illustration: SVG2.seatedTwist,
    purpose:'脊柱の回旋を深める。',
    how:['長座から片膝を立てる。','反対側の肘を立膝の外に。','背筋を伸ばし捻る。45秒。反対も。'],
    cues:{do:'背筋を伸ばしてから捻る。',dont:'肩で捻らない。'},
    why:'内臓マッサージ＋胸椎回旋。'
  },
  {
    id:'yg_cow_face', name:'ゴームカ(牛面)', courses:['yoga'],
    targetProblems:['roundedShoulders','lateralAsymmetry'],
    category:'asana', technique:'seated', bodyPart:'shoulder', intensity:2,
    equipment:'マット', position:'sitting', duration:'各45秒',
    illustration: SVG2.shoulderOpen,
    purpose:'肩関節の左右差を解消。',
    how:['膝を重ねて座る。','右手を上から左手を下から背中で握り合う。','45秒。反対も。'],
    cues:{do:'届かなければタオルで補助。',dont:'前傾しない。'},
    why:'肩関節の柔軟性を片側ずつ。'
  },
  {
    id:'yg_hero', name:'ヴィラ(英雄)', courses:['yoga'],
    targetProblems:['anteriorPelvicTilt'],
    category:'asana', technique:'seated', bodyPart:'leg', intensity:2,
    equipment:'マット', position:'kneeling', duration:'1分',
    illustration: SVG2.meditation,
    purpose:'大腿四頭筋ストレッチ。',
    how:['膝立ちから足を外側に開きお尻を床へ。','背筋を伸ばす。','1分。'],
    cues:{do:'膝に違和感あれば中止。',dont:'お尻が浮かないように。'},
    why:'大腿前面の柔軟性回復。'
  },
  {
    id:'yg_one_leg_fold', name:'片脚前屈', courses:['yoga'],
    targetProblems:['posteriorPelvicTilt','lateralAsymmetry'],
    category:'asana', technique:'seated', bodyPart:'leg', intensity:2,
    equipment:'マット', position:'sitting', duration:'各1分',
    illustration: SVG2.forwardFold,
    purpose:'片脚ずつハムを伸ばす。',
    how:['長座から片膝を曲げ足裏を反対の内ももへ。','背筋を伸ばし前傾。','1分。反対も。'],
    cues:{do:'骨盤から前傾。',dont:'背中を丸めない。'},
    why:'左右差を整える。'
  },
  {
    id:'yg_half_pigeon', name:'ハーフピジョン', courses:['yoga'],
    targetProblems:['lateralAsymmetry','kneeValgus'],
    category:'asana', technique:'seated', bodyPart:'hip', intensity:2,
    equipment:'マット', position:'prone', duration:'各1分',
    illustration: SVG2.pigeonRest,
    purpose:'お尻・外旋筋を伸ばす。',
    how:['四つん這いから片膝を体の前に。','後ろ脚をまっすぐ後ろへ。','前傾して1分。反対も。'],
    cues:{do:'骨盤は正面。',dont:'膝に痛みあれば角度調整。'},
    why:'梨状筋・坐骨神経痛予防。'
  },
  {
    id:'yg_ankle_to_knee', name:'アンクル・トゥ・ニー', courses:['yoga'],
    targetProblems:['lateralAsymmetry','kneeValgus'],
    category:'asana', technique:'seated', bodyPart:'hip', intensity:3,
    equipment:'マット', position:'sitting', duration:'各1分',
    illustration: SVG2.hipOpener,
    purpose:'股関節外側を深く伸ばす。',
    how:['長座から右脛を床に水平に。','左脛をその上に重ねる(両膝が縦に並ぶ)。','前傾して1分。反対も。'],
    cues:{do:'坐骨で座る。',dont:'痛みあれば膝の上に脚を置く。'},
    why:'股関節外側の最終形。'
  },
  {
    id:'yg_seated_side', name:'座位サイドベンド', courses:['yoga'],
    targetProblems:['lateralAsymmetry'],
    category:'asana', technique:'seated', bodyPart:'back', intensity:1,
    equipment:'マット', position:'sitting', duration:'各30秒',
    illustration: SVG2.sideStretch,
    purpose:'体側を座って伸ばす。',
    how:['あぐらで座り片手を頭上に。','反対側に倒す。','30秒。反対も。'],
    cues:{do:'お尻は床。',dont:'前傾しない。'},
    why:'QL・体側のリセット。'
  },
  {
    id:'yg_compass', name:'コンパスポーズ', courses:['yoga'],
    targetProblems:['kneeValgus'],
    category:'asana', technique:'seated', bodyPart:'hip', intensity:3,
    equipment:'マット', position:'sitting', duration:'各45秒',
    illustration: SVG2.hipOpener,
    purpose:'高度な股関節オープナー。',
    how:['長座から片脚を肩の上に。','同側の手でつま先を持つ。','45秒。反対も。'],
    cues:{do:'背筋を伸ばす。',dont:'無理しない。'},
    why:'高度な柔軟性を求める人へ。'
  },
  {
    id:'yg_lotus_prep', name:'蓮ポーズ準備', courses:['yoga'],
    targetProblems:['kneeValgus'],
    category:'asana', technique:'seated', bodyPart:'hip', intensity:2,
    equipment:'マット', position:'sitting', duration:'各1分',
    illustration: SVG2.butterflyHip,
    purpose:'蓮ポーズへの準備。',
    how:['長座から片足を反対の太もも付け根に。','膝はマットに近づける。','1分。反対も。'],
    cues:{do:'股関節を開く。',dont:'膝を捻らない。'},
    why:'瞑想姿勢の準備。'
  },

  // ============== PRONE / BACKBEND (10種) ==============
  {
    id:'yg_cobra', name:'コブラ(ブジャンガーサナ)', courses:['yoga'],
    targetProblems:['thoracicKyphosis','roundedShoulders','swayBack'],
    category:'asana', technique:'backbend', bodyPart:'back', intensity:2,
    equipment:'マット', position:'prone', duration:'30秒 × 2セット',
    illustration: SVG2.cobra,
    purpose:'胸椎を伸展。猫背改善の定番。',
    how:['うつ伏せ。手のひらを胸の横に。','息を吸いながら胸を持ち上げる。','30秒。'],
    cues:{do:'お尻を緩める。',dont:'肘をロックしない。'},
    why:'胸椎伸展の最重要ポーズ。'
  },
  {
    id:'yg_sphinx', name:'スフィンクス', courses:['yoga'],
    targetProblems:['thoracicKyphosis','swayBack'],
    category:'asana', technique:'backbend', bodyPart:'back', intensity:1,
    equipment:'マット', position:'prone', duration:'1分',
    illustration: SVG2.spineExt,
    purpose:'コブラより優しい胸郭オープン。',
    how:['うつ伏せ。前腕を肩の下に。','胸を持ち上げて1分キープ。','深呼吸。'],
    cues:{do:'お尻リラックス。',dont:'首を強く反らない。'},
    why:'胸郭オープンの初心者版。'
  },
  {
    id:'yg_upward_dog', name:'アップワードドッグ', courses:['yoga'],
    targetProblems:['thoracicKyphosis','roundedShoulders'],
    category:'asana', technique:'backbend', bodyPart:'back', intensity:3,
    equipment:'マット', position:'prone', duration:'30秒',
    illustration: SVG2.cobra,
    purpose:'コブラの上位互換。',
    how:['うつ伏せから腕で押し胸を持ち上げる。','膝と腿を浮かす。','30秒。'],
    cues:{do:'肩を下げる。',dont:'肩がすくまない。'},
    why:'力強い胸郭オープン。'
  },
  {
    id:'yg_locust', name:'ローカスト(バッタ)', courses:['yoga'],
    targetProblems:['thoracicKyphosis','swayBack'],
    category:'asana', technique:'backbend', bodyPart:'back', intensity:2,
    equipment:'マット', position:'prone', duration:'30秒 × 2セット',
    illustration: SVG2.spineExt,
    purpose:'背中側の筋を総動員。',
    how:['うつ伏せで両腕両脚を伸ばす。','胸・腕・脚を同時に持ち上げる。','30秒。'],
    cues:{do:'お尻と背中で持ち上げる。',dont:'首を強く反らない。'},
    why:'背中の総合強化。'
  },
  {
    id:'yg_bow', name:'弓のポーズ(ダヌラ)', courses:['yoga'],
    targetProblems:['thoracicKyphosis','anteriorPelvicTilt'],
    category:'asana', technique:'backbend', bodyPart:'fullbody', intensity:3,
    equipment:'マット', position:'prone', duration:'30秒',
    illustration: SVG2.spineExt,
    purpose:'胸・腹・大腿前面を深く伸ばす。',
    how:['うつ伏せで両足首を後ろ手で掴む。','足で手を蹴り上げ胸を持ち上げる。','30秒。'],
    cues:{do:'呼吸を続ける。',dont:'反り腰になりすぎない。'},
    why:'胸郭オープンの最終形。'
  },
  {
    id:'yg_camel', name:'ラクダのポーズ', courses:['yoga'],
    targetProblems:['thoracicKyphosis','anteriorPelvicTilt'],
    category:'asana', technique:'backbend', bodyPart:'fullbody', intensity:3,
    equipment:'マット', position:'kneeling', duration:'30秒',
    illustration: SVG2.spineExt,
    purpose:'前面を全部開く強烈な後屈。',
    how:['膝立ちで両手を腰の後ろに。','胸を上に押し上げかかとを掴む。','30秒。'],
    cues:{do:'胸を天井へ。',dont:'首を強く反らない。'},
    why:'閉じた姿勢を一気に開く。'
  },
  {
    id:'yg_bridge_y', name:'セツバンダ(橋)', courses:['yoga'],
    targetProblems:['anteriorPelvicTilt','thoracicKyphosis'],
    category:'asana', technique:'backbend', bodyPart:'fullbody', intensity:2,
    equipment:'マット', position:'supine', duration:'1分',
    illustration: SVG2.bridgeBase,
    purpose:'仰向けでお尻と胸郭を持ち上げる。',
    how:['仰向けで膝を立てる。','お尻を持ち上げる。両手を背中の下で組む。','1分。'],
    cues:{do:'胸を顎へ。',dont:'頭を動かさない。'},
    why:'前面ストレッチ＋臀筋強化。'
  },
  {
    id:'yg_wheel', name:'ウルドゥヴァ(車輪)', courses:['yoga'],
    targetProblems:['thoracicKyphosis'],
    category:'asana', technique:'backbend', bodyPart:'fullbody', intensity:3,
    equipment:'マット', position:'supine', duration:'30秒',
    illustration: SVG2.spineExt,
    purpose:'全身後屈の最高峰。',
    how:['仰向けから両手を耳の横に。','腕で押し上げ胸を持ち上げる。','30秒。'],
    cues:{do:'腕と脚を均等に。',dont:'肩に違和感あれば中止。'},
    why:'柔軟性と筋力の融合。'
  },
  {
    id:'yg_supported_fish', name:'魚のポーズ(支持あり)', courses:['yoga'],
    targetProblems:['thoracicKyphosis','roundedShoulders'],
    category:'asana', technique:'backbend', bodyPart:'chest', intensity:1,
    equipment:'タオル/ブロック', position:'supine', duration:'3分',
    illustration: SVG2.spineExt,
    purpose:'タオルやブロックで胸を受動的に開く。',
    how:['タオルを縦に巻き胸椎中部の下に。','両腕を頭の上に伸ばす。','3分リラックス。'],
    cues:{do:'目を閉じる。',dont:'痛みあれば中止。'},
    why:'寝ながらできる胸郭オープン。'
  },
  {
    id:'yg_spinal_twist', name:'仰向け脊柱ねじり', courses:['yoga'],
    targetProblems:['lateralAsymmetry','thoracicKyphosis'],
    category:'asana', technique:'twist', bodyPart:'back', intensity:1,
    equipment:'マット', position:'supine', duration:'各1分',
    illustration: SVG2.spineTwist,
    purpose:'寝ながら脊柱を捻ってリラックス。',
    how:['仰向けで右膝を立て左に倒す。','視線は右。','1分。反対も。'],
    cues:{do:'両肩マット。',dont:'勢いつけない。'},
    why:'就寝前の最強ルーティン。'
  },

  // ============== RESTORATIVE & BREATH (14種) ==============
  {
    id:'yg_child_pose', name:'チャイルドポーズ', courses:['yoga'],
    targetProblems:['general','swayBack'],
    category:'asana', technique:'restorative', bodyPart:'back', intensity:1,
    equipment:'マット', position:'prone', duration:'2分',
    illustration: SVG2.childPose,
    purpose:'背中・お尻のリラックス。',
    how:['正座から両手を前に伸ばす。','額をマットに置く。','2分深呼吸。'],
    cues:{do:'呼吸で背中を膨らます。',dont:'力を入れない。'},
    why:'いつでも戻れる安全地帯。'
  },
  {
    id:'yg_downdog_y', name:'ダウンドッグ', courses:['yoga'],
    targetProblems:['posteriorPelvicTilt','roundedShoulders','ankleStiffness'],
    category:'asana', technique:'inversion', bodyPart:'fullbody', intensity:2,
    equipment:'マット', position:'quadruped', duration:'1分',
    illustration: SVG2.downDog,
    purpose:'全身のリセットポーズ。',
    how:['四つん這いからお尻を高く持ち上げ逆V字。','かかとを床へ。','1分。'],
    cues:{do:'背中を長く。',dont:'膝が曲がってもいい。'},
    why:'血流逆転＋全身ストレッチ。'
  },
  {
    id:'yg_legs_wall_y', name:'壁に脚アップ', courses:['yoga'],
    targetProblems:['swelling','general'],
    category:'asana', technique:'restorative', bodyPart:'leg', intensity:1,
    equipment:'壁', position:'supine', duration:'5分',
    illustration: SVG2.spineExt,
    purpose:'リンパ・血流の完全リセット。',
    how:['お尻を壁に近づけ仰向け。','両脚を壁に沿って上げる。','5分。'],
    cues:{do:'目を閉じる。',dont:'腰に違和感あれば中止。'},
    why:'夕方のむくみリセット。'
  },
  {
    id:'yg_corpse', name:'シャバアサナ(屍)', courses:['yoga'],
    targetProblems:['general'],
    category:'asana', technique:'restorative', bodyPart:'fullbody', intensity:1,
    equipment:'マット', position:'supine', duration:'10分',
    illustration: SVG2.meditation,
    purpose:'全身完全脱力のリラックス。',
    how:['仰向けで手のひら上、足は開く。','頭の先から脚先まで脱力。','10分。'],
    cues:{do:'眠ってもOK。',dont:'動かない。'},
    why:'ヨガの最重要ポーズ。'
  },
  {
    id:'yg_ujjayi', name:'ウジャイ呼吸', courses:['yoga'],
    targetProblems:['general'],
    category:'pranayama', technique:'breathing', bodyPart:'core', intensity:1,
    equipment:'なし', position:'sitting', duration:'3分',
    illustration: SVG2.breathing,
    purpose:'喉を絞った勝利の呼吸。',
    how:['あぐらで座り喉を軽く絞る。','「フゥー」と海の音のような呼吸。','3分。'],
    cues:{do:'吸う吐く均等に。',dont:'力を入れすぎない。'},
    why:'集中力と熱の生成。'
  },
  {
    id:'yg_nadi_shodhana', name:'ナディーショーダナ(片鼻呼吸)', courses:['yoga'],
    targetProblems:['general'],
    category:'pranayama', technique:'breathing', bodyPart:'core', intensity:1,
    equipment:'なし', position:'sitting', duration:'3分',
    illustration: SVG2.breathing,
    purpose:'左右の鼻を交互に使う調和呼吸。',
    how:['右手親指で右鼻を閉じ左鼻で吸う。','薬指で左鼻を閉じ右鼻で吐く。','逆も行い1サイクル。3分。'],
    cues:{do:'ゆっくり等しく。',dont:'急がない。'},
    why:'自律神経のバランス調整。'
  },
  {
    id:'yg_kapalbhati', name:'カパラバティ(火の呼吸)', courses:['yoga'],
    targetProblems:['general'],
    category:'pranayama', technique:'breathing', bodyPart:'core', intensity:2,
    equipment:'なし', position:'sitting', duration:'1分',
    illustration: SVG2.breathing,
    purpose:'お腹を凹ませる強い吐き出し。',
    how:['あぐらで座る。','短く強く鼻から吐く(お腹をへこます)。','吸うのは自然に。1分。'],
    cues:{do:'吐くに集中。',dont:'妊娠中・高血圧は避ける。'},
    why:'お腹引き締め＋脳活性化。'
  },
  {
    id:'yg_bhramari', name:'ブラマリ(蜂の呼吸)', courses:['yoga'],
    targetProblems:['general'],
    category:'pranayama', technique:'breathing', bodyPart:'core', intensity:1,
    equipment:'なし', position:'sitting', duration:'3分',
    illustration: SVG2.meditation,
    purpose:'蜂の羽音のような響きで瞑想。',
    how:['あぐらで座り目を閉じる。','鼻から吸い吐く時に「mmm」と低く響かす。','3分。'],
    cues:{do:'振動を頭蓋骨で感じる。',dont:'音を大きくしすぎない。'},
    why:'即効のストレス緩和。'
  },
  {
    id:'yg_lion_breath', name:'シンハ(獅子の呼吸)', courses:['yoga'],
    targetProblems:['general'],
    category:'pranayama', technique:'breathing', bodyPart:'core', intensity:1,
    equipment:'なし', position:'sitting', duration:'1分',
    illustration: SVG2.breathing,
    purpose:'顔の緊張と感情を解放。',
    how:['あぐらで吸い口を大きく開け舌を出す。','「ハー」と大きく吐く。','10回。'],
    cues:{do:'目も大きく開く。',dont:'恥ずかしがらずに。'},
    why:'顔のリラックス＋感情リリース。'
  },
  {
    id:'yg_body_scan', name:'ボディスキャン瞑想', courses:['yoga'],
    targetProblems:['general'],
    category:'meditation', technique:'meditation', bodyPart:'fullbody', intensity:1,
    equipment:'マット', position:'supine', duration:'10分',
    illustration: SVG2.meditation,
    purpose:'体の各部位に意識を向ける瞑想。',
    how:['仰向けで目を閉じる。','頭頂から足先へ順に意識を移す。','各部位で2-3呼吸。10分。'],
    cues:{do:'判断せずに観察。',dont:'眠気と戦わない。'},
    why:'マインドフルネスの王道。'
  },
  {
    id:'yg_breath_count', name:'呼吸カウント瞑想', courses:['yoga'],
    targetProblems:['general'],
    category:'meditation', technique:'meditation', bodyPart:'core', intensity:1,
    equipment:'なし', position:'sitting', duration:'5分',
    illustration: SVG2.meditation,
    purpose:'呼吸を数える基本瞑想。',
    how:['あぐらで座る。','1〜10まで吐く息を数える。','10になったら1に戻る。5分。'],
    cues:{do:'数を忘れたら1から。',dont:'自分を責めない。'},
    why:'瞑想初心者の最初の処方。'
  },
  {
    id:'yg_walking_meditation', name:'歩く瞑想', courses:['yoga'],
    targetProblems:['general'],
    category:'meditation', technique:'meditation', bodyPart:'fullbody', intensity:1,
    equipment:'なし', position:'standing', duration:'5分',
    illustration: SVG2.treePose,
    purpose:'動きの中で意識を保つ。',
    how:['ゆっくり歩く。','足裏の感覚に集中。','5分。'],
    cues:{do:'各歩を丁寧に。',dont:'急がない。'},
    why:'動きながらの瞑想入門。'
  },
  {
    id:'yg_supine_butterfly', name:'仰向けバタフライ', courses:['yoga'],
    targetProblems:['kneeValgus','general'],
    category:'asana', technique:'restorative', bodyPart:'hip', intensity:1,
    equipment:'マット', position:'supine', duration:'3分',
    illustration: SVG2.butterflyHip,
    purpose:'寝ながら股関節を開く。',
    how:['仰向けで両足裏を合わせる。','膝は自然に開く。','3分。'],
    cues:{do:'呼吸を深く。',dont:'力を入れない。'},
    why:'最も楽な股関節ストレッチ。'
  },
  {
    id:'yg_savasana_with_count', name:'カウントシャバアサナ', courses:['yoga'],
    targetProblems:['general'],
    category:'asana', technique:'restorative', bodyPart:'fullbody', intensity:1,
    equipment:'マット', position:'supine', duration:'7分',
    illustration: SVG2.meditation,
    purpose:'入眠スピード化されたシャバアサナ。',
    how:['仰向けで全身脱力。','4-7-8呼吸を組み合わせる。','7分。'],
    cues:{do:'眠ってもOK。',dont:'時計を見ない。'},
    why:'昼寝・夜の入眠に。'
  },

  // ============== EXPANSION PACK 1 — 立位アーサナ ==============
  {
    id:'yg_mountain_pose', name:'タダーサナ（山のポーズ）', courses:['yoga'],
    targetProblems:['general','forwardHead','roundedShoulders'],
    category:'asana', technique:'isometric', bodyPart:'fullbody', intensity:1,
    equipment:'マット', position:'standing', duration:'1分',
    illustration: SVG2.warrior,
    purpose:'全ての立位アーサナの基本。',
    how:['足を揃えて立つ。','頭頂から天に引かれる感覚。','1分。'],
    cues:{do:'重心は両足均等。',dont:'反り腰にしない。'},
    why:'立ち姿勢の質を整える。'
  },
  {
    id:'yg_chair_pose', name:'ウトゥカターサナ（椅子のポーズ）', courses:['yoga'],
    targetProblems:['anteriorPelvicTilt','posteriorPelvicTilt'],
    category:'asana', technique:'isometric', bodyPart:'leg', intensity:3,
    equipment:'マット', position:'standing', duration:'45秒 × 3セット',
    illustration: SVG2.squat,
    purpose:'下半身と背中を同時に。',
    how:['足を揃え膝を曲げる。','腕を頭上に。','45秒キープ。'],
    cues:{do:'体重はかかとに。',dont:'膝がつま先を超えない。'},
    why:'代謝アップと姿勢矯正の同時実現。'
  },
  {
    id:'yg_warrior_3', name:'ヴィーラバドラーサナIII', courses:['yoga'],
    targetProblems:['lateralAsymmetry','posteriorPelvicTilt'],
    category:'asana', technique:'balance', bodyPart:'fullbody', intensity:3,
    equipment:'マット', position:'standing', duration:'各30秒',
    illustration: SVG2.warrior,
    purpose:'片脚バランスと体幹強化。',
    how:['片脚立ちから上体と後脚を水平に。','Tの字に。','30秒。反対も。'],
    cues:{do:'軸足を強く。',dont:'骨盤を傾けない。'},
    why:'集中力と全身連動の最高峰。'
  },
  {
    id:'yg_warrior_reverse', name:'リバースウォリアー', courses:['yoga'],
    targetProblems:['thoracicKyphosis','lateralAsymmetry'],
    category:'asana', technique:'stretch', bodyPart:'core', intensity:2,
    equipment:'マット', position:'standing', duration:'各30秒',
    illustration: SVG2.warrior,
    purpose:'ウォリアーIIから体側を伸ばす。',
    how:['ウォリアーIIから前腕を上に。','後ろ手を後脚に滑らせる。','30秒。'],
    cues:{do:'体側を長く。',dont:'前膝を伸ばさない。'},
    why:'体側のストレッチと脚力。'
  },
  {
    id:'yg_extended_side_angle', name:'パールシュヴァコナーサナ', courses:['yoga'],
    targetProblems:['thoracicKyphosis','lateralAsymmetry'],
    category:'asana', technique:'stretch', bodyPart:'core', intensity:2,
    equipment:'マット', position:'standing', duration:'各30秒',
    illustration: SVG2.triangle,
    purpose:'体側を最大伸展。',
    how:['ウォリアーIIから前肘を前膝に。','上腕を頭上に伸ばす。','30秒。'],
    cues:{do:'体を一直線に。',dont:'胸を下に向けない。'},
    why:'肋間と腰方形筋の伸展。'
  },
  {
    id:'yg_revolved_triangle', name:'パリヴリッタトリコナーサナ', courses:['yoga'],
    targetProblems:['lateralAsymmetry','roundedShoulders'],
    category:'asana', technique:'integration', bodyPart:'core', intensity:3,
    equipment:'マット', position:'standing', duration:'各30秒',
    illustration: SVG2.triangle,
    purpose:'回旋を伴うトリコナーサナ。',
    how:['足を開き、反対手を前足の外側へ。','上腕を天井に。','30秒。'],
    cues:{do:'背骨を捻る。',dont:'背中を丸めない。'},
    why:'解毒と回旋柔軟性。'
  },
  {
    id:'yg_half_moon', name:'アルダチャンドラーサナ', courses:['yoga'],
    targetProblems:['lateralAsymmetry','kneeValgus'],
    category:'asana', technique:'balance', bodyPart:'fullbody', intensity:3,
    equipment:'マット', position:'standing', duration:'各30秒',
    illustration: SVG2.triangle,
    purpose:'片脚立ちでバランス挑戦。',
    how:['前足に体重移し後脚と上腕を伸ばす。','体を横向きに。','30秒。'],
    cues:{do:'天井を見る。',dont:'前傾しない。'},
    why:'集中とバランスの統合。'
  },
  {
    id:'yg_eagle_pose', name:'ガルダーサナ（鷲のポーズ）', courses:['yoga'],
    targetProblems:['roundedShoulders','lateralAsymmetry'],
    category:'asana', technique:'balance', bodyPart:'fullbody', intensity:3,
    equipment:'マット', position:'standing', duration:'各30秒',
    illustration: SVG2.treePose,
    purpose:'肩と股関節を解きほぐすバランス。',
    how:['片脚を反対脚に巻きつける。','腕も同様。','30秒。'],
    cues:{do:'肩甲骨を広げる。',dont:'胸を反らない。'},
    why:'肩こり・腰痛改善の万能種目。'
  },
  {
    id:'yg_dancer_pose', name:'ナタラージャーサナ（踊り神）', courses:['yoga'],
    targetProblems:['anteriorPelvicTilt','thoracicKyphosis'],
    category:'asana', technique:'balance', bodyPart:'fullbody', intensity:3,
    equipment:'マット', position:'standing', duration:'各30秒',
    illustration: SVG2.warrior,
    purpose:'前ももストレッチとバランス。',
    how:['片脚立ち、後脚を掴み後方に。','前腕は前へ。','30秒。'],
    cues:{do:'胸を持ち上げる。',dont:'軸足の膝を緩めない。'},
    why:'美しさと強さの統合。'
  },
  {
    id:'yg_chair_twist', name:'ねじった椅子のポーズ', courses:['yoga'],
    targetProblems:['roundedShoulders','lateralAsymmetry'],
    category:'asana', technique:'integration', bodyPart:'core', intensity:2,
    equipment:'マット', position:'standing', duration:'各30秒',
    illustration: SVG2.spineTwist,
    purpose:'椅子のポーズから捻りを加える。',
    how:['椅子のポーズで合掌。','片肘を反対の太ももに。','30秒。'],
    cues:{do:'胸から捻る。',dont:'膝のラインを崩さない。'},
    why:'内臓刺激と背骨柔軟。'
  },

  // ============== EXPANSION PACK 1 — 前屈・後屈系 ==============
  {
    id:'yg_standing_forward_fold', name:'ウッターナーサナ（立位前屈）', courses:['yoga'],
    targetProblems:['posteriorPelvicTilt','thoracicKyphosis'],
    category:'asana', technique:'stretch', bodyPart:'back', intensity:1,
    equipment:'マット', position:'standing', duration:'1分',
    illustration: SVG2.forwardFold,
    purpose:'背面全体を弛緩。',
    how:['足を腰幅で立ち、前屈。','手は床か脛。','1分。'],
    cues:{do:'頭を脱力。',dont:'膝を伸ばしすぎない。'},
    why:'背中・ハムストリングの解放。'
  },
  {
    id:'yg_rag_doll', name:'ラグドール', courses:['yoga'],
    targetProblems:['roundedShoulders','forwardHead'],
    category:'asana', technique:'stretch', bodyPart:'back', intensity:1,
    equipment:'マット', position:'standing', duration:'1分',
    illustration: SVG2.forwardFold,
    purpose:'前屈で肘を交互に持つ。',
    how:['前屈で肘を反対手で持つ。','左右に揺れる。','1分。'],
    cues:{do:'脱力する。',dont:'力まない。'},
    why:'首・肩の脱力に最適。'
  },
  {
    id:'yg_seated_forward_fold', name:'パスチモッターナーサナ（座位前屈）', courses:['yoga'],
    targetProblems:['posteriorPelvicTilt'],
    category:'asana', technique:'stretch', bodyPart:'leg', intensity:1,
    equipment:'マット', position:'sitting', duration:'2分',
    illustration: SVG2.forwardFold,
    purpose:'長座から深い前屈。',
    how:['長座で前屈。','手は足や脛に。','2分。'],
    cues:{do:'背骨を長く。',dont:'背中を丸めすぎない。'},
    why:'背面全体の伸展。'
  },
  {
    id:'yg_head_to_knee', name:'ジャーヌシルシャーサナ', courses:['yoga'],
    targetProblems:['lateralAsymmetry','posteriorPelvicTilt'],
    category:'asana', technique:'stretch', bodyPart:'leg', intensity:1,
    equipment:'マット', position:'sitting', duration:'各1分',
    illustration: SVG2.forwardFold,
    purpose:'片脚前屈で内転筋もケア。',
    how:['長座、片脚を内ももに。','伸ばした脚に前屈。','1分。'],
    cues:{do:'頭は膝へ。',dont:'背中を丸めすぎない。'},
    why:'片脚ずつ丁寧に伸展。'
  },
  {
    id:'yg_wide_legged_fold', name:'プラサーリタパドッターナーサナ', courses:['yoga'],
    targetProblems:['posteriorPelvicTilt'],
    category:'asana', technique:'stretch', bodyPart:'leg', intensity:1,
    equipment:'マット', position:'standing', duration:'1分',
    illustration: SVG2.forwardFold,
    purpose:'足を広げて深い前屈。',
    how:['足を大きく開いて前屈。','手は床に。','1分。'],
    cues:{do:'頭頂を床へ。',dont:'背中を丸めすぎない。'},
    why:'内転筋・ハムストリングの開放。'
  },
  {
    id:'yg_camel_pose', name:'ウシュトラーサナ（ラクダ）', courses:['yoga'],
    targetProblems:['thoracicKyphosis','roundedShoulders','forwardHead'],
    category:'asana', technique:'stretch', bodyPart:'chest', intensity:3,
    equipment:'マット', position:'kneeling', duration:'30秒 × 2セット',
    illustration: SVG2.spineExt,
    purpose:'胸を開く後屈の代表。',
    how:['膝立ちで腰に手。','胸を持ち上げ後屈。','30秒。'],
    cues:{do:'お尻を絞る。',dont:'首を後ろに倒さない。'},
    why:'デスクワーク疲れに即効。'
  },
  {
    id:'yg_bow_pose', name:'ダヌラーサナ（弓）', courses:['yoga'],
    targetProblems:['thoracicKyphosis','anteriorPelvicTilt'],
    category:'asana', technique:'stretch', bodyPart:'chest', intensity:3,
    equipment:'マット', position:'prone', duration:'30秒 × 3セット',
    illustration: SVG2.bow,
    purpose:'前面全体を強く伸ばす。',
    how:['うつ伏せ、足首を掴む。','足で手を引きつつ胸を上げる。','30秒。'],
    cues:{do:'呼吸を続ける。',dont:'息を止めない。'},
    why:'前面全体の解放。'
  },
  {
    id:'yg_locust_pose', name:'シャラバーサナ（バッタ）', courses:['yoga'],
    targetProblems:['thoracicKyphosis','posteriorPelvicTilt'],
    category:'asana', technique:'strength', bodyPart:'back', intensity:2,
    equipment:'マット', position:'prone', duration:'30秒 × 3セット',
    illustration: SVG2.superman,
    purpose:'背面を強化する。',
    how:['うつ伏せから手脚を浮かす。','胸も持ち上げる。','30秒。'],
    cues:{do:'お尻を絞る。',dont:'首を反らない。'},
    why:'背筋強化と姿勢矯正。'
  },
  {
    id:'yg_fish_pose', name:'マツヤーサナ（魚）', courses:['yoga'],
    targetProblems:['forwardHead','thoracicKyphosis','roundedShoulders'],
    category:'asana', technique:'stretch', bodyPart:'chest', intensity:1,
    equipment:'マット', position:'supine', duration:'1分',
    illustration: SVG2.spineExt,
    purpose:'胸を開き喉も伸ばす。',
    how:['仰向け、肘で支え胸を持ち上げる。','頭頂を床に。','1分。'],
    cues:{do:'胸を高く。',dont:'首に体重を乗せない。'},
    why:'巻き肩・首の解放。'
  },
  {
    id:'yg_wheel_pose', name:'ウルドゥヴァダヌラーサナ（車輪）', courses:['yoga'],
    targetProblems:['thoracicKyphosis','roundedShoulders'],
    category:'asana', technique:'strength', bodyPart:'fullbody', intensity:3,
    equipment:'マット', position:'supine', duration:'15秒 × 3セット',
    illustration: SVG2.bridge,
    purpose:'全身を弓状に持ち上げる。',
    how:['仰向け、手を耳元に置く。','体を持ち上げて弓状に。','15秒。'],
    cues:{do:'肘を伸ばす。',dont:'呼吸を止めない。'},
    why:'体の前面全体の最大伸展。'
  },
  {
    id:'yg_supported_bridge', name:'セツバンダーサナ', courses:['yoga'],
    targetProblems:['thoracicKyphosis','posteriorPelvicTilt'],
    category:'asana', technique:'stretch', bodyPart:'chest', intensity:1,
    equipment:'マット', position:'supine', duration:'2分',
    illustration: SVG2.bridge,
    purpose:'軽い後屈で胸を開く。',
    how:['仰向け、お尻を持ち上げる。','手を体の下で組む。','2分。'],
    cues:{do:'肩を内側に。',dont:'首を動かさない。'},
    why:'初心者でもできる後屈。'
  },

  // ============== EXPANSION PACK 1 — 逆転・コアアーサナ ==============
  {
    id:'yg_legs_up_wall', name:'ヴィパリータカラニ（壁脚上げ）', courses:['yoga'],
    targetProblems:['general'],
    category:'asana', technique:'restorative', bodyPart:'leg', intensity:1,
    equipment:'壁', position:'supine', duration:'5分',
    illustration: SVG2.legRaise,
    purpose:'回復のための逆転。',
    how:['壁にお尻を寄せて脚を上げる。','5分。'],
    cues:{do:'リラックス。',dont:'力まない。'},
    why:'足のむくみ解消・睡眠改善。'
  },
  {
    id:'yg_plow_pose', name:'ハラーサナ（鋤）', courses:['yoga'],
    targetProblems:['forwardHead','thoracicKyphosis'],
    category:'asana', technique:'stretch', bodyPart:'back', intensity:3,
    equipment:'マット', position:'supine', duration:'1分',
    illustration: SVG2.spineFlex,
    purpose:'肩立ちから足を頭の後ろに。',
    how:['仰向けから脚を頭上を超え床へ。','1分。'],
    cues:{do:'呼吸を続ける。',dont:'首を動かさない。'},
    why:'背骨全体の伸展。'
  },
  {
    id:'yg_shoulder_stand', name:'サラムバサルヴァンガーサナ（肩立ち）', courses:['yoga'],
    targetProblems:['general'],
    category:'asana', technique:'isometric', bodyPart:'fullbody', intensity:3,
    equipment:'マット', position:'supine', duration:'1分',
    illustration: SVG2.legRaise,
    purpose:'全アーサナの女王と呼ばれる。',
    how:['仰向けから脚を真上に。','腰を手で支える。','1分。'],
    cues:{do:'体を一直線に。',dont:'首を動かさない。'},
    why:'循環改善・若返り。'
  },
  {
    id:'yg_boat_pose', name:'ナーヴァーサナ（船）', courses:['yoga'],
    targetProblems:['anteriorPelvicTilt'],
    category:'core', technique:'isometric', bodyPart:'core', intensity:3,
    equipment:'マット', position:'sitting', duration:'30秒 × 3セット',
    illustration: SVG2.vsit,
    purpose:'Vの字でコアを強化。',
    how:['座位で脚と胸を持ち上げる。','腕は前に。','30秒。'],
    cues:{do:'背筋を保つ。',dont:'背中を丸めない。'},
    why:'体幹の代表種目。'
  },
  {
    id:'yg_half_boat', name:'アルダナーヴァーサナ', courses:['yoga'],
    targetProblems:['anteriorPelvicTilt'],
    category:'core', technique:'isometric', bodyPart:'core', intensity:2,
    equipment:'マット', position:'sitting', duration:'30秒 × 3セット',
    illustration: SVG2.vsit,
    purpose:'船のポーズの初級。',
    how:['膝を曲げて脛を床と平行に。','腕を前に。','30秒。'],
    cues:{do:'胸を持ち上げる。',dont:'背中を丸めない。'},
    why:'船への段階練習。'
  },
  {
    id:'yg_side_plank_yoga', name:'ヴァシシュターサナ（横向き板）', courses:['yoga'],
    targetProblems:['lateralAsymmetry','roundedShoulders'],
    category:'core', technique:'isometric', bodyPart:'core', intensity:3,
    equipment:'マット', position:'side', duration:'各30秒',
    illustration: SVG2.sidePlank,
    purpose:'横向きで全身支持。',
    how:['横向きで片手と片足で支える。','30秒。反対も。'],
    cues:{do:'体一直線。',dont:'腰を落とさない。'},
    why:'体側強化の代表種目。'
  },
  {
    id:'yg_dolphin_pose', name:'ドルフィン', courses:['yoga'],
    targetProblems:['roundedShoulders','thoracicKyphosis'],
    category:'asana', technique:'strength', bodyPart:'arm', intensity:2,
    equipment:'マット', position:'prone', duration:'30秒 × 3セット',
    illustration: SVG2.downDog,
    purpose:'肘で支えるダウンドッグ。',
    how:['前腕を床に。','お尻を高く。','30秒。'],
    cues:{do:'前腕で押す。',dont:'頭を下げない。'},
    why:'倒立への布石。'
  },
  {
    id:'yg_crow_pose', name:'バカーサナ（鶴）', courses:['yoga'],
    targetProblems:['roundedShoulders'],
    category:'asana', technique:'balance', bodyPart:'arm', intensity:3,
    equipment:'マット', position:'standing', duration:'15秒 × 3セット',
    illustration: SVG2.plank,
    purpose:'手のひらだけで支えるアームバランス。',
    how:['しゃがんで膝を上腕に。','体重を前に。','15秒。'],
    cues:{do:'視線を前。',dont:'頭から落ちない。'},
    why:'集中力と体幹の融合。'
  },

  // ============== EXPANSION PACK 1 — 股関節・座位 ==============
  {
    id:'yg_lizard_pose', name:'ウッターナプリスターサナ（トカゲ）', courses:['yoga'],
    targetProblems:['anteriorPelvicTilt','lateralAsymmetry'],
    category:'asana', technique:'stretch', bodyPart:'hip', intensity:2,
    equipment:'マット', position:'kneeling', duration:'各1分',
    illustration: SVG2.lungeStretch,
    purpose:'深い股関節屈筋ストレッチ。',
    how:['ローランジから前足の内側に両手を。','肘を床に。','1分。'],
    cues:{do:'呼吸で深める。',dont:'腰を反らない。'},
    why:'股関節の最深部に届く。'
  },
  {
    id:'yg_lunge_low', name:'アンジャネヤーサナ（三日月）', courses:['yoga'],
    targetProblems:['anteriorPelvicTilt','thoracicKyphosis'],
    category:'asana', technique:'stretch', bodyPart:'hip', intensity:1,
    equipment:'マット', position:'kneeling', duration:'各1分',
    illustration: SVG2.lungeStretch,
    purpose:'前後脚で前面を伸ばす。',
    how:['ローランジで後膝を床に。','腕を天井に。','1分。'],
    cues:{do:'胸を開く。',dont:'前膝がつま先を超えない。'},
    why:'股関節と胸の同時開放。'
  },
  {
    id:'yg_frog_pose', name:'マンドゥーカーサナ（蛙）', courses:['yoga'],
    targetProblems:['anteriorPelvicTilt','kneeValgus'],
    category:'asana', technique:'stretch', bodyPart:'hip', intensity:2,
    equipment:'マット', position:'kneeling', duration:'2分',
    illustration: SVG2.butterflyHip,
    purpose:'股関節を大きく開く。',
    how:['四つん這いから膝を外に開く。','前腕で支える。','2分。'],
    cues:{do:'深い呼吸。',dont:'痛みは出さない。'},
    why:'内転筋・股関節の解放。'
  },
  {
    id:'yg_butterfly_pose', name:'バッダコナーサナ（蝶）', courses:['yoga'],
    targetProblems:['anteriorPelvicTilt'],
    category:'asana', technique:'stretch', bodyPart:'hip', intensity:1,
    equipment:'マット', position:'sitting', duration:'2分',
    illustration: SVG2.butterflyHip,
    purpose:'足裏を合わせて股関節開放。',
    how:['座位で足裏を合わせる。','膝を床に近づける。','2分。'],
    cues:{do:'呼吸でゆるめる。',dont:'膝を押し下げすぎない。'},
    why:'股関節の入門ストレッチ。'
  },
  {
    id:'yg_cow_face', name:'ゴームカーサナ（牛面）', courses:['yoga'],
    targetProblems:['lateralAsymmetry','roundedShoulders'],
    category:'asana', technique:'stretch', bodyPart:'hip', intensity:2,
    equipment:'マット', position:'sitting', duration:'各1分',
    illustration: SVG2.shoulderBlade,
    purpose:'お尻と肩を同時に開く。',
    how:['膝を重ねて座る。','腕を背中で組む。','1分。'],
    cues:{do:'背筋を保つ。',dont:'反り腰にならない。'},
    why:'四十肩・坐骨神経痛改善。'
  },
  {
    id:'yg_seated_wide_legs', name:'ウパヴィシュタコナーサナ（座位開脚）', courses:['yoga'],
    targetProblems:['posteriorPelvicTilt','anteriorPelvicTilt'],
    category:'asana', technique:'stretch', bodyPart:'leg', intensity:2,
    equipment:'マット', position:'sitting', duration:'2分',
    illustration: SVG2.forwardFold,
    purpose:'座位で大きく開脚。',
    how:['長座から大きく脚を開く。','前屈する。','2分。'],
    cues:{do:'背筋を保つ。',dont:'膝を内に向けない。'},
    why:'内転筋・ハムの開放。'
  },
  {
    id:'yg_half_lord_of_fishes', name:'アルダマツィエンドラーサナ', courses:['yoga'],
    targetProblems:['lateralAsymmetry','roundedShoulders'],
    category:'asana', technique:'integration', bodyPart:'core', intensity:2,
    equipment:'マット', position:'sitting', duration:'各1分',
    illustration: SVG2.seatedTwist,
    purpose:'座位ねじりの代表。',
    how:['座位で片脚を反対の外に。','体を捻る。','1分。'],
    cues:{do:'胸から捻る。',dont:'背中を丸めない。'},
    why:'内臓刺激と解毒。'
  },
  {
    id:'yg_easy_pose', name:'スカーサナ（あぐら）', courses:['yoga'],
    targetProblems:['general'],
    category:'asana', technique:'meditation', bodyPart:'core', intensity:1,
    equipment:'マット', position:'sitting', duration:'5分',
    illustration: SVG2.meditation,
    purpose:'瞑想の基本姿勢。',
    how:['楽なあぐら。','背筋を伸ばす。','5分。'],
    cues:{do:'坐骨で座る。',dont:'背中を丸めない。'},
    why:'呼吸と内観の準備。'
  },
  {
    id:'yg_hero_pose', name:'ヴィーラーサナ（英雄座）', courses:['yoga'],
    targetProblems:['anteriorPelvicTilt'],
    category:'asana', technique:'stretch', bodyPart:'leg', intensity:2,
    equipment:'マット', position:'kneeling', duration:'2分',
    illustration: SVG2.meditation,
    purpose:'膝を曲げて正座より深い座。',
    how:['正座から脚を外に。','お尻を床に。','2分。'],
    cues:{do:'背筋を伸ばす。',dont:'膝に痛みを感じない。'},
    why:'前ももの強烈なストレッチ。'
  },
  {
    id:'yg_reclining_hero', name:'スプタヴィーラーサナ', courses:['yoga'],
    targetProblems:['anteriorPelvicTilt','thoracicKyphosis'],
    category:'asana', technique:'stretch', bodyPart:'leg', intensity:3,
    equipment:'マット', position:'supine', duration:'2分',
    illustration: SVG2.spineExt,
    purpose:'英雄座から仰向けへ。',
    how:['英雄座から体を後ろに。','床に背中をつける。','2分。'],
    cues:{do:'痛みなく。',dont:'無理しない。'},
    why:'前面全体の深いストレッチ。'
  },

  // ============== EXPANSION PACK 1 — 呼吸・瞑想 ==============
  {
    id:'yg_alternate_nostril', name:'ナーディショーダナ（片鼻呼吸）', courses:['yoga'],
    targetProblems:['general'],
    category:'breath', technique:'pranayama', bodyPart:'core', intensity:1,
    equipment:'なし', position:'sitting', duration:'5分',
    illustration: SVG2.breathing,
    purpose:'左右の神経バランスを整える。',
    how:['右手で右鼻を閉じ左から吸う。','左を閉じ右から吐く。','5分。'],
    cues:{do:'ゆっくり。',dont:'力まない。'},
    why:'自律神経の最強リセット。'
  },
  {
    id:'yg_kapalabhati', name:'カパラバティ（火の呼吸）', courses:['yoga'],
    targetProblems:['general'],
    category:'breath', technique:'pranayama', bodyPart:'core', intensity:2,
    equipment:'なし', position:'sitting', duration:'30秒 × 3セット',
    illustration: SVG2.breathing,
    purpose:'お腹で素早く吐く呼吸。',
    how:['鼻から短く強く吐き続ける。','吸う息は自然。','30秒。'],
    cues:{do:'お腹を引き込む。',dont:'肩を上げない。'},
    why:'代謝アップと頭の冴え。'
  },
  {
    id:'yg_bhramari', name:'ブラマリ（蜂の呼吸）', courses:['yoga'],
    targetProblems:['general'],
    category:'breath', technique:'pranayama', bodyPart:'core', intensity:1,
    equipment:'なし', position:'sitting', duration:'3分',
    illustration: SVG2.breathing,
    purpose:'吐く息で蜂のような音を出す。',
    how:['吸って吐きながら「んー」と唸る。','3分。'],
    cues:{do:'振動を感じる。',dont:'喉に力まない。'},
    why:'不安・不眠の即時緩和。'
  },
  {
    id:'yg_ujjayi_long', name:'ロングウジャイ', courses:['yoga'],
    targetProblems:['general'],
    category:'breath', technique:'pranayama', bodyPart:'core', intensity:1,
    equipment:'なし', position:'sitting', duration:'5分',
    illustration: SVG2.breathing,
    purpose:'長く深い海の呼吸。',
    how:['喉を絞り、波の音を出す。','5分。'],
    cues:{do:'吸う8秒吐く8秒。',dont:'速くしない。'},
    why:'深いリラックスへ。'
  },
  {
    id:'yg_lion_breath', name:'シンハ（ライオン呼吸）', courses:['yoga'],
    targetProblems:['general','forwardHead'],
    category:'breath', technique:'pranayama', bodyPart:'core', intensity:1,
    equipment:'なし', position:'sitting', duration:'5回 × 2セット',
    illustration: SVG2.breathing,
    purpose:'舌を出して「ハー」と吐く。',
    how:['吸って、舌を出し目を見開く。','「ハー」と吐く。','5回。'],
    cues:{do:'全力で吐く。',dont:'恥ずかしがらない。'},
    why:'顔の表情筋・喉の解放。'
  },
  {
    id:'yg_body_scan', name:'ボディスキャン瞑想', courses:['yoga'],
    targetProblems:['general'],
    category:'meditation', technique:'meditation', bodyPart:'fullbody', intensity:1,
    equipment:'マット', position:'supine', duration:'10分',
    illustration: SVG2.meditation,
    purpose:'全身を意識でスキャン。',
    how:['仰向けで足先から頭頂まで意識を巡らす。','10分。'],
    cues:{do:'感じるだけ。',dont:'評価しない。'},
    why:'マインドフルネスの基礎。'
  },
  {
    id:'yg_loving_kindness', name:'メッタ（慈悲の瞑想）', courses:['yoga'],
    targetProblems:['general'],
    category:'meditation', technique:'meditation', bodyPart:'core', intensity:1,
    equipment:'なし', position:'sitting', duration:'10分',
    illustration: SVG2.meditation,
    purpose:'慈しみの心を育てる。',
    how:['自分・大切な人・苦手な人へ慈悲を送る。','10分。'],
    cues:{do:'感情を流す。',dont:'無理しない。'},
    why:'心の壁を溶かす。'
  },
  {
    id:'yg_mantra_meditation', name:'マントラ瞑想', courses:['yoga'],
    targetProblems:['general'],
    category:'meditation', technique:'meditation', bodyPart:'core', intensity:1,
    equipment:'なし', position:'sitting', duration:'10分',
    illustration: SVG2.meditation,
    purpose:'マントラを心で繰り返す。',
    how:['「ソーハム」など内なる声で繰り返す。','10分。'],
    cues:{do:'リズムに乗る。',dont:'評価しない。'},
    why:'集中力の根を育てる。'
  },
  {
    id:'yg_pratipaksha', name:'プラティパクシャ瞑想', courses:['yoga'],
    targetProblems:['general'],
    category:'meditation', technique:'meditation', bodyPart:'core', intensity:1,
    equipment:'なし', position:'sitting', duration:'5分',
    illustration: SVG2.meditation,
    purpose:'反対の想いで上書きする。',
    how:['ネガティブが浮かんだら反対の想いを置く。','5分。'],
    cues:{do:'丁寧に。',dont:'抑圧しない。'},
    why:'感情の自由を取り戻す。'
  },
];

export { DB_YOGA };
