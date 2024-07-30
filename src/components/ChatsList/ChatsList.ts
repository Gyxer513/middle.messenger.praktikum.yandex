import Block from '@core/Block.ts';
import { template } from './chatsList.template.ts';
import './chatList.scss';
import { withStore } from '@core/Store/withStore.ts';
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
  currentChatId: number;
};

export class ChatsList extends Block {
  constructor(props: TChatsListProps) {
    super({
      ...props,
      events: {
        click: (e: any) => {
          e.preventDefault();
         return this.connectWebSocket(e.target?.id);
        }
      }
    });
  }

  async connectWebSocket(chatId: number): Promise<void> {
    await ChatsService.getToken(chatId);
   await ChatsService.setActiveChat(chatId);
  }

  /*  private setCurrentOutline(chatId) {
    document.getElementById(chatId)
  }*/

  render(): HTMLElement {
    return this.compile(template, this.props);
  }
}

export const withChatsStore = withStore(state => ({
  items: state.chats,
  currentChatId: state.chats
}));

export const ChatsListWithStore = withChatsStore(ChatsList);
