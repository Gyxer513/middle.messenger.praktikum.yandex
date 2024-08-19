/* eslint-disable */
import Router from '../src/@core/Router';
import Block from '../src/@core/Block';

describe('Router', () => {
    let router: Router;
    let appElement: HTMLElement;
    let popupElement: HTMLDialogElement;

    beforeEach(() => {
        document.body.innerHTML = `
      <div id="app"></div>
      <dialog id="popup"></dialog>
    `;
        appElement = document.getElementById('app')!;
        popupElement = document.getElementById('popup') as HTMLDialogElement;
        router = new Router('app', 'popup');
        popupElement.showModal = jest.fn();
        popupElement.close = jest.fn();
    });

    test('Должен найти appElement корректно', () => {
        expect(router['appElement']).toBe(appElement);
    });

    test('Должен корректно добавить роуты в роутер', () => {
        document.body.innerHTML = '<dialog id="popup"></dialog>';

        expect(() => new Router('non-existing-id', 'popup')).toThrowError(
            'Элемент с id "non-existing-id" не найден',
        );
    });

    test('Должен корректно добавлять роут', () => {
        const handler = jest.fn();
        router.addRoute('/test', handler, false, false);

        const { routes } = (router as any);
        expect(routes.length).toBe(1);
        expect(routes[0].path).toBe('/test');
        expect(routes[0].handler).toBe(handler);
    });

    test('Должен корректно установить редирект', () => {
        const notFoundHandler = jest.fn();
        router.setNotFoundHandler(notFoundHandler);

        (router as any).redirectToNotFound();

        expect(notFoundHandler).toHaveBeenCalled();
    });

    test('Должен корректро перелючить на роут и отрендерить', () => {
        const handler = jest.fn();
        router.addRoute('/test', handler, false, false);

        router.navigateTo('/test');

        expect(handler).toHaveBeenCalled();
        expect(window.location.pathname).toBe('/test');
    });

    test('Должен корректно открыть и закрыть попап', () => {
        class TestBlock extends Block {
            render(): HTMLElement {
                return this.compile('<h1>For test</h1>', this.props);
            }
        }

        const testBlock = new TestBlock({});

        router.renderPopup(testBlock);

        console.log(popupElement.innerHTML); // Выводим содержимое попапа для отладки

        // Проверяем, что popupElement.showModal был вызван
        expect(popupElement.showModal).toHaveBeenCalled();

        // Проверяем, что контент был добавлен в popupElement
        expect(popupElement.innerHTML).toContain('<h1>For test</h1>');

        router.closePopup();

        // Проверяем, что контент был очищен
        expect(popupElement.innerHTML).toBe('');
    });

    test('Должен корректно редиректить на 404', () => {
        const notFoundHandler = jest.fn();
        router.setNotFoundHandler(notFoundHandler);

        router.navigateTo('/non-existing-route');

        expect(notFoundHandler).toHaveBeenCalled();
        expect(window.location.pathname).toBe('/404');
    });
});
