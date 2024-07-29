export type MessageEventHandlers = {
  onOpen?: (event: Event) => void;
  onClose?: (event: CloseEvent) => void;
  onMessage?: (event: MessageEvent) => void;
  onError?: (event: Event) => void;
};

export class Message {
  private ws: WebSocket | null = null;
  private eventHandlers: MessageEventHandlers;
  private url: string;
  private ping: ReturnType<typeof setInterval> | null = null;
  openPromise: Promise<void>;

  private resolveOpenPromise!: () => void;

  constructor(url: string, eventHandlers: MessageEventHandlers) {
    this.url = url;
    this.eventHandlers = eventHandlers;
    this.openPromise = new Promise(resolve => {
      this.resolveOpenPromise = resolve as () => void;
    });

    this._connect();
  }

  public waitForOpen(): Promise<void> {
    return this.openPromise;
  }

  private _connect(): void {
    if (this.ws) {
      throw new Error('Активное подключение сокета уже есть');
    }

    this.ws = new WebSocket(this.url);

    this.ws.addEventListener('open', (event: Event) => {
      if (this.eventHandlers.onOpen) {
        this.eventHandlers.onOpen(event);
      }
      this.resolveOpenPromise();
    });

    this._setupPing();

    if (this.eventHandlers.onOpen) {
      this.ws.addEventListener('open', this.eventHandlers.onOpen);
    }

    if (this.eventHandlers.onMessage) {
      this.ws.addEventListener('message', this.eventHandlers.onMessage);
    }

    if (this.eventHandlers.onError) {
      this.ws.addEventListener('error', this.eventHandlers.onError);
    }

    if (this.eventHandlers.onClose) {
      this.ws.addEventListener('close', this.eventHandlers.onClose);
    }
  }

  public sendMessage(message: any): void {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws?.send(JSON.stringify(message));
    } else {
      console.error('WebSocket is not open. Cannot send message.');
    }
  }

  public close() {
    if (this.ws) {
      this.ws.close();
    }

    clearInterval(Number(this.ping));
    this.ping = null;
  }

  private _setupPing() {
    const data = {
      type: 'ping',
    };
    this.ping = setInterval(() => {
      this.ws?.send(JSON.stringify(data));
    }, 30000);
  }
}
