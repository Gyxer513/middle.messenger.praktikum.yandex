import { template } from '@/pages/Login/login.template.ts';
import Block from '@core/Block.ts';
import './login.scss';
import { FormValidator } from '@core/FormValidator.ts';
import { Button, Input, Link } from '@/components';
import { AuthService } from '@core/api/services';
import { router } from '@/index.ts';

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
          return this._sendLoginData();
        },
        submit: (e: Event) => {
          e.preventDefault();
          return this._sendLoginData();
        }
      }),

      linkToRegister: new Link({
        path: '/sign-up',
        text: 'Регистрация'
      })
    });
  }

  private _sendLoginData() {
    formHandler.handleSubmit('loginForm');
    const data = formHandler.handleSubmit('loginForm');
    const queryData = data.formData as any;
    if (data.isValid) {
      return AuthService.login(queryData);
    }
  }

  componentDidMount() {
    if (router.getAuthenticatedStatus()) {
      router.navigateTo('/chats');
    }
  }

  render(): HTMLElement {
    return this.compile(template, this.props);
  }
}
