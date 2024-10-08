import store from '@core/Store/Store.ts';
import { ChatsController } from '@core/api/controllers/chats.ts';
import { Message } from '@core/api/services/message.ts';
import { messageMixin } from '@core/utils/mixins.ts';
import { TUserData } from '@core/api/services/user.ts';
import { actionMixin } from '@core/utils/actionMixin.ts';
import { BASE_URL } from '@core/utils/url';
import { baseUrlMixin } from '@core/utils/baseUrlMixin.ts';

type TChatMessage = {type: string; content: number | string}
type TChatInfo = {avatar: string, messages: TChatMessage[]};

class Chats {
  socket: Message | null = null;

  private _handleError(event: Event): void {
    console.error('Ошибка коннекта:', event);
  }

  private _setStoreCurrentUsers(currentUsers: TUserData[]): void {
    store.setState('currentUsers', actionMixin(currentUsers, 'Удалить'));
  }

  private _setStoreActiveAvatar(chatInfo: TChatInfo) {
    store.setState(
      'currentChatAvatar',
      `${BASE_URL}${chatInfo.avatar}`
    );
  }

  private _setCurrentChatId(chatId: number) {
    store.setState('currentChatId', chatId);
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
      const currentMessages = store.getState().activeChatMessages;
      if (Array.isArray(currentMessages)) {
        store.setState('activeChatMessages', [
          ...currentMessages,
          { ...data, cls: 'chat__receiver' }
        ]);
      } else {
        console.error('activeChatMessages is not an array');
      }
    }
  }

  public async getChats() {
    try {
      const chats = await ChatsController.getChats();
      store.setState('chats', baseUrlMixin(chats, BASE_URL));
    } catch (error) {
      console.warn('Произошла ошибка получения чатов' + error);
    }
  }

  public getChatMessages(count: number) {
    const data: TChatMessage  = {
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
    // @ts-ignore
    return chats.find(chat => chat.id == chatId);
  }

  public async setActiveChat(chatId: number) {
    const currChatId = store.getState().currentChatId;
    if (currChatId != chatId) {
      await this._connectToWS(chatId);
      await this.socket?.waitForOpen();
      this.getChatMessages(0);
      const newActiveChat = await this.getChatInfo(chatId) as TChatInfo;
      const currentUsers = (await ChatsController.getCurrentChatUsers(
        chatId
      )) as TUserData[];
      this._setCurrentChatId(chatId);
      this._setStoreCurrentUsers(currentUsers);
      this._setStoreActiveAvatar(newActiveChat);
    }
  }

  public async createNewChat(chatName: { title: string }) {
    try {
      await ChatsController.createChat(chatName);
      await this.getChats();
    } catch (error) {
      console.error('Произошла ошибка при создании чата' + error);
    }
  }

  public sendMessage(message: string) {
    const data: TChatMessage = {
      type: 'message',
      content: message
    };

    this.socket?.sendMessage(data);
  }

  public async changeAvatar(file: File) {
    try {
      const data = new FormData();
      const currentChatId = store.getState().currentChatId;
      data.append('avatar', file);
      data.append('chatId', String(currentChatId));
      return ChatsController.updateAvatar(data);
    } catch (error) {
      console.warn(error);
    }
  }

  public async deleteChat(data: { chatId: number }) {
    try {
      await ChatsController.deleteChat(data);
      await this.getChats();
      store.setState('activeChatMessages', []);
    } catch (error) {
      console.error('Произошла ошибка при удалении чата' + error);
    }
  }

  public async deleteUser(chatId: number, userId: number) {
    try {
      await ChatsController.deleteChatUser({ chatId, users: [userId] });
    } catch (error) {
      console.error('Произошла ошибка при удалении пользователя' + error);
    }
  }

  public async addUser(chatId: number, userId: number) {
    try {
      await ChatsController.addChatUser({ chatId, users: [userId] });
    } catch (error) {
      console.error('Произошла ошибка при добавлении пользователя' + error);
    }
  }
}

export const ChatsService = new Chats();
