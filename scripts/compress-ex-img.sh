#!/bin/bash
# raw PNG → webp（幅1200・q80）にして manifest.json を更新
cd "$(dirname "$0")/.." || exit 1
mkdir -p ex-img
n=0
for f in $(find ex-img/raw -name "*.png" -mmin +1 2>/dev/null | sort); do
  [ -f "$f" ] || continue
  id=$(basename "$f" .png)
  [[ "$id" == _* ]] && continue
  out="ex-img/$id.webp"
  if [ ! -f "$out" ] || [ "$f" -nt "$out" ]; then
    cwebp -quiet -q 80 -resize 1200 0 "$f" -o "$out" && n=$((n+1))
  fi
done
node -e '
const fs=require("fs");
const ids=fs.readdirSync("ex-img").filter(f=>f.endsWith(".webp")).map(f=>f.replace(/\.webp$/,"")).sort();
fs.writeFileSync("ex-img/manifest.json", JSON.stringify({updated:new Date().toISOString(), ids}));
console.log("manifest:", ids.length, "件");
'
echo "変換 $n 件"
du -sh ex-img/*.webp 2>/dev/null | awk '{s+=$1} END {print "webp 合計(概算):", NR, "files"}'
