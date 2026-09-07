#!/bin/bash
# ===================================================================
# 夜間の自動生成スーパーバイザー
#   ・すでに走っている生成が終わるのを待ってから引き継ぐ
#   ・1ラウンド＝残り全部を頻度順に生成（枠切れの兆候が出たらその回は止まる）
#   ・ラウンド後に webp 化＋ローカルコミット（push はしない）
#   ・1枚も増えなかった回は「枠切れ」とみなし30分待って再開。8回連続で空なら終了
# ===================================================================
cd "$(dirname "$0")/.." || exit 1
LOG=ex-img/log/_overnight.txt
# 二重起動ガード（launchd の予約起動と手動起動が重ならないように）
if [ "$(pgrep -f "run-overnigh[t].sh" | wc -l | tr -d " ")" -gt 1 ]; then echo "already running $(date "+%F %T")" >> "$LOG"; exit 0; fi
echo "=== overnight start $(date '+%F %T') ===" >> "$LOG"
while pgrep -f "node scripts/gen-ex-im[g]" >/dev/null; do sleep 60; done
echo "既存バッチ終了を確認 $(date '+%T')" >> "$LOG"
round=0; empty=0
while true; do
  round=$((round+1))
  before=$(ls ex-img/raw | grep -v '^_' | wc -l | tr -d ' ')
  echo "--- round $round start $(date '+%T') done=$before ---" >> "$LOG"
  node scripts/gen-ex-img.mjs --limit 400 --concurrency 2 --timeout 420 >> "$LOG" 2>&1
  after=$(ls ex-img/raw | grep -v '^_' | wc -l | tr -d ' ')
  gained=$((after-before))
  ./scripts/compress-ex-img.sh >> "$LOG" 2>&1
  if git add -A ex-img >/dev/null 2>&1 && git commit -q -m "art: 生成イラスト ${after}種（夜間バッチ round ${round}）

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>" >/dev/null 2>&1; then echo "committed total=${after}" >> "$LOG"; fi
  remaining=$(node scripts/gen-ex-img.mjs --count-remaining 2>/dev/null | tail -1)
  echo "ROUND $round gained=$gained total=$after remaining=${remaining:-?} $(date '+%T')" >> "$LOG"
  if [ "${remaining:-1}" -le 0 ]; then echo "ALL_DONE total=$after $(date '+%F %T')" >> "$LOG"; break; fi
  if [ "$gained" -eq 0 ]; then
    empty=$((empty+1))
    if [ "$empty" -ge 8 ]; then echo "GIVE_UP empty_rounds=$empty total=$after $(date '+%F %T')" >> "$LOG"; break; fi
    # Codex の「try again at 4:12 AM」のような案内があれば、その時刻＋2分まで待つ（無ければ30分）
    # Codex の案内から復活時刻を読む。形式は2種類ある:
    #   「try again at 4:12 AM」 / 「try again at Sep 7th, 2026 12:22 AM」
    reset=$(grep -h -oE "try again at [^.]*[AP]M" $(ls -t ex-img/log/*.log 2>/dev/null | head -6) 2>/dev/null | head -1 | sed -E 's/try again at //')
    wait_sec=1800
    if [ -n "$reset" ]; then
      clean=$(echo "$reset" | sed -E 's/([0-9]+)(st|nd|rd|th)/\1/')
      if echo "$clean" | grep -qE '^[0-9]{1,2}:[0-9]{2} ?[AP]M$'; then
        t=$(date -j -f "%Y-%m-%d %I:%M %p" "$(date '+%Y-%m-%d') $clean" +%s 2>/dev/null)
      else
        t=$(date -j -f "%b %d, %Y %I:%M %p" "$clean" +%s 2>/dev/null)
      fi
      now=$(date +%s)
      if [ -n "$t" ]; then
        [ "$t" -le "$now" ] && t=$((t+86400))
        wait_sec=$((t-now+120)); [ "$wait_sec" -lt 300 ] && wait_sec=300
      fi
    fi
    # 復活が12時間以上先＝週間上限。空ラウンドとして数えず、その時刻まで1時間刻みで待つ
    if [ "$wait_sec" -gt 43200 ]; then
      echo "WEEKLY_LIMIT until '${reset}' waiting $((wait_sec/3600))h $(date '+%F %T')" >> "$LOG"
      empty=0
      target=$(( $(date +%s) + wait_sec ))
      while [ "$(date +%s)" -lt "$target" ]; do sleep 600; done
      continue
    fi
    echo "LIMIT_WAIT reset='${reset:-不明}' sleeping $((wait_sec/60))min (empty=$empty) $(date '+%T')" >> "$LOG"
    target=$(( $(date +%s) + wait_sec )); while [ "$(date +%s)" -lt "$target" ]; do sleep 300; done
  else
    empty=0
    sleep 20
  fi
done
echo "=== overnight end $(date '+%F %T') ===" >> "$LOG"
