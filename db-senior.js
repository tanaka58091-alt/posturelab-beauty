// ===================================================================
// SENIOR-FRIENDLY POOL (40〜70代女性・道具なし・低中強度)
// 全コース横断で採用される、安全で効くベーシック種目集
// ===================================================================

import { SVG2 } from './svg-library.js';

const ALL_COURSES = ['seitai','personal','yoga','pilates'];

const DB_SENIOR = [
  // ============== 首・頭部のセルフケア ==============
  {
    id:'sn_neck_circle', name:'首ゆらし', courses:ALL_COURSES,
    targetProblems:['forwardHead','general'],
    category:'selfcare', technique:'mobility', bodyPart:'neck', intensity:1,
    equipment:'なし', position:'sitting', duration:'各方向5回',
    illustration: SVG2.neckRotation,
    purpose:'首をやさしく回す。',
    how:['座位で頭をゆっくり右回り。','5回。逆回りも。'],
    cues:{do:'息を吐きながら。',dont:'痛みは出さない。'},
    why:'頸椎まわりの血流促進。'
  },
  {
    id:'sn_chin_to_chest', name:'うなずきストレッチ', courses:ALL_COURSES,
    targetProblems:['forwardHead','roundedShoulders'],
    category:'selfcare', technique:'stretch', bodyPart:'neck', intensity:1,
    equipment:'なし', position:'sitting', duration:'15秒 × 3回',
    illustration: SVG2.neckTilt,
    purpose:'あごを胸に近づける軽い前屈。',
    how:['座位であごを引きうなずく。','後頭部が伸びる感覚で15秒。'],
    cues:{do:'息を吐きながら。',dont:'肩を上げない。'},
    why:'後頭下筋群をやさしく緩める。'
  },
  {
    id:'sn_ear_to_shoulder', name:'耳〜肩ストレッチ', courses:ALL_COURSES,
    targetProblems:['forwardHead','lateralAsymmetry'],
    category:'selfcare', technique:'stretch', bodyPart:'neck', intensity:1,
    equipment:'なし', position:'sitting', duration:'各20秒',
    illustration: SVG2.neckSide,
    purpose:'耳を肩へ近づけ首側面を伸ばす。',
    how:['座位、片耳を肩へゆっくり倒す。','20秒。反対も。'],
    cues:{do:'肩は下げる。',dont:'反動をつけない。'},
    why:'肩こり・首こりの即時緩和。'
  },
  {
    id:'sn_jaw_relax', name:'あご脱力', courses:ALL_COURSES,
    targetProblems:['forwardHead','general'],
    category:'selfcare', technique:'release', bodyPart:'face', intensity:1,
    equipment:'なし', position:'sitting', duration:'1分',
    illustration: SVG2.jawRelease,
    purpose:'あごの緊張を抜く。',
    how:['口を半開きにして舌を上あごから離す。','1分脱力。'],
    cues:{do:'呼吸を続ける。',dont:'歯を食いしばらない。'},
    why:'食いしばり・歯ぎしり対策。'
  },

  // ============== 肩・胸郭の解放 ==============
  {
    id:'sn_shoulder_shrug', name:'肩すくめストン', courses:ALL_COURSES,
    targetProblems:['roundedShoulders','forwardHead'],
    category:'selfcare', technique:'release', bodyPart:'shoulder', intensity:1,
    equipment:'なし', position:'sitting', duration:'10回',
    illustration: SVG2.shoulderRoll,
    purpose:'肩をすくめて一気に脱力。',
    how:['息を吸って肩を耳に近づける。','吐きながらストンと落とす。','10回。'],
    cues:{do:'落とす時に脱力。',dont:'力を入れ続けない。'},
    why:'僧帽筋上部の即時緩和。'
  },
  {
    id:'sn_arm_swing_easy', name:'腕ぶらぶら', courses:ALL_COURSES,
    targetProblems:['roundedShoulders','general'],
    category:'selfcare', technique:'mobility', bodyPart:'shoulder', intensity:1,
    equipment:'なし', position:'standing', duration:'1分',
    illustration: SVG2.shoulderRoll,
    purpose:'腕を前後にぶらぶら振る。',
    how:['立位で両腕を前後に。','1分。'],
    cues:{do:'力を抜く。',dont:'振り回さない。'},
    why:'肩の血流改善。'
  },
  {
    id:'sn_open_close_arms', name:'胸開閉エクササイズ', courses:ALL_COURSES,
    targetProblems:['roundedShoulders','thoracicKyphosis'],
    category:'selfcare', technique:'mobility', bodyPart:'chest', intensity:1,
    equipment:'なし', position:'sitting', duration:'10回',
    illustration: SVG2.shoulderOpen,
    purpose:'腕を前で合わせて後ろに開く。',
    how:['前で手を合わせる。','後ろに大きく開く。','10回。'],
    cues:{do:'胸郭で動かす。',dont:'反り腰にならない。'},
    why:'巻き肩の即効改善。'
  },
  {
    id:'sn_finger_lace_overhead', name:'頭上ストレッチ', courses:ALL_COURSES,
    targetProblems:['roundedShoulders','thoracicKyphosis','lateralAsymmetry'],
    category:'selfcare', technique:'stretch', bodyPart:'shoulder', intensity:1,
    equipment:'なし', position:'sitting', duration:'30秒 × 2回',
    illustration: SVG2.sideStretch,
    purpose:'指を組んで頭上で伸びる。',
    how:['指を組み手のひらを返して頭上へ。','30秒。'],
    cues:{do:'肋骨を引き上げる。',dont:'肩がすくまない。'},
    why:'肩甲帯と体側の同時開放。'
  },
  {
    id:'sn_w_squeeze', name:'W字スクイーズ', courses:ALL_COURSES,
    targetProblems:['roundedShoulders','thoracicKyphosis','forwardHead'],
    category:'training', technique:'strength', bodyPart:'back', intensity:1,
    equipment:'なし', position:'sitting', duration:'15回',
    illustration: SVG2.shoulderBlade,
    purpose:'肘を曲げてW字で肩甲骨を寄せる。',
    how:['両肘を90度に曲げる。','肩甲骨を中央に寄せる。','15回。'],
    cues:{do:'お腹に力を入れて。',dont:'反り腰にならない。'},
    why:'巻き肩のもっとも基本の改善種目。'
  },
  {
    id:'sn_scapular_clock', name:'肩甲骨クロック', courses:ALL_COURSES,
    targetProblems:['roundedShoulders','thoracicKyphosis'],
    category:'selfcare', technique:'mobility', bodyPart:'shoulder', intensity:1,
    equipment:'なし', position:'standing', duration:'2周',
    illustration: SVG2.shoulderRoll,
    purpose:'肩甲骨で大きな円を描く。',
    how:['立位、肩で前→上→後ろ→下と円を。','2周ずつ。'],
    cues:{do:'大きく動かす。',dont:'首をすくめない。'},
    why:'肩甲骨の可動域回復。'
  },

  // ============== 背中・胸郭のモビリティ ==============
  {
    id:'sn_seated_cat_cow', name:'座位キャット&カウ', courses:ALL_COURSES,
    targetProblems:['thoracicKyphosis','anteriorPelvicTilt','posteriorPelvicTilt'],
    category:'selfcare', technique:'mobility', bodyPart:'back', intensity:1,
    equipment:'なし', position:'sitting', duration:'10回',
    illustration: SVG2.catCowPose,
    purpose:'座位で背中を丸めて反らす。',
    how:['座位で両手を膝に。','丸めて、反らす。10回。'],
    cues:{do:'呼吸と連動。',dont:'勢いを使わない。'},
    why:'背骨の流動性回復。'
  },
  {
    id:'sn_seated_side_stretch', name:'座位サイドストレッチ', courses:ALL_COURSES,
    targetProblems:['lateralAsymmetry','thoracicKyphosis'],
    category:'selfcare', technique:'stretch', bodyPart:'core', intensity:1,
    equipment:'なし', position:'sitting', duration:'各30秒',
    illustration: SVG2.sideStretch,
    purpose:'座位で体側を伸ばす。',
    how:['座位、片手を頭上へ。','反対側にゆっくり倒す。','30秒。'],
    cues:{do:'胸郭から動く。',dont:'前傾しない。'},
    why:'体側の柔軟性回復。'
  },
  {
    id:'sn_thoracic_extension', name:'胸椎エクステンション', courses:ALL_COURSES,
    targetProblems:['thoracicKyphosis','roundedShoulders'],
    category:'selfcare', technique:'mobility', bodyPart:'back', intensity:1,
    equipment:'なし', position:'sitting', duration:'5回',
    illustration: SVG2.spineExt,
    purpose:'胸を持ち上げて反らす。',
    how:['座位、手を後頭部に。','胸を持ち上げてやさしく反らす。','5回。'],
    cues:{do:'胸から反る。',dont:'腰で反らない。'},
    why:'猫背改善の核心動作。'
  },
  {
    id:'sn_seated_twist_easy', name:'やさしい座位ねじり', courses:ALL_COURSES,
    targetProblems:['lateralAsymmetry','roundedShoulders'],
    category:'selfcare', technique:'mobility', bodyPart:'core', intensity:1,
    equipment:'なし', position:'sitting', duration:'各30秒',
    illustration: SVG2.seatedTwist,
    purpose:'座位で体を捻る。',
    how:['座位で片手を反対の膝外側に。','息を吐きながら捻る。','30秒。'],
    cues:{do:'背筋を保つ。',dont:'丸めない。'},
    why:'背骨の回旋復活。'
  },
  {
    id:'sn_quadruped_thread_needle', name:'スレッドニードル', courses:ALL_COURSES,
    targetProblems:['roundedShoulders','thoracicKyphosis','lateralAsymmetry'],
    category:'selfcare', technique:'stretch', bodyPart:'back', intensity:1,
    equipment:'マット', position:'kneeling', duration:'各45秒',
    illustration: SVG2.threadNeedle,
    purpose:'四つん這いから腕を体下に通す。',
    how:['四つん這い、片腕を反対脇下に。','肩と頭を床に。','45秒。'],
    cues:{do:'肋骨から捻る。',dont:'痛みは出さない。'},
    why:'胸椎可動域と肩こり改善。'
  },
  {
    id:'sn_prayer_stretch', name:'プレイヤーストレッチ', courses:ALL_COURSES,
    targetProblems:['thoracicKyphosis','roundedShoulders'],
    category:'selfcare', technique:'stretch', bodyPart:'back', intensity:1,
    equipment:'マット', position:'kneeling', duration:'1分',
    illustration: SVG2.childPose,
    purpose:'チャイルドポーズで両手を前へ。',
    how:['正座から両手を前に伸ばし額を床へ。','1分呼吸。'],
    cues:{do:'肩から伸ばす。',dont:'お尻が浮かない。'},
    why:'背中・肩の同時開放。'
  },

  // ============== 骨盤・股関節のケア ==============
  {
    id:'sn_pelvic_tilt_supine', name:'仰向け骨盤チルト', courses:ALL_COURSES,
    targetProblems:['anteriorPelvicTilt','posteriorPelvicTilt'],
    category:'selfcare', technique:'mobility', bodyPart:'hip', intensity:1,
    equipment:'マット', position:'supine', duration:'10回',
    illustration: SVG2.bridge,
    purpose:'仰向けで骨盤を前後傾。',
    how:['仰向け膝立て。','骨盤を前傾→後傾。','10回。'],
    cues:{do:'腰の動きを感じる。',dont:'力まない。'},
    why:'骨盤コントロールの基礎。'
  },
  {
    id:'sn_knee_to_chest', name:'膝抱えストレッチ', courses:ALL_COURSES,
    targetProblems:['anteriorPelvicTilt','swayBack'],
    category:'selfcare', technique:'stretch', bodyPart:'hip', intensity:1,
    equipment:'マット', position:'supine', duration:'各30秒',
    illustration: SVG2.legRaise,
    purpose:'仰向けで片膝を胸へ。',
    how:['仰向け、片膝を両手で胸へ。','30秒。反対も。'],
    cues:{do:'腰が浮かないように。',dont:'反対脚を浮かさない。'},
    why:'腰背部・お尻の伸展。'
  },
  {
    id:'sn_supine_figure4', name:'仰向け数字の4', courses:ALL_COURSES,
    targetProblems:['anteriorPelvicTilt','kneeValgus'],
    category:'selfcare', technique:'stretch', bodyPart:'hip', intensity:1,
    equipment:'マット', position:'supine', duration:'各45秒',
    illustration: SVG2.legRaise,
    purpose:'仰向けで4の字でお尻を伸ばす。',
    how:['仰向け、片足首を反対膝に。','下脚を胸へ引く。','45秒。'],
    cues:{do:'呼吸を続ける。',dont:'肩が浮かない。'},
    why:'お尻・梨状筋の解放。'
  },
  {
    id:'sn_happy_baby_easy', name:'やさしいハッピーベイビー', courses:ALL_COURSES,
    targetProblems:['anteriorPelvicTilt','posteriorPelvicTilt'],
    category:'selfcare', technique:'stretch', bodyPart:'hip', intensity:1,
    equipment:'マット', position:'supine', duration:'1分',
    illustration: SVG2.butterflyHip,
    purpose:'仰向けで両脚を上に上げ膝裏か足を持つ。',
    how:['仰向け、両膝を脇に近づける。','膝裏か足を持つ。','1分。'],
    cues:{do:'尾骨を床へ。',dont:'力まない。'},
    why:'腰・股関節の最深部解放。'
  },
  {
    id:'sn_glute_bridge_easy', name:'やさしいヒップリフト', courses:ALL_COURSES,
    targetProblems:['posteriorPelvicTilt','anteriorPelvicTilt'],
    category:'training', technique:'strength', bodyPart:'hip', intensity:1,
    equipment:'マット', position:'supine', duration:'12回',
    illustration: SVG2.bridge,
    purpose:'やさしくお尻を持ち上げる。',
    how:['仰向け膝立て。','お尻をゆっくり持ち上げる。','12回。'],
    cues:{do:'お尻を絞る。',dont:'腰を反らない。'},
    why:'ヒップアップとお尻活性化。'
  },
  {
    id:'sn_marching_supine', name:'仰向けマーチ', courses:ALL_COURSES,
    targetProblems:['anteriorPelvicTilt'],
    category:'training', technique:'core', bodyPart:'core', intensity:1,
    equipment:'マット', position:'supine', duration:'各10回',
    illustration: SVG2.deadBug,
    purpose:'仰向けで片脚ずつ持ち上げる。',
    how:['仰向け膝立て。','片膝ずつ胸へゆっくり。','10回ずつ。'],
    cues:{do:'骨盤を動かさない。',dont:'腰を反らない。'},
    why:'下腹部活性化の入門。'
  },
  {
    id:'sn_clam_easy', name:'やさしいクラム', courses:ALL_COURSES,
    targetProblems:['kneeValgus','lateralAsymmetry'],
    category:'training', technique:'strength', bodyPart:'hip', intensity:1,
    equipment:'マット', position:'side', duration:'各15回',
    illustration: SVG2.clamShell,
    purpose:'横向きで膝を貝のように開閉。',
    how:['横向き、膝を曲げる。','上膝だけゆっくり開閉。','15回ずつ。'],
    cues:{do:'骨盤固定。',dont:'体を倒さない。'},
    why:'中臀筋の的確な活性化。'
  },

  // ============== 脚・足の機能回復 ==============
  {
    id:'sn_ankle_rotation', name:'足首回し', courses:ALL_COURSES,
    targetProblems:['ankleStiffness','general'],
    category:'selfcare', technique:'mobility', bodyPart:'ankle', intensity:1,
    equipment:'なし', position:'sitting', duration:'各5周',
    illustration: SVG2.ankleRotation,
    purpose:'座位で足首を大きく回す。',
    how:['座位、片足を上げる。','足首で大きな円を5周。反対回りも。'],
    cues:{do:'大きく描く。',dont:'力まない。'},
    why:'足首の柔軟性とむくみ解消。'
  },
  {
    id:'sn_toe_curl', name:'タオルなしのタオルギャザー', courses:ALL_COURSES,
    targetProblems:['ankleStiffness','kneeValgus'],
    category:'training', technique:'strength', bodyPart:'foot', intensity:1,
    equipment:'なし', position:'sitting', duration:'20回',
    illustration: SVG2.footToes,
    purpose:'足指でつかむ動き。',
    how:['座位、足指を曲げ伸ばし。','20回。'],
    cues:{do:'指先まで意識。',dont:'こむら返り注意。'},
    why:'足裏の筋力と感覚回復。'
  },
  {
    id:'sn_heel_raise_chair_free', name:'立位かかと上げ', courses:ALL_COURSES,
    targetProblems:['ankleStiffness','lateralAsymmetry'],
    category:'training', technique:'strength', bodyPart:'leg', intensity:1,
    equipment:'なし', position:'standing', duration:'15回 × 2セット',
    illustration: SVG2.calfRaise,
    purpose:'立位でかかとを上げ下ろし。',
    how:['立位、両かかとをゆっくり上げる。','15回。'],
    cues:{do:'真上へ。',dont:'体が揺れない。'},
    why:'ふくらはぎとバランス。'
  },
  {
    id:'sn_calf_stretch_floor', name:'床でふくらはぎ伸ばし', courses:ALL_COURSES,
    targetProblems:['ankleStiffness','posteriorPelvicTilt'],
    category:'selfcare', technique:'stretch', bodyPart:'leg', intensity:1,
    equipment:'マット', position:'sitting', duration:'各30秒',
    illustration: SVG2.forwardFold,
    purpose:'長座で片足を引き寄せ伸ばす。',
    how:['長座、片足を曲げる。','伸ばした足のつま先を引き寄せる。','30秒。'],
    cues:{do:'背筋を保つ。',dont:'痛みは出さない。'},
    why:'ふくらはぎの柔軟性。'
  },
  {
    id:'sn_standing_quad_stretch', name:'片脚前もも伸ばし', courses:ALL_COURSES,
    targetProblems:['anteriorPelvicTilt','lateralAsymmetry'],
    category:'selfcare', technique:'stretch', bodyPart:'leg', intensity:1,
    equipment:'なし', position:'standing', duration:'各30秒',
    illustration: SVG2.quadStretch,
    purpose:'立位で後脚の前ももを伸ばす。',
    how:['片足首を後ろから掴む。','膝を後ろへ。','30秒。'],
    cues:{do:'お尻を絞る。',dont:'反り腰にならない。'},
    why:'前ももの柔軟性と骨盤アライメント。'
  },
  {
    id:'sn_hamstring_stretch_floor', name:'寝てハム伸ばし', courses:ALL_COURSES,
    targetProblems:['posteriorPelvicTilt'],
    category:'selfcare', technique:'stretch', bodyPart:'leg', intensity:1,
    equipment:'マット', position:'supine', duration:'各45秒',
    illustration: SVG2.legRaise,
    purpose:'仰向けで片脚を天井へ。',
    how:['仰向け、片脚を天井へ。','膝裏か太もも裏を持つ。','45秒。'],
    cues:{do:'腰を床に。',dont:'膝をロックしない。'},
    why:'ハムストリングの基本ケア。'
  },
  {
    id:'sn_inner_thigh_stretch', name:'内ももストレッチ', courses:ALL_COURSES,
    targetProblems:['anteriorPelvicTilt','kneeValgus'],
    category:'selfcare', technique:'stretch', bodyPart:'hip', intensity:1,
    equipment:'マット', position:'sitting', duration:'1分',
    illustration: SVG2.butterflyHip,
    purpose:'座位で足裏を合わせ膝を開く。',
    how:['座位で足裏を合わせる。','膝を床方向へ。','1分。'],
    cues:{do:'背筋を保つ。',dont:'膝を押し下げすぎない。'},
    why:'股関節の入門ストレッチ。'
  },

  // ============== 体幹の活性化 ==============
  {
    id:'sn_dead_bug_easy', name:'やさしいデッドバグ', courses:ALL_COURSES,
    targetProblems:['anteriorPelvicTilt'],
    category:'training', technique:'core', bodyPart:'core', intensity:1,
    equipment:'マット', position:'supine', duration:'各8回',
    illustration: SVG2.deadBug,
    purpose:'対角の手脚を交互に伸ばす。',
    how:['仰向けテーブルトップ。','対角の手脚を伸ばす。','8回ずつ。'],
    cues:{do:'腰を床へ。',dont:'腰を反らない。'},
    why:'体幹安定の基本。'
  },
  {
    id:'sn_seated_knee_extend', name:'座位レッグエクステンション', courses:ALL_COURSES,
    targetProblems:['anteriorPelvicTilt','lateralAsymmetry'],
    category:'training', technique:'strength', bodyPart:'leg', intensity:1,
    equipment:'なし', position:'sitting', duration:'各15回',
    illustration: SVG2.legRaise,
    purpose:'座位で片脚を伸ばす。',
    how:['座位、片膝をゆっくり伸ばす。','15回。'],
    cues:{do:'つま先を上に。',dont:'反動を使わない。'},
    why:'大腿四頭筋の活性化。'
  },
  {
    id:'sn_seated_abs_pull', name:'座位お腹引き込み', courses:ALL_COURSES,
    targetProblems:['anteriorPelvicTilt','swayBack'],
    category:'training', technique:'core', bodyPart:'core', intensity:1,
    equipment:'なし', position:'sitting', duration:'10回',
    illustration: SVG2.breathing,
    purpose:'座位でへそを背骨に引き入れる。',
    how:['座位、息を吐きながらお腹を引き入れる。','5秒キープ。10回。'],
    cues:{do:'呼吸を続ける。',dont:'肩に力を入れない。'},
    why:'インナーマッスル活性化。'
  },
  {
    id:'sn_glute_squeeze', name:'お尻スクイーズ', courses:ALL_COURSES,
    targetProblems:['posteriorPelvicTilt','swayBack'],
    category:'training', technique:'isometric', bodyPart:'hip', intensity:1,
    equipment:'なし', position:'standing', duration:'10秒 × 5回',
    illustration: SVG2.warrior,
    purpose:'立位でお尻に力を入れる。',
    how:['立位でお尻を絞る。','10秒キープ。5回。'],
    cues:{do:'呼吸を続ける。',dont:'反り腰にならない。'},
    why:'お尻の意識付け。'
  },
  {
    id:'sn_wall_free_pushup_knee', name:'膝つき腕立て', courses:ALL_COURSES,
    targetProblems:['roundedShoulders','thoracicKyphosis'],
    category:'training', technique:'strength', bodyPart:'arm', intensity:2,
    equipment:'マット', position:'kneeling', duration:'8回 × 2セット',
    illustration: SVG2.pushup,
    purpose:'膝つきでやさしくプッシュアップ。',
    how:['膝をついた腕立て姿勢。','胸を床近くまで下ろす。','8回。'],
    cues:{do:'体一直線。',dont:'腰を反らない。'},
    why:'上半身の基本筋力。'
  },

  // ============== 立位機能・バランス ==============
  {
    id:'sn_one_leg_balance', name:'片脚バランス', courses:ALL_COURSES,
    targetProblems:['lateralAsymmetry','kneeValgus','general'],
    category:'training', technique:'balance', bodyPart:'leg', intensity:1,
    equipment:'なし', position:'standing', duration:'各30秒',
    illustration: SVG2.singleLegBalance,
    purpose:'片脚立ちでバランス。',
    how:['片脚立ち、30秒。','反対も。'],
    cues:{do:'視線は一点に。',dont:'腰に手を当てない。'},
    why:'転倒予防の基礎。'
  },
  {
    id:'sn_heel_to_toe_walk', name:'一本線歩き', courses:ALL_COURSES,
    targetProblems:['lateralAsymmetry','general'],
    category:'training', technique:'balance', bodyPart:'leg', intensity:1,
    equipment:'なし', position:'standing', duration:'10歩',
    illustration: SVG2.warrior,
    purpose:'かかとつま先で直線を歩く。',
    how:['前足のかかとを後足のつま先に。','10歩進む。'],
    cues:{do:'視線は前。',dont:'スピードを出さない。'},
    why:'バランス感覚UP。'
  },
  {
    id:'sn_sit_to_stand', name:'座って立つ', courses:ALL_COURSES,
    targetProblems:['posteriorPelvicTilt','kneeValgus'],
    category:'training', technique:'strength', bodyPart:'leg', intensity:1,
    equipment:'なし', position:'sitting', duration:'10回',
    illustration: SVG2.squat,
    purpose:'座位から立つを繰り返す。',
    how:['座位から立ち上がる、座る。','10回。'],
    cues:{do:'胸を張って。',dont:'反動を使わない。'},
    why:'下半身の機能維持。'
  },
  {
    id:'sn_mini_squat', name:'ミニスクワット', courses:ALL_COURSES,
    targetProblems:['kneeValgus','posteriorPelvicTilt'],
    category:'training', technique:'strength', bodyPart:'leg', intensity:1,
    equipment:'なし', position:'standing', duration:'12回',
    illustration: SVG2.squat,
    purpose:'やさしい浅めのスクワット。',
    how:['立位、お尻を10cm下ろす。','12回。'],
    cues:{do:'膝とつま先同方向。',dont:'深く下げない。'},
    why:'下半身の基礎強化。'
  },
  {
    id:'sn_standing_hip_circle', name:'立位ヒップサークル', courses:ALL_COURSES,
    targetProblems:['kneeValgus','lateralAsymmetry'],
    category:'training', technique:'mobility', bodyPart:'hip', intensity:1,
    equipment:'なし', position:'standing', duration:'各5周',
    illustration: SVG2.hipOpener,
    purpose:'立位で片脚を回す。',
    how:['立位、片脚を持ち上げて円を描く。','5周ずつ反転。反対も。'],
    cues:{do:'体幹固定。',dont:'体が傾かない。'},
    why:'股関節モビリティ。'
  },
  {
    id:'sn_side_step', name:'サイドステップ', courses:ALL_COURSES,
    targetProblems:['lateralAsymmetry','kneeValgus'],
    category:'training', technique:'strength', bodyPart:'leg', intensity:1,
    equipment:'なし', position:'standing', duration:'各10歩',
    illustration: SVG2.sideStep,
    purpose:'横にステップする。',
    how:['軽くしゃがんで横へ。','10歩ずつ往復。'],
    cues:{do:'低い姿勢。',dont:'体を上下させない。'},
    why:'横方向の安定性。'
  },

  // ============== 呼吸・リラックス ==============
  {
    id:'sn_belly_breathing', name:'腹式呼吸', courses:ALL_COURSES,
    targetProblems:['general','swayBack'],
    category:'breath', technique:'pranayama', bodyPart:'core', intensity:1,
    equipment:'マット', position:'supine', duration:'3分',
    illustration: SVG2.breathing,
    purpose:'お腹で深く呼吸。',
    how:['仰向け、片手お腹。','お腹を膨らませて吐く。','3分。'],
    cues:{do:'4秒吸い6秒吐く。',dont:'肩を動かさない。'},
    why:'自律神経の基本リセット。'
  },
  {
    id:'sn_box_breathing', name:'4-4-4-4呼吸', courses:ALL_COURSES,
    targetProblems:['general'],
    category:'breath', technique:'pranayama', bodyPart:'core', intensity:1,
    equipment:'なし', position:'sitting', duration:'2分',
    illustration: SVG2.breathing,
    purpose:'4秒ずつ4セットの正方形呼吸。',
    how:['4秒吸う→4秒止める→4秒吐く→4秒止める。','2分繰り返し。'],
    cues:{do:'リラックスして。',dont:'力まない。'},
    why:'集中力と落ち着き。'
  },
  {
    id:'sn_extended_exhale', name:'長く吐く呼吸', courses:ALL_COURSES,
    targetProblems:['general'],
    category:'breath', technique:'pranayama', bodyPart:'core', intensity:1,
    equipment:'なし', position:'sitting', duration:'3分',
    illustration: SVG2.breathing,
    purpose:'吸う倍を吐く呼吸。',
    how:['4秒吸って8秒吐く。','3分。'],
    cues:{do:'副交感を意識。',dont:'頑張りすぎない。'},
    why:'眠りやすくなる呼吸。'
  },
  {
    id:'sn_full_body_relax', name:'全身脱力', courses:ALL_COURSES,
    targetProblems:['general'],
    category:'meditation', technique:'meditation', bodyPart:'fullbody', intensity:1,
    equipment:'マット', position:'supine', duration:'5分',
    illustration: SVG2.savasana,
    purpose:'仰向けで力を完全に抜く。',
    how:['仰向けで全身脱力。','5分間呼吸だけ。'],
    cues:{do:'眠ってもOK。',dont:'考えない。'},
    why:'回復の基本。'
  },
  {
    id:'sn_morning_routine', name:'朝の伸び', courses:ALL_COURSES,
    targetProblems:['general'],
    category:'selfcare', technique:'mobility', bodyPart:'fullbody', intensity:1,
    equipment:'マット', position:'supine', duration:'1分',
    illustration: SVG2.standBackbend,
    purpose:'仰向けで手脚を伸ばす。',
    how:['仰向けで両手脚を最大に伸ばす。','1分繰り返し。'],
    cues:{do:'指先・つま先まで。',dont:'頑張らない。'},
    why:'朝の体覚醒に。'
  },

  // ============== EXPANSION 2 — 手・腕・末端のケア ==============
  {
    id:'sn_hand_open_close', name:'手のグーパー', courses:ALL_COURSES,
    targetProblems:['general'],
    category:'selfcare', technique:'mobility', bodyPart:'hand', intensity:1,
    equipment:'なし', position:'sitting', duration:'20回',
    illustration: SVG2.handOpen,
    purpose:'手を強く握って開く。',
    how:['両手をギュッと握る。','パッと開く。','20回。'],
    cues:{do:'指先まで開く。',dont:'力みすぎない。'},
    why:'手のむくみ・冷え解消。'
  },
  {
    id:'sn_wrist_roll', name:'手首回し', courses:ALL_COURSES,
    targetProblems:['general'],
    category:'selfcare', technique:'mobility', bodyPart:'hand', intensity:1,
    equipment:'なし', position:'sitting', duration:'各10周',
    illustration: SVG2.wristStretch,
    purpose:'手首をやさしく回す。',
    how:['両手首で円を10周。','逆回りも。'],
    cues:{do:'大きく回す。',dont:'痛みは出さない。'},
    why:'手首の柔軟性とこわばり解消。'
  },
  {
    id:'sn_finger_stretch', name:'指1本ずつ伸ばし', courses:ALL_COURSES,
    targetProblems:['general'],
    category:'selfcare', technique:'stretch', bodyPart:'hand', intensity:1,
    equipment:'なし', position:'sitting', duration:'各指10秒',
    illustration: SVG2.handOpen,
    purpose:'反対手で指を1本ずつ伸ばす。',
    how:['反対手で指を10秒ずつ反らす。','5本×両手。'],
    cues:{do:'やさしく。',dont:'急に反らさない。'},
    why:'スマホ指・腱鞘炎予防。'
  },
  {
    id:'sn_palm_press', name:'合掌プレス', courses:ALL_COURSES,
    targetProblems:['roundedShoulders','general'],
    category:'training', technique:'isometric', bodyPart:'chest', intensity:1,
    equipment:'なし', position:'sitting', duration:'10秒 × 5回',
    illustration: SVG2.shoulderOpen,
    purpose:'胸の前で合掌して押し合う。',
    how:['胸の前で両手のひらを合わせる。','10秒押し合う。5回。'],
    cues:{do:'胸を意識。',dont:'肩を上げない。'},
    why:'胸筋活性化と姿勢キープ。'
  },
  {
    id:'sn_elbow_circles', name:'肘で円を描く', courses:ALL_COURSES,
    targetProblems:['roundedShoulders','thoracicKyphosis'],
    category:'selfcare', technique:'mobility', bodyPart:'shoulder', intensity:1,
    equipment:'なし', position:'sitting', duration:'各5周',
    illustration: SVG2.shoulderRoll,
    purpose:'指先を肩に当て肘で円を。',
    how:['指先を肩に。','肘で大きな円を5周。逆回りも。'],
    cues:{do:'肩甲骨から動く。',dont:'すくまない。'},
    why:'肩甲骨可動域UP。'
  },

  // ============== EXPANSION 2 — 顔・頭部ケア ==============
  {
    id:'sn_face_tapping', name:'顔タッピング', courses:ALL_COURSES,
    targetProblems:['general'],
    category:'selfcare', technique:'release', bodyPart:'face', intensity:1,
    equipment:'なし', position:'sitting', duration:'1分',
    illustration: SVG2.faceMassage,
    purpose:'指の腹で顔を軽く叩く。',
    how:['額・目周り・頬・あご・首と順にタッピング。','1分。'],
    cues:{do:'リズミカルに。',dont:'強く叩かない。'},
    why:'顔の血流とリンパ流れ。'
  },
  {
    id:'sn_eye_relax', name:'目のホットケア', courses:ALL_COURSES,
    targetProblems:['general'],
    category:'selfcare', technique:'release', bodyPart:'face', intensity:1,
    equipment:'なし', position:'sitting', duration:'1分',
    illustration: SVG2.eyeCare,
    purpose:'両手をこすって温め目に当てる。',
    how:['両手をこすって温める。','目に軽く当てて1分。'],
    cues:{do:'呼吸を続ける。',dont:'強く押さない。'},
    why:'眼精疲労の即時緩和。'
  },
  {
    id:'sn_scalp_massage', name:'頭皮マッサージ', courses:ALL_COURSES,
    targetProblems:['general'],
    category:'selfcare', technique:'release', bodyPart:'face', intensity:1,
    equipment:'なし', position:'sitting', duration:'2分',
    illustration: SVG2.scalpMassage,
    purpose:'指の腹で頭皮全体を揉む。',
    how:['指の腹で頭皮を円を描くように揉む。','2分。'],
    cues:{do:'気持ちよく。',dont:'爪を立てない。'},
    why:'頭皮の血流と気分転換。'
  },
  {
    id:'sn_temple_press', name:'こめかみ押し', courses:ALL_COURSES,
    targetProblems:['forwardHead','general'],
    category:'selfcare', technique:'release', bodyPart:'face', intensity:1,
    equipment:'なし', position:'sitting', duration:'各30秒',
    illustration: SVG2.eyeCare,
    purpose:'指先でこめかみを軽く押す。',
    how:['両こめかみに中指を当てる。','円を描くように30秒。'],
    cues:{do:'やさしく。',dont:'強く押さない。'},
    why:'頭痛と首コリの軽減。'
  },
  {
    id:'sn_facial_yoga_o', name:'顔ヨガ「お」', courses:ALL_COURSES,
    targetProblems:['general'],
    category:'selfcare', technique:'mobility', bodyPart:'face', intensity:1,
    equipment:'なし', position:'sitting', duration:'10秒 × 5回',
    illustration: SVG2.faceMassage,
    purpose:'「お」の口で表情筋を伸ばす。',
    how:['「お」の口を作り10秒キープ。','5回。'],
    cues:{do:'最大に開く。',dont:'力みすぎない。'},
    why:'ほうれい線・たるみ予防。'
  },

  // ============== EXPANSION 2 — 姿勢別ターゲット ==============
  {
    id:'sn_wall_free_chin_tuck', name:'お辞儀チンタック', courses:ALL_COURSES,
    targetProblems:['forwardHead','roundedShoulders'],
    category:'training', technique:'strength', bodyPart:'neck', intensity:1,
    equipment:'なし', position:'standing', duration:'10回',
    illustration: SVG2.neckTilt,
    purpose:'立位であごを引きキープ。',
    how:['立位、あごを後ろに引く。','5秒キープ→戻す。10回。'],
    cues:{do:'頭頂を真上に。',dont:'顎を上げない。'},
    why:'ストレートネック改善の基本。'
  },
  {
    id:'sn_back_extension_prone', name:'うつ伏せ背筋', courses:ALL_COURSES,
    targetProblems:['thoracicKyphosis','roundedShoulders','swayBack'],
    category:'training', technique:'strength', bodyPart:'back', intensity:1,
    equipment:'マット', position:'prone', duration:'8回',
    illustration: SVG2.cobra,
    purpose:'うつ伏せから上体を持ち上げる。',
    how:['うつ伏せ、手はこめかみ。','上体を持ち上げる。','8回。'],
    cues:{do:'お腹を意識。',dont:'首を反らない。'},
    why:'背筋強化と姿勢矯正。'
  },
  {
    id:'sn_prone_arm_lift', name:'うつ伏せアームリフト', courses:ALL_COURSES,
    targetProblems:['roundedShoulders','thoracicKyphosis'],
    category:'training', technique:'strength', bodyPart:'back', intensity:1,
    equipment:'マット', position:'prone', duration:'各10回',
    illustration: SVG2.cobra,
    purpose:'うつ伏せで腕を浮かす。',
    how:['うつ伏せ、両腕を体側に。','腕を浮かせる。','10回。'],
    cues:{do:'肩甲骨で引く。',dont:'反動を使わない。'},
    why:'菱形筋・僧帽筋下部の活性化。'
  },
  {
    id:'sn_pelvic_drop', name:'骨盤ドロップ', courses:ALL_COURSES,
    targetProblems:['lateralAsymmetry','kneeValgus'],
    category:'training', technique:'strength', bodyPart:'hip', intensity:1,
    equipment:'なし', position:'standing', duration:'各12回',
    illustration: SVG2.warrior,
    purpose:'片脚立ちで反対骨盤を上下。',
    how:['片脚立ち、反対の骨盤を下げる。','戻す。12回。反対も。'],
    cues:{do:'軸脚は伸ばす。',dont:'体を傾けない。'},
    why:'中臀筋の的確な刺激。'
  },
  {
    id:'sn_supine_leg_to_side', name:'仰向け膝倒し', courses:ALL_COURSES,
    targetProblems:['lateralAsymmetry','anteriorPelvicTilt'],
    category:'selfcare', technique:'stretch', bodyPart:'core', intensity:1,
    equipment:'マット', position:'supine', duration:'各30秒',
    illustration: SVG2.spineTwist,
    purpose:'仰向けで膝を左右に倒す。',
    how:['仰向け膝立て。','両膝を片側に倒す。','30秒ずつ。'],
    cues:{do:'肩は床に。',dont:'痛みは出さない。'},
    why:'腰背部のやさしい解放。'
  },
  {
    id:'sn_supine_windshield', name:'ワイパー運動', courses:ALL_COURSES,
    targetProblems:['lateralAsymmetry','anteriorPelvicTilt'],
    category:'selfcare', technique:'mobility', bodyPart:'core', intensity:1,
    equipment:'マット', position:'supine', duration:'10往復',
    illustration: SVG2.spineTwist,
    purpose:'仰向けで膝を左右にワイパー。',
    how:['仰向け膝立て、足を腰幅。','膝を左右に動かす。','10往復。'],
    cues:{do:'リラックス。',dont:'力まない。'},
    why:'股関節と背骨の連動。'
  },
  {
    id:'sn_cat_cow_full', name:'四つん這いキャット&カウ', courses:ALL_COURSES,
    targetProblems:['thoracicKyphosis','anteriorPelvicTilt','posteriorPelvicTilt'],
    category:'selfcare', technique:'mobility', bodyPart:'back', intensity:1,
    equipment:'マット', position:'kneeling', duration:'10回',
    illustration: SVG2.catCowPose,
    purpose:'四つん這いで背骨を波打たせる。',
    how:['四つん這いで丸めて反らす。','10回。'],
    cues:{do:'呼吸と連動。',dont:'勢いを使わない。'},
    why:'背骨全体の活性化。'
  },
  {
    id:'sn_child_pose_easy', name:'やさしいチャイルドポーズ', courses:ALL_COURSES,
    targetProblems:['general','thoracicKyphosis'],
    category:'selfcare', technique:'stretch', bodyPart:'back', intensity:1,
    equipment:'マット', position:'kneeling', duration:'1分',
    illustration: SVG2.childPose,
    purpose:'正座から前に伸びる。',
    how:['正座、両手を前に伸ばし額を床。','1分呼吸。'],
    cues:{do:'お尻はかかとに。',dont:'肩がすくまない。'},
    why:'回復の基本ポーズ。'
  },

  // ============== EXPANSION 2 — 立位の整え ==============
  {
    id:'sn_tadasana_easy', name:'やさしい山のポーズ', courses:ALL_COURSES,
    targetProblems:['general','forwardHead'],
    category:'training', technique:'isometric', bodyPart:'fullbody', intensity:1,
    equipment:'なし', position:'standing', duration:'1分',
    illustration: SVG2.warrior,
    purpose:'立位の基本姿勢。',
    how:['足を腰幅で立ち、頭頂を引き上げる。','1分。'],
    cues:{do:'重心は両足均等。',dont:'反り腰にしない。'},
    why:'立ち姿勢の質を高める。'
  },
  {
    id:'sn_marching_in_place', name:'その場マーチ', courses:ALL_COURSES,
    targetProblems:['general'],
    category:'training', technique:'strength', bodyPart:'leg', intensity:1,
    equipment:'なし', position:'standing', duration:'1分',
    illustration: SVG2.warrior,
    purpose:'その場で膝を高く上げて歩く。',
    how:['その場で膝を腰の高さまで。','1分。'],
    cues:{do:'リズミカルに。',dont:'前傾しない。'},
    why:'下半身ウォームアップ。'
  },
  {
    id:'sn_arm_overhead_reach', name:'上下交互リーチ', courses:ALL_COURSES,
    targetProblems:['roundedShoulders','lateralAsymmetry'],
    category:'selfcare', technique:'mobility', bodyPart:'shoulder', intensity:1,
    equipment:'なし', position:'standing', duration:'各10回',
    illustration: SVG2.sideStretch,
    purpose:'片腕ずつ天井に伸ばす。',
    how:['立位、片腕を天井に伸ばす。','交互に10回。'],
    cues:{do:'指先まで伸ばす。',dont:'肩をすくめない。'},
    why:'体側と肩のリセット。'
  },
  {
    id:'sn_standing_forward_fold_easy', name:'やさしい前屈', courses:ALL_COURSES,
    targetProblems:['posteriorPelvicTilt','thoracicKyphosis'],
    category:'selfcare', technique:'stretch', bodyPart:'back', intensity:1,
    equipment:'なし', position:'standing', duration:'45秒',
    illustration: SVG2.forwardFold,
    purpose:'立位で膝を少し曲げ前屈。',
    how:['足を腰幅、膝を軽く曲げ前屈。','45秒。'],
    cues:{do:'頭は脱力。',dont:'膝をロックしない。'},
    why:'背中のやさしい解放。'
  },
  {
    id:'sn_standing_back_bend', name:'立位やさしい後屈', courses:ALL_COURSES,
    targetProblems:['thoracicKyphosis','roundedShoulders'],
    category:'selfcare', technique:'mobility', bodyPart:'chest', intensity:1,
    equipment:'なし', position:'standing', duration:'5回',
    illustration: SVG2.standBackbend,
    purpose:'立位で手を腰に当て胸を反らせる。',
    how:['立位、両手を腰に。','胸をやさしく反らせる。','5回。'],
    cues:{do:'胸から反る。',dont:'腰だけで反らない。'},
    why:'デスクワーク疲れの即効。'
  },
  {
    id:'sn_standing_side_bend_easy', name:'立位サイドベンド', courses:ALL_COURSES,
    targetProblems:['lateralAsymmetry','thoracicKyphosis'],
    category:'selfcare', technique:'stretch', bodyPart:'core', intensity:1,
    equipment:'なし', position:'standing', duration:'各30秒',
    illustration: SVG2.sideStretch,
    purpose:'立位で体側を伸ばす。',
    how:['立位、片手を頭上。','反対に倒す。30秒ずつ。'],
    cues:{do:'胸郭から動く。',dont:'前傾しない。'},
    why:'体側の柔軟性。'
  },
  {
    id:'sn_standing_twist', name:'立位ねじり', courses:ALL_COURSES,
    targetProblems:['lateralAsymmetry','roundedShoulders'],
    category:'selfcare', technique:'mobility', bodyPart:'core', intensity:1,
    equipment:'なし', position:'standing', duration:'10回',
    illustration: SVG2.spineTwist,
    purpose:'立位で体を左右に捻る。',
    how:['立位、両腕を脇に。','体を左右にゆっくり。','10回。'],
    cues:{do:'頭はリラックス。',dont:'反動を使わない。'},
    why:'背骨の回旋を保つ。'
  },
  {
    id:'sn_standing_quad_to_chest', name:'立位膝抱え', courses:ALL_COURSES,
    targetProblems:['anteriorPelvicTilt'],
    category:'selfcare', technique:'stretch', bodyPart:'hip', intensity:1,
    equipment:'なし', position:'standing', duration:'各20秒',
    illustration: SVG2.warrior,
    purpose:'立位で片膝を胸へ。',
    how:['片膝を両手で胸へ。','20秒。反対も。'],
    cues:{do:'軸足は伸ばす。',dont:'体が後ろに倒れない。'},
    why:'お尻と腰のストレッチ。'
  },

  // ============== EXPANSION 2 — 体幹バリエーション ==============
  {
    id:'sn_breath_with_pelvic_tilt', name:'呼吸×骨盤チルト', courses:ALL_COURSES,
    targetProblems:['swayBack','anteriorPelvicTilt'],
    category:'training', technique:'core', bodyPart:'core', intensity:1,
    equipment:'マット', position:'supine', duration:'10回',
    illustration: SVG2.bridge,
    purpose:'呼吸と骨盤を連動。',
    how:['仰向け膝立て。','吐きながら骨盤を後傾。','10回。'],
    cues:{do:'お腹を引き入れる。',dont:'肩に力を入れない。'},
    why:'インナーユニットの始動。'
  },
  {
    id:'sn_heel_slide', name:'ヒールスライド', courses:ALL_COURSES,
    targetProblems:['anteriorPelvicTilt'],
    category:'training', technique:'core', bodyPart:'core', intensity:1,
    equipment:'マット', position:'supine', duration:'各10回',
    illustration: SVG2.toeTap,
    purpose:'仰向けで片足を伸ばし戻す。',
    how:['仰向け膝立て。','片足のかかとを床に滑らせ伸ばす。','10回ずつ。'],
    cues:{do:'骨盤動かさない。',dont:'腰を反らない。'},
    why:'コアの基本制御。'
  },
  {
    id:'sn_supine_arm_reach', name:'仰向けアームリーチ', courses:ALL_COURSES,
    targetProblems:['anteriorPelvicTilt','thoracicKyphosis'],
    category:'training', technique:'core', bodyPart:'core', intensity:1,
    equipment:'マット', position:'supine', duration:'各10回',
    illustration: SVG2.deadBug,
    purpose:'仰向けで腕を頭上へ。',
    how:['仰向け膝立て。','片腕ずつ頭上へ。','10回ずつ。'],
    cues:{do:'肋骨を閉じる。',dont:'反り腰にならない。'},
    why:'コアと肩の協調。'
  },
  {
    id:'sn_glute_bridge_hold', name:'ブリッジホールド', courses:ALL_COURSES,
    targetProblems:['posteriorPelvicTilt','anteriorPelvicTilt'],
    category:'training', technique:'isometric', bodyPart:'hip', intensity:1,
    equipment:'マット', position:'supine', duration:'30秒 × 2回',
    illustration: SVG2.bridge,
    purpose:'ブリッジでキープ。',
    how:['仰向け膝立て、お尻を持ち上げる。','30秒キープ。'],
    cues:{do:'お尻を絞る。',dont:'腰を反らない。'},
    why:'臀筋持久力UP。'
  },
  {
    id:'sn_quadruped_arm_lift', name:'四つん這いアームリフト', courses:ALL_COURSES,
    targetProblems:['roundedShoulders','thoracicKyphosis'],
    category:'training', technique:'strength', bodyPart:'back', intensity:1,
    equipment:'マット', position:'kneeling', duration:'各10回',
    illustration: SVG2.birdDog,
    purpose:'四つん這いで片腕を前に。',
    how:['四つん這い、片腕を前に伸ばす。','10回ずつ。'],
    cues:{do:'体幹固定。',dont:'体が傾かない。'},
    why:'肩と体幹の協調。'
  },
  {
    id:'sn_quadruped_leg_lift', name:'四つん這いレッグリフト', courses:ALL_COURSES,
    targetProblems:['posteriorPelvicTilt','lateralAsymmetry'],
    category:'training', technique:'strength', bodyPart:'hip', intensity:1,
    equipment:'マット', position:'kneeling', duration:'各10回',
    illustration: SVG2.donkeyKick,
    purpose:'四つん這いで片脚を後ろに。',
    how:['四つん這い、片脚を後ろに伸ばす。','10回ずつ。'],
    cues:{do:'腰を反らない。',dont:'体が傾かない。'},
    why:'お尻の活性化。'
  },
  {
    id:'sn_bird_dog_easy', name:'やさしいバードドッグ', courses:ALL_COURSES,
    targetProblems:['anteriorPelvicTilt','swayBack'],
    category:'training', technique:'core', bodyPart:'core', intensity:1,
    equipment:'マット', position:'kneeling', duration:'各8回',
    illustration: SVG2.birdDog,
    purpose:'四つん這いで対角の手脚。',
    how:['四つん這い、対角の手脚を伸ばす。','8回ずつ。'],
    cues:{do:'背中を平らに。',dont:'体が傾かない。'},
    why:'体幹剛性の基本。'
  },
  {
    id:'sn_modified_side_plank', name:'やさしいサイドプランク', courses:ALL_COURSES,
    targetProblems:['lateralAsymmetry','anteriorPelvicTilt'],
    category:'training', technique:'isometric', bodyPart:'core', intensity:2,
    equipment:'マット', position:'side', duration:'各20秒',
    illustration: SVG2.sidePlank,
    purpose:'膝つきサイドプランク。',
    how:['横向き、肘と膝で支える。','体一直線で20秒。'],
    cues:{do:'呼吸を続ける。',dont:'腰を落とさない。'},
    why:'体側の安定強化。'
  },
  {
    id:'sn_supine_pillow_squeeze', name:'仰向け内ももスクイーズ', courses:ALL_COURSES,
    targetProblems:['kneeValgus','anteriorPelvicTilt'],
    category:'training', technique:'isometric', bodyPart:'leg', intensity:1,
    equipment:'マット', position:'supine', duration:'10秒 × 5回',
    illustration: SVG2.bridge,
    purpose:'仰向けで両膝を内側に絞る。',
    how:['仰向け膝立て。','両膝を内側に押し合う。','10秒キープ。5回。'],
    cues:{do:'お腹も連動。',dont:'息を止めない。'},
    why:'内転筋・骨盤底の活性化。'
  },

  // ============== EXPANSION 2 — 呼吸ヴァリエーション ==============
  {
    id:'sn_3part_breath', name:'3段階呼吸', courses:ALL_COURSES,
    targetProblems:['general'],
    category:'breath', technique:'pranayama', bodyPart:'core', intensity:1,
    equipment:'マット', position:'supine', duration:'3分',
    illustration: SVG2.breathing,
    purpose:'お腹→肋骨→鎖骨の3段階で吸う。',
    how:['仰向け。','お腹→肋骨→鎖骨と順番に吸う。','3分。'],
    cues:{do:'順番を意識。',dont:'力まない。'},
    why:'呼吸の質と肺活量UP。'
  },
  {
    id:'sn_humming_breath', name:'ハミング呼吸', courses:ALL_COURSES,
    targetProblems:['general'],
    category:'breath', technique:'pranayama', bodyPart:'core', intensity:1,
    equipment:'なし', position:'sitting', duration:'2分',
    illustration: SVG2.humming,
    purpose:'吐く息で「んー」とハミング。',
    how:['吸って吐きながら「んー」と唸る。','2分。'],
    cues:{do:'振動を感じる。',dont:'喉に力まない。'},
    why:'副交感神経の即時活性。'
  },
  {
    id:'sn_breath_count', name:'カウント呼吸', courses:ALL_COURSES,
    targetProblems:['general'],
    category:'breath', technique:'pranayama', bodyPart:'core', intensity:1,
    equipment:'なし', position:'sitting', duration:'5分',
    illustration: SVG2.breathing,
    purpose:'呼吸を1から10まで数える。',
    how:['吸って吐いて1。','10まで数えたら1から。','5分。'],
    cues:{do:'数字に集中。',dont:'考えごとに引っ張られない。'},
    why:'マインドフルネスの入門。'
  },
  {
    id:'sn_sigh_release', name:'ため息リリース', courses:ALL_COURSES,
    targetProblems:['general'],
    category:'breath', technique:'pranayama', bodyPart:'core', intensity:1,
    equipment:'なし', position:'sitting', duration:'5回',
    illustration: SVG2.breathing,
    purpose:'大きく吸って思いきり吐く。',
    how:['大きく吸って「はーっ」と吐く。','5回。'],
    cues:{do:'声に出してOK。',dont:'恥ずかしがらない。'},
    why:'ストレス即時解放。'
  },
  {
    id:'sn_seated_meditation', name:'座位瞑想', courses:ALL_COURSES,
    targetProblems:['general'],
    category:'meditation', technique:'meditation', bodyPart:'core', intensity:1,
    equipment:'なし', position:'sitting', duration:'5分',
    illustration: SVG2.meditation,
    purpose:'座位で呼吸を観察。',
    how:['楽な座位で目を閉じる。','呼吸を観察。','5分。'],
    cues:{do:'流れる思考を見送る。',dont:'評価しない。'},
    why:'心の安定。'
  },
  {
    id:'sn_gratitude_meditation', name:'感謝瞑想', courses:ALL_COURSES,
    targetProblems:['general'],
    category:'meditation', technique:'meditation', bodyPart:'core', intensity:1,
    equipment:'なし', position:'sitting', duration:'5分',
    illustration: SVG2.meditation,
    purpose:'今日の感謝を3つ思い浮かべる。',
    how:['座位、目を閉じる。','3つの感謝を心で味わう。','5分。'],
    cues:{do:'感情を感じる。',dont:'評価しない。'},
    why:'幸福度の即時上昇。'
  },

  // ============================================================
  // EXPANSION 3: 結果が出る中強度メニュー(intensity 2-3)
  // 40〜70代女性向け・道具なし。下半身強化、臀部強化、体幹強化、
  // 上半身強化、有酸素、バランス、姿勢別ターゲットを大量追加。
  // ============================================================

  // ============== 下肢強化(スクワット・ランジ系) ==============
  {
    id:'sn_wide_squat', name:'ワイドスクワット', courses:ALL_COURSES,
    targetProblems:['posteriorPelvicTilt','kneeValgus','general'],
    category:'strength', technique:'strength', bodyPart:'legs', intensity:2,
    equipment:'なし', position:'standing', duration:'15回 × 3セット',
    illustration: SVG2.sumoSquat,
    purpose:'脚を肩幅より広く開いて深くしゃがむ。',
    how:['足を肩幅の1.5倍、つま先を外45度。','息を吸いながら股関節から下ろす。','膝とつま先を同方向で太もも床と平行近くまで。','息を吐いて立ち上がる。15回×3。'],
    cues:{do:'お尻を後ろに引く。',dont:'膝が内に入らない。'},
    why:'内もも・大臀筋・大腿四頭筋を効率良く同時強化。'
  },
  {
    id:'sn_sumo_squat', name:'相撲スクワット', courses:ALL_COURSES,
    targetProblems:['posteriorPelvicTilt','general'],
    category:'strength', technique:'strength', bodyPart:'legs', intensity:2,
    equipment:'なし', position:'standing', duration:'12回 × 3セット',
    illustration: SVG2.sumoSquat,
    purpose:'四股を踏むようにじっくりしゃがむ。',
    how:['足を広く、つま先外向き60度。','胸を張って4秒かけて下ろす。','一番下で1秒停止。','2秒で立つ。12回×3。'],
    cues:{do:'背筋を立てたまま。',dont:'膝を前に押し出さない。'},
    why:'内転筋群と臀筋への持続的な負荷で結果が出やすい。'
  },
  {
    id:'sn_squat_hold_30s', name:'スクワットホールド30秒', courses:ALL_COURSES,
    targetProblems:['posteriorPelvicTilt','anteriorPelvicTilt','general'],
    category:'strength', technique:'isometric', bodyPart:'legs', intensity:2,
    equipment:'なし', position:'standing', duration:'30秒 × 3セット',
    illustration: SVG2.squatHold,
    purpose:'スクワット下位で姿勢を保つ。',
    how:['ハーフスクワット位置を作る。','腿が床と45度。','30秒キープ×3セット。'],
    cues:{do:'呼吸を止めない。',dont:'膝を内に入れない。'},
    why:'下半身筋持久力を集中的に向上。'
  },
  {
    id:'sn_squat_pulse', name:'スクワットパルス', courses:ALL_COURSES,
    targetProblems:['posteriorPelvicTilt','general'],
    category:'strength', technique:'strength', bodyPart:'legs', intensity:2,
    equipment:'なし', position:'standing', duration:'20回 × 3セット',
    illustration: SVG2.squatHold,
    purpose:'ハーフスクワット位置で小さく上下。',
    how:['ハーフスクワット位置で5cmずつパルス。','20回×3。'],
    cues:{do:'下半身は緊張保持。',dont:'立ち上がらない。'},
    why:'臀筋・大腿への一定負荷で代謝刺激。'
  },
  {
    id:'sn_reverse_lunge', name:'リバースランジ', courses:ALL_COURSES,
    targetProblems:['posteriorPelvicTilt','lateralAsymmetry','general'],
    category:'strength', technique:'strength', bodyPart:'legs', intensity:2,
    equipment:'なし', position:'standing', duration:'各10回 × 3セット',
    illustration: SVG2.lunge,
    purpose:'片足を後ろに引いて深く下ろす。',
    how:['足を腰幅で立つ。','片足を大きく後ろへ。','前膝が90度、後膝は床近くまで。','戻る。各10回×3。'],
    cues:{do:'胸を張る。',dont:'前膝がつま先を超えない。'},
    why:'左右差・臀筋・大腿四頭筋を同時に整える。'
  },
  {
    id:'sn_static_lunge', name:'スタティックランジ', courses:ALL_COURSES,
    targetProblems:['posteriorPelvicTilt','general'],
    category:'strength', technique:'strength', bodyPart:'legs', intensity:2,
    equipment:'なし', position:'standing', duration:'各12回 × 2セット',
    illustration: SVG2.lunge,
    purpose:'前後開脚で上下動。',
    how:['脚を前後に大きく開いて固定。','上下に12回。','足を入れ替えて12回。×2。'],
    cues:{do:'体幹を真っ直ぐ。',dont:'前のめりにならない。'},
    why:'左右の脚を均等に鍛え骨盤を安定。'
  },
  {
    id:'sn_lateral_lunge', name:'サイドランジ', courses:ALL_COURSES,
    targetProblems:['lateralAsymmetry','kneeValgus','general'],
    category:'strength', technique:'strength', bodyPart:'legs', intensity:2,
    equipment:'なし', position:'standing', duration:'各10回 × 3セット',
    illustration: SVG2.sideLunge,
    purpose:'横方向に大きく踏み出してしゃがむ。',
    how:['足を横に大きく開く。','片膝を曲げてお尻を引く。','反対脚は伸ばしておく。','戻る。各10回×3。'],
    cues:{do:'お尻を後ろへ引く。',dont:'膝とつま先を別方向に向けない。'},
    why:'内転筋・中臀筋を同時に鍛え骨盤の左右差改善。'
  },
  {
    id:'sn_split_squat_easy', name:'スプリットスクワット', courses:ALL_COURSES,
    targetProblems:['posteriorPelvicTilt','general'],
    category:'strength', technique:'strength', bodyPart:'legs', intensity:2,
    equipment:'なし', position:'standing', duration:'各10回 × 2セット',
    illustration: SVG2.lunge,
    purpose:'前後開脚位置で深く沈む。',
    how:['前後に1歩分開く。','後膝を床に近づける。','前足のかかとで押し戻る。','各10回×2。'],
    cues:{do:'前足の踏み込みを意識。',dont:'前膝が内に倒れない。'},
    why:'下半身の単側強化で歩行能力・姿勢改善。'
  },
  {
    id:'sn_wall_sit_45s', name:'ウォールシット45秒(壁なし)', courses:ALL_COURSES,
    targetProblems:['posteriorPelvicTilt','general'],
    category:'strength', technique:'isometric', bodyPart:'legs', intensity:2,
    equipment:'なし', position:'standing', duration:'45秒 × 3セット',
    illustration: SVG2.squatHold,
    purpose:'空気椅子を45秒キープ(壁を背に立てなくてもOK)。',
    how:['壁があれば寄りかかってもOK。','腿が床と平行近くで45秒。×3。'],
    cues:{do:'呼吸を続ける。',dont:'膝とつま先を別方向にしない。'},
    why:'大腿四頭筋・臀筋の持久力を高め基礎代謝アップ。'
  },
  {
    id:'sn_chair_squat_strong', name:'立ち座りスクワット', courses:ALL_COURSES,
    targetProblems:['posteriorPelvicTilt','general'],
    category:'strength', technique:'strength', bodyPart:'legs', intensity:2,
    equipment:'なし', position:'standing', duration:'15回 × 3セット',
    illustration: SVG2.squatHold,
    purpose:'イスをイメージし座る・立つを繰り返す。',
    how:['足を肩幅、お尻を後ろへ。','イスに座る寸前まで下ろし、立ち上がる。','15回×3。'],
    cues:{do:'踵で押す。',dont:'背中を丸めない。'},
    why:'日常動作直結の下肢強化で結果が出やすい。'
  },
  {
    id:'sn_step_up_in_place', name:'その場ステップアップ', courses:ALL_COURSES,
    targetProblems:['posteriorPelvicTilt','general'],
    category:'strength', technique:'strength', bodyPart:'legs', intensity:2,
    equipment:'なし', position:'standing', duration:'各12回 × 2セット',
    illustration: SVG2.stepUp,
    purpose:'片膝を腰の高さまで持ち上げる。',
    how:['立位、片膝を90度持ち上げる。','下ろして反対。','各12回×2。'],
    cues:{do:'軸足を安定させる。',dont:'体幹をブレさせない。'},
    why:'腸腰筋・大腿四頭筋・バランス機能を同時に強化。'
  },
  {
    id:'sn_calf_raise_strong', name:'カーフレイズ強化', courses:ALL_COURSES,
    targetProblems:['ankleStiffness','general'],
    category:'strength', technique:'strength', bodyPart:'legs', intensity:2,
    equipment:'なし', position:'standing', duration:'20回 × 3セット',
    illustration: SVG2.calfRaiseUp,
    purpose:'かかとを最大まで上げ下げ。',
    how:['立位、ゆっくり3秒でかかと上げ。','一番上で1秒停止。','3秒で下ろす。','20回×3。'],
    cues:{do:'親指の付け根で押す。',dont:'勢いをつけない。'},
    why:'ふくらはぎ筋ポンプ機能向上で全身の循環改善。'
  },
  {
    id:'sn_single_calf_raise', name:'片足カーフレイズ', courses:ALL_COURSES,
    targetProblems:['ankleStiffness','lateralAsymmetry'],
    category:'strength', technique:'strength', bodyPart:'legs', intensity:2,
    equipment:'なし', position:'standing', duration:'各12回 × 2セット',
    illustration: SVG2.calfRaiseUp,
    purpose:'片足立ちでかかと上げ下げ。',
    how:['壁に手をついて片足立ち。','かかとを最大まで上げ下げ。','各12回×2。'],
    cues:{do:'まっすぐ上に。',dont:'体を傾けない。'},
    why:'左右差解消とバランス強化を同時に達成。'
  },
  {
    id:'sn_curtsy_lunge_easy', name:'やさしいカーツィー', courses:ALL_COURSES,
    targetProblems:['posteriorPelvicTilt','lateralAsymmetry'],
    category:'strength', technique:'strength', bodyPart:'legs', intensity:2,
    equipment:'なし', position:'standing', duration:'各10回 × 2セット',
    illustration: SVG2.lunge,
    purpose:'片足を斜め後ろにクロスして下ろす。',
    how:['立位、片足を斜め後ろにクロス。','深く下ろして戻る。','各10回×2。'],
    cues:{do:'胸を正面に保つ。',dont:'膝を捻らない。'},
    why:'中臀筋・内転筋に独特の刺激でヒップ形を整える。'
  },

  // ============== 臀部強化(ヒップ系) ==============
  {
    id:'sn_glute_bridge_strong', name:'ヒップリフト強化', courses:ALL_COURSES,
    targetProblems:['anteriorPelvicTilt','posteriorPelvicTilt','general'],
    category:'strength', technique:'strength', bodyPart:'glutes', intensity:2,
    equipment:'マット', position:'supine', duration:'15回 × 3セット',
    illustration: SVG2.bridge,
    purpose:'仰向けで腰をしっかり持ち上げる。',
    how:['仰向け、膝を曲げて足を腰幅。','息を吐きお尻に力を入れて持ち上げる。','一番上で2秒停止。','下ろす。15回×3。'],
    cues:{do:'お尻を絞る。',dont:'腰を反らせない。'},
    why:'大臀筋を強化しヒップアップ・腰痛予防。'
  },
  {
    id:'sn_single_leg_bridge', name:'片足ブリッジ', courses:ALL_COURSES,
    targetProblems:['lateralAsymmetry','anteriorPelvicTilt'],
    category:'strength', technique:'strength', bodyPart:'glutes', intensity:2,
    equipment:'マット', position:'supine', duration:'各8回 × 2セット',
    illustration: SVG2.bridge,
    purpose:'片足を浮かせてブリッジ。',
    how:['仰向けで両膝立て。','片足を伸ばして浮かせる。','支持脚でブリッジ。','各8回×2。'],
    cues:{do:'骨盤を水平に。',dont:'お尻が傾かない。'},
    why:'左右差是正と単脚臀筋強化。'
  },
  {
    id:'sn_glute_bridge_march', name:'ブリッジマーチ', courses:ALL_COURSES,
    targetProblems:['anteriorPelvicTilt','general'],
    category:'core', technique:'core', bodyPart:'glutes', intensity:2,
    equipment:'マット', position:'supine', duration:'各10回 × 2セット',
    illustration: SVG2.bridge,
    purpose:'ブリッジ姿勢のまま脚を交互に持ち上げる。',
    how:['ブリッジを作って維持。','片膝ずつ胸へ近づける。','各10回×2。'],
    cues:{do:'骨盤を水平に保つ。',dont:'腰を落とさない。'},
    why:'臀筋・体幹・腸腰筋を一度に鍛えるオールインワン。'
  },
  {
    id:'sn_glute_bridge_pulse', name:'ブリッジパルス', courses:ALL_COURSES,
    targetProblems:['posteriorPelvicTilt','general'],
    category:'strength', technique:'strength', bodyPart:'glutes', intensity:2,
    equipment:'マット', position:'supine', duration:'30回 × 2セット',
    illustration: SVG2.bridge,
    purpose:'ブリッジ上で小さく上下。',
    how:['ブリッジ最高位で5cmの上下を繰り返す。','30回×2。'],
    cues:{do:'お尻に絞り続ける。',dont:'下ろしすぎない。'},
    why:'臀筋への持続的負荷で形を作る。'
  },
  {
    id:'sn_fire_hydrant', name:'ファイヤーハイドラント', courses:ALL_COURSES,
    targetProblems:['lateralAsymmetry','kneeValgus','general'],
    category:'strength', technique:'strength', bodyPart:'glutes', intensity:2,
    equipment:'マット', position:'quadruped', duration:'各12回 × 2セット',
    illustration: SVG2.fireHydrant,
    purpose:'四つん這いで片足を横に開く。',
    how:['四つん這い、膝90度キープ。','片膝を真横へ開く。','戻す。各12回×2。'],
    cues:{do:'体幹を固定。',dont:'腰を捻らない。'},
    why:'中臀筋を分離させて鍛え骨盤左右差を整える。'
  },
  {
    id:'sn_donkey_kick_strong', name:'ドンキーキック強化', courses:ALL_COURSES,
    targetProblems:['anteriorPelvicTilt','general'],
    category:'strength', technique:'strength', bodyPart:'glutes', intensity:2,
    equipment:'マット', position:'quadruped', duration:'各15回 × 2セット',
    illustration: SVG2.bridge,
    purpose:'四つん這いで膝を曲げたまま脚を上げる。',
    how:['四つん這い、膝90度。','足裏を天井へ押し上げるイメージで上に。','各15回×2。'],
    cues:{do:'お尻だけで持ち上げる。',dont:'腰を反らさない。'},
    why:'大臀筋上部のヒップアップ専用刺激。'
  },
  {
    id:'sn_lateral_leg_raise', name:'サイドレッグレイズ', courses:ALL_COURSES,
    targetProblems:['lateralAsymmetry','kneeValgus'],
    category:'strength', technique:'strength', bodyPart:'glutes', intensity:2,
    equipment:'マット', position:'side', duration:'各15回 × 2セット',
    illustration: SVG2.legRaise,
    purpose:'横向きで上の脚を高く上げる。',
    how:['横向き、両脚伸ばす。','上の脚をゆっくり高く上げる。','各15回×2。'],
    cues:{do:'踵リードで上げる。',dont:'体が後ろに倒れない。'},
    why:'中臀筋を集中して鍛え骨盤の安定性アップ。'
  },
  {
    id:'sn_clam_strong', name:'クラムシェル強化', courses:ALL_COURSES,
    targetProblems:['lateralAsymmetry','kneeValgus','anteriorPelvicTilt'],
    category:'strength', technique:'strength', bodyPart:'glutes', intensity:2,
    equipment:'マット', position:'side', duration:'各20回 × 2セット',
    illustration: SVG2.clamShell,
    purpose:'横向き膝曲げで上の膝だけを開く。',
    how:['横向きで膝90度。','足は重ねたまま、上の膝だけ開く。','各20回×2。'],
    cues:{do:'骨盤を真っ直ぐ。',dont:'体を後ろに倒さない。'},
    why:'股関節外旋筋を強化し膝の方向を整える。'
  },
  {
    id:'sn_reverse_clam', name:'リバースクラム', courses:ALL_COURSES,
    targetProblems:['kneeValgus'],
    category:'strength', technique:'strength', bodyPart:'glutes', intensity:2,
    equipment:'マット', position:'side', duration:'各15回 × 2セット',
    illustration: SVG2.clamShell,
    purpose:'横向きで上の足を持ち上げ膝は閉じたまま。',
    how:['横向き、膝90度。','膝を合わせたまま足だけ持ち上げる。','各15回×2。'],
    cues:{do:'股関節を意識。',dont:'勢いをつけない。'},
    why:'股関節内旋筋に独自刺激。'
  },
  {
    id:'sn_hip_thrust_floor', name:'フロアヒップスラスト', courses:ALL_COURSES,
    targetProblems:['anteriorPelvicTilt','posteriorPelvicTilt','general'],
    category:'strength', technique:'strength', bodyPart:'glutes', intensity:2,
    equipment:'マット', position:'supine', duration:'15回 × 3セット',
    illustration: SVG2.bridge,
    purpose:'床上でヒップスラスト動作。',
    how:['仰向け、足を腰幅。','お尻を絞って持ち上げ、3秒キープ。','下ろす。15回×3。'],
    cues:{do:'肋骨を閉じる。',dont:'腰を反らない。'},
    why:'大臀筋単独刺激のゴールデン種目。'
  },
  {
    id:'sn_glute_kickback', name:'グルートキックバック', courses:ALL_COURSES,
    targetProblems:['anteriorPelvicTilt','general'],
    category:'strength', technique:'strength', bodyPart:'glutes', intensity:2,
    equipment:'マット', position:'quadruped', duration:'各15回 × 2セット',
    illustration: SVG2.bridge,
    purpose:'四つん這いで脚を真後ろに伸ばし上げる。',
    how:['四つん這いから片脚を後ろへ伸ばす。','水平より少し上まで上げる。','各15回×2。'],
    cues:{do:'お尻で蹴る感覚。',dont:'反り腰になりすぎない。'},
    why:'大臀筋の伸展機能強化で立ち姿勢が変わる。'
  },
  {
    id:'sn_frog_pump_easy', name:'やさしいフロッグポンプ', courses:ALL_COURSES,
    targetProblems:['posteriorPelvicTilt'],
    category:'strength', technique:'strength', bodyPart:'glutes', intensity:2,
    equipment:'マット', position:'supine', duration:'20回 × 3セット',
    illustration: SVG2.bridge,
    purpose:'仰向けで足裏を合わせブリッジ。',
    how:['仰向け、足裏を合わせて膝外向き。','お尻を絞って持ち上げる。','20回×3。'],
    cues:{do:'お尻だけで動かす。',dont:'反動つけない。'},
    why:'外旋位での臀筋活性化。'
  },

  // ============== 体幹強化(プランク・コア系) ==============
  {
    id:'sn_full_plank_30s', name:'フルプランク30秒', courses:ALL_COURSES,
    targetProblems:['anteriorPelvicTilt','general'],
    category:'core', technique:'core', bodyPart:'core', intensity:2,
    equipment:'マット', position:'prone', duration:'30秒 × 3セット',
    illustration: SVG2.plank,
    purpose:'肘とつま先で体を一直線に保つ。',
    how:['肘下に肩、つま先立ち。','頭〜踵を直線に。','30秒×3。'],
    cues:{do:'お腹引き込む。',dont:'お尻が上がらない。'},
    why:'体幹全体の基礎筋力を底上げ。'
  },
  {
    id:'sn_plank_knee_drop', name:'膝つきフルプランク', courses:ALL_COURSES,
    targetProblems:['anteriorPelvicTilt','general'],
    category:'core', technique:'core', bodyPart:'core', intensity:2,
    equipment:'マット', position:'prone', duration:'45秒 × 3セット',
    illustration: SVG2.plank,
    purpose:'膝つきのままフルプランク姿勢。',
    how:['肘と膝をつき、体を一直線に。','45秒×3。'],
    cues:{do:'お腹を引き込む。',dont:'腰を反らない。'},
    why:'プランクの効果を保ちつつ初心者でも安全に習得。'
  },
  {
    id:'sn_side_plank_knee', name:'膝つきサイドプランク', courses:ALL_COURSES,
    targetProblems:['lateralAsymmetry','general'],
    category:'core', technique:'core', bodyPart:'core', intensity:2,
    equipment:'マット', position:'side', duration:'各30秒 × 2セット',
    illustration: SVG2.plank,
    purpose:'膝つきの横向きプランク。',
    how:['横向き、肘と膝で支える。','お尻を上げて一直線。','各30秒×2。'],
    cues:{do:'骨盤を上げる意識。',dont:'お尻が落ちない。'},
    why:'腹斜筋・中臀筋を同時に強化。'
  },
  {
    id:'sn_side_plank_full', name:'フルサイドプランク', courses:ALL_COURSES,
    targetProblems:['lateralAsymmetry'],
    category:'core', technique:'core', bodyPart:'core', intensity:2,
    equipment:'マット', position:'side', duration:'各20秒 × 2セット',
    illustration: SVG2.plank,
    purpose:'横向きで脚を伸ばしたサイドプランク。',
    how:['横向き、肘と足の外側で支える。','体を一直線に。','各20秒×2。'],
    cues:{do:'呼吸を続ける。',dont:'お尻を後ろに引かない。'},
    why:'体側全体・骨盤安定筋を集中強化。'
  },
  {
    id:'sn_bird_dog_strong', name:'バードドッグ強化', courses:ALL_COURSES,
    targetProblems:['lateralAsymmetry','anteriorPelvicTilt','general'],
    category:'core', technique:'core', bodyPart:'core', intensity:2,
    equipment:'マット', position:'quadruped', duration:'各10回 × 2セット',
    illustration: SVG2.birdDog,
    purpose:'対側の腕と脚を伸ばしてキープ。',
    how:['四つん這いから対側の腕と脚を伸ばす。','3秒キープ後ゆっくり戻す。','各10回×2。'],
    cues:{do:'体幹を水平に。',dont:'腰を反らせない。'},
    why:'抗回旋の体幹安定機能を強化。'
  },
  {
    id:'sn_dead_bug_strong', name:'デッドバグ強化', courses:ALL_COURSES,
    targetProblems:['anteriorPelvicTilt','general'],
    category:'core', technique:'core', bodyPart:'core', intensity:2,
    equipment:'マット', position:'supine', duration:'各10回 × 2セット',
    illustration: SVG2.deadBug,
    purpose:'仰向けで対側の腕と脚を伸ばす。',
    how:['仰向け、両腕天井、両膝90度。','対側の腕と脚を床へゆっくり伸ばす。','戻る。各10回×2。'],
    cues:{do:'腰を床に押し付ける。',dont:'腰を浮かさない。'},
    why:'腹横筋・腹斜筋を腰部を守りながら強化。'
  },
  {
    id:'sn_heel_taps', name:'ヒールタップ', courses:ALL_COURSES,
    targetProblems:['anteriorPelvicTilt'],
    category:'core', technique:'core', bodyPart:'core', intensity:2,
    equipment:'マット', position:'supine', duration:'各12回 × 2セット',
    illustration: SVG2.toeTap,
    purpose:'仰向けでテーブルトップから片足ずつ床にタッチ。',
    how:['仰向けでテーブルトップ。','片足のかかとを床にタッチ。','戻して反対。各12回×2。'],
    cues:{do:'腰は床に密着。',dont:'腰を反らない。'},
    why:'下腹部・腸腰筋のコントロールを養う。'
  },
  {
    id:'sn_reverse_crunch_easy', name:'リバースクランチ', courses:ALL_COURSES,
    targetProblems:['anteriorPelvicTilt','general'],
    category:'core', technique:'core', bodyPart:'core', intensity:2,
    equipment:'マット', position:'supine', duration:'15回 × 2セット',
    illustration: SVG2.reverseCrunch,
    purpose:'仰向けで膝を胸に引きつけ骨盤を持ち上げる。',
    how:['仰向け、両膝90度。','骨盤を後傾させ膝を胸へ近づける。','15回×2。'],
    cues:{do:'下腹部で巻き上げる。',dont:'勢いをつけない。'},
    why:'下腹部の引き締めに直接効く。'
  },
  {
    id:'sn_bicycle_easy', name:'やさしい自転車漕ぎ', courses:ALL_COURSES,
    targetProblems:['anteriorPelvicTilt','lateralAsymmetry'],
    category:'core', technique:'core', bodyPart:'core', intensity:2,
    equipment:'マット', position:'supine', duration:'各15回 × 2セット',
    illustration: SVG2.deadBug,
    purpose:'仰向けで両足を交互に踏むように動かす。',
    how:['仰向け、テーブルトップ位置。','足を自転車を漕ぐようにゆっくり。','各15回×2。'],
    cues:{do:'体幹を固定。',dont:'勢いで動かさない。'},
    why:'腹斜筋・腸腰筋を同時刺激。'
  },
  {
    id:'sn_toe_taps_supine', name:'仰向けつま先タップ', courses:ALL_COURSES,
    targetProblems:['anteriorPelvicTilt','general'],
    category:'core', technique:'core', bodyPart:'core', intensity:2,
    equipment:'マット', position:'supine', duration:'各12回 × 2セット',
    illustration: SVG2.toeTap,
    purpose:'テーブルトップから片足ずつつま先を床に下ろす。',
    how:['仰向け、テーブルトップ。','片足のつま先を床にタップ。','各12回×2。'],
    cues:{do:'腰を床に。',dont:'腰を反らない。'},
    why:'コアコントロール強化。'
  },
  {
    id:'sn_leg_lower_easy', name:'やさしいレッグロワー', courses:ALL_COURSES,
    targetProblems:['anteriorPelvicTilt'],
    category:'core', technique:'core', bodyPart:'core', intensity:2,
    equipment:'マット', position:'supine', duration:'10回 × 2セット',
    illustration: SVG2.legLower,
    purpose:'両足を立てた状態から下ろす。',
    how:['仰向け、両足を天井へ。','腰を床に保ったまま、できる範囲で下ろす。','10回×2。'],
    cues:{do:'下腹部の力で支える。',dont:'腰を反らない。'},
    why:'下腹部の制御筋力を効率良く鍛える。'
  },
  {
    id:'sn_hundred_easy', name:'やさしいハンドレッド', courses:ALL_COURSES,
    targetProblems:['anteriorPelvicTilt','general'],
    category:'core', technique:'core', bodyPart:'core', intensity:2,
    equipment:'マット', position:'supine', duration:'100カウント',
    illustration: SVG2.hundred,
    purpose:'仰向けで腕をパタパタしながら呼吸。',
    how:['仰向けでテーブルトップ、頭を少し上げる。','腕を上下に小さく振りながら呼吸を5吸5吐。','合計100カウント。'],
    cues:{do:'下腹部を引き込む。',dont:'首を緊張させない。'},
    why:'コアと呼吸を統合した全身ウォームアップ。'
  },
  {
    id:'sn_v_sit_easy', name:'やさしいVシット', courses:ALL_COURSES,
    targetProblems:['anteriorPelvicTilt','posteriorPelvicTilt'],
    category:'core', technique:'core', bodyPart:'core', intensity:2,
    equipment:'マット', position:'sitting', duration:'30秒 × 2セット',
    illustration: SVG2.boatPose,
    purpose:'座位で足を浮かせV字形をキープ。',
    how:['長座、膝を曲げて足を浮かせる。','背中を後傾して30秒。×2。'],
    cues:{do:'胸を張る。',dont:'背中を丸めない。'},
    why:'腹筋・腸腰筋を統合的に強化。'
  },

  // ============== 上半身強化(プッシュ・プル系) ==============
  {
    id:'sn_incline_pushup_floor', name:'インクラインプッシュアップ', courses:ALL_COURSES,
    targetProblems:['roundedShoulders','forwardHead','general'],
    category:'strength', technique:'strength', bodyPart:'chest', intensity:2,
    equipment:'マット', position:'prone', duration:'12回 × 3セット',
    illustration: SVG2.pushup,
    purpose:'手の位置を高くする(壁・床なら床で膝つき)。',
    how:['膝つき、手は肩の真下より少し前。','胸を床へ近づける。','戻す。12回×3。'],
    cues:{do:'肘を45度に。',dont:'お尻を上げない。'},
    why:'胸・三角筋・上腕三頭筋の同時強化。'
  },
  {
    id:'sn_knee_pushup_strong', name:'膝つき腕立て強化', courses:ALL_COURSES,
    targetProblems:['roundedShoulders','general'],
    category:'strength', technique:'strength', bodyPart:'chest', intensity:2,
    equipment:'マット', position:'prone', duration:'10回 × 3セット',
    illustration: SVG2.pushup,
    purpose:'膝つき腕立てを胸床に近づけて。',
    how:['膝つきプッシュアップ。','3秒で下ろし1秒で上げる。','10回×3。'],
    cues:{do:'体幹を一直線。',dont:'肩がすくまない。'},
    why:'上半身の押す力を効率的に向上。'
  },
  {
    id:'sn_pushup_negative', name:'ネガティブプッシュアップ', courses:ALL_COURSES,
    targetProblems:['roundedShoulders','general'],
    category:'strength', technique:'strength', bodyPart:'chest', intensity:2,
    equipment:'マット', position:'prone', duration:'8回 × 2セット',
    illustration: SVG2.pushup,
    purpose:'下ろす局面のみゆっくり。',
    how:['膝つきの上位置から5秒かけて下ろす。','膝で戻る。8回×2。'],
    cues:{do:'肩甲骨をコントロール。',dont:'落下しない。'},
    why:'伸張性収縮で筋肥大刺激を最大化。'
  },
  {
    id:'sn_pushup_hold', name:'プッシュアップホールド', courses:ALL_COURSES,
    targetProblems:['roundedShoulders','anteriorPelvicTilt','general'],
    category:'core', technique:'isometric', bodyPart:'chest', intensity:2,
    equipment:'マット', position:'prone', duration:'30秒 × 2セット',
    illustration: SVG2.plank,
    purpose:'プッシュアップ中間位置でキープ。',
    how:['膝つきプッシュアップ、肘90度位置で停止。','30秒×2。'],
    cues:{do:'呼吸を止めない。',dont:'肩がすくまない。'},
    why:'胸・体幹の持久力を同時強化。'
  },
  {
    id:'sn_floor_dip', name:'床ディップ', courses:ALL_COURSES,
    targetProblems:['roundedShoulders','general'],
    category:'strength', technique:'strength', bodyPart:'arms', intensity:2,
    equipment:'マット', position:'sitting', duration:'12回 × 2セット',
    illustration: SVG2.pushup,
    purpose:'長座で手を後ろに、お尻を浮かして肘曲げ伸ばし。',
    how:['長座、手をお尻の後ろ。','お尻を浮かせて肘を曲げる。','戻す。12回×2。'],
    cues:{do:'肩を下げて。',dont:'肩がすくまない。'},
    why:'上腕三頭筋・三角筋後部を強化し腕の引き締め。'
  },
  {
    id:'sn_reverse_plank', name:'リバースプランク', courses:ALL_COURSES,
    targetProblems:['posteriorPelvicTilt','roundedShoulders'],
    category:'core', technique:'isometric', bodyPart:'core', intensity:2,
    equipment:'マット', position:'supine', duration:'30秒 × 2セット',
    illustration: SVG2.reversePlank,
    purpose:'仰向け逆プランク。',
    how:['長座、手を後ろ。','お尻を持ち上げ体を一直線。','30秒×2。'],
    cues:{do:'お尻を絞る。',dont:'首を反らない。'},
    why:'背中・お尻・体幹後面の総合強化。'
  },
  {
    id:'sn_table_top_strong', name:'テーブルトップ強化', courses:ALL_COURSES,
    targetProblems:['posteriorPelvicTilt','roundedShoulders'],
    category:'core', technique:'isometric', bodyPart:'core', intensity:2,
    equipment:'マット', position:'sitting', duration:'30秒 × 3セット',
    illustration: SVG2.plank,
    purpose:'四点支持テーブルトップでキープ。',
    how:['長座、手と足で四点支持。','お尻を持ち上げ体が床と平行。','30秒×3。'],
    cues:{do:'肩を下げる。',dont:'首を緊張させない。'},
    why:'背面チェーン全体を統合的に強化。'
  },
  {
    id:'sn_t_raise', name:'うつ伏せTレイズ', courses:ALL_COURSES,
    targetProblems:['roundedShoulders','forwardHead'],
    category:'strength', technique:'strength', bodyPart:'back', intensity:2,
    equipment:'マット', position:'prone', duration:'12回 × 3セット',
    illustration: SVG2.swimming,
    purpose:'うつ伏せで両腕を真横に開いて持ち上げる。',
    how:['うつ伏せ、両腕を真横T字に。','胸を浮かせ腕を浮かす。','12回×3。'],
    cues:{do:'肩甲骨を寄せる。',dont:'首を反らない。'},
    why:'菱形筋・中部僧帽筋を強化し巻き肩改善。'
  },
  {
    id:'sn_y_raise', name:'うつ伏せYレイズ', courses:ALL_COURSES,
    targetProblems:['roundedShoulders','forwardHead'],
    category:'strength', technique:'strength', bodyPart:'back', intensity:2,
    equipment:'マット', position:'prone', duration:'12回 × 3セット',
    illustration: SVG2.swimming,
    purpose:'うつ伏せで両腕をY字に持ち上げる。',
    how:['うつ伏せ、両腕を斜め前Y字。','肩甲骨で持ち上げる。','12回×3。'],
    cues:{do:'肩甲骨を上方回旋。',dont:'肩をすくめない。'},
    why:'下部僧帽筋を狙い撃ちで巻き肩改善。'
  },
  {
    id:'sn_w_raise', name:'うつ伏せWレイズ', courses:ALL_COURSES,
    targetProblems:['roundedShoulders','forwardHead'],
    category:'strength', technique:'strength', bodyPart:'back', intensity:2,
    equipment:'マット', position:'prone', duration:'15回 × 3セット',
    illustration: SVG2.swimming,
    purpose:'うつ伏せで両肘を曲げてW字。',
    how:['うつ伏せで両肘90度。','肩甲骨を寄せて胸を浮かす。','15回×3。'],
    cues:{do:'肘で押し下げる。',dont:'肩をすくめない。'},
    why:'肩甲骨の内転と下方回旋で姿勢矯正効果。'
  },
  {
    id:'sn_swimming_back', name:'スイミングバック', courses:ALL_COURSES,
    targetProblems:['thoracicKyphosis','roundedShoulders','general'],
    category:'strength', technique:'strength', bodyPart:'back', intensity:2,
    equipment:'マット', position:'prone', duration:'30秒 × 2セット',
    illustration: SVG2.swimming,
    purpose:'うつ伏せで対側の腕と脚を交互に。',
    how:['うつ伏せ、対側の腕と脚を浮かせる。','30秒交互に。×2。'],
    cues:{do:'お腹を引き込む。',dont:'反動なし。'},
    why:'背筋群を持続的に活性化し姿勢を整える。'
  },
  {
    id:'sn_superman_pulse', name:'スーパーマンパルス', courses:ALL_COURSES,
    targetProblems:['thoracicKyphosis','roundedShoulders'],
    category:'strength', technique:'strength', bodyPart:'back', intensity:2,
    equipment:'マット', position:'prone', duration:'20回 × 2セット',
    illustration: SVG2.swimming,
    purpose:'うつ伏せで両腕両脚を上げ小さく上下。',
    how:['うつ伏せ、両腕両脚を浮かせる。','5cm幅で20回パルス。×2。'],
    cues:{do:'胸を開く。',dont:'首を反らせすぎない。'},
    why:'脊柱起立筋・大臀筋の持続収縮で姿勢筋強化。'
  },
  {
    id:'sn_cobra_strong', name:'コブラ強化', courses:ALL_COURSES,
    targetProblems:['thoracicKyphosis','roundedShoulders'],
    category:'strength', technique:'strength', bodyPart:'back', intensity:2,
    equipment:'マット', position:'prone', duration:'10回 × 3セット',
    illustration: SVG2.cobra,
    purpose:'うつ伏せから手で押し胸を持ち上げる。',
    how:['うつ伏せ、手は胸の横。','息を吐きながら胸を持ち上げる。','3秒キープ後戻る。10回×3。'],
    cues:{do:'肩を下げる。',dont:'肩をすくめない。'},
    why:'胸椎伸展と肩甲骨の機能改善で姿勢が立つ。'
  },

  // ============== 全身・有酸素系 ==============
  {
    id:'sn_marching_strong', name:'もも上げマーチ', courses:ALL_COURSES,
    targetProblems:['general'],
    category:'cardio', technique:'cardio', bodyPart:'fullBody', intensity:2,
    equipment:'なし', position:'standing', duration:'1分 × 3セット',
    illustration: SVG2.marchHighKnee,
    purpose:'その場でモモを高く上げて歩く。',
    how:['立位、膝を腰の高さまで持ち上げる。','腕も振る。','1分×3セット。'],
    cues:{do:'背筋を立てる。',dont:'前のめりにならない。'},
    why:'有酸素・腸腰筋・バランスを同時に向上。'
  },
  {
    id:'sn_step_in_place_fast', name:'早足足踏み', courses:ALL_COURSES,
    targetProblems:['general'],
    category:'cardio', technique:'cardio', bodyPart:'fullBody', intensity:2,
    equipment:'なし', position:'standing', duration:'2分',
    illustration: SVG2.marchHighKnee,
    purpose:'その場で早足。',
    how:['その場で軽く早足。','腕も振って2分。'],
    cues:{do:'リズム良く。',dont:'飛び跳ねない。'},
    why:'心肺機能向上と脂肪燃焼。'
  },
  {
    id:'sn_side_step_strong', name:'サイドステップ強化', courses:ALL_COURSES,
    targetProblems:['lateralAsymmetry','general'],
    category:'cardio', technique:'cardio', bodyPart:'fullBody', intensity:2,
    equipment:'なし', position:'standing', duration:'1分 × 2セット',
    illustration: SVG2.sideStep,
    purpose:'横に大きくステップを左右繰り返す。',
    how:['左右に大きくサイドステップ。','腕も振る。','1分×2セット。'],
    cues:{do:'重心移動を明確に。',dont:'膝を捻らない。'},
    why:'股関節外転筋と全身協調を強化。'
  },
  {
    id:'sn_squat_to_stand', name:'立ち座り反復', courses:ALL_COURSES,
    targetProblems:['posteriorPelvicTilt','general'],
    category:'strength', technique:'strength', bodyPart:'legs', intensity:2,
    equipment:'なし', position:'standing', duration:'20回 × 2セット',
    illustration: SVG2.squatHold,
    purpose:'立つ・座るを反復(イスがなくてもOK)。',
    how:['イスに座る要領で下ろし立つを反復。','20回×2。'],
    cues:{do:'踵で押す。',dont:'反動つけない。'},
    why:'下肢機能と心拍上昇を両立。'
  },
  {
    id:'sn_jumping_jack_low', name:'省衝撃ジャック', courses:ALL_COURSES,
    targetProblems:['general'],
    category:'cardio', technique:'cardio', bodyPart:'fullBody', intensity:2,
    equipment:'なし', position:'standing', duration:'1分 × 2セット',
    illustration: SVG2.jumpingJack,
    purpose:'片足ずつ横に開く動作で腕も上下。',
    how:['片足ずつ横にステップしながら両腕を上下。','ジャンプなしで1分×2。'],
    cues:{do:'リズム良く。',dont:'飛ばない。'},
    why:'ジャンプなしで有酸素効果を確保。'
  },
  {
    id:'sn_arm_circles_strong', name:'大きな腕回し', courses:ALL_COURSES,
    targetProblems:['roundedShoulders','general'],
    category:'cardio', technique:'cardio', bodyPart:'shoulder', intensity:2,
    equipment:'なし', position:'standing', duration:'各1分',
    illustration: SVG2.shoulderRoll,
    purpose:'両腕を大きく前回し・後ろ回し。',
    how:['立位、両腕を大きく前回し1分。','後ろ回し1分。'],
    cues:{do:'肩甲骨から動かす。',dont:'肩をすくめない。'},
    why:'肩関節可動域と心拍を同時に上げる。'
  },
  {
    id:'sn_punch_squat', name:'パンチスクワット', courses:ALL_COURSES,
    targetProblems:['general'],
    category:'cardio', technique:'cardio', bodyPart:'fullBody', intensity:2,
    equipment:'なし', position:'standing', duration:'1分 × 2セット',
    illustration: SVG2.squatHold,
    purpose:'ハーフスクワットしながら前にパンチ。',
    how:['ハーフスクワット位置でリズム良くパンチ。','1分×2。'],
    cues:{do:'体幹をひねる。',dont:'肩を上げない。'},
    why:'全身協調と心肺機能を効率良くアップ。'
  },

  // ============== バランス強化 ==============
  {
    id:'sn_single_leg_strong', name:'片脚バランス強化', courses:ALL_COURSES,
    targetProblems:['lateralAsymmetry','general'],
    category:'balance', technique:'balance', bodyPart:'legs', intensity:2,
    equipment:'なし', position:'standing', duration:'各45秒',
    illustration: SVG2.singleLegBalance,
    purpose:'片脚で45秒立つ。',
    how:['片脚立ち、反対膝を90度上げる。','45秒。反対も。'],
    cues:{do:'軸足のお尻に乗る。',dont:'腰をひねらない。'},
    why:'バランス・中臀筋・体幹を一度に強化。'
  },
  {
    id:'sn_tree_pose_easy', name:'やさしいツリーポーズ', courses:ALL_COURSES,
    targetProblems:['lateralAsymmetry','general'],
    category:'balance', technique:'balance', bodyPart:'legs', intensity:2,
    equipment:'なし', position:'standing', duration:'各30秒',
    illustration: SVG2.standing,
    purpose:'片足の足裏を反対のふくらはぎへ。',
    how:['片足立ち、反対の足裏をふくらはぎに。','胸の前で合掌30秒。反対も。'],
    cues:{do:'視線一点。',dont:'膝に直接乗せない。'},
    why:'バランス能力と集中力を養う。'
  },
  {
    id:'sn_single_leg_reach', name:'片脚リーチ', courses:ALL_COURSES,
    targetProblems:['lateralAsymmetry','anteriorPelvicTilt'],
    category:'balance', technique:'balance', bodyPart:'legs', intensity:2,
    equipment:'なし', position:'standing', duration:'各8回',
    illustration: SVG2.singleLegBalance,
    purpose:'片脚立ちから前へ手を伸ばす。',
    how:['片脚立ち、上体を前へ倒し反対脚を後ろへ。','手は床方向へ。','戻る。各8回。'],
    cues:{do:'軸足のお尻で支える。',dont:'背中を丸めない。'},
    why:'シングルレッグデッドリフト要素でハム・臀筋・バランスを統合強化。'
  },
  {
    id:'sn_warrior3_easy', name:'やさしいウォリアー3', courses:ALL_COURSES,
    targetProblems:['lateralAsymmetry','general'],
    category:'balance', technique:'balance', bodyPart:'fullBody', intensity:2,
    equipment:'なし', position:'standing', duration:'各20秒',
    illustration: SVG2.warrior3,
    purpose:'片脚立ちでT字。',
    how:['片脚立ちで反対脚と上体を平行に倒す。','腕は前方へ。','20秒。反対も。'],
    cues:{do:'体を一直線。',dont:'軸足の膝を伸ばし切らない。'},
    why:'バランス・体幹・お尻を統合的に強化。'
  },

  // ============== 姿勢別ターゲット強化 ==============
  {
    id:'sn_chin_tuck_strong', name:'チンタック強化', courses:ALL_COURSES,
    targetProblems:['forwardHead','thoracicKyphosis'],
    category:'strength', technique:'strength', bodyPart:'neck', intensity:2,
    equipment:'マット', position:'supine', duration:'15回 × 2セット',
    illustration: SVG2.neckRotation,
    purpose:'仰向けで顎を引き後頭部で床を押す。',
    how:['仰向けで顎を引き後頭部で床を押す。','5秒キープ。','15回×2。'],
    cues:{do:'首の前面に力。',dont:'首を反らない。'},
    why:'頸部前面の深層筋を強化し頭部前方姿勢を矯正。'
  },
  {
    id:'sn_wall_angel_strong', name:'壁エンジェル強化', courses:ALL_COURSES,
    targetProblems:['roundedShoulders','thoracicKyphosis'],
    category:'strength', technique:'strength', bodyPart:'back', intensity:2,
    equipment:'なし', position:'standing', duration:'12回 × 3セット',
    illustration: SVG2.wallAngel,
    purpose:'壁を使った肩甲骨スライド(壁なしでもOK)。',
    how:['壁に背中をつけWの腕。','肘と手の甲を壁につけたまま上下に動かす。','12回×3。'],
    cues:{do:'腰を反らせない。',dont:'肩をすくめない。'},
    why:'胸椎伸展と肩甲骨内転を同時に習得。'
  },
  {
    id:'sn_thoracic_extension_floor', name:'タオルなし胸椎伸展', courses:ALL_COURSES,
    targetProblems:['thoracicKyphosis','roundedShoulders'],
    category:'selfcare', technique:'mobility', bodyPart:'back', intensity:2,
    equipment:'マット', position:'supine', duration:'1分 × 3セット',
    illustration: SVG2.bridge,
    purpose:'仰向けで両腕を頭上に伸ばし胸を開く。',
    how:['仰向け、両腕を頭上へ。','胸を天井へ持ち上げる感覚で1分。×3。'],
    cues:{do:'肋骨を開く。',dont:'首を反らない。'},
    why:'胸椎の伸展可動域を改善し巻き肩を緩める。'
  },
  {
    id:'sn_pelvic_tilt_strong', name:'骨盤チルト強化', courses:ALL_COURSES,
    targetProblems:['anteriorPelvicTilt','posteriorPelvicTilt'],
    category:'core', technique:'core', bodyPart:'core', intensity:2,
    equipment:'マット', position:'supine', duration:'20回 × 2セット',
    illustration: SVG2.pelvicTilt,
    purpose:'仰向けで骨盤を前傾・後傾に動かす。',
    how:['仰向け、膝立て。','骨盤を前傾→後傾に大きく動かす。','20回×2。'],
    cues:{do:'下腹部を意識。',dont:'勢いつけない。'},
    why:'骨盤の自由度を取り戻し腰痛予防。'
  },
  {
    id:'sn_psoas_march', name:'腸腰筋マーチ', courses:ALL_COURSES,
    targetProblems:['anteriorPelvicTilt','general'],
    category:'core', technique:'core', bodyPart:'core', intensity:2,
    equipment:'マット', position:'supine', duration:'各15回 × 2セット',
    illustration: SVG2.marchHighKnee,
    purpose:'仰向けで膝を腹側に交互に引き寄せる。',
    how:['仰向け、膝立て。','片膝を胸へ引き、戻して反対。','各15回×2。'],
    cues:{do:'腹圧を保つ。',dont:'腰を浮かさない。'},
    why:'腸腰筋を活性化し姿勢の引き上げ機能を向上。'
  },
  {
    id:'sn_glute_clam_45deg', name:'45度クラム', courses:ALL_COURSES,
    targetProblems:['kneeValgus','lateralAsymmetry'],
    category:'strength', technique:'strength', bodyPart:'glutes', intensity:2,
    equipment:'マット', position:'side', duration:'各15回 × 2セット',
    illustration: SVG2.clamShell,
    purpose:'横向き膝45度でクラム。',
    how:['横向き、膝45度。','上の膝を最大限開く。','各15回×2。'],
    cues:{do:'お尻横を意識。',dont:'体を後ろに倒さない。'},
    why:'中臀筋に違う角度で刺激を与える。'
  },
  {
    id:'sn_kneeling_hip_flexor', name:'ニーリングヒップフレクサー', courses:ALL_COURSES,
    targetProblems:['anteriorPelvicTilt','swayBack'],
    category:'selfcare', technique:'stretch', bodyPart:'hip', intensity:2,
    equipment:'マット', position:'kneeling', duration:'各30秒 × 2',
    illustration: SVG2.lunge,
    purpose:'片膝立ちで前太もも前面を伸ばす。',
    how:['片膝立ち。','骨盤を後傾して腰前を伸ばす。','30秒。反対も。×2。'],
    cues:{do:'お尻を絞る。',dont:'腰を反らない。'},
    why:'反り腰の主因の腸腰筋・大腿直筋を緩める。'
  },
  {
    id:'sn_glute_stretch_figure4_seat', name:'座位フィギュア4', courses:ALL_COURSES,
    targetProblems:['anteriorPelvicTilt','kneeValgus'],
    category:'selfcare', technique:'stretch', bodyPart:'hip', intensity:2,
    equipment:'なし', position:'sitting', duration:'各30秒',
    illustration: SVG2.figure4,
    purpose:'座位で片足首を反対膝に乗せ前屈。',
    how:['座位で片足首を反対膝に。','背筋を伸ばし前へ倒す。','30秒。反対も。'],
    cues:{do:'背中を立てる。',dont:'腰を丸めない。'},
    why:'臀筋・梨状筋のストレッチで坐骨神経痛予防。'
  },

  // ============================================================
  // EXPANSION 4: O脚(kneeVarus)専用 — 内側強化+外側緩める
  // ============================================================
  {
    id:'sn_inner_thigh_squeeze_supine', name:'内ももスクイーズ(枕なし)', courses:ALL_COURSES,
    targetProblems:['kneeVarus','posteriorPelvicTilt'],
    category:'strength', technique:'isometric', bodyPart:'legs', intensity:2,
    equipment:'マット', position:'supine', duration:'10秒 × 10回',
    illustration: SVG2.bridge,
    purpose:'仰向け膝立てで両膝を強く押し合わせる。',
    how:['仰向け、両膝を立てて拳ひとつ分。','両膝を中央で押し合わせ10秒。','力を抜く。10回繰り返し。'],
    cues:{do:'内ももに力を集中。',dont:'お尻に力を入れない。'},
    why:'内転筋下部を選択的に強化し膝を内側へ寄せる。O脚改善の第一手。'
  },
  {
    id:'sn_seated_inner_thigh_press', name:'座位内ももプレス', courses:ALL_COURSES,
    targetProblems:['kneeVarus'],
    category:'strength', technique:'isometric', bodyPart:'legs', intensity:2,
    equipment:'なし', position:'sitting', duration:'10秒 × 8回',
    illustration: SVG2.squatHold,
    purpose:'椅子に浅く座り両手で膝の外側から内に押し、膝で押し返す。',
    how:['浅く座り両膝を腰幅。','両手で膝の外側を内へ押す。','膝で押し返し10秒。8回。'],
    cues:{do:'内ももで押す。',dont:'呼吸を止めない。'},
    why:'内転筋等尺収縮で膝を寄せる筋を活性化。'
  },
  {
    id:'sn_short_foot_arch', name:'ショートフット(足アーチ)', courses:ALL_COURSES,
    targetProblems:['kneeVarus','ankleStiffness'],
    category:'strength', technique:'strength', bodyPart:'legs', intensity:2,
    equipment:'なし', position:'standing', duration:'10秒 × 10回',
    illustration: SVG2.footToes,
    purpose:'立位で母趾球を床に押し、足アーチを引き上げる。',
    how:['立位、足を腰幅。','親指は床につけたまま土踏まずを高く。','10秒キープ。10回。'],
    cues:{do:'母趾球で押す。',dont:'指を曲げない。'},
    why:'後脛骨筋・内側縦アーチを活性化し膝の正しいアライメントを作る。O脚の足元から矯正。'
  },
  {
    id:'sn_glute_med_clam_external', name:'外旋クラム(O脚版)', courses:ALL_COURSES,
    targetProblems:['kneeVarus','lateralAsymmetry'],
    category:'strength', technique:'strength', bodyPart:'glutes', intensity:2,
    equipment:'マット', position:'side', duration:'各15回 × 2セット',
    illustration: SVG2.clamShell,
    purpose:'横向きでかかとを合わせ膝を最大に開く(外旋強化)。',
    how:['横向き、膝90度・かかと合わせ。','膝を天井方向へゆっくり開ききる。','戻す。各15回×2。'],
    cues:{do:'お尻後部に効かせる。',dont:'骨盤を後ろに倒さない。'},
    why:'O脚で機能不全になりやすい中臀筋後部繊維と深層外旋六筋を活性化。'
  },
  {
    id:'sn_tfl_release_floor', name:'大腿筋膜張筋リリース', courses:ALL_COURSES,
    targetProblems:['kneeVarus','swayBack'],
    category:'selfcare', technique:'release', bodyPart:'hip', intensity:1,
    equipment:'マット', position:'side', duration:'各1分',
    illustration: SVG2.foamRoll,
    purpose:'横向きで骨盤の外側上部を手で押し回す。',
    how:['横向きで上の骨盤前外側を手で押す。','円を描くようほぐす。','各1分。'],
    cues:{do:'痛気持ちいい強さ。',dont:'強く押しすぎない。'},
    why:'O脚で過緊張する大腿筋膜張筋を緩め、膝の外側引きを解放。'
  },
  {
    id:'sn_itband_stretch_standing', name:'立位IT band ストレッチ', courses:ALL_COURSES,
    targetProblems:['kneeVarus','ankleStiffness'],
    category:'selfcare', technique:'stretch', bodyPart:'hip', intensity:1,
    equipment:'なし', position:'standing', duration:'各30秒',
    illustration: SVG2.itbStretch,
    purpose:'立位で片足を後ろにクロスし反対側へ体を倒す。',
    how:['立位、片足を後ろへクロス。','クロスした側に体を倒す。','30秒。反対も。'],
    cues:{do:'外もも~腰の伸びを感じる。',dont:'前に倒さない。'},
    why:'腸脛靱帯の伸張で膝外側の張りを解放しO脚の機能改善。'
  },
  {
    id:'sn_inner_leg_lift_side', name:'内ももリフト', courses:ALL_COURSES,
    targetProblems:['kneeVarus'],
    category:'strength', technique:'strength', bodyPart:'legs', intensity:2,
    equipment:'マット', position:'side', duration:'各15回 × 2セット',
    illustration: SVG2.innerThighLift,
    purpose:'横向きで上の脚は前に置き、下の脚を持ち上げる。',
    how:['横向き、上脚を前に膝立て床へ。','下の脚をまっすぐ伸ばし内側を上に。','内ももで持ち上げる。各15回×2。'],
    cues:{do:'内側広筋・内転筋意識。',dont:'体を後ろに倒さない。'},
    why:'内転筋群を集中して鍛え膝を内側へ寄せる。'
  },
  {
    id:'sn_squat_inner_thigh', name:'内もも意識スクワット', courses:ALL_COURSES,
    targetProblems:['kneeVarus','posteriorPelvicTilt'],
    category:'strength', technique:'strength', bodyPart:'legs', intensity:2,
    equipment:'なし', position:'standing', duration:'12回 × 3セット',
    illustration: SVG2.squatHold,
    purpose:'足を腰幅・つま先正面でスクワット、立つ時に内ももを締める。',
    how:['足を腰幅・つま先正面。','ゆっくり下ろし立つ時に内ももを締める。','12回×3。'],
    cues:{do:'膝とつま先同方向。',dont:'膝が外に開かない。'},
    why:'スクワット時の内転筋活性化で膝アライメントを矯正。'
  },
  {
    id:'sn_pelvic_squeeze_walk', name:'内もも締め歩き', courses:ALL_COURSES,
    targetProblems:['kneeVarus','general'],
    category:'cardio', technique:'cardio', bodyPart:'fullBody', intensity:2,
    equipment:'なし', position:'standing', duration:'1分 × 2セット',
    illustration: SVG2.sideStep,
    purpose:'内ももを意識し一直線上を歩く。',
    how:['一本線上をかかとを内側に置くよう歩く。','内ももの緊張を感じる。','1分×2。'],
    cues:{do:'歩幅小さく。',dont:'がに股にならない。'},
    why:'歩行時の正しい下肢アライメント習慣化。'
  },

  // ============================================================
  // EXPANSION 4b: 側弯(scoliosis)専用 — 非対称な矯正アプローチ
  // ============================================================
  {
    id:'sn_side_bend_concave', name:'凹側サイドベンド', courses:ALL_COURSES,
    targetProblems:['scoliosis','lateralAsymmetry'],
    category:'selfcare', technique:'stretch', bodyPart:'back', intensity:2,
    equipment:'なし', position:'standing', duration:'各30秒 × 3回',
    illustration: SVG2.sideStretch,
    purpose:'体側のへこんだ側(凹側)を上に伸ばす。',
    how:['立位、両足を腰幅。','凸側の手を頭上に伸ばす(凹側を伸ばす方向)。','30秒。両側を試して伸び感が強い側を多めに。'],
    cues:{do:'呼吸を続け凹側に空気を入れる感覚。',dont:'前後に倒さない。'},
    why:'凹側の筋膜・肋間を伸張し脊柱の左右バランスを整える。'
  },
  {
    id:'sn_concave_breathing', name:'凹側肋骨呼吸', courses:ALL_COURSES,
    targetProblems:['scoliosis','roundedShoulders'],
    category:'breath', technique:'breath', bodyPart:'core', intensity:1,
    equipment:'なし', position:'sitting', duration:'5呼吸 × 3セット',
    illustration: SVG2.ribBreath,
    purpose:'凹側の手を肋骨に置き、その側に深く息を入れる。',
    how:['座位、凹側の手を肋骨側面に。','その手の下に空気を満たすイメージで吸う。','5回×3セット。'],
    cues:{do:'凹側を膨らます。',dont:'肩を上げない。'},
    why:'凹側の肋間筋を伸張・換気し、機能性側弯の根本改善。シュロス療法の基本要素。'
  },
  {
    id:'sn_side_plank_asym', name:'非対称サイドプランク', courses:ALL_COURSES,
    targetProblems:['scoliosis','lateralAsymmetry'],
    category:'core', technique:'core', bodyPart:'core', intensity:2,
    equipment:'マット', position:'side', duration:'凸側のみ 30秒 × 2セット',
    illustration: SVG2.sidePlank,
    purpose:'凸側を下にしてサイドプランク(膝つきでも可)。',
    how:['凸側を下にして横向き。','肘と膝(orつま先)でサイドプランク。','30秒×2。凸側のみ。'],
    cues:{do:'凸側の腹斜筋に効かせる。',dont:'反対側はやらない。'},
    why:'凸側の弱化した筋を選択的に強化し脊柱を正中へ引き戻す。'
  },
  {
    id:'sn_hip_shift_correction', name:'ヒップシフト矯正', courses:ALL_COURSES,
    targetProblems:['scoliosis','lateralAsymmetry'],
    category:'selfcare', technique:'mobility', bodyPart:'core', intensity:1,
    equipment:'なし', position:'standing', duration:'30秒 × 3回',
    illustration: SVG2.hipShift,
    purpose:'立位で骨盤を凹側へゆっくりシフト。',
    how:['立位、両足腰幅。','骨盤を凹側方向へ平行にスライド。','30秒キープ。3回。'],
    cues:{do:'胸はまっすぐ前。',dont:'膝を曲げない。'},
    why:'代償シフトを反対方向へ意識的に矯正し中心軸を取り戻す。'
  },
  {
    id:'sn_thread_needle_asym', name:'糸通しのポーズ(凸側集中)', courses:ALL_COURSES,
    targetProblems:['scoliosis','thoracicKyphosis'],
    category:'selfcare', technique:'stretch', bodyPart:'back', intensity:2,
    equipment:'マット', position:'quadruped', duration:'凸側 1分 × 2回',
    illustration: SVG2.catCowPose,
    purpose:'四つん這いで凸側の腕を反対側の脇下に通す。',
    how:['四つん這い。','凸側の腕を反対腕の下へ通し肩を床へ。','1分キープ。2回。'],
    cues:{do:'胸郭の回旋を感じる。',dont:'腰を丸めない。'},
    why:'凸側の脊柱回旋筋を伸張し脊柱の対称回旋を回復。'
  },
  {
    id:'sn_pelvic_clock_easy', name:'やさしい骨盤時計', courses:ALL_COURSES,
    targetProblems:['scoliosis','lateralAsymmetry','anteriorPelvicTilt'],
    category:'selfcare', technique:'mobility', bodyPart:'core', intensity:1,
    equipment:'マット', position:'supine', duration:'各方向5周 × 2',
    illustration: SVG2.pelvicTilt,
    purpose:'仰向け膝立てで骨盤を時計回り・反時計回り。',
    how:['仰向け、膝立て。','骨盤で時計の12-3-6-9を描く。','5周。反対回り5周。×2。'],
    cues:{do:'骨盤の動きに集中。',dont:'体幹を緊張させない。'},
    why:'骨盤の左右対称な可動性を取り戻し側弯傾向を緩和。'
  },
  {
    id:'sn_uneven_arm_reach', name:'非対称アームリーチ', courses:ALL_COURSES,
    targetProblems:['scoliosis','roundedShoulders'],
    category:'strength', technique:'strength', bodyPart:'back', intensity:2,
    equipment:'マット', position:'prone', duration:'凸側 10回 × 2セット',
    illustration: SVG2.swimming,
    purpose:'うつ伏せで凸側の腕のみ上げる。',
    how:['うつ伏せ。','凸側の腕だけを前へ高く上げる。','下ろす。10回×2。'],
    cues:{do:'肩甲骨下方回旋。',dont:'反対側は動かさない。'},
    why:'凸側の下部僧帽筋を選択的に強化し背骨の対称性を回復。'
  },
  {
    id:'sn_side_lying_decompression', name:'側臥位デコンプレッション', courses:ALL_COURSES,
    targetProblems:['scoliosis'],
    category:'selfcare', technique:'release', bodyPart:'back', intensity:1,
    equipment:'マット', position:'side', duration:'凸側1分 × 2回',
    illustration: SVG2.legRaise,
    purpose:'凸側を上にして横向きに寝て両手を頭上に伸ばす。',
    how:['凹側を下にして横向き。','両手を頭上に伸ばし全身でC字を伸ばす。','1分×2。'],
    cues:{do:'呼吸を深く。',dont:'痛みなく。'},
    why:'凸側の筋膜・椎間を伸張し背骨に空間を作る。'
  },
];

export { DB_SENIOR };
