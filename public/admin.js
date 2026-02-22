let content = null;

async function login() {
  const username = document.getElementById('u').value;
  const password = document.getElementById('p').value;
  const r = await fetch('/api/admin/login', {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ username, password })
  });
  if (!r.ok) return document.getElementById('loginMsg').textContent = 'Login fehlgeschlagen';
  document.getElementById('loginBox').style.display = 'none';
  document.getElementById('panel').style.display = 'block';
  await loadContent();
}

async function loadContent() {
  content = await fetch('/api/admin/content').then(r => r.json());
  siteName.value = content.site.name; tagline.value = content.site.tagline; logoText.value = content.site.logoText; favicon.value = content.site.favicon;
  email.value = content.contacts.email; phone.value = content.contacts.phone; insta.value = content.contacts.instagram; notify.value = content.contacts.notifyEmail;
  hotTours.value = JSON.stringify(content.hotTours, null, 2);
  countries.value = JSON.stringify(content.countries, null, 2);
  articles.value = JSON.stringify(content.articles, null, 2);
  copy.value = content.footer.copy;
  smtpHost.value = content.smtp?.host || ''; smtpPort.value = content.smtp?.port || 587; smtpUser.value = content.smtp?.user || '';
  smtpPass.value = content.smtp?.pass || ''; smtpFrom.value = content.smtp?.from || '';
}

async function save() {
  try {
    content.site.name = siteName.value; content.site.tagline = tagline.value; content.site.logoText = logoText.value; content.site.favicon = favicon.value;
    content.contacts.email = email.value; content.contacts.phone = phone.value; content.contacts.instagram = insta.value; content.contacts.notifyEmail = notify.value;
    content.hotTours = JSON.parse(hotTours.value); content.countries = JSON.parse(countries.value); content.articles = JSON.parse(articles.value);
    content.footer.copy = copy.value;
    content.smtp = { host: smtpHost.value, port: Number(smtpPort.value || 587), user: smtpUser.value, pass: smtpPass.value, from: smtpFrom.value };

    const r = await fetch('/api/admin/content', {
      method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(content)
    });
    adminMsg.textContent = r.ok ? 'Gespeichert ✅' : 'Fehler beim Speichern';
  } catch (e) { adminMsg.textContent = 'JSON Fehler: ' + e.message; }
}

async function changePassword() {
  const newPassword = prompt('Neues Passwort (min. 10 Zeichen):');
  if (!newPassword) return;
  const r = await fetch('/api/admin/change-password', {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ newPassword })
  });
  adminMsg.textContent = r.ok ? 'Passwort geändert ✅' : 'Fehler (zu kurz?)';
}

async function logout() {
  await fetch('/api/admin/logout', { method: 'POST' });
  location.reload();
}

window.login = login; window.save = save; window.changePassword = changePassword; window.logout = logout;
