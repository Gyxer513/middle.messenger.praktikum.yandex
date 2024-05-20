interface EventMap {
  [event: string]: any;
}

class EventBus<T extends EventMap> {
  private readonly listeners

  constructor() {
    this.listeners = {};
  }

  // Подписка на событие
  on(event, callback) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event].push(callback);
  }

  // Отписка от события
  off(event, callback) {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this.listeners[event] = this.listeners[event].filter(
      listener => listener !== callback
    );
  }

  // Генерация события
  emit(event, ...args) {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this.listeners[event].forEach(listener => {
      listener(...args);
    });
  }
}