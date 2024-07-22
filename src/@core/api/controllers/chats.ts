import BaseQuery from '@core/HttpQuery.ts';

export type ChatData = {
  title: string;
};

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
}

export const ChatsController = new Chats();
