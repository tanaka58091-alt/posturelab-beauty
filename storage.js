// ===================================================================
// STORAGE — 講座生ごとのデータ蓄積（端末内 localStorage）
//   プロフィール(ニックネーム) + 診断セッション履歴 + 写真サムネ
//   バックアップ用にエクスポート/インポート対応
// ===================================================================

const PROFILE_KEY  = 'pl_profile_v1';
const SESSIONS_KEY = 'pl_sessions_v1';

// ---------- プロフィール ----------
function getProfile(){
  try { return JSON.parse(localStorage.getItem(PROFILE_KEY)) || null; }
  catch { return null; }
}
function setProfile(profile){
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  return profile;
}
function ensureProfile(nickname){
  let p = getProfile();
  if (!p){
    p = { nickname: nickname || 'ゲスト', createdAt: new Date().toISOString() };
    setProfile(p);
  } else if (nickname && nickname !== p.nickname){
    p.nickname = nickname; setProfile(p);
  }
  return p;
}

// ---------- セッション履歴 ----------
function getSessions(){
  try { return JSON.parse(localStorage.getItem(SESSIONS_KEY)) || []; }
  catch { return []; }
}
function _writeSessions(arr){
  try {
    localStorage.setItem(SESSIONS_KEY, JSON.stringify(arr));
    return true;
  } catch (e){
    // 容量超過時: 古いセッションの写真を落として再試行
    for (const s of arr){
      if (s.thumbSide || s.thumbFront){ s.thumbSide = null; s.thumbFront = null; }
      try { localStorage.setItem(SESSIONS_KEY, JSON.stringify(arr)); return true; }
      catch { /* continue dropping */ }
    }
    return false;
  }
}
function addSession(session){
  const arr = getSessions();
  session.id = session.id || ('s_' + Date.now() + '_' + Math.random().toString(36).slice(2,7));
  session.date = session.date || new Date().toISOString();
  arr.push(session);
  arr.sort((a,b) => new Date(a.date) - new Date(b.date));
  _writeSessions(arr);
  return session;
}
function deleteSession(id){
  const arr = getSessions().filter(s => s.id !== id);
  _writeSessions(arr);
  return arr;
}
function getSession(id){
  return getSessions().find(s => s.id === id) || null;
}
function clearAll(){
  localStorage.removeItem(SESSIONS_KEY);
}

// ---------- 写真サムネ生成（縮小して容量節約） ----------
// img: HTMLImageElement / ImageBitmap / Canvas。max長辺(px)。JPEG dataURL を返す
function makeThumb(img, max = 360, quality = 0.62){
  if (!img) return null;
  try {
    const w = img.naturalWidth || img.width;
    const h = img.naturalHeight || img.height;
    if (!w || !h) return null;
    const ratio = Math.min(1, max / Math.max(w, h));
    const cw = Math.round(w * ratio), ch = Math.round(h * ratio);
    const c = document.createElement('canvas');
    c.width = cw; c.height = ch;
    const ctx = c.getContext('2d');
    ctx.drawImage(img, 0, 0, cw, ch);
    return c.toDataURL('image/jpeg', quality);
  } catch { return null; }
}

// ---------- エクスポート / インポート ----------
function exportData(){
  const payload = {
    app: 'PostureLab Beauty',
    version: 1,
    exportedAt: new Date().toISOString(),
    profile: getProfile(),
    sessions: getSessions(),
  };
  return JSON.stringify(payload, null, 2);
}
function downloadExport(){
  const blob = new Blob([exportData()], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const p = getProfile();
  const name = (p && p.nickname ? p.nickname : 'posturelab').replace(/[^\w一-龠ぁ-んァ-ヶー]/g, '');
  const a = document.createElement('a');
  a.href = url;
  a.download = `posturelab_${name}_${new Date().toISOString().slice(0,10)}.json`;
  document.body.appendChild(a); a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
// merge=true なら既存に追記(重複id除外)、falseなら置換
function importData(jsonText, merge = true){
  const data = JSON.parse(jsonText);
  if (!data || !Array.isArray(data.sessions)) throw new Error('対応していないファイル形式です');
  if (data.profile) setProfile(data.profile);
  if (merge){
    const cur = getSessions();
    const ids = new Set(cur.map(s => s.id));
    data.sessions.forEach(s => { if (!ids.has(s.id)) cur.push(s); });
    cur.sort((a,b) => new Date(a.date) - new Date(b.date));
    _writeSessions(cur);
    return cur;
  } else {
    const arr = data.sessions.slice().sort((a,b) => new Date(a.date) - new Date(b.date));
    _writeSessions(arr);
    return arr;
  }
}

export {
  getProfile, setProfile, ensureProfile,
  getSessions, getSession, addSession, deleteSession, clearAll,
  makeThumb, exportData, downloadExport, importData,
};
