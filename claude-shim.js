/* Penghubung penyimpanan untuk hosting statis (GitHub Pages).
   Aplikasi memakai tiga antarmuka: db (data bersama), user (identitas), downloads (simpan file).
   Di sini ketiganya disediakan oleh Firebase Firestore dan browser. */
(function () {
  if (window.claude && window.claude.use) return;
  var cfg = window.FIREBASE_CONFIG || {};
  var booted = null;

  function configured() {
    return !!(cfg.apiKey && cfg.projectId && !/^ISI_/.test(cfg.apiKey) && !/^ISI_/.test(cfg.projectId) && window.firebase);
  }
  function boot() {
    if (booted) return booted;
    booted = (async function () {
      if (!configured()) return null;
      try {
        firebase.initializeApp(cfg);
        var fs = firebase.firestore();
        fs.settings({ ignoreUndefinedProperties: true, experimentalAutoDetectLongPolling: true });
        var uid = null;
        try { var cred = await firebase.auth().signInAnonymously(); uid = cred.user.uid; }
        catch (e) { console.warn('Masuk anonim Firebase gagal (aktifkan Anonymous di Authentication):', e && e.code); }
        return { fs: fs, uid: uid };
      } catch (e) { console.error('Firebase gagal dimulai', e); return null; }
    })();
    return booted;
  }
  function saveBlob(o) {
    return new Promise(function (resolve, reject) {
      try {
        var blob = o.data instanceof Blob ? o.data : new Blob([o.data]);
        var a = document.createElement('a');
        a.href = URL.createObjectURL(blob); a.download = o.filename || 'file';
        document.body.appendChild(a); a.click();
        setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 1500);
        resolve({ status: 'saved' });
      } catch (e) { reject({ code: 'unavailable', message: String(e) }); }
    });
  }
  window.claude = {
    use: async function (name) {
      if (name === 'downloads') return { save: saveBlob };
      var b = await boot();
      if (name === 'db') return b ? { doc: function (p) { return b.fs.doc(p); }, collection: function (c) { return b.fs.collection(c); } } : null;
      if (name === 'user') return { id: async function () { return b && b.uid || null; }, can: async function () { return !!b; }, profiles: async function () { return {}; } };
      return null;
    }
  };
})();
