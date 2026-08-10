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

// ---------- プロフィール設定（時間/運動経験/目的/年代） ----------
const PREFS_KEY = 'pl_prefs_v1';
function getPrefs(){
  try { return JSON.parse(localStorage.getItem(PREFS_KEY)) || null; }
  catch { return null; }
}
function setPrefs(prefs){
  try { localStorage.setItem(PREFS_KEY, JSON.stringify(prefs || {})); } catch {}
  return prefs;
}

// ---------- 30日プログラムの進捗（診断セッションごと・端末内） ----------
const PROGRESS_KEY = 'pl_progress_v1';
function _readProgressAll(){
  try { return JSON.parse(localStorage.getItem(PROGRESS_KEY)) || {}; }
  catch { return {}; }
}
function getProgress(sessionId){
  const p = _readProgressAll()[sessionId];
  if (!p || !Array.isArray(p.done)) return { done: [], logs: {}, adapt: null, round: 1, history: [] };
  // 旧データ(doneだけ)も壊さずに読めるようにする
  return {
    done: p.done, logs: p.logs || {}, adapt: p.adapt || null,
    round: p.round || 1, history: p.history || [], updatedAt: p.updatedAt,
  };
}
function _writeProgress(sessionId, p){
  const all = _readProgressAll();
  p.updatedAt = new Date().toISOString();
  all[sessionId] = p;
  try { localStorage.setItem(PROGRESS_KEY, JSON.stringify(all)); } catch {}
  return p;
}
function toggleDayDone(sessionId, day){
  const p = getProgress(sessionId);
  const i = p.done.indexOf(day);
  if (i >= 0) p.done.splice(i, 1); else p.done.push(day);
  p.done.sort((a, b) => a - b);
  return _writeProgress(sessionId, p);
}
// その日の記録: status='full'|'partial'|'none' / feel='easy'|'ok'|'hard'|null
// full・partial は「進んだ」扱い(done入り)。none は記録だけ残して日は進めない。
function logDay(sessionId, day, status, feel){
  const p = getProgress(sessionId);
  const prev = p.logs[day] || {};
  p.logs[day] = {
    status: status || prev.status || 'full',
    feel: feel !== undefined ? feel : (prev.feel || null),
    at: prev.at || new Date().toISOString(),
    date: prev.date || new Date().toISOString().slice(0, 10),
  };
  const advanced = p.logs[day].status !== 'none';
  const i = p.done.indexOf(day);
  if (advanced && i < 0) p.done.push(day);
  if (!advanced && i >= 0) p.done.splice(i, 1);
  p.done.sort((a, b) => a - b);
  return _writeProgress(sessionId, p);
}
// 次の30日へ。前回の記録は history に要約して残し、done/logs だけリセットする
function startRound(sessionId, opts){
  const p = getProgress(sessionId);
  const logs = Object.values(p.logs || {});
  p.history = (p.history || []).concat([{
    round: p.round || 1,
    done: p.done.length,
    full: logs.filter(l => l.status === 'full').length,
    easy: logs.filter(l => l.feel === 'easy').length,
    hard: logs.filter(l => l.feel === 'hard').length,
    endedAt: new Date().toISOString(),
  }]);
  p.round = (p.round || 1) + 1;
  p.done = [];
  p.logs = {};
  p.adapt = { at: 0, level: opts?.level || 0, sizeDelta: 0, reason: opts?.reason || '' };
  return _writeProgress(sessionId, p);
}
function setAdapt(sessionId, adapt){
  const p = getProgress(sessionId);
  p.adapt = adapt || null;
  return _writeProgress(sessionId, p);
}
// 連続実施日数（カレンダー日ベース。今日か昨日に記録があれば継続中とみなす）
function currentStreak(sessionId){
  const p = getProgress(sessionId);
  const days = Object.values(p.logs)
    .filter(l => l && l.status !== 'none' && l.date)
    .map(l => l.date);
  if (!days.length) return 0;
  const set = new Set(days);
  const today = new Date();
  const iso = (d) => d.toISOString().slice(0, 10);
  const shift = (n) => { const d = new Date(today); d.setDate(d.getDate() - n); return iso(d); };
  if (!set.has(shift(0)) && !set.has(shift(1))) return 0;   // 2日以上空いたら途切れ
  let n = set.has(shift(0)) ? 0 : 1;
  let streak = 0;
  while (set.has(shift(n))){ streak++; n++; }
  return streak;
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
  getProgress, toggleDayDone, logDay, setAdapt, startRound, currentStreak,
  getPrefs, setPrefs,
  makeThumb, exportData, downloadExport, importData,
};
