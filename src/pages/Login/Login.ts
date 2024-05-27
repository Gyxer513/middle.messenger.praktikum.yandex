import Block from '@core/Block.ts';
import { template } from '@/pages/Login/login.template.ts';
import './login.scss';
import { Button, Input } from '@/components';

interface ILoginProps {
  loginInput?: Input;
  passwordInput?: Input;
  submitButton?: Button;
  linkButton?: Button;
  addEvents?: Function;
  loginError?: string;
  passwordError?: string;
}

export class Login extends Block {
  constructor(props: ILoginProps) {
    super({
      ...props,
      loginInput: new Input({
        class_name: 'input',
        name: 'login',
        type: 'text',
        placeholder: 'Логин'
      }),

      passwordInput: new Input({
        class_name: 'input',
        name: 'password',
        type: 'password',
        placeholder: 'Пароль'
      }),

      submitButton: new Button({
        id: 'submitButton',
        class_name: 'button button__main',
        text: 'Войти',
        type: 'submit',
      }),

      linkButton: new Button({
        id: 'linkButton',
        class_name: 'button button__main button__transparent',
        text: 'Зарегистрироваться',
        type: 'button',
      }),
      events: {
        click: (e: Event) => this.checkForm(e),
      },
    });
  }

  checkForm = (e: Event) => {
    e.preventDefault();
    console.log(e);

    // @ts-ignore
    const values = Object.fromEntries(new FormData(e.target));
    console.log(values);

  }

  render(): HTMLElement {
    return this.compile(template, this.props);
  }
}


