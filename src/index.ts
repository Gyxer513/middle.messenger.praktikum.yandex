import Handlebars from 'handlebars';
import { Button } from '../src/parcials/components/button/index.ts';

document.addEventListener('DOMContentLoaded', () => {
  const root = document.querySelector('#app');

  const template = Handlebars.compile(Button);

  const result = template({ class: `button button_main`, text: 'Нажми мне' });

  root.innerHTML = result;
});
