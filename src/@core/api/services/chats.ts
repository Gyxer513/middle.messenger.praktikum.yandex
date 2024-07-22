import store from '@core/Store/Store.ts';
import { ChatsController } from '@core/api/controllers/chats.ts';

class Chats {
  public async getChats(): Promise<unknown> {
    try {
      const chats = await ChatsController.getChats();
      store.setState('chats', chats);
      return chats;
    } catch (error) {
      console.warn('Произошла ошибка получения чатов' + error);
    }
  }
}

export const ChatsService = new Chats();
