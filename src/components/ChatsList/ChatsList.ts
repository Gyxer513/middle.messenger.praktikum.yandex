import Block from '@core/Block.ts';

import { template } from './chatsList.template.ts';
import './chatList.scss';
import { withStore } from '@core/Store/withStore.ts';
import { WebSocketMessageService } from '@core/api/services/message.ts';
import store from '@core/Store/Store.ts';
import { ChatsService } from '@core/api/services';

interface IChatItemProps {
  avatar: string;
  alt: string;
  name: string;
  message: string;
  time: string;
  counter_class: string;
  counter_number: number;
}

type TChatsListProps = {
  items: Array<IChatItemProps>;
  currentChatId: number
};

export class ChatsList extends Block {
  constructor(props: TChatsListProps) {
    super({
      ...props,
      events: {
        click: (e) => {
          console.log(e.target.id);
          this.connectWebSocket(e.target.id);

        }
      }
    });
  }

  async connectWebSocket(chatId): Promise<void> {
    const token = await ChatsService.getToken(chatId);
    WebSocketMessageService.connect({
      userId: store.getState().userData.id,
      chatId: chatId,
      token: store.getState().token,
    })
  }



  render(): HTMLElement {
    return this.compile(template, this.props);
  }
}

export const withChatsStore = withStore(state => ({
  items: state.chats,
  currentChatId: state.chats
}));

export const ChatsListWithStore = withChatsStore(ChatsList);