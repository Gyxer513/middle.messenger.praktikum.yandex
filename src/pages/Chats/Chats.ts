import { template } from '@/pages/Chats/chats.template.ts';
import './chats.scss';
import Block from '@core/Block.ts';
import { Button, Chat } from '@/components';
import { AuthService } from '@core/api/services';
import { router } from '@/index.ts';
import { ChatsService } from '@core/api/services/chats.ts';
import { ChatsList } from '@/components';
import { withUserStore } from '@/pages/ChangeProfile/ChangeProfile.ts';
import { Login } from '@/pages/Login';

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
chatsList: typeof ChatsList;
chat: typeof Chat;
}

export class Chats extends Block {
    constructor(props: IChatProps) {
        super({
            ...props,
            createChatButton: new Button({
                id: 'createChatButton',
                class_name: 'button button__main',
                type: 'button',
                text: 'Создать новый чат',
                onClick: (e) => {
                    e.preventDefault();
                    router.renderPopup(new Login({}))
                }
            }),
            chatsList: new ChatsList({ items: props.chat }),
            chat: new Chat({}),
        });
    }

    async componentDidMount() {
        await AuthService.fetchUser()
        await ChatsService.getChats()
        if (!router.getAuthenticatedStatus()) {
            router.navigateTo('/')
        }
    }



    render(): HTMLElement {
        return this.compile(template, { ...this.props });
    }
}


export const ChatsWithStore = withUserStore(Chats);
