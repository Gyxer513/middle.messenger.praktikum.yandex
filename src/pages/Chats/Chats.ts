import { template } from '@/pages/Chats/chats.template.ts';
import './chats.scss';
import Block from '@core/Block.ts';
import { Chat } from '@/components/Chat/Chat.ts';
import { AuthService } from '@core/api/services';
import { router } from '@/index.ts';
import { ChatsService } from '@core/api/services/chats.ts';
import { ChatsList } from '@/components';
import { withUserStore } from '@/pages/ChangeProfile/ChangeProfile.ts';
import store from '@core/Store/Store.ts';

interface IChatProps {
userData?: {
    email?: string;
    login?: string;
    first_name?: string;
    second_name?: string;
    display_name?: string;
    phone?: string;
    avatar?: string;
};
chatsList: ChatsList;
chat: Chat;
}

export class Chats extends Block {
    constructor(props: IChatProps) {
        super({
            ...props,
            chatsList: new ChatsList({ items: props.chats }),
            chat: new Chat({}),
        });
    }

    async componentDidMount() {
        await AuthService.fetchUser()
        await ChatsService.getChats()
        if (!router.getAuthenticatedStatus()) {
            router.navigateTo('/')
        }
        console.log(store.getState());
    }



    render(): HTMLElement {
        return this.compile(template, { ...this.props });
    }
}


export const ChatsWithStore = withUserStore(Chats);