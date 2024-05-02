import Handlebars from 'handlebars';
import * as Components from './parcials/components/index.ts';
import { pages } from './data/pages.ts';

document.addEventListener('DOMContentLoaded', () => {
  const root: HTMLElement | null = document.querySelector('#app');

  Object.entries(Components).forEach(([name, template]) => {
    Handlebars.registerPartial(name.toLowerCase(), template);
  });

  if (root !== null) {
    function navigate(page: string) {
      const [source, context] = pages[page];
      const container = document.getElementById('app')!;
      container.innerHTML = Handlebars.compile(source)(context);
    }

    document.addEventListener('click', e => {
      const page = (e.target as Element)?.getAttribute('navigate');

      if (page) {
        navigate(page);
        e.preventDefault();
        e.stopImmediatePropagation();
      }
    });
  } else {
    console.warn('#app не найден');
  }
});

