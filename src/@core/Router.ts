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

    window.addEventListener('hashchange', this.onHashChange.bind(this));
    window.addEventListener('load', this.onHashChange.bind(this));
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
  private onHashChange(): void {
    const currentHash = window.location.hash.slice(1);
    const route = this.routes.find(route => route.path === currentHash);

    if (route) {
      route.handler();
    } else {
      this.redirectToNotFound();
    }
  }

  // Управляемый редирект
  public redirectTo(path: string): void {
    window.location.hash = `${path}`;
  }

  // Инициализация редиректа на 404
  private redirectToNotFound(): void {
    if (this.notFoundHandler) {
      this.notFoundHandler();
    } else {
      console.log("Такого адреса нет или перенаправление не задано");
    }
}

// Рендер компонента
  public render(component: Block<Object>): void {
    this.appElement!.appendChild(component.getContent());
  }
}