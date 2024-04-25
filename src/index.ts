import Handlebars from 'handlebars';
import { Button } from '../src/parcials/components/button/index.ts';
import  { Error } from '../src/pages/Error/index.ts'

document.addEventListener('DOMContentLoaded', () => {
  const root: HTMLElement | null = document.querySelector('#app');
  if (root !== null) {
    const template = Handlebars.compile(Error);

    const result = template({ class: `button button_transparent`,errorStatus: '500', text: 'Не туда попали' });

    root.innerHTML = result;
  } else {
    console.error('#app не найден');
  }
});
