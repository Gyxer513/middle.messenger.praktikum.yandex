//import * as Components from '@/components/index.ts';
import * as Pages from '@/pages/index.ts'
import Router from '@core/Router.ts'
//import { registerComponent } from '@core/RegisterComponent.ts';
//import Block from '@core/Block.ts';

const router = new Router('app');


/*Object.values(Components).forEach((Component) => {
  console.log(Component)
  //registerComponent(Component);
});*/

router.addRoute('/', () => {
  console.log("Home page");
  router.render(new Pages.HomePage({}));
});

router.addRoute('/login', () => {
  console.log("login page");
  router.render(new Pages.LoginPage({}));
});

router.addRoute('/404', () => {
  console.log("404 page");
  router.render(new Pages.ErrorPage({error_status: 404, text: 'Not Found'}));
});

router.addRoute('/500', () => {
  console.log("500 page");
  router.render(new Pages.ErrorPage({error_status: 500, text: 'Server error'}));
});

router.setNotFoundHandler(() => {
  console.log("404 page");
  router.render(new Pages.ErrorPage({error_status: 404, text: 'Not Found'}));
  history.pushState(null, '', '/404');
});



