async function load() {
  const data = await fetch('/api/public/content').then(r => r.json());
  document.title = data.site.name;
  document.getElementById('tagline').textContent = data.site.tagline;

  const hero = document.querySelector('.hero-header');
  if (hero) {
    const img = data.design?.heroBgData;
    if (img) {
      hero.style.setProperty('--hero-photo', `url(${img})`);
      hero.classList.add('hero-has-custom-bg');
      const heroImg = document.querySelector('.hero-illu img');
      if (heroImg) heroImg.src = img;
    } else {
      hero.style.setProperty('--hero-photo', 'none');
      hero.classList.remove('hero-has-custom-bg');
    }
  }
  document.getElementById('logo').textContent = data.site.logoText || data.site.name;
  const menu = document.getElementById('menu');
  menu.innerHTML = data.menu.map(i => `<a href="${i.href}">${i.label}</a>`).join('');

  document.getElementById('hotTours').innerHTML = (data.hotTours || []).map((t) =>
    `<article class="tour-card">
      <img src="${t.image || 'https://picsum.photos/seed/tour/560/320'}" alt="${t.title || 'Tour'}">
      <div class="tour-body">
        <div class="tour-top"><span class="stars">${t.stars || '4★'}</span><span class="score">${t.rating || '-'}</span></div>
        <h4>${t.title || ''}</h4>
        <ul>
          <li>📍 ${t.location || ''}</li>
          <li>📅 ${t.details || ''}${t.date ? ' • ' + t.date : ''}</li>
          <li>🍽️ ${t.meal || ''}</li>
        </ul>
        <div class="price">${t.price || ''} <small>für 2 Erwachsene</small></div>
      </div>
    </article>`
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
