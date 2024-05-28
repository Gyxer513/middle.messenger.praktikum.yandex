import Block from '@core/Block.ts';

type RouteHandler = () => void;

interface IRoute {
  path: string;
  handler: RouteHandler;
};

export default class Router {
  private routes: IRoute[] = [];
  private notFoundHandler: RouteHandler | null = null;
  private appElement: HTMLElement;

  constructor(appElementId: string) {
    // Находим root элемент
    const appElement = document.getElementById(appElementId);
    if (!appElement) {
      throw new Error(`Элемент с id "${appElementId}" не найден`);
    }
    this.appElement = appElement;

    window.addEventListener('popstate', this.onPopState.bind(this));
    window.addEventListener('load', this.onPopState.bind(this));
  }

  // Добавляем роут в список
  public addRoute(path: string, handler: RouteHandler): void {
    this.routes.push({ path, handler });
  }

  // Устанавливаем переключатель для неизвестной страницы
  public setNotFoundHandler(handler: RouteHandler): void {
    this.notFoundHandler = handler;
  }

  // Проверяем изменение хэша
  private onPopState(): void {
    const currentPath = window.location.pathname;
    const route = this.routes.find(route => route.path === currentPath);

    if (route) {
      route.handler();
    } else {
      this.redirectToNotFound();
    }
  }

  // Управляемый редирект
  public navigateTo(path: string): void {
    history.pushState(null, '', path);
    this.onPopState();
    location.reload()
  }

  // Инициализация редиректа на 404
  public redirectToNotFound(): void {
    if (this.notFoundHandler) {
      this.notFoundHandler();
      history.pushState(null, '', '/404');
    } else {
      console.log("Такого адреса нет или перенаправление не задано");
    }
}

// Рендер компонента
  public render(component: Block): void {
    this.appElement!.appendChild(component.getContent());
  }
}

