import store from '@core/Store/Store.ts';
import { ChatsController } from '@core/api/controllers/chats.ts';
import { Message } from '@core/api/services/message.ts';
import { messageMixin } from '@core/utils/mixins.ts';

class Chats {
  socket: Message | null = null;

  private _handleError(event: Event): void {
    console.error('Ошибка коннекта:', event);
  }

  private _setStoreActiveChat(chatInfo: any) {
    store.setState('currentChat', chatInfo);
    store.setState('currentChatId', chatInfo.id);
  }

  private _handleMessage(event: MessageEvent): void {
    let data;

    try {
      data = JSON.parse(event.data);
    } catch (error) {
      alert(`Получено сообщение с невалидными данными: ${error}`);
    }

    if (Array.isArray(data)) {
      store.setState('activeChatMessages', messageMixin(data.reverse()));
    }

    if (data.type === 'message') {
      store.setState('activeChatMessages', [
        ...store.getState().activeChatMessages,
        data
      ]);
    }
  }

  public async getChats() {
    try {
      const chats = await ChatsController.getChats();
      store.setState('chats', chats);
    } catch (error) {
      console.warn('Произошла ошибка получения чатов' + error);
    }
  }

  public getChatMessages(count: number) {
    const data: any = {
      type: 'get old',
      content: count
    };

    this.socket?.sendMessage(data);
  }

  public async getToken(id: number) {
    try {
      const token = (await ChatsController.getToken(id)) as { token: string };
      store.setState('token', token.token);
      return token.token;
    } catch (error) {
      console.warn('Произошла ошибка при получении токена' + error);
    }
  }

  public async _connectToWS(chatId: number): Promise<void> {
    const userID = store.getState().userData?.id;
    const token = await this.getToken(chatId);
    const WSUrl = `wss://ya-praktikum.tech/ws/chats/${userID}/${chatId.toString()}/${token}`;
    const handlers: any = {
      onMessage: this._handleMessage,
      onError: this._handleError
    };
    this.socket = new Message(WSUrl, handlers);
  }

  public async getChatInfo(chatId: number) {
    const chats = store.getState().chats;
    return chats.find(chat => chat.id == chatId);
  }

  public async setActiveChat(chatId: number) {
    await this._connectToWS(chatId);
    await this.socket?.waitForOpen();
    this.getChatMessages(0);
    const newActiveChat = await this.getChatInfo(chatId);
    this._setStoreActiveChat(newActiveChat);
  }
}

export const ChatsService = new Chats();
