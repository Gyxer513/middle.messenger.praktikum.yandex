import { randomIdGenerator } from '../services/randomIdGenerator.ts';
import EventBus from './EventBus';

type TProps = {
  template?: string;
  events?: Record<string, unknown>;
  attr?: Record<string, string> | Record<string, string>[] | undefined;
};

export default class Block {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: "flow:render"
  };

  public id = randomIdGenerator();

  private element: HTMLElement | null = null;

  protected props: TProps;

  public children: Record<string, unknown>;

  private eventBus: () => EventBus;

  private listeners: Record<string, () => void> = {};

  private template: string | undefined;

  constructor(
    props: TProps,
    children: Record<string, unknown>,
    listeners: Record<string, () => void>
  ) {
    const eventBus = new EventBus();
    this.children = children;
    this.listeners = listeners;
    this.template = this.props.template;
    this.eventBus = () => eventBus;
    this.registerEvents(eventBus);
  }

  private registerEvents(eventBus: EventBus): void {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this.componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this.componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  private componentDidMount(): void {
    this.componentDidMount();
  }

  public componentDidMount(oldProps?: object): void {
    // eslint-disable-next-line no-console
    console.log('componentDidUpdate => oldProps', oldProps);
  }

  private componentDidUpdate(oldProps: object, newProps: object): void {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (!response) {
      return;
    }
    this._render();
  }

  public init(): void {
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  public render(): string {
    if (this.template) {
      return this.template;
    }
    return '<div>Нет шаблона</div>';
  }

  private _render() {

  }

}
