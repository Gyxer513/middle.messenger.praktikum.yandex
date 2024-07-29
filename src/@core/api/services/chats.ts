import store from '@core/Store/Store.ts';
import { ChatsController } from '@core/api/controllers/chats.ts';
import { Message } from '@core/api/services/message.ts';

class Chats {
  socket: Message | null = null;

  private _handleError(event: Event): void {
    console.error('Ошибка коннекта:', event);
  }

  private _getActiveChatID() {
    return store.getState().currentChatId;
  }

  private _setStoreChatsList(chatInfo: any) {
    store.setState('chats', [...chatInfo]);
  }

  private _setStoreActiveChat(chatInfo: any) {
    store.setState('currentChat', chatInfo);
  }

  private _handleMessage(event: MessageEvent): void {
    let data;

    try {
      data = JSON.parse(event.data);
    } catch (error) {
      alert(`Получено сообщение с невалидными данными: ${error}`);
    }

    if (data.isArray) {
      store.setState('activeChatMessages', data.reverse());
    }

    if (data.type === 'message') {
      store.setState('activeChatMessages', data);
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
      content: count,
    };

    this.socket?.sendMessage(data);
  }

  public async getToken(id: number): Promise<string> {
    try {
      const  token = await ChatsController.getToken(id);
      store.setState('token', token.token);
      return token.token;
    } catch (error) {
      console.warn('Произошла ошибка при получении токена' + error)
    }
  }

  public async _connectToWS(chatId: number): Promise<void> {
    console.log(chatId)
    console.log(store.getState().userData.id);
    const userID = store.getState().userData?.id;
    const token = await this.getToken(chatId)
console.log(`wss://ya-praktikum.tech/ws/chats/${userID}/${chatId.toString()}/${token}`)

    const WSUrl = `wss://ya-praktikum.tech/ws/chats/${userID}/${chatId.toString()}/${token}`;
    const handlers: any = {
      onMessage: this._handleMessage,
      onError: this._handleError,
    };
    this.socket = new Message(WSUrl, handlers);
  }


  public async getChatInfo(chatId: number) {
    const chats = await this.getChats();

    console.log(chats)

    return chats.find((chat: any) => chat.id === chatId) || {};
  }

  public async setActiveChat(chatId: number) {
      await this._connectToWS(chatId);
      await this.socket?.waitForOpen();
      this.getChatMessages(0);
      const newActiveChat = this.getChatInfo(chatId);
      this._setStoreActiveChat(newActiveChat);
    }

  public async getChatsList() {
    try {
      const profileChats = JSON.parse(await this.getChats() as string);

      this._setStoreChatsList(profileChats);
    } catch (error) {
      alert('Ошибка получения чатов: ' + error);
    }
  }
}

export const ChatsService = new Chats();
