import Block from '@core/Block.ts';
import { Button, Input } from '@/components';
import { template } from './createChate.template.ts';
import './craeteChat.scss';
import { FormValidator } from '@core/FormValidator.ts';
import { ChatsService } from '@core/api/services';

const formHandler = new FormValidator();

export class CreateChat extends Block {
  constructor() {
    super({
      chatNameInput: new Input({
        class_name: 'input',
        name: 'title',
        type: 'text',
        placeholder: 'Название нового чата',
        id: 'title',
        disabled: false
      }),
      submitButton: new Button({
        id: 'submitButton',
        class_name: 'button button__main',
        text: 'Отправить',
        type: 'submit',
        onClick: (e: Event) => {
          e.preventDefault();
          const data = formHandler.handleSubmit('createChatForm');
          const queryData = data.formData as { title: string };
          if (data.isValid) {
            return ChatsService.createNewChat(queryData);
          }
        },
        submit: (e: Event) => {
          e.preventDefault();
          formHandler.handleSubmit('createChatForm');
        }
      })
    });
  }
  render(): HTMLElement {
    return this.compile(template, this.props);
  }
}
