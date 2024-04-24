import Handlebars from 'handlebars';
import button from './parcials/components/button/button.ts'

document.addEventListener('DOMContentLoaded', () => {
  const root = document.querySelector('#app');

  const template = Handlebars.compile(button);

  const result = template({ some: 'Нажми мне' });

  root.innerHTML = result;
})