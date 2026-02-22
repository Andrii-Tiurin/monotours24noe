const t = {
  de: {
    nav_home:'Start',nav_tours:'Touren',nav_about:'Über uns',nav_contact:'Kontakt',
    hero_badge:'Persönlich • Schnell • Zuverlässig',hero_title:'Dein nächster Urlaub beginnt hier ✈️',hero_text:'Wir finden für dich passende Reisen in Europa und weltweit — einfach, transparent und mit echter Beratung.',hero_cta:'Kostenlose Anfrage',
    card1_title:'Pauschalreisen',card1_text:'Strand, City, Familienurlaub oder Last Minute.',
    card2_title:'Flüge + Hotels',card2_text:'Optimale Kombinationen für dein Budget.',
    card3_title:'Individuelle Touren',card3_text:'Маршруты под твои даты и стиль отдыха.',
    tours_title:'Beliebte Reiseideen',tour1_title:'Malediven',tour1_text:'Türkises Meer, Inselresorts, Premium-Entspannung.',tour2_title:'Dubai',tour2_text:'City Break, Shopping, Wüste und Luxus.',tour3_title:'Europa City Trips',tour3_text:'Weekend-Angebote nach Rom, Paris, Barcelona u.v.m.',tour_cta:'Passende Tour für mich finden',
    about_title:'Über Monotours24',about_text:'Monotours24 ist ein modernes Online-Reisebüro. Wir verbinden persönliche Betreuung mit schnellen digitalen Prozessen und fairen Angeboten.',
    contact_title:'Kontaktiere uns',form_name:'Name',form_email:'E-Mail',form_msg:'Nachricht',form_send:'Senden',form_ok:'Danke! Nachricht gesendet. Wir melden uns schnellstmöglich.'
  },
  ru: {
    nav_home:'Главная',nav_tours:'Туры',nav_about:'О нас',nav_contact:'Контакты',
    hero_badge:'Персонально • Быстро • Надёжно',hero_title:'Твой следующий отпуск начинается здесь ✈️',hero_text:'Подберём туры по Европе и миру — просто, прозрачно и с личной поддержкой.',hero_cta:'Оставить заявку',
    card1_title:'Пакетные туры',card1_text:'Пляж, city break, семейный отдых или last minute.',
    card2_title:'Авиабилеты + отели',card2_text:'Оптимальные комбинации под твой бюджет.',
    card3_title:'Индивидуальные поездки',card3_text:'Маршруты под твои даты и стиль отдыха.',
    tours_title:'Популярные идеи путешествий',tour1_title:'Мальдивы',tour1_text:'Бирюзовое море, островные резорты, premium-отдых.',tour2_title:'Дубай',tour2_text:'City break, шопинг, пустыня и люкс.',tour3_title:'Европа',tour3_text:'Уикенд-поездки в Рим, Париж, Барселону и др.',tour_cta:'Подобрать тур',
    about_title:'О Monotours24',about_text:'Monotours24 — современное онлайн-турагентство. Мы совмещаем личный подход, скорость и выгодные предложения.',
    contact_title:'Свяжитесь с нами',form_name:'Имя',form_email:'E-mail',form_msg:'Сообщение',form_send:'Отправить',form_ok:'Спасибо! Заявка отправлена. Скоро свяжемся.'
  },
  en: {
    nav_home:'Home',nav_tours:'Tours',nav_about:'About',nav_contact:'Contact',
    hero_badge:'Personal • Fast • Reliable',hero_title:'Your next trip starts here ✈️',hero_text:'We find the best travel options in Europe and worldwide — simple, clear, and personal.',hero_cta:'Free request',
    card1_title:'Package holidays',card1_text:'Beach, city break, family or last-minute deals.',
    card2_title:'Flights + hotels',card2_text:'Best combinations for your budget.',
    card3_title:'Custom trips',card3_text:'Routes tailored to your dates and travel style.',
    tours_title:'Popular travel ideas',tour1_title:'Maldives',tour1_text:'Turquoise sea, island resorts, premium relaxation.',tour2_title:'Dubai',tour2_text:'City break, shopping, desert and luxury.',tour3_title:'Europe city trips',tour3_text:'Weekend deals to Rome, Paris, Barcelona and more.',tour_cta:'Find my perfect tour',
    about_title:'About Monotours24',about_text:'Monotours24 is a modern online travel agency. We combine personal support, speed and fair offers.',
    contact_title:'Contact us',form_name:'Name',form_email:'E-mail',form_msg:'Message',form_send:'Send',form_ok:'Thanks! Message sent. We will contact you shortly.'
  }
};

function setLang(lang){
  localStorage.setItem('lang', lang);
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (t[lang] && t[lang][key]) el.textContent = t[lang][key];
  });
}

document.querySelectorAll('[data-lang]').forEach(b=>b.addEventListener('click',()=>setLang(b.dataset.lang)));
setLang(localStorage.getItem('lang') || 'de');

const y=document.getElementById('year'); if(y) y.textContent = new Date().getFullYear();
function submitForm(e){
  e.preventDefault();
  const lang = localStorage.getItem('lang') || 'de';
  const msg = document.getElementById('formMsg');
  if (msg) msg.textContent = t[lang].form_ok;
  e.target.reset();
  return false;
}
window.submitForm = submitForm;
