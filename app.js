const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

function fakeSearch(e){
  e.preventDefault();
  const msg = document.getElementById('searchMsg');
  if (msg) msg.textContent = 'Perfekt! Wir bereiten passende Angebote vor und melden uns schnell bei dir.';
  return false;
}
window.fakeSearch = fakeSearch;

function subscribe(e){
  e.preventDefault();
  const msg = document.getElementById('newsMsg');
  if (msg) msg.textContent = 'Danke! Bitte bestätige deine E-Mail in deinem Postfach.';
  e.target.reset();
  return false;
}
window.subscribe = subscribe;

function submitForm(e){
  e.preventDefault();
  const msg = document.getElementById('formMsg');
  if (msg) msg.textContent = 'Danke! Deine Anfrage wurde empfangen.';
  e.target.reset();
  return false;
}
window.submitForm = submitForm;
