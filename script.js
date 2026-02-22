document.getElementById('year').textContent = new Date().getFullYear();
function submitForm(e){
  e.preventDefault();
  const msg=document.getElementById('formMsg');
  msg.textContent='Danke! Nachricht gesendet. Мы свяжемся с вами в ближайшее время.';
  e.target.reset();
  return false;
}
