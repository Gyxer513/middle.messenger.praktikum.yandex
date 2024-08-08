import BaseQuery from '@core/HttpQuery.ts';

export type TChatData = {
  title: string;
  message?: string;
  id?: number;
};

export type THandleUsersData = {
  chatId: number;
  users: number[];
};

class Chats extends BaseQuery {
  constructor() {
    super('/chats');
  }

  getChats(): Promise<TChatData[] | TChatData> {
    const result = this.http.get('', {});
    return result as Promise<TChatData[] | TChatData>
  }

  createChat(data: TChatData) {
    return this.http.post('/', { data });
  }

  addChatUser(data: THandleUsersData) {
    return this.http.put('/users', { data });
  }

  getCurrentChatUsers(chatId: number) {
    return this.http.get(`/${chatId}/users`, {});
  }

  deleteChatUser(data: THandleUsersData) {
    return this.http.delete('/users', { data });
  }

  deleteChat(data: { chatId: number }) {
    return this.http.delete('', { data });
  }

  public updateAvatar(data: FormData) {
    return this.http.put('/avatar', { data });
  }

  getToken(id: number) {
    return this.http.post(`/token/${id}`, {});
  }
}

export const ChatsController = new Chats();
