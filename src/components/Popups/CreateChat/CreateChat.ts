import Block from '@core/Block.ts';
import { Button, Input } from '@/components';
import { template } from './createChate.template.ts';
import './craeteChat.scss'
import { FormValidator } from '@core/FormValidator.ts';
import { ChatsService } from '@core/api/services';

interface ICreateChatProps {
  chatNameInput: Input;
  sendChatNameButton: Button;
}

const formHandler = new FormValidator();

export class CreateChat extends Block {
constructor(props: ICreateChatProps) {
  super({...props,
    chatNameInput: new Input({
      class_name: 'input',
      name: 'title',
      type: 'text',
      placeholder: 'Название чнового чата',
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
        const queryData = formHandler.handleSubmit('createChatForm');
        if (queryData.isValid) {
          return ChatsService.createNewChat(queryData.formData)
        }
      },
      submit: (e: Event) => {
        e.preventDefault();
        formHandler.handleSubmit('createChatForm');
      }
    }),
  });
}
  render(): HTMLElement {
    return this.compile(template, this.props);
  }
}