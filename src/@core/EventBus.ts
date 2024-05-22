
export default class EventBus {
  private readonly listeners: Record<string, Array<() => void>> = {}

  constructor() {
    this.listeners = {};
  }

  // Подписка на событие
  on(event: string, callback: ()=> void) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event].push(callback);
  }

  // Отписка от события
  off(event: string, callback: ()=> void) {
    if (!this.listeners[event]) {
      throw new Error(`События ${event} не существует`);
    }

    this.listeners[event] = this.listeners[event]!
      .filter(listener => listener !== callback);
  }

  // Генерация события
  emit(event: string, ...args: any[]): void {
    if (!this.listeners[event]) {
      throw new Error(`События ${event} не существует`);
    }

    this.listeners[event].forEach(listener => listener(...(args as [])));
  }
}