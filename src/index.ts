import Handlebars from 'handlebars';
import * as Components from './parcials/components/index.ts'
import * as Pages from './parcials/pages/index.ts'

document.addEventListener('DOMContentLoaded', () => {

  const root: HTMLElement | null = document.querySelector('#app');

    Object.entries(Components).forEach(([name, template]) => {
      Handlebars.registerPartial(name.toLowerCase(), template);
    })


  if (root !== null) {
    const template = Handlebars.compile(Pages.LoginPage);


    const result = template({ });

    root.innerHTML = result;
  } else {
    console.error('#app не найден');
  }
});
