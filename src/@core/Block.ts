import Handlebars from 'handlebars';
import { randomIdGenerator } from '@core/utils/randomIdGenerator.ts';
import EventBus from './EventBus.ts';

export type Props = {
  [key: string]: any;
  events?: Record<string, (e: Event) => void>;
};

export default abstract class Block {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render'
  } as const;

  public id = randomIdGenerator();

  private _element: HTMLElement | null = null;

  // eslint-disable-next-line no-use-before-define
  protected children: Record<string, Block>;

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
    eventBus.on(Block.EVENTS.INIT, this._init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  public dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  private _componentDidUpdate(oldProps: Props, newProps: Props) {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (!response) {
      return;
    }
    this._render();
  }

  protected componentDidUpdate(oldProps: Props, newProps: Props) {
    return oldProps !== undefined && newProps !== undefined;
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
    const element = this.render();

    if (this._element) {
      this._removeEvents();
      this._element.replaceWith(element);
      this._element = element;
    }
    this._element = element;
    this._addEvents();
  }

  private _init() {
    this.init()
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER)
  }

  protected init() {
  }

  private _componentDidMount() {
    this.componentDidMount();
  }

  public componentDidMount() {}

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
    const children: Record<string, Block> = {};
    const props: Record<string, unknown> = {};

    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (value instanceof Block) {
        children[key] = value;
      } else {
        props[key] = value;
      }
    });
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
    const self = this;

    return new Proxy(props, {
      get(target, prop) {
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set(target, prop, value) {
        const oldTarget = { ...target };

        target[prop] = value;

        self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
        return true;
      },
      deleteProperty() {
        throw new Error('Нет доступа');
      }
    });
  }

  public getContent(): HTMLElement {
    if (this.element?.parentNode?.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
      setTimeout(() => {
        if (
          this.element?.parentNode?.nodeType !== Node.DOCUMENT_FRAGMENT_NODE
        ) {
          this.eventBus().emit(Block.EVENTS.FLOW_CDM);
        }
      }, 100);
    }

    return this.element!;
  }

  protected compile(template: (context: any) => string, context: any) {
    const contextAndStubs = { ...context }

    Object.entries(this.children).forEach(([name, component]) => {
      if (Array.isArray(component)) {
        contextAndStubs[name] = component.map((child) => `<div data-id="${child.id}"></div>`)
      } else {
        contextAndStubs[name] = `<div data-id="${component.id}"></div>`
      }
    })

    const html = template(contextAndStubs)

    const temp = document.createElement('template')

    temp.innerHTML = html

    const replaceStub = (component: Block) => {
      const stub = temp.content.querySelector(`[data-id="${component.id}"]`)

      if (!stub) {
        return
      }

      component.getContent()?.append(...Array.from(stub.childNodes))

      stub.replaceWith(component.getContent()!)
    }

    Object.entries(this.children).forEach(([_, component]) => {
      if (Array.isArray(component)) {
        component.forEach(replaceStub)
      } else {
        replaceStub(component)
      }
    })

    return temp.content
  }

  abstract render(): HTMLElement;

}
