let content = null;
let heroBgData = '';

function setMsg(text, ok = true) {
  const el = document.getElementById('adminMsg') || document.getElementById('loginMsg');
  if (!el) return;
  el.textContent = text;
  el.style.color = ok ? '#1f7a35' : '#b42318';
}

function bindTabs() {
  document.querySelectorAll('.tab').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tab').forEach(x => x.classList.remove('active'));
      document.querySelectorAll('.tab-pane').forEach(x => x.classList.remove('active'));
      btn.classList.add('active');
      const id = 'tab-' + btn.dataset.tab;
      const pane = document.getElementById(id);
      if (pane) pane.classList.add('active');
    });
  });
}

function fileToDataUrlCompressed(file, maxW = 1600, quality = 0.82) {
  return new Promise((resolve, reject) => {
    const fr = new FileReader();
    fr.onerror = reject;
    fr.onload = () => {
      const img = new Image();
      img.onload = () => {
        const scale = Math.min(1, maxW / img.width);
        const w = Math.max(1, Math.round(img.width * scale));
        const h = Math.max(1, Math.round(img.height * scale));
        const canvas = document.createElement('canvas');
        canvas.width = w; canvas.height = h;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, w, h);
        resolve(canvas.toDataURL('image/jpeg', quality));
      };
      img.onerror = reject;
      img.src = String(fr.result || '');
    };
    fr.readAsDataURL(file);
  });
}

async function login() {
  const username = document.getElementById('u').value;
  const password = document.getElementById('p').value;
  const r = await fetch('/api/admin/login', {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ username, password })
  });
  if (!r.ok) return document.getElementById('loginMsg').textContent = 'Login fehlgeschlagen';

  document.getElementById('loginBox').style.display = 'none';
  document.getElementById('panel').style.display = 'grid';
  bindTabs();
  await loadContent();
  setMsg('Eingeloggt. Inhalte geladen ✅');
}

async function loadContent() {
  content = await fetch('/api/admin/content?ts=' + Date.now()).then(r => r.json());
  if (!content.design) content.design = {};
  heroBgData = content.design.heroBgData || '';
  const prev = document.getElementById('heroBgPreview');
  if (prev) prev.src = heroBgData || '';

  const fileInput = document.getElementById('heroBgFile');
  if (fileInput && !fileInput.dataset.bound) {
    fileInput.addEventListener('change', async (e) => {
      const f = e.target.files?.[0];
      if (!f) return;
      try {
        heroBgData = await fileToDataUrlCompressed(f);
        const p = document.getElementById('heroBgPreview');
        if (p) p.src = heroBgData;
        setMsg('Bild geladen (optimiert). Jetzt auf Save all klicken.');
      } catch {
        setMsg('Bild konnte nicht verarbeitet werden.', false);
      }
    });
    fileInput.dataset.bound = '1';
  }

  siteName.value = content.site.name;
  tagline.value = content.site.tagline;
  logoText.value = content.site.logoText;
  favicon.value = content.site.favicon;

  email.value = content.contacts.email;
  phone.value = content.contacts.phone;
  insta.value = content.contacts.instagram;
  notify.value = content.contacts.notifyEmail;

  hotTours.value = JSON.stringify(content.hotTours, null, 2);
  countries.value = JSON.stringify(content.countries, null, 2);
  articles.value = JSON.stringify(content.articles, null, 2);
  copy.value = content.footer.copy;

  smtpHost.value = content.smtp?.host || '';
  smtpPort.value = content.smtp?.port || 587;
  smtpUser.value = content.smtp?.user || '';
  smtpPass.value = content.smtp?.pass || '';
  smtpFrom.value = content.smtp?.from || '';
}

async function save() {
  try {
    content.site.name = siteName.value;
    content.site.tagline = tagline.value;
    content.site.logoText = logoText.value;
    content.site.favicon = favicon.value;

    content.contacts.email = email.value;
    content.contacts.phone = phone.value;
    content.contacts.instagram = insta.value;
    content.contacts.notifyEmail = notify.value;

    content.hotTours = JSON.parse(hotTours.value);
    content.countries = JSON.parse(countries.value);
    content.articles = JSON.parse(articles.value);
    content.footer.copy = copy.value;

    content.smtp = {
      host: smtpHost.value,
      port: Number(smtpPort.value || 587),
      user: smtpUser.value,
      pass: smtpPass.value,
      from: smtpFrom.value
    };
    content.design = content.design || {};
    content.design.heroBgData = heroBgData || '';

    const r = await fetch('/api/admin/content', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(content)
    });

    if (!r.ok) {
      let msg = 'Fehler beim Speichern';
      try {
        const j = await r.json();
        msg = j?.message || j?.error || msg;
      } catch {}
      return setMsg(`${msg} (HTTP ${r.status})`, false);
    }
    const stamp = new Date().toLocaleTimeString();
    setMsg(`Gespeichert ✅ (${stamp})`);
  } catch (e) {
    setMsg('JSON Fehler: ' + e.message, false);
  }
}

async function changePassword() {
  const newPassword = prompt('Neues Passwort (min. 10 Zeichen):');
  if (!newPassword) return;
  const r = await fetch('/api/admin/change-password', {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ newPassword })
  });
  setMsg(r.ok ? 'Passwort geändert ✅' : 'Fehler: Passwort zu schwach', r.ok);
}

async function logout() {
  await fetch('/api/admin/logout', { method: 'POST' });
  location.reload();
}

function reloadSite() {
  window.open('/?ts=' + Date.now(), '_blank');
}

function clearHeroBg() {
  heroBgData = '';
  const p = document.getElementById('heroBgPreview');
  if (p) p.src = '';
  const f = document.getElementById('heroBgFile');
  if (f) f.value = '';
  setMsg('Hero-Hintergrund entfernt. Save all drücken.');
}

window.login = login;
window.save = save;
window.changePassword = changePassword;
window.logout = logout;
window.reloadSite = reloadSite;
window.clearHeroBg = clearHeroBg;
