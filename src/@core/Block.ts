import { randomIdGenerator } from '@/services/randomIdGenerator.ts';
import EventBus from "./EventBus.ts";

export default class Block<Props extends {}> {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render'
  } as const;

  public id = randomIdGenerator();
  private _element: HTMLElement | null = null;
  protected children: Record<string, any>;
  protected props: Props;
  private eventBus: () => EventBus;

  constructor({ ...propsAndChildren }) {
    const eventBus = new EventBus();
    const { props, children } = this._extractPropsAndChildren(propsAndChildren);
    this.props = this._makePropsProxy(props);
    this.children = children;
    this.eventBus = () => eventBus;
    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  private _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  private _componentDidUpdate() {
    if (this.componentDidUpdate()) {
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  componentDidUpdate() {
    return true;
  }

  private _removeEvents() {
    const { events } = this.props as any;

    if (!events || !this._element) {
      return;
    }
    Object.entries(events as Record<string, () => void>).forEach(
      ([event, listener]) => {
        this._element!.removeEventListener(event, listener);
      }
    );
  }

  private _render() {
    const templateString = this.render();
    const fragment = this.compile(templateString, { ...this.props });
    const newElement = fragment.firstElementChild as HTMLElement;

    if (this._element) {
      this._removeEvents();
      this._element.replaceWith(newElement);
    }
    this._element = newElement;
    this._addEvents();
  }

  init() {
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  private _componentDidMount() {
    this.componentDidMount();
  }

  public componentDidMount() {
    return;
  }

  private _addEvents() {
    const { events } = this.props as any;

    if (!events) {
      return;
    }
    Object.entries(events as Record<string, () => void>).forEach(
      ([event, listener]) => {
        this._element!.addEventListener(event, listener);
      }
    );
  }

  private _extractPropsAndChildren(propsAndChildren: Object) {
    const children: Record<string, unknown> = {};
    const props: Record<string, unknown> = {};

    for (const [key, value] of Object.entries(propsAndChildren)) {
      switch (true) {
        case value instanceof Block:
          children[key] = value;
          break;
        case Array.isArray(value) &&
          value.some(item => Object.values(item)[0] instanceof Block):
          children[key] = value;
          break;
        default:
          props[key] = value;
          break;
      }
    }

    return { children, props };
  }

  public setProps = (nextProps: Props) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  get element() {
    return this._element;
  }

  _makePropsProxy(props: any) {
    // Ещё один способ передачи this, но он больше не применяется с приходом ES6+
    const self = this;

    return new Proxy(props, {
      get(target, prop) {
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set(target, prop, value) {
        const oldTarget = { ...target };

        target[prop] = value;

        // Запускаем обновление компоненты
        // Плохой cloneDeep, в следующей итерации нужно заставлять добавлять cloneDeep им самим
        self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
        return true;
      },
      deleteProperty() {
        throw new Error('Нет доступа');
      }
    });
  }

  public getContent(): HTMLElement | null {
    return this.element;
  }

  private _createDocumentElement(tagName: string) {
    return document.createElement(tagName);
  }
  compile(templateString: string, context: Record<string, any>) {
    const fragment = this._createDocumentElement(
      'template'
    ) as HTMLTemplateElement;
    const template = Handlebars.compile(templateString);

    fragment.innerHTML = template({ ...context, children: this.children });
    Object.entries(this.children).forEach(([, child]) => {
      const stub = fragment.content.querySelector(`[data-id="id-${child.id}"]`);

      if (!stub) {
        return;
      }
      stub.replaceWith(child.getContent()!);
    });

    return fragment.content;
  }

  protected render(): string {
    return '';
  }

  public dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  show() {
    this.getContent()!.style.display = 'block';
  }

  hide() {
    this.getContent()!.style.display = 'none';
  }
}
