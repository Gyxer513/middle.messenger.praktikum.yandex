import Block from '@core/Block.ts';
import {Loader} from '@/components';

type RouteHandler = () => void;

interface IRoute {
  path: string;
  handler: RouteHandler;
  isPrivate: boolean;
  requiresData?: boolean;
}

export default class Router {
    private routes: IRoute[] = [];
    private notFoundHandler: RouteHandler | null = null;
    private static _instance: Router;
    private appElement: HTMLElement;
    private isAuthenticated: boolean = false;

    constructor(appElementId: string) {

    // Находим root элемент
        const appElement = document.getElementById(appElementId);
        if (!appElement) {
            throw new Error(`Элемент с id "${appElementId}" не найден`);
        }
        this.appElement = appElement;

        window.addEventListener('popstate', this.onPopState.bind(this));
        window.addEventListener('load', this.onPopState.bind(this));

        if (Router._instance) {
            return Router._instance;
        }
        Router._instance = this;
    }

    // Добавляем роут в список роутов
    public addRoute(path: string, handler: RouteHandler, isPrivate: boolean = false, requiresData: boolean = false): void {
        this.routes.push({ path, handler, isPrivate, requiresData });
    }

    // Устанавливаем переключатель для неизвестной страницы
    public setNotFoundHandler(handler: RouteHandler): void {
        this.notFoundHandler = handler;
    }

    private onPopState(): void {
        const currentPath = window.location.pathname;
        this.appElement.innerHTML = '';
        this.renderRoute(currentPath);
    }

    public getAuthenticatedStatus() {
        return this.isAuthenticated;
    }

    // Управляемый редирект
    public navigateTo(path: string): void {
        this.appElement.innerHTML = '';
        history.pushState(null, '', path);
        this.renderRoute(path);
    }

    // Дополнительный метод проверки приветная ссылка или нет
    private async renderRoute(path: string): void {

        const route = this.routes.find(route => route.path === path);

        if (route) {
            if (route.isPrivate && !this.isAuthenticated) {
                alert('You are not authorized to view this page');
                this.navigateTo('/');
            } else {
                    route.handler();
                }
        } else {
            this.redirectToNotFound();
        }
    }


    // Инициализация редиректа на 404
    public redirectToNotFound(): void {
        if (this.notFoundHandler) {
            this.notFoundHandler();
            history.pushState(null, '', '/404');
        } else {
            console.log('Такого адреса нет или перенаправление не задано');
        }
    }

    // Меняем статус авторизации
    public setAuthenticationStatus(status: boolean): void {
        this.isAuthenticated = status;
    }

    // Рендер компонента
    public render(component: Block): void {
    this.appElement!.appendChild(component.getContent());
    }
}
