import { template } from '@/pages/Chats/chats.template.ts';
import './chats.scss';
import Block from '@core/Block.ts';
import { Chat } from '@/components/Chat/Chat.ts';
import { AuthService } from '@core/api/services';
import { router } from '@/index.ts';
import { ChatsService } from '@core/api/services/chats.ts';
import { withStore } from '@core/Store/withStore.ts';

interface IChatProps {
chats: any;
userData: any;
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
        await ChatsService.getChats()
        if (!router.getAuthenticatedStatus()) {
            router.navigateTo('/')
        }
        console.log(this.props.chats)
        console.log(this.props.userData)
    }

    render(): HTMLElement {
        return this.compile(template, { ...this.props });
    }
}

export const withAllStore = withStore(state => ({
    chats: state.chats,
    userData: { ...state.userData }
}));

export const ChatsWithStore = withAllStore(Chats);