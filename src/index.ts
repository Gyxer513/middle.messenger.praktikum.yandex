import * as Pages from '@/pages/index.ts';
import Router from '@core/Router.ts';
import { AuthService } from '@core/api/services';


export const router = new Router('app');

document.addEventListener("DOMContentLoaded", async () => {

    router.addRoute('/', () => {
        router.render(new Pages.HomePage({}));
    });

    router.addRoute('/login', () => {
        router.render(new Pages.LoginPage({}));
    });

    router.addRoute('/settings', () => {
            router.render(new Pages.ProfilePage({}))
    });

    router.addRoute('/sign-up', () => {
        router.render(new Pages.RegisterPage({}));
    });

    router.addRoute('/change-password', () => {
        setTimeout(() => {
            router.render(new Pages.ChangePassPage({}));
        }, 500)
    });

    router.addRoute('/chats', () => {
        setTimeout(() => {
            router.render(new Pages.ChatsPage({}));
        },500)
    });

    router.addRoute('/404', () => {
        router.render(new Pages.ErrorPage({ error_status: 404, text: 'Not Found' }));
    });

    router.addRoute('/500', () => {
        router.render(
          new Pages.ErrorPage({ error_status: 500, text: 'Server error' }),
        );
    });

    router.setNotFoundHandler(() => {
        router.render(new Pages.ErrorPage({ error_status: 404, text: 'Not Found' }));
        history.pushState(null, '', '/404');
    });

    try {
        await  AuthService.fetchUser()
    } catch (e) {
        console.error(e);
    }
})

