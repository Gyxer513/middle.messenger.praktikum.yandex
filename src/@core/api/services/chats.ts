import store from '@core/Store/Store.ts';
import { ChatsController } from '@core/api/controllers/chats.ts';

class Chats {

  public async getChats() {
    try {
      const chats = await ChatsController.getChats();
      store.setState('chats', chats);
    } catch (error) {
      console.warn('Произошла ошибка получения чатов' + error);
    }
  }

  public async getToken(id: number): Promise<string> {
    try {
      const  token = await ChatsController.getToken(id);
      console.log(token.token);
      store.setState('token', token.token);
    } catch (error) {
      console.warn('Произошла ошибка при получении токена' + error)
    }
  }


}

export const ChatsService = new Chats();
