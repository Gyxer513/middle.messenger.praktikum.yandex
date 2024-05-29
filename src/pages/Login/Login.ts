import Block from '@core/Block.ts';
import { template } from '@/pages/Login/login.template.ts';
import './login.scss';
import { Button, Input } from '@/components';
import { router } from '@/index.ts';
import { FormValidator } from '@core/FormValidator.ts';

const formHandler = new FormValidator();

interface ILoginProps {
  loginInput?: Input;
  passwordInput?: Input;
  submitButton?: Button;
  linkButton?: Button;
  addEvents?: Function;
  navigateTo?: Function;
}

export class Login extends Block {
  constructor(props: ILoginProps) {
    super({
      ...props,
      loginInput: new Input({
        class_name: 'input',
        name: 'login',
        type: 'text',
        placeholder: 'Логин',
        id: 'login',
        disabled: false
      }),

      passwordInput: new Input({
        class_name: 'input',
        name: 'password',
        type: 'password',
        placeholder: 'Пароль',
        id: 'password',
        disabled: false
      }),

      submitButton: new Button({
        id: 'submitButton',
        class_name: 'button button__main',
        text: 'Войти',
        type: 'submit',
        onClick: (e: Event) => {
          e.preventDefault();
          formHandler.handleSubmit('loginForm');
        },
        submit: (e: Event) => {
          e.preventDefault();
          formHandler.handleSubmit('loginForm');
        }
      }),

      linkButton: new Button({
        id: 'linkButton',
        class_name: 'button button__main button__transparent',
        text: 'Зарегистрироваться',
        type: 'button',
        onClick: (e: Event) => {
          console.log(e.target);
          router.navigateTo('/');
        }
      })
    });
  }

  render(): HTMLElement {
    return this.compile(template, this.props);
  }
}
