// ===================================================================
// SVG ILLUSTRATION LIBRARY v2 (clear & intuitive)
// 動作の方向・対象部位・姿勢が一目で理解できるよう全面リデザイン
// 共通: viewBox 200x200, 太線(stroke 3), 矢印赤(#ef4444), 強調オレンジ(#f97316)
// ===================================================================

// 共通スタイル＋矢印マーカー定義
const _DEF = `<defs>
  <marker id="arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
    <path d="M0,0 L10,5 L0,10 z" fill="#ef4444"/>
  </marker>
  <marker id="arr2" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
    <path d="M0,0 L10,5 L0,10 z" fill="#0ea5e9"/>
  </marker>
  <style>
    .body{stroke:#1e293b;stroke-width:3;fill:none;stroke-linecap:round;stroke-linejoin:round}
    .head{fill:#fde68a;stroke:#1e293b;stroke-width:2}
    .torso{fill:#bfdbfe;stroke:#1e293b;stroke-width:2.5}
    .focus{stroke:#f97316;stroke-width:4;fill:none;stroke-linecap:round}
    .ground{stroke:#94a3b8;stroke-width:2;fill:none}
    .mat{fill:#e2e8f0;stroke:#94a3b8;stroke-width:1.5}
    .arrow{stroke:#ef4444;stroke-width:2.5;fill:none;stroke-linecap:round}
    .arrow2{stroke:#0ea5e9;stroke-width:2.5;fill:none;stroke-linecap:round}
    .label{font-size:11px;fill:#475569;font-family:sans-serif;font-weight:600}
    .dim{stroke:#cbd5e1;stroke-width:2;fill:none;stroke-dasharray:4 3}
  </style>
</defs>`;

const _wrap = (inner) => `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">${_DEF}${inner}</svg>`;

const SVG2 = {
  // ===== NECK 首系 =====
  neckTilt: _wrap(`
    <line class="ground" x1="20" y1="190" x2="180" y2="190"/>
    <!-- 現姿勢(淡色) -->
    <circle class="dim" cx="100" cy="50" r="18" fill="none"/>
    <line class="dim" x1="100" y1="68" x2="100" y2="120"/>
    <!-- 傾いた姿勢(濃色) -->
    <circle class="head" cx="78" cy="55" r="18"/>
    <circle cx="84" cy="52" r="2" fill="#1e293b"/>
    <path class="body" d="M88 65 Q100 75 100 120"/>
    <path class="torso" d="M75 118 Q100 113 125 118 L130 175 L70 175 Z"/>
    <line class="body" x1="70" y1="125" x2="50" y2="170"/>
    <line class="body" x1="130" y1="125" x2="150" y2="170"/>
    <!-- 動き矢印 -->
    <path class="arrow" d="M115 35 Q105 30 88 42" marker-end="url(#arr)"/>
    <text class="label" x="55" y="25">耳を肩へ</text>
  `),

  neckRotation: _wrap(`
    <line class="ground" x1="20" y1="190" x2="180" y2="190"/>
    <circle class="head" cx="100" cy="55" r="20"/>
    <circle cx="93" cy="52" r="2" fill="#1e293b"/>
    <circle cx="107" cy="52" r="2" fill="#1e293b"/>
    <path d="M93 62 Q100 67 107 62" stroke="#1e293b" stroke-width="2" fill="none"/>
    <path class="torso" d="M75 118 Q100 113 125 118 L130 175 L70 175 Z"/>
    <line class="body" x1="100" y1="75" x2="100" y2="118"/>
    <line class="body" x1="70" y1="125" x2="50" y2="170"/>
    <line class="body" x1="130" y1="125" x2="150" y2="170"/>
    <!-- 回転矢印 -->
    <path class="arrow" d="M60 30 Q100 15 140 30" marker-end="url(#arr)" marker-start="url(#arr)"/>
    <text class="label" x="65" y="195">首を左右に回す</text>
  `),

  neckSide: _wrap(`
    <line class="ground" x1="20" y1="190" x2="180" y2="190"/>
    <circle class="head" cx="78" cy="55" r="18" transform="rotate(-25 78 55)"/>
    <path class="body" d="M88 67 Q100 80 100 120"/>
    <path class="torso" d="M75 118 Q100 113 125 118 L130 175 L70 175 Z"/>
    <line class="body" x1="70" y1="125" x2="50" y2="170"/>
    <line class="body" x1="130" y1="125" x2="150" y2="170"/>
    <!-- 強調(伸びる側) -->
    <path class="focus" d="M105 70 Q120 95 130 118"/>
    <path class="arrow" d="M115 35 Q105 28 86 42" marker-end="url(#arr)"/>
    <text class="label" x="50" y="195">首側面を伸ばす</text>
  `),

  // ===== SHOULDER 肩系 =====
  shoulderRoll: _wrap(`
    <line class="ground" x1="20" y1="190" x2="180" y2="190"/>
    <circle class="head" cx="100" cy="45" r="18"/>
    <path class="torso" d="M75 75 Q100 70 125 75 L130 140 L70 140 Z"/>
    <line class="body" x1="100" y1="63" x2="100" y2="75"/>
    <line class="body" x1="70" y1="85" x2="55" y2="135"/>
    <line class="body" x1="130" y1="85" x2="145" y2="135"/>
    <line class="body" x1="70" y1="140" x2="65" y2="180"/>
    <line class="body" x1="130" y1="140" x2="135" y2="180"/>
    <!-- 肩の回転矢印 -->
    <circle class="focus" cx="70" cy="80" r="14"/>
    <circle class="focus" cx="130" cy="80" r="14"/>
    <path class="arrow" d="M50 80 Q40 60 60 55" marker-end="url(#arr)"/>
    <path class="arrow" d="M150 80 Q160 60 140 55" marker-end="url(#arr)"/>
    <text class="label" x="55" y="20">肩を大きく回す</text>
  `),

  shoulderOpen: _wrap(`
    <line class="ground" x1="20" y1="190" x2="180" y2="190"/>
    <circle class="head" cx="100" cy="40" r="18"/>
    <path class="torso" d="M75 70 Q100 65 125 70 L130 135 L70 135 Z"/>
    <!-- 両腕を真横に開く -->
    <line class="body" x1="70" y1="80" x2="25" y2="75"/>
    <line class="body" x1="130" y1="80" x2="175" y2="75"/>
    <line class="body" x1="70" y1="135" x2="65" y2="180"/>
    <line class="body" x1="130" y1="135" x2="135" y2="180"/>
    <!-- 胸の開きを強調 -->
    <path class="focus" d="M80 95 Q100 88 120 95"/>
    <path class="arrow" d="M55 95 L30 100" marker-end="url(#arr)"/>
    <path class="arrow" d="M145 95 L170 100" marker-end="url(#arr)"/>
    <text class="label" x="60" y="20">胸を大きく開く</text>
  `),

  shoulderBlade: _wrap(`
    <!-- 背中側ビュー -->
    <line class="ground" x1="20" y1="190" x2="180" y2="190"/>
    <circle class="head" cx="100" cy="40" r="18"/>
    <path class="torso" d="M70 70 Q100 65 130 70 L132 140 L68 140 Z"/>
    <!-- 肩甲骨 -->
    <path class="focus" d="M88 85 L82 110 L92 130"/>
    <path class="focus" d="M112 85 L118 110 L108 130"/>
    <line class="body" x1="68" y1="80" x2="50" y2="135"/>
    <line class="body" x1="132" y1="80" x2="150" y2="135"/>
    <!-- 寄せる矢印 -->
    <path class="arrow" d="M75 105 L90 108" marker-end="url(#arr)"/>
    <path class="arrow" d="M125 105 L110 108" marker-end="url(#arr)"/>
    <text class="label" x="50" y="20">肩甲骨を背骨へ寄せる</text>
  `),

  // ===== BACK 背中・胸郭 =====
  spineTwist: _wrap(`
    <line class="ground" x1="20" y1="190" x2="180" y2="190"/>
    <circle class="head" cx="95" cy="45" r="16" transform="rotate(35 95 45)"/>
    <path class="torso" d="M75 75 Q100 70 125 75 L130 140 L70 140 Z"/>
    <line class="body" x1="70" y1="85" x2="40" y2="120"/>
    <line class="body" x1="130" y1="85" x2="160" y2="100"/>
    <line class="body" x1="70" y1="140" x2="65" y2="180"/>
    <line class="body" x1="130" y1="140" x2="135" y2="180"/>
    <!-- ねじり矢印 -->
    <path class="arrow" d="M70 110 Q100 95 130 110" marker-end="url(#arr)"/>
    <path class="focus" d="M100 80 Q100 110 100 140"/>
    <text class="label" x="65" y="195">背骨を捻る</text>
  `),

  spineFlex: _wrap(`
    <line class="ground" x1="20" y1="180" x2="180" y2="180"/>
    <rect class="mat" x="20" y="175" width="160" height="8"/>
    <!-- 丸めた背中 -->
    <path class="focus" d="M50 110 Q90 50 150 100"/>
    <circle class="head" cx="55" cy="120" r="14"/>
    <path class="body" d="M68 115 Q90 70 130 90 Q145 95 155 105"/>
    <line class="body" x1="155" y1="105" x2="160" y2="175"/>
    <line class="body" x1="145" y1="115" x2="145" y2="175"/>
    <line class="body" x1="68" y1="115" x2="55" y2="170"/>
    <path class="arrow" d="M95 35 Q100 50 100 65" marker-end="url(#arr)"/>
    <text class="label" x="55" y="195">背中を丸める(キャット)</text>
  `),

  spineExt: _wrap(`
    <line class="ground" x1="20" y1="180" x2="180" y2="180"/>
    <rect class="mat" x="20" y="175" width="160" height="8"/>
    <!-- 反らせた背中 -->
    <path class="focus" d="M50 95 Q100 130 150 95"/>
    <circle class="head" cx="55" cy="90" r="14"/>
    <path class="body" d="M68 95 Q100 125 145 100"/>
    <line class="body" x1="145" y1="100" x2="160" y2="175"/>
    <line class="body" x1="140" y1="115" x2="145" y2="175"/>
    <line class="body" x1="68" y1="105" x2="55" y2="170"/>
    <path class="arrow" d="M100 145 Q100 130 100 115" marker-end="url(#arr)"/>
    <text class="label" x="55" y="195">胸を反らせる(カウ)</text>
  `),

  sideStretch: _wrap(`
    <line class="ground" x1="20" y1="190" x2="180" y2="190"/>
    <g transform="rotate(-18 100 110)">
      <circle class="head" cx="100" cy="35" r="16"/>
      <path class="torso" d="M80 60 Q100 55 120 60 L122 120 L78 120 Z"/>
      <line class="body" x1="100" y1="51" x2="100" y2="60"/>
      <line class="body" x1="78" y1="120" x2="75" y2="180"/>
      <line class="body" x1="122" y1="120" x2="125" y2="180"/>
    </g>
    <!-- 上に伸ばす腕 -->
    <line class="body" x1="120" y1="85" x2="160" y2="30"/>
    <line class="body" x1="78" y1="100" x2="55" y2="115"/>
    <!-- 側面伸ばしを強調 -->
    <path class="focus" d="M125 80 Q140 130 130 175"/>
    <path class="arrow" d="M165 25 L175 15" marker-end="url(#arr)"/>
    <text class="label" x="40" y="20">体側を大きく伸ばす</text>
  `),

  // ===== HIP 股関節 =====
  hipOpener: _wrap(`
    <line class="ground" x1="20" y1="180" x2="180" y2="180"/>
    <rect class="mat" x="20" y="175" width="160" height="8"/>
    <!-- 仰向け足裏合わせ -->
    <circle class="head" cx="100" cy="50" r="14"/>
    <path class="torso" d="M80 75 Q100 70 120 75 L120 110 L80 110 Z"/>
    <line class="body" x1="80" y1="110" x2="50" y2="160"/>
    <line class="body" x1="120" y1="110" x2="150" y2="160"/>
    <line class="body" x1="50" y1="160" x2="100" y2="170"/>
    <line class="body" x1="150" y1="160" x2="100" y2="170"/>
    <path class="focus" d="M60 145 Q100 175 140 145"/>
    <path class="arrow" d="M60 130 L45 145" marker-end="url(#arr)"/>
    <path class="arrow" d="M140 130 L155 145" marker-end="url(#arr)"/>
    <text class="label" x="35" y="200">股関節を外へ開く</text>
  `),

  butterflyHip: _wrap(`
    <line class="ground" x1="20" y1="180" x2="180" y2="180"/>
    <rect class="mat" x="20" y="175" width="160" height="8"/>
    <!-- 座位足裏合わせ -->
    <circle class="head" cx="100" cy="45" r="14"/>
    <path class="torso" d="M80 65 Q100 60 120 65 L120 115 L80 115 Z"/>
    <line class="body" x1="80" y1="115" x2="50" y2="160"/>
    <line class="body" x1="120" y1="115" x2="150" y2="160"/>
    <line class="body" x1="50" y1="160" x2="100" y2="170"/>
    <line class="body" x1="150" y1="160" x2="100" y2="170"/>
    <ellipse cx="100" cy="170" rx="14" ry="5" fill="#f97316" opacity="0.6"/>
    <path class="arrow" d="M60 130 L48 145" marker-end="url(#arr)"/>
    <path class="arrow" d="M140 130 L152 145" marker-end="url(#arr)"/>
    <text class="label" x="35" y="200">足裏を合わせ膝を床へ</text>
  `),

  pigeonRest: _wrap(`
    <line class="ground" x1="20" y1="180" x2="180" y2="180"/>
    <rect class="mat" x="20" y="175" width="160" height="8"/>
    <circle class="head" cx="50" cy="80" r="14"/>
    <path class="torso" d="M65 95 Q100 80 130 110 L130 130 L60 125 Z"/>
    <!-- 前脚(外旋) -->
    <line class="body" x1="60" y1="130" x2="100" y2="155"/>
    <line class="body" x1="100" y1="155" x2="140" y2="150"/>
    <!-- 後脚(伸展) -->
    <line class="body" x1="125" y1="130" x2="175" y2="160"/>
    <text class="label" x="30" y="200">前脚は曲げ後脚は伸ばす</text>
  `),

  squatHold: _wrap(`
    <line class="ground" x1="20" y1="190" x2="180" y2="190"/>
    <!-- 深いスクワット -->
    <circle class="head" cx="100" cy="45" r="16"/>
    <path class="torso" d="M80 70 Q100 65 120 70 L124 110 L76 110 Z"/>
    <!-- 太もも -->
    <line class="body" x1="76" y1="110" x2="55" y2="135"/>
    <line class="body" x1="124" y1="110" x2="145" y2="135"/>
    <!-- すね -->
    <line class="body" x1="55" y1="135" x2="60" y2="185"/>
    <line class="body" x1="145" y1="135" x2="140" y2="185"/>
    <!-- 膝強調 -->
    <circle class="focus" cx="55" cy="135" r="8"/>
    <circle class="focus" cx="145" cy="135" r="8"/>
    <!-- 腕 -->
    <line class="body" x1="80" y1="80" x2="55" y2="100"/>
    <line class="body" x1="120" y1="80" x2="145" y2="100"/>
    <path class="arrow" d="M100 100 L100 135" marker-end="url(#arr)"/>
    <text class="label" x="50" y="20">お尻を後ろへ下げる</text>
  `),

  // ===== LEG 脚 =====
  forwardFold: _wrap(`
    <line class="ground" x1="20" y1="190" x2="180" y2="190"/>
    <!-- 前屈 -->
    <circle class="head" cx="100" cy="120" r="14"/>
    <path class="body" d="M100 134 Q95 100 100 85"/>
    <path class="torso" d="M85 85 Q100 80 115 85 L115 105 L85 105 Z"/>
    <!-- 脚(まっすぐ) -->
    <line class="focus" x1="92" y1="105" x2="92" y2="185"/>
    <line class="focus" x1="108" y1="105" x2="108" y2="185"/>
    <!-- 手は床へ -->
    <line class="body" x1="85" y1="95" x2="80" y2="170"/>
    <line class="body" x1="115" y1="95" x2="120" y2="170"/>
    <path class="arrow" d="M150 60 Q145 100 130 130" marker-end="url(#arr)"/>
    <text class="label" x="50" y="20">脚はまっすぐで前屈</text>
  `),

  calfStretch: _wrap(`
    <line class="ground" x1="20" y1="190" x2="180" y2="190"/>
    <!-- 壁 -->
    <rect x="160" y="20" width="10" height="170" fill="#cbd5e1"/>
    <circle class="head" cx="60" cy="50" r="14"/>
    <path class="torso" d="M50 65 Q60 60 70 65 L78 110 L42 110 Z"/>
    <!-- 前脚(曲げ) -->
    <line class="body" x1="78" y1="110" x2="110" y2="145"/>
    <line class="body" x1="110" y1="145" x2="155" y2="160"/>
    <!-- 後脚(まっすぐ・かかと床) -->
    <line class="focus" x1="42" y1="110" x2="30" y2="185"/>
    <!-- 手を壁へ -->
    <line class="body" x1="60" y1="80" x2="155" y2="55"/>
    <path class="arrow" d="M25 165 L30 188" marker-end="url(#arr)"/>
    <text class="label" x="30" y="20">後脚のかかと床へ</text>
  `),

  lungeStretch: _wrap(`
    <line class="ground" x1="20" y1="190" x2="180" y2="190"/>
    <circle class="head" cx="100" cy="40" r="14"/>
    <path class="torso" d="M82 55 Q100 50 118 55 L120 100 L80 100 Z"/>
    <!-- 前脚 90度 -->
    <line class="focus" x1="80" y1="100" x2="55" y2="140"/>
    <line class="focus" x1="55" y1="140" x2="55" y2="185"/>
    <!-- 後脚 伸ばす -->
    <line class="body" x1="120" y1="100" x2="170" y2="185"/>
    <!-- 腕 -->
    <line class="body" x1="82" y1="65" x2="65" y2="95"/>
    <line class="body" x1="118" y1="65" x2="135" y2="95"/>
    <text class="label" x="40" y="20">前膝90度・後脚伸ばす</text>
  `),

  // ===== CORE 体幹 =====
  plankBasic: _wrap(`
    <line class="ground" x1="10" y1="180" x2="190" y2="180"/>
    <rect class="mat" x="10" y="175" width="180" height="8"/>
    <!-- 体が一直線 -->
    <line class="focus" x1="30" y1="100" x2="170" y2="100" stroke-dasharray="6 4"/>
    <circle class="head" cx="40" cy="90" r="14"/>
    <path class="torso" d="M55 95 L150 95 L150 115 L55 115 Z"/>
    <!-- 腕(肘) -->
    <line class="body" x1="55" y1="115" x2="40" y2="175"/>
    <!-- 脚 -->
    <line class="body" x1="150" y1="115" x2="175" y2="175"/>
    <text class="label" x="30" y="200">体を一直線にキープ</text>
  `),

  sidePlank: _wrap(`
    <line class="ground" x1="10" y1="180" x2="190" y2="180"/>
    <rect class="mat" x="10" y="175" width="180" height="8"/>
    <!-- 横向きで体一直線 -->
    <line class="focus" x1="35" y1="170" x2="170" y2="60"/>
    <circle class="head" cx="170" cy="55" r="14"/>
    <path class="body" d="M158 65 L40 168"/>
    <!-- 支持腕 -->
    <line class="body" x1="40" y1="168" x2="35" y2="178"/>
    <!-- 上の腕(天井) -->
    <line class="body" x1="100" y1="115" x2="115" y2="50"/>
    <text class="label" x="30" y="200">体を斜め一直線</text>
  `),

  deadBugBase: _wrap(`
    <line class="ground" x1="10" y1="180" x2="190" y2="180"/>
    <rect class="mat" x="10" y="175" width="180" height="8"/>
    <!-- 仰向け -->
    <circle class="head" cx="35" cy="150" r="14"/>
    <path class="torso" d="M50 145 L130 145 L130 165 L50 165 Z"/>
    <!-- 対角の腕(右)・脚(左)が上方 -->
    <line class="focus" x1="130" y1="150" x2="170" y2="80"/>
    <line class="focus" x1="80" y1="145" x2="60" y2="70"/>
    <!-- 残りの腕脚は床 -->
    <line class="body" x1="50" y1="155" x2="20" y2="165"/>
    <line class="body" x1="130" y1="160" x2="170" y2="170"/>
    <path class="arrow" d="M55 60 L62 75" marker-end="url(#arr)"/>
    <path class="arrow" d="M180 75 L170 88" marker-end="url(#arr)"/>
    <text class="label" x="30" y="200">対角の手脚を伸ばす</text>
  `),

  bridgeBase: _wrap(`
    <line class="ground" x1="10" y1="180" x2="190" y2="180"/>
    <rect class="mat" x="10" y="175" width="180" height="8"/>
    <!-- お尻を持ち上げたブリッジ -->
    <circle class="head" cx="35" cy="145" r="14"/>
    <path class="body" d="M50 145 Q100 80 130 100"/>
    <path class="focus" d="M55 130 Q100 75 125 100" stroke-dasharray="4 3"/>
    <line class="body" x1="130" y1="100" x2="155" y2="170"/>
    <line class="body" x1="155" y1="170" x2="170" y2="170"/>
    <!-- 持ち上げ矢印 -->
    <path class="arrow" d="M100 140 L100 95" marker-end="url(#arr)"/>
    <text class="label" x="30" y="200">お尻を高く持ち上げる</text>
  `),

  hundred: _wrap(`
    <line class="ground" x1="10" y1="180" x2="190" y2="180"/>
    <rect class="mat" x="10" y="175" width="180" height="8"/>
    <!-- 仰向け頭上げ・脚45度 -->
    <circle class="head" cx="50" cy="110" r="14"/>
    <path class="body" d="M50 124 Q65 130 90 135"/>
    <path class="torso" d="M85 130 L130 130 L130 150 L85 150 Z"/>
    <!-- 脚45度 -->
    <line class="focus" x1="130" y1="135" x2="180" y2="80"/>
    <line class="focus" x1="130" y1="145" x2="180" y2="95"/>
    <!-- 腕(パタパタ) -->
    <line class="body" x1="60" y1="125" x2="20" y2="135"/>
    <line class="body" x1="60" y1="130" x2="20" y2="145"/>
    <path class="arrow" d="M40 120 L40 145" marker-end="url(#arr)" marker-start="url(#arr)"/>
    <text class="label" x="30" y="200">腕を小さく上下に打つ</text>
  `),

  rollUp: _wrap(`
    <line class="ground" x1="10" y1="180" x2="190" y2="180"/>
    <rect class="mat" x="10" y="175" width="180" height="8"/>
    <!-- 寝→起き上がる軌跡 -->
    <path class="dim" d="M30 165 Q35 160 50 160 L160 160"/>
    <!-- 中間姿勢 -->
    <circle class="head" cx="80" cy="100" r="14"/>
    <path class="body" d="M90 110 Q120 130 150 155"/>
    <path class="torso" d="M85 110 Q100 105 115 115 L130 135 L100 125 Z"/>
    <!-- 脚(長座) -->
    <line class="body" x1="125" y1="140" x2="180" y2="160"/>
    <path class="arrow" d="M50 155 Q70 130 90 110" marker-end="url(#arr)"/>
    <text class="label" x="30" y="200">背骨1つずつ起こす</text>
  `),

  // ===== YOGA =====
  childPose: _wrap(`
    <line class="ground" x1="10" y1="180" x2="190" y2="180"/>
    <rect class="mat" x="10" y="175" width="180" height="8"/>
    <!-- かかとに座り前屈 -->
    <circle class="head" cx="40" cy="150" r="14"/>
    <path class="body" d="M55 150 Q100 120 150 165"/>
    <!-- 折りたたんだ脚 -->
    <line class="body" x1="150" y1="165" x2="170" y2="175"/>
    <line class="body" x1="155" y1="165" x2="120" y2="170"/>
    <!-- 伸ばした腕 -->
    <line class="focus" x1="40" y1="150" x2="20" y2="155"/>
    <line class="focus" x1="55" y1="148" x2="15" y2="160"/>
    <path class="arrow" d="M70 100 Q60 130 50 150" marker-end="url(#arr)"/>
    <text class="label" x="30" y="200">かかとに座り前へ伸びる</text>
  `),

  catCowPose: _wrap(`
    <line class="ground" x1="10" y1="180" x2="190" y2="180"/>
    <rect class="mat" x="10" y="175" width="180" height="8"/>
    <!-- 四つん這い -->
    <circle class="head" cx="50" cy="100" r="14"/>
    <path class="focus" d="M60 105 Q100 70 145 100"/>
    <path class="body" d="M60 110 Q100 90 145 110"/>
    <line class="body" x1="60" y1="115" x2="50" y2="175"/>
    <line class="body" x1="145" y1="115" x2="160" y2="175"/>
    <line class="body" x1="80" y1="115" x2="75" y2="175"/>
    <line class="body" x1="130" y1="115" x2="135" y2="175"/>
    <!-- 波打ち矢印 -->
    <path class="arrow" d="M100 75 L100 95" marker-end="url(#arr)" marker-start="url(#arr)"/>
    <text class="label" x="30" y="200">背骨を波打たせる</text>
  `),

  downDog: _wrap(`
    <line class="ground" x1="10" y1="180" x2="190" y2="180"/>
    <rect class="mat" x="10" y="175" width="180" height="8"/>
    <!-- 山型ダウンドッグ -->
    <circle class="head" cx="50" cy="120" r="14"/>
    <line class="focus" x1="60" y1="115" x2="100" y2="50"/>
    <line class="focus" x1="100" y1="50" x2="160" y2="170"/>
    <line class="body" x1="50" y1="130" x2="30" y2="170"/>
    <line class="body" x1="160" y1="170" x2="175" y2="175"/>
    <path class="arrow" d="M100 30 L100 45" marker-end="url(#arr)"/>
    <text class="label" x="30" y="200">お尻を天井へ高く</text>
  `),

  cobra: _wrap(`
    <line class="ground" x1="10" y1="180" x2="190" y2="180"/>
    <rect class="mat" x="10" y="175" width="180" height="8"/>
    <!-- うつ伏せ反らす -->
    <circle class="head" cx="50" cy="80" r="14"/>
    <path class="focus" d="M55 85 Q90 110 160 165"/>
    <path class="body" d="M55 95 Q90 120 160 170"/>
    <!-- 支える腕 -->
    <line class="body" x1="55" y1="95" x2="50" y2="160"/>
    <line class="body" x1="70" y1="105" x2="75" y2="170"/>
    <path class="arrow" d="M65 130 L55 100" marker-end="url(#arr)"/>
    <text class="label" x="30" y="200">上半身だけ反らせる</text>
  `),

  warrior: _wrap(`
    <line class="ground" x1="20" y1="190" x2="180" y2="190"/>
    <circle class="head" cx="100" cy="40" r="14"/>
    <path class="torso" d="M82 55 Q100 50 118 55 L120 110 L80 110 Z"/>
    <!-- 両腕水平 -->
    <line class="focus" x1="80" y1="65" x2="20" y2="60"/>
    <line class="focus" x1="120" y1="65" x2="180" y2="60"/>
    <!-- 前脚90度 -->
    <line class="body" x1="80" y1="110" x2="55" y2="150"/>
    <line class="body" x1="55" y1="150" x2="55" y2="190"/>
    <!-- 後脚 -->
    <line class="body" x1="120" y1="110" x2="170" y2="190"/>
    <text class="label" x="25" y="20">前膝90度・腕は水平</text>
  `),

  triangle: _wrap(`
    <line class="ground" x1="20" y1="190" x2="180" y2="190"/>
    <!-- 三角形ポーズ -->
    <circle class="head" cx="55" cy="100" r="14"/>
    <path class="body" d="M65 110 Q100 130 130 140"/>
    <!-- 脚を広く -->
    <line class="body" x1="50" y1="110" x2="25" y2="190"/>
    <line class="body" x1="130" y1="140" x2="155" y2="190"/>
    <!-- 下の手・上の手 -->
    <line class="focus" x1="50" y1="115" x2="40" y2="180"/>
    <line class="focus" x1="60" y1="105" x2="60" y2="25"/>
    <path class="arrow" d="M60 20 L60 35" marker-start="url(#arr)"/>
    <text class="label" x="25" y="20">脚を広く・上下に手</text>
  `),

  treePose: _wrap(`
    <line class="ground" x1="40" y1="190" x2="160" y2="190"/>
    <circle class="head" cx="100" cy="35" r="14"/>
    <path class="torso" d="M85 50 Q100 45 115 50 L115 100 L85 100 Z"/>
    <!-- 軸脚 -->
    <line class="focus" x1="100" y1="100" x2="100" y2="188"/>
    <!-- 曲げた脚(膝外) -->
    <line class="body" x1="100" y1="105" x2="60" y2="115"/>
    <line class="body" x1="60" y1="115" x2="95" y2="140"/>
    <!-- 合掌の腕 -->
    <line class="body" x1="85" y1="55" x2="100" y2="20"/>
    <line class="body" x1="115" y1="55" x2="100" y2="20"/>
    <text class="label" x="35" y="20">片足を内ももへ・合掌</text>
  `),

  seatedTwist: _wrap(`
    <line class="ground" x1="10" y1="180" x2="190" y2="180"/>
    <rect class="mat" x="10" y="175" width="180" height="8"/>
    <!-- 座位ねじり(後方視点) -->
    <circle class="head" cx="100" cy="50" r="14" transform="rotate(30 100 50)"/>
    <path class="torso" d="M80 70 Q100 65 120 70 L122 130 L78 130 Z"/>
    <!-- ねじる方向矢印 -->
    <path class="arrow" d="M70 90 Q100 75 130 90" marker-end="url(#arr)"/>
    <!-- 脚(長座) -->
    <line class="body" x1="82" y1="130" x2="150" y2="155"/>
    <line class="body" x1="120" y1="130" x2="50" y2="155"/>
    <path class="focus" d="M100 75 L100 130"/>
    <text class="label" x="35" y="200">座って体を捻る</text>
  `),

  breathing: _wrap(`
    <circle class="head" cx="100" cy="55" r="20"/>
    <circle cx="93" cy="52" r="2" fill="#1e293b"/>
    <circle cx="107" cy="52" r="2" fill="#1e293b"/>
    <path d="M93 65 Q100 70 107 65" stroke="#1e293b" stroke-width="2" fill="none"/>
    <path class="torso" d="M75 78 Q100 73 125 78 L130 145 L70 145 Z"/>
    <!-- お腹の膨らみ -->
    <ellipse class="focus" cx="100" cy="115" rx="28" ry="20"/>
    <ellipse class="dim" cx="100" cy="115" rx="38" ry="28"/>
    <path class="arrow" d="M100 110 L100 95" marker-end="url(#arr)"/>
    <path class="arrow2" d="M50 95 Q60 70 95 60" marker-end="url(#arr2)"/>
    <text class="label" x="40" y="180">お腹で深く呼吸</text>
  `),

  meditation: _wrap(`
    <line class="ground" x1="10" y1="180" x2="190" y2="180"/>
    <rect class="mat" x="10" y="175" width="180" height="8"/>
    <!-- あぐら座位 -->
    <circle class="head" cx="100" cy="55" r="16"/>
    <path d="M90 60 Q100 65 110 60" stroke="#1e293b" stroke-width="2" fill="none"/>
    <path class="torso" d="M78 75 Q100 70 122 75 L125 130 L75 130 Z"/>
    <!-- あぐら脚 -->
    <path class="body" d="M75 130 Q60 145 50 165 L150 165 Q140 145 125 130"/>
    <!-- 手は膝 -->
    <line class="body" x1="78" y1="115" x2="60" y2="145"/>
    <line class="body" x1="122" y1="115" x2="140" y2="145"/>
    <!-- 集中円 -->
    <circle class="dim" cx="100" cy="55" r="30"/>
    <text class="label" x="40" y="200">あぐら座位で目を閉じる</text>
  `),

  // ===== RELEASE =====
  ballRelease: _wrap(`
    <line class="ground" x1="10" y1="180" x2="190" y2="180"/>
    <rect class="mat" x="10" y="175" width="180" height="8"/>
    <circle class="head" cx="40" cy="100" r="14"/>
    <path class="torso" d="M55 100 L130 100 L130 130 L55 130 Z"/>
    <circle cx="95" cy="145" r="10" fill="#10b981" stroke="#1e293b" stroke-width="2"/>
    <line class="body" x1="130" y1="115" x2="160" y2="155"/>
    <path class="arrow" d="M95 130 L95 158" marker-end="url(#arr)" marker-start="url(#arr)"/>
    <text class="label" x="35" y="200">ボールで圧迫リリース</text>
  `),

  foamRoll: _wrap(`
    <line class="ground" x1="10" y1="180" x2="190" y2="180"/>
    <rect class="mat" x="10" y="175" width="180" height="8"/>
    <circle class="head" cx="40" cy="95" r="14"/>
    <path class="torso" d="M55 95 L120 95 L120 130 L55 130 Z"/>
    <!-- ローラー -->
    <rect x="80" y="140" width="60" height="22" rx="11" fill="#06b6d4" stroke="#1e293b" stroke-width="2"/>
    <path class="arrow" d="M60 165 L160 165" marker-end="url(#arr)" marker-start="url(#arr)"/>
    <text class="label" x="30" y="195">ローラーで転がす</text>
  `),

  handMassage: _wrap(`
    <circle class="head" cx="100" cy="50" r="18"/>
    <path class="torso" d="M75 75 Q100 70 125 75 L130 150 L70 150 Z"/>
    <!-- 手であご・顔を押さえる -->
    <path class="body" d="M75 85 Q60 50 80 35"/>
    <path class="body" d="M125 85 Q105 60 95 40"/>
    <ellipse class="focus" cx="95" cy="40" rx="8" ry="5"/>
    <text class="label" x="40" y="180">手でマッサージ</text>
  `),

  // ===== BODYWEIGHT =====
  squat: _wrap(`
    <line class="ground" x1="20" y1="190" x2="180" y2="190"/>
    <!-- 起立姿勢と下位の比較 -->
    <g opacity="0.3">
      <circle cx="60" cy="40" r="12" fill="#fde68a" stroke="#1e293b" stroke-width="2"/>
      <line class="body" x1="60" y1="52" x2="60" y2="120"/>
      <line class="body" x1="60" y1="120" x2="60" y2="185"/>
    </g>
    <!-- 下位姿勢 -->
    <circle class="head" cx="130" cy="50" r="14"/>
    <path class="torso" d="M115 65 Q130 60 145 65 L148 100 L112 100 Z"/>
    <line class="body" x1="112" y1="100" x2="100" y2="130"/>
    <line class="body" x1="148" y1="100" x2="160" y2="130"/>
    <line class="focus" x1="100" y1="130" x2="105" y2="185"/>
    <line class="focus" x1="160" y1="130" x2="155" y2="185"/>
    <path class="arrow" d="M85 70 Q85 100 90 130" marker-end="url(#arr)"/>
    <text class="label" x="30" y="20">膝はつま先方向に</text>
  `),

  pushup: _wrap(`
    <line class="ground" x1="10" y1="180" x2="190" y2="180"/>
    <rect class="mat" x="10" y="175" width="180" height="8"/>
    <line class="focus" x1="25" y1="110" x2="175" y2="110" stroke-dasharray="6 4"/>
    <circle class="head" cx="35" cy="100" r="14"/>
    <path class="torso" d="M50 105 L145 105 L145 125 L50 125 Z"/>
    <!-- 腕(伸びる) -->
    <line class="body" x1="50" y1="125" x2="35" y2="175"/>
    <line class="body" x1="60" y1="125" x2="55" y2="175"/>
    <!-- 足(つま先立ち) -->
    <line class="body" x1="145" y1="120" x2="180" y2="175"/>
    <line class="body" x1="135" y1="120" x2="170" y2="175"/>
    <path class="arrow" d="M100 90 L100 130" marker-end="url(#arr)" marker-start="url(#arr)"/>
    <text class="label" x="25" y="200">肘を曲げ胸を床へ</text>
  `),

  glutesPunch: _wrap(`
    <line class="ground" x1="10" y1="180" x2="190" y2="180"/>
    <rect class="mat" x="10" y="175" width="180" height="8"/>
    <!-- 四つん這い+片脚後方 -->
    <circle class="head" cx="40" cy="100" r="14"/>
    <path class="body" d="M55 100 Q100 90 130 105"/>
    <line class="body" x1="55" y1="115" x2="50" y2="175"/>
    <line class="body" x1="80" y1="115" x2="80" y2="175"/>
    <line class="body" x1="130" y1="115" x2="135" y2="175"/>
    <!-- 蹴り上げる脚 -->
    <line class="focus" x1="125" y1="105" x2="180" y2="60"/>
    <path class="arrow" d="M170 55 L185 40" marker-end="url(#arr)"/>
    <text class="label" x="25" y="200">片脚を後方へ蹴り上げる</text>
  `),

  abLift: _wrap(`
    <line class="ground" x1="10" y1="180" x2="190" y2="180"/>
    <rect class="mat" x="10" y="175" width="180" height="8"/>
    <circle class="head" cx="30" cy="140" r="14"/>
    <path class="torso" d="M45 140 L120 140 L120 165 L45 165 Z"/>
    <!-- 脚を天井へ -->
    <line class="focus" x1="120" y1="145" x2="135" y2="40"/>
    <line class="focus" x1="120" y1="155" x2="145" y2="50"/>
    <path class="arrow" d="M140 35 L130 30" marker-end="url(#arr)"/>
    <text class="label" x="30" y="200">両脚を天井へ上げる</text>
  `),

  bicycleAb: _wrap(`
    <line class="ground" x1="10" y1="180" x2="190" y2="180"/>
    <rect class="mat" x="10" y="175" width="180" height="8"/>
    <circle class="head" cx="40" cy="130" r="14"/>
    <path class="body" d="M40 144 Q60 150 90 150"/>
    <path class="torso" d="M85 145 L130 145 L130 165 L85 165 Z"/>
    <!-- 一方の膝を胸へ・反対脚伸ばす -->
    <line class="focus" x1="130" y1="148" x2="160" y2="100"/>
    <line class="focus" x1="130" y1="158" x2="180" y2="165"/>
    <!-- 反対の肘を膝へ -->
    <line class="body" x1="55" y1="135" x2="120" y2="100"/>
    <path class="arrow" d="M155 105 L120 105" marker-end="url(#arr)"/>
    <text class="label" x="30" y="200">対角の肘と膝を寄せる</text>
  `),

  jumpingJack: _wrap(`
    <line class="ground" x1="20" y1="190" x2="180" y2="190"/>
    <circle class="head" cx="100" cy="35" r="14"/>
    <path class="torso" d="M85 50 Q100 45 115 50 L118 100 L82 100 Z"/>
    <!-- 開いた腕 -->
    <line class="focus" x1="85" y1="55" x2="40" y2="20"/>
    <line class="focus" x1="115" y1="55" x2="160" y2="20"/>
    <!-- 開いた脚 -->
    <line class="focus" x1="82" y1="100" x2="40" y2="188"/>
    <line class="focus" x1="118" y1="100" x2="160" y2="188"/>
    <path class="arrow" d="M30 100 L60 100" marker-end="url(#arr)"/>
    <path class="arrow" d="M170 100 L140 100" marker-end="url(#arr)"/>
    <text class="label" x="35" y="20">手脚を開いて閉じる</text>
  `),

  // ===== ADDITIONAL FREQUENTLY-NEEDED ICONS =====
  birdDog: _wrap(`
    <line class="ground" x1="10" y1="180" x2="190" y2="180"/>
    <rect class="mat" x="10" y="175" width="180" height="8"/>
    <circle class="head" cx="40" cy="105" r="14"/>
    <path class="body" d="M55 110 Q100 100 145 115"/>
    <!-- 支持の腕脚 -->
    <line class="body" x1="55" y1="120" x2="50" y2="175"/>
    <line class="body" x1="145" y1="125" x2="155" y2="175"/>
    <!-- 浮かせた対角 -->
    <line class="focus" x1="60" y1="115" x2="15" y2="80"/>
    <line class="focus" x1="140" y1="120" x2="190" y2="155"/>
    <path class="arrow" d="M25 85 L20 75" marker-end="url(#arr)"/>
    <path class="arrow" d="M180 150 L188 160" marker-end="url(#arr)"/>
    <text class="label" x="30" y="200">対角の手脚を伸ばす</text>
  `),

  boatPose: _wrap(`
    <line class="ground" x1="10" y1="180" x2="190" y2="180"/>
    <rect class="mat" x="10" y="175" width="180" height="8"/>
    <!-- V字バランス -->
    <circle class="head" cx="55" cy="65" r="14"/>
    <path class="focus" d="M65 75 L120 130 L175 70"/>
    <path class="body" d="M65 80 L115 135"/>
    <path class="body" d="M120 135 L170 80"/>
    <!-- 手を前へ -->
    <line class="body" x1="70" y1="80" x2="130" y2="100"/>
    <text class="label" x="35" y="200">V字バランス</text>
  `),

  legRaise: _wrap(`
    <line class="ground" x1="10" y1="180" x2="190" y2="180"/>
    <rect class="mat" x="10" y="175" width="180" height="8"/>
    <!-- 横向き -->
    <circle class="head" cx="40" cy="120" r="14"/>
    <path class="torso" d="M55 115 L130 115 L130 135 L55 135 Z"/>
    <!-- 下の脚 -->
    <line class="body" x1="130" y1="125" x2="180" y2="160"/>
    <!-- 上の脚を高く -->
    <line class="focus" x1="130" y1="125" x2="180" y2="70"/>
    <path class="arrow" d="M170 75 L180 60" marker-end="url(#arr)"/>
    <text class="label" x="30" y="200">上の脚を高く上げる</text>
  `),

  standing: _wrap(`
    <line class="ground" x1="40" y1="190" x2="160" y2="190"/>
    <circle class="head" cx="100" cy="35" r="14"/>
    <path class="torso" d="M85 50 Q100 45 115 50 L115 100 L85 100 Z"/>
    <line class="body" x1="100" y1="48" x2="100" y2="50"/>
    <!-- 腕 -->
    <line class="body" x1="85" y1="60" x2="75" y2="105"/>
    <line class="body" x1="115" y1="60" x2="125" y2="105"/>
    <!-- 脚 -->
    <line class="focus" x1="90" y1="100" x2="85" y2="188"/>
    <line class="focus" x1="110" y1="100" x2="115" y2="188"/>
    <text class="label" x="40" y="20">まっすぐ立つ</text>
  `),

  wallAngel: _wrap(`
    <line class="ground" x1="10" y1="190" x2="190" y2="190"/>
    <rect x="20" y="15" width="10" height="175" fill="#cbd5e1"/>
    <!-- 壁に背中をつけ -->
    <circle class="head" cx="45" cy="50" r="14"/>
    <path class="torso" d="M40 65 L75 65 L75 130 L40 130 Z"/>
    <!-- W字の腕 -->
    <line class="focus" x1="75" y1="75" x2="100" y2="55"/>
    <line class="focus" x1="100" y1="55" x2="115" y2="80"/>
    <line class="focus" x1="75" y1="105" x2="100" y2="105"/>
    <line class="focus" x1="100" y1="105" x2="115" y2="80"/>
    <line class="body" x1="40" y1="130" x2="40" y2="190"/>
    <line class="body" x1="75" y1="130" x2="75" y2="190"/>
    <path class="arrow" d="M150 60 L150 130" marker-end="url(#arr)" marker-start="url(#arr)"/>
    <text class="label" x="40" y="20">壁に沿って腕を上下</text>
  `),

  bridge: _wrap(`
    <line class="ground" x1="10" y1="180" x2="190" y2="180"/>
    <rect class="mat" x="10" y="175" width="180" height="8"/>
    <!-- お尻持ち上げ -->
    <circle class="head" cx="40" cy="150" r="14"/>
    <path class="body" d="M55 150 Q100 80 130 100"/>
    <path class="focus" d="M60 135 Q100 75 125 95"/>
    <line class="body" x1="130" y1="100" x2="155" y2="170"/>
    <line class="body" x1="155" y1="170" x2="175" y2="170"/>
    <path class="arrow" d="M100 140 L100 95" marker-end="url(#arr)"/>
    <text class="label" x="30" y="200">お尻を高く持ち上げる</text>
  `),

  swimming: _wrap(`
    <line class="ground" x1="10" y1="180" x2="190" y2="180"/>
    <rect class="mat" x="10" y="175" width="180" height="8"/>
    <!-- うつ伏せ・対角手脚浮かす -->
    <circle class="head" cx="50" cy="140" r="14"/>
    <path class="body" d="M65 145 Q110 140 155 150"/>
    <!-- 浮いた腕 -->
    <line class="focus" x1="65" y1="142" x2="20" y2="100"/>
    <!-- 浮いた脚 -->
    <line class="focus" x1="150" y1="148" x2="190" y2="105"/>
    <!-- 床上の腕脚 -->
    <line class="body" x1="65" y1="150" x2="35" y2="172"/>
    <line class="body" x1="155" y1="155" x2="180" y2="170"/>
    <text class="label" x="30" y="200">対角の手脚を浮かせる</text>
  `),

  figure4: _wrap(`
    <line class="ground" x1="10" y1="180" x2="190" y2="180"/>
    <rect class="mat" x="10" y="175" width="180" height="8"/>
    <!-- 仰向け4の字 -->
    <circle class="head" cx="35" cy="130" r="14"/>
    <path class="torso" d="M50 125 L110 125 L110 150 L50 150 Z"/>
    <!-- 支持脚膝立て -->
    <line class="body" x1="110" y1="135" x2="155" y2="105"/>
    <line class="body" x1="155" y1="105" x2="155" y2="165"/>
    <!-- 4の字脚 -->
    <line class="focus" x1="110" y1="145" x2="145" y2="120"/>
    <line class="focus" x1="145" y1="120" x2="120" y2="80"/>
    <text class="label" x="30" y="200">4の字でお尻を伸ばす</text>
  `),

  plank: _wrap(`
    <line class="ground" x1="10" y1="180" x2="190" y2="180"/>
    <rect class="mat" x="10" y="175" width="180" height="8"/>
    <line class="focus" x1="30" y1="105" x2="170" y2="105" stroke-dasharray="6 4"/>
    <circle class="head" cx="40" cy="95" r="14"/>
    <path class="torso" d="M55 100 L150 100 L150 120 L55 120 Z"/>
    <line class="body" x1="55" y1="120" x2="40" y2="175"/>
    <line class="body" x1="150" y1="120" x2="175" y2="175"/>
    <text class="label" x="30" y="200">体を一直線にキープ</text>
  `),

  deadBug: null, // alias set below
  lunge: null,   // alias set below
  bicycle: null, // alias set below
};

// ===== エイリアス: DB側で使われている別名を最終SVGにマップ =====
SVG2.deadBug = SVG2.deadBugBase;
SVG2.bridge = SVG2.bridgeBase;
SVG2.crunch = SVG2.abLift;
SVG2.bicycle = SVG2.bicycleAb;
SVG2.twist = SVG2.seatedTwist;
SVG2.lunge = SVG2.lungeStretch;
SVG2.calfRaise = SVG2.calfStretch;
SVG2.bow = SVG2.cobra;
SVG2.superman = SVG2.swimming;
SVG2.YTW = SVG2.wallAngel;
SVG2.vsit = SVG2.boatPose;
SVG2.sideLeg = SVG2.legRaise;
SVG2.reversePlank = SVG2.plankBasic;
SVG2.stand = SVG2.standing;
SVG2.donkeyKick = SVG2.glutesPunch;
SVG2.wallSquat = SVG2.squatHold;
SVG2.pullup = SVG2.shoulderBlade;
SVG2.tricepsDip = SVG2.pushup;
SVG2.burpee = SVG2.jumpingJack;

export { SVG2 };
