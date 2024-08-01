import { template } from './chat.template.ts';
import './chat.scss';
import Block from '@core/Block.ts';
import { FormValidator } from '@core/FormValidator.ts';
import { Button, ChatAvatar, DeleteUsers } from '@/components';
import { withStore } from '@core/Store/withStore.ts';
import { ChatsService } from '@core/api/services';
import { router } from '@/index.ts';
import store from '@core/Store/Store.ts';

const formValidator = new FormValidator();

interface IChatProps {
  chatAvatar?: typeof ChatAvatar;
  submitButton?: Button;
  messages: Array<any>;
  chatId: number;
  currentAvatar: string;
}

export class Chat extends Block {
  constructor(props: IChatProps) {
    super({
      ...props,
      deleteChatButton: new Button({
        id: 'deleteButton',
        class_name: 'button button__main',
        text: 'Удалить чат',
        type: 'button',
        onClick: (e: Event) => {
          e.preventDefault();
          const chatId = store.getState().currentChatId
          return  ChatsService.deleteChat({chatId: chatId})
        },
      }),
      deleteUsersButton: new Button({
        id: 'deleteButton',
        class_name: 'button button__main',
        text: 'Удалить пользователей',
        type: 'button',
        onClick: (e: Event) => {
            e.preventDefault();
            router.renderPopup(new DeleteUsers({}))
        },
      }),
      handleUserButton: new Button({
        id: 'deleteButton',
        class_name: 'button button__main',
        text: 'Пользователи',
        type: 'button',
        disabled: props.chatId < 0,
        onClick: (e: Event) => {
          e.preventDefault();
        },
      }),
      chatAvatar: new ChatAvatar({
        class: 'avatar__container',
        alt: 'аватар',
        size: 'small',
        events: {
          change: (event: Event) => this.handleAvatarChange(event)
        }
      }),
      chatId: props.chatId ? props.chatId : 0,
      submitButton: new Button({
        id: 'submitButton',
        class_name: 'chat__send-button',
        text: 'Go',
        type: 'submit',
        onClick: (e: Event) => {
          e.preventDefault();
          const data = formValidator.handleSubmit('chatForm');
          const queryData = data.formData as { message: string };
          if (data.isValid) {
            ChatsService.sendMessage(queryData.message);
            router.closePopup();
          }
        },
        submit: (e: Event) => {
          e.preventDefault();
          const data = formValidator.handleSubmit('chatForm');
          const queryData = data.formData as { message: string };
          if (data.isValid) {
            ChatsService.sendMessage(queryData.message);
            router.closePopup();
          }
        }
      })
    });
  }
  private async handleAvatarChange(event: Event) {
    event.preventDefault();

    const input = event.target as HTMLInputElement;
    const avatar = input.files ? input?.files[0] : null;

    if (avatar) {
      const updatedChatAvatar = (await ChatsService.changeAvatar(avatar)) as {
        avatar: string;
      };
      this.children.chatAvatar.setProps({
        src: `https://ya-praktikum.tech/api/v2/resources${updatedChatAvatar.avatar}`
      });
    }
  }

  render(): HTMLElement {
    return this.compile(template, this.props);
  }
}

const withMessages = withStore(state => ({
  messages: state.activeChatMessages,
  chatId: state.currentChatId,
  currentAvatar: state.currentChatAvatar
}));

export const ChatWithStore = withMessages(Chat);
