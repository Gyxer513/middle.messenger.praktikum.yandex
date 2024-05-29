import './changePass.scss';
import Block from '@core/Block.ts';
import { template } from './changePass.template.ts';
import { Avatar, Button, Input } from '@/components';
import { FormValidator } from '@core/FormValidator.ts';

interface IChangePassProps {
  profileAvatar?: Avatar
  oldPasswordInput?: Input;
  passwordInput?: Input;
  repeatPasswordInput?: Input;
  submitButton?: Button;
}

const formHandler = new FormValidator();

export class ChangePass extends Block {
  constructor(props: IChangePassProps) {
    super({
      ...props,
      profileAvatar: new Avatar({
        class: 'avatar__container',
        src: 'https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png',
        alt: 'аватар'
      }),
      oldPasswordInput: new Input({
        class_name: 'input',
        name: 'old_password',
        type: 'text',
        placeholder: 'Введите старый пароль',
        id: 'old_password',
        disabled: false
      }),

      passwordInput: new Input({
        class_name: 'input',
        name: 'password',
        type: 'password',
        placeholder: 'Новый пароль',
        id: 'password',
        disabled: false
      }),

      repeatPasswordInput: new Input({
        class_name: 'input',
        name: 'repeat_password',
        type: 'text',
        placeholder: 'Повторите пароль',
        id: 'repeat_password',
        disabled: false
      }),

      submitButton: new Button({
        id: 'submitButton',
        class_name: 'button button__main',
        text: 'Сохранить',
        type: 'submit',
        onClick: (e: Event) => {
          e.preventDefault();
          formHandler.handleSubmit('passwordForm');
        },
        submit: (e: Event) => {
          e.preventDefault();
          formHandler.handleSubmit('passwordForm');
        }
      }),
    });
  }

  render(): HTMLElement {
    return this.compile(template, this.props);
  }
}
