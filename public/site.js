async function load() {
  const data = await fetch('/api/public/content').then(r => r.json());
  document.title = data.site.name;
  document.getElementById('tagline').textContent = data.site.tagline;
  document.getElementById('logo').textContent = data.site.logoText || data.site.name;
  const menu = document.getElementById('menu');
  menu.innerHTML = data.menu.map(i => `<a href="${i.href}">${i.label}</a>`).join('');

  document.getElementById('hotTours').innerHTML = (data.hotTours || []).map((t, i) =>
    `<article class="hot card${(i%4)+1}"><span>${t.rating || '-'}</span><h4>${t.title}</h4><p>${t.details}</p><strong>${t.price}</strong></article>`
  ).join('');

  document.getElementById('countriesGrid').innerHTML = (data.countries || []).map((c, i) =>
    `<a class="country ${['egypt','turkey','uae','spain','thai','maldives'][i%6]}" href="#"><b>${c.name}</b><small>${c.price || ''}</small></a>`
  ).join('');

  document.getElementById('articlesGrid').innerHTML = (data.articles || []).map(a =>
    `<article class="promo-card sky"><h3>${a.title}</h3><p>${a.text}</p></article>`
  ).join('');

  const footer = document.getElementById('footer');
  footer.innerHTML = `<div><div class="logo dark">${data.site.name}</div></div>
    <div>${(data.footer.col1||[]).map(x=>`<a href="#">${x}</a>`).join('')}</div>
    <div>${(data.footer.col2||[]).map(x=>`<a href="#">${x}</a>`).join('')}</div>`;
  document.getElementById('copy').textContent = data.footer.copy;
}

document.getElementById('contactForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const fd = new FormData(e.target);
  const body = Object.fromEntries(fd.entries());
  const r = await fetch('/api/public/contact', {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body)
  });
  document.getElementById('contactMsg').textContent = r.ok ? 'Danke! Anfrage gesendet.' : 'Fehler beim Senden';
  if (r.ok) e.target.reset();
});

load();
