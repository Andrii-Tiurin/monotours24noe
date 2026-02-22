const i18n = {
  de: {
    nav_home: 'Start', nav_tours: 'Touren', nav_about: 'Über uns', nav_contact: 'Kontakt',
    hero_badge: 'Persönlich • Schnell • Zuverlässig',
    hero_title: 'Dein nächster Urlaub beginnt hier ✈️',
    hero_text: 'Wir finden für dich passende Reisen in Europa und weltweit — einfach, transparent und mit echter Beratung.',
    hero_cta: 'Kostenlose Anfrage',
    card1_title: 'Pauschalreisen', card1_text: 'Strand, City, Familienurlaub oder Last Minute.',
    card2_title: 'Flüge + Hotels', card2_text: 'Optimale Kombinationen für dein Budget.',
    card3_title: 'Individuelle Touren', card3_text: 'Маршруты под твои даты и стиль отдыха.',
    tours_title: 'Beliebte Reiseideen',
    tour1_title: 'Malediven', tour1_text: 'Türkises Meer, Inselresorts, Premium-Entspannung.',
    tour2_title: 'Dubai', tour2_text: 'City Break, Shopping, Wüste und Luxus.',
    tour3_title: 'Europa City Trips', tour3_text: 'Weekend-Angebote nach Rom, Paris, Barcelona u.v.m.',
    tour_cta: 'Passende Tour für mich finden',
    about_title: 'Über Monotours24',
    about_text: 'Monotours24 ist ein modernes Online-Reisebüro. Wir verbinden persönliche Betreuung mit schnellen digitalen Prozessen und fairen Angeboten.',
    contact_title: 'Kontaktiere uns',
    form_name: 'Name', form_email: 'E-Mail', form_msg: 'Nachricht', form_send: 'Senden'
  },
  ru: {
    nav_home: 'Главная', nav_tours: 'Туры', nav_about: 'О нас', nav_contact: 'Контакты',
    hero_badge: 'Лично • Быстро • Надёжно',
    hero_title: 'Твой следующий отпуск начинается здесь ✈️',
    hero_text: 'Подберём подходящие путешествия по Европе и миру — просто, прозрачно и с живой поддержкой.',
    hero_cta: 'Оставить заявку',
    card1_title: 'Пакетные туры', card1_text: 'Пляж, city break, семейный отдых или last minute.',
    card2_title: 'Перелёты + отели', card2_text: 'Оптимальные комбинации под твой бюджет.',
    card3_title: 'Индивидуальные туры', card3_text: 'Маршруты под твои даты и стиль отдыха.',
    tours_title: 'Популярные направления',
    tour1_title: 'Мальдивы', tour1_text: 'Бирюзовое море, островные резорты, премиум-отдых.',
    tour2_title: 'Дубай', tour2_text: 'Город, шопинг, пустыня и люкс.',
    tour3_title: 'Европа City Trips', tour3_text: 'Уикенд-предложения в Рим, Париж, Барселону и др.',
    tour_cta: 'Подобрать тур',
    about_title: 'О Monotours24',
    about_text: 'Monotours24 — современное онлайн-турагентство. Личная поддержка, быстрые процессы и прозрачные условия.',
    contact_title: 'Свяжитесь с нами',
    form_name: 'Имя', form_email: 'E-mail', form_msg: 'Сообщение', form_send: 'Отправить'
  },
  en: {
    nav_home: 'Home', nav_tours: 'Tours', nav_about: 'About', nav_contact: 'Contact',
    hero_badge: 'Personal • Fast • Reliable',
    hero_title: 'Your next trip starts here ✈️',
    hero_text: 'We find fitting trips across Europe and worldwide — simple, transparent, and with real support.',
    hero_cta: 'Free request',
    card1_title: 'Package Tours', card1_text: 'Beach, city breaks, family vacations, or last-minute deals.',
    card2_title: 'Flights + Hotels', card2_text: 'Best combinations for your budget.',
    card3_title: 'Custom Trips', card3_text: 'Routes tailored to your dates and travel style.',
    tours_title: 'Popular travel ideas',
    tour1_title: 'Maldives', tour1_text: 'Turquoise waters, island resorts, premium relaxation.',
    tour2_title: 'Dubai', tour2_text: 'City break, shopping, desert and luxury.',
    tour3_title: 'Europe City Trips', tour3_text: 'Weekend deals to Rome, Paris, Barcelona and more.',
    tour_cta: 'Find my perfect tour',
    about_title: 'About Monotours24',
    about_text: 'Monotours24 is a modern online travel agency combining personal care with fast digital service and fair offers.',
    contact_title: 'Contact us',
    form_name: 'Name', form_email: 'E-mail', form_msg: 'Message', form_send: 'Send'
  }
};

function applyLang(lang) {
  const dict = i18n[lang] || i18n.de;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) {
      if (el.tagName === 'LABEL') {
        const input = el.querySelector('input,textarea');
        el.childNodes[0].nodeValue = dict[key];
        if (input) el.appendChild(input);
      } else {
        el.textContent = dict[key];
      }
    }
  });
  localStorage.setItem('lang', lang);
}

document.querySelectorAll('[data-lang]').forEach(btn => {
  btn.addEventListener('click', () => applyLang(btn.dataset.lang));
});

applyLang(localStorage.getItem('lang') || 'de');

const y = document.getElementById('year');
if (y) y.textContent = new Date().getFullYear();

function submitForm(e){
  e.preventDefault();
  const msg = document.getElementById('formMsg');
  if (msg) msg.textContent = 'Danke! Nachricht gesendet. / Спасибо! Сообщение отправлено. / Thanks! Message sent.';
  e.target.reset();
  return false;
}
window.submitForm = submitForm;
