import Block from '@core/Block.ts';
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
  private appElement: HTMLElement;
  private popupElement: HTMLDialogElement;
  private isAuthenticated: boolean = false;

  constructor(appElementId: string, popupElementId: string) {
    // Находим root элемент
    const appElement = document.getElementById(appElementId);
    if (!appElement) {
      throw new Error(`Элемент с id "${appElementId}" не найден`);
    }
    this.appElement = appElement;

    // Находим элемент попапа
    const popupElement = document.getElementById(
      popupElementId
    ) as HTMLDialogElement;
    if (!popupElement) {
      throw new Error(`Элемент с id "${popupElementId}" не найден`);
    }
    this.popupElement = popupElement;

    window.addEventListener('popstate', this.onPopState.bind(this));
    window.addEventListener('load', this.onPopState.bind(this));
  }

  // Добавляем роут в список роутов
  public addRoute(
    path: string,
    handler: RouteHandler,
    isPrivate: boolean = false,
    requiresData: boolean = false
  ): void {
    this.routes.push({ path, handler, isPrivate, requiresData });
  }

  // Устанавливаем переключатель для неизвестной страницы
  public setNotFoundHandler(handler: RouteHandler): void {
    this.notFoundHandler = handler;
  }

  private onPopState() {
    const currentPath = window.location.pathname;
    this.appElement.innerHTML = '';
    this.renderRoute(currentPath);
  }

  public getAuthenticatedStatus() {
    return this.isAuthenticated;
  }

  // Управляемый редирект
  public navigateTo(path: string) {
    this.appElement.innerHTML = '';
    history.pushState(null, '', path);
    this.renderRoute(path);
  }

  // Дополнительный метод проверки приветная ссылка или нет
  private async renderRoute(path: string) {
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

  // Открываем попап
  public renderPopup(content: Block): void {
    this.popupElement.innerHTML = '';
    this.popupElement.appendChild(content.getContent());
    document.body.classList.add('scroll-lock');
    this.popupElement.showModal();
  }

  // Закрываем попап
  public closePopup(): void {
    document.body.classList.remove('scroll-lock');
    this.popupElement.close();
    this.popupElement.innerHTML = '';
  }
}
