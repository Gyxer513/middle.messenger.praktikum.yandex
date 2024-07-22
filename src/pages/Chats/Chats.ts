import { template } from '@/pages/Chats/chats.template.ts';
import './chats.scss';
import Block from '@core/Block.ts';
import { Chat } from '@/components/Chat/Chat.ts';
import { ChatsList } from '@/components';
import { AuthService } from '@core/api/services';
import { router } from '@/index.ts';
import { ChatsService } from '@core/api/services/chats.ts';
import { withStore } from '@core/Store/withStore.ts';

interface IChatProps {
  chatItem1?: ChatsList;
  chatItem2?: ChatsList;
  chatItem3?: ChatsList;
}

export class Chats extends Block {
    constructor(props: IChatProps) {
        super({
            ...props,
            chat: new Chat({}),
        });
    }

    async componentDidMount() {
        await AuthService.fetchUser()
        const catsData = await ChatsService.getChats()
        if (!router.getAuthenticatedStatus()) {
            router.navigateTo('/')
        }
        console.log(catsData);
    }

    render(): HTMLElement {
        return this.compile(template, this.props);
    }
}

const withChatsStore = withStore(state => {
    chats: state.chats
})

export const ChatsWithStore = withChatsStore(Chats)