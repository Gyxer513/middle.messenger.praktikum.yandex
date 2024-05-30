import * as Pages from '@/pages/index.ts';
import Router from '@core/Router.ts';

export const router = new Router('app');

router.addRoute('/', () => {
  console.log('Home page');
  router.render(new Pages.HomePage({}));
});

router.addRoute('/login', () => {
  console.log('login page');
  router.render(new Pages.LoginPage({}));
});

router.addRoute('/profile', () => {
  console.log('profile page');
  router.render(new Pages.ProfilePage({}));
});

router.addRoute('/register', () => {
  console.log('register page');
  router.render(new Pages.RegisterPage({}));
});

router.addRoute('/change-password', () => {
  console.log('change password page');
  router.render(new Pages.ChangePassPage({}));
});

router.addRoute('/chats', () => {
  console.log('chats page');
  router.render(new Pages.ChatsPage({}));
});

router.addRoute('/404', () => {
  console.log('404 page');
  router.render(new Pages.ErrorPage({ error_status: 404, text: 'Not Found' }));
});

router.addRoute('/500', () => {
  console.log('500 page');
  router.render(
    new Pages.ErrorPage({ error_status: 500, text: 'Server error' })
  );
});

router.setNotFoundHandler(() => {
  console.log('404 page');
  router.render(new Pages.ErrorPage({ error_status: 404, text: 'Not Found' }));
  history.pushState(null, '', '/404');
});
