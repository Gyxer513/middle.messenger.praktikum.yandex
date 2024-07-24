import BaseQuery from '@core/HttpQuery.ts';

export type ChatData = {
  title: string;
};

export type THandleUsersData = {
  chatId: string;
  users: string[];
}

class Chats extends BaseQuery {
  constructor() {
    super('/chats');
  }

  getChats() {
    return this.http.get('', {});
  }

  createChat(data: ChatData) {
    return this.http.post('/', { data });
  }

  addChatUsers(data: THandleUsersData) {
    return this.http.put('/users', { data });
  }

  deleteChatUsers(data: THandleUsersData) {
    return this.http.delete('/users', { data });
  }

  getToken(id: number) {
    return this.http.post(`/token/${id}`, {});
  }
}

export const ChatsController = new Chats();
