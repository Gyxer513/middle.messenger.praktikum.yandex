import Block from '@core/Block.ts';
import './chatList.scss';
import { withStore } from '@core/Store/withStore.ts';
import { ChatsService } from '@core/api/services';
import { BASE_URL } from '@core/utils/url.ts';
import { template } from './chatsList.template.ts';

interface IChatItemProps {
  avatar: string;
  alt: string;
  name: string;
  message: string;
  time: string;
  counter_class: string;
  counter_number: number;
  BASE_URL: string;
}

type TChatsListProps = {
  items: Array<IChatItemProps>;
  currentChatId: number;
};

export class ChatsList extends Block {
    constructor(props: TChatsListProps) {
        super({
            ...props,
            BASE_URL,
            events: {
                click: (e: Event) => {
                    e.preventDefault();
                    const element = e.target as HTMLElement | null;
                    if (element && element.id) {
                        const id = +element.id as number;
                        return this.connectWebSocket(id);
                    }
                    return 'ws Error';
                },
            },
        });
    }

    async connectWebSocket(chatId: number): Promise<void> {
        await ChatsService.getToken(chatId);
        await ChatsService.setActiveChat(chatId);
    }

    render(): HTMLElement {
        return this.compile(template, this.props);
    }
}

export const withChatsStore = withStore((state) => ({
    items: state.chats,
    currentChatId: state.chats,
}));

export const ChatsListWithStore = withChatsStore(ChatsList);
