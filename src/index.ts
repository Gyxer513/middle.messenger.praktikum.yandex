import * as Pages from '@/pages/index.ts';
import Router from '@core/Router.ts';

export const router = new Router('app');

router.addRoute('/', () => {
    router.render(new Pages.HomePage({}));
});

router.addRoute('/login', () => {
    router.render(new Pages.LoginPage({}));
});

router.addRoute('/settings', () => {
    router.render(new Pages.ProfilePage({}));
}, true);

router.addRoute('/sign-up', () => {
    router.render(new Pages.RegisterPage({}));
});

router.addRoute('/change-password', () => {
    console.log('change password page');
    router.render(new Pages.ChangePassPage({}));
}, true);

router.addRoute('/chats', () => {
    console.log('chats page');
    router.render(new Pages.ChatsPage({}));
}, true);

router.addRoute('/404', () => {
    console.log('404 page');
    router.render(new Pages.ErrorPage({ error_status: 404, text: 'Not Found' }));
});

router.addRoute('/500', () => {
    console.log('500 page');
    router.render(
        new Pages.ErrorPage({ error_status: 500, text: 'Server error' }),
    );
});


router.setNotFoundHandler(() => {
    console.log('404 page');
    router.render(new Pages.ErrorPage({ error_status: 404, text: 'Not Found' }));
    history.pushState(null, '', '/404');
});
