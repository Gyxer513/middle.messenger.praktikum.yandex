import Block from '@core/Block.ts';
import { template } from '@/pages/Login/login.template.ts';
import './login.scss';
import { Button, Input } from '@/components';
import { router } from '@/index.ts';

interface ILoginProps {
  loginInput?: Input;
  passwordInput?: Input;
  submitButton?: Button;
  linkButton?: Button;
  addEvents?: Function;
  loginError?: string;
  passwordError?: string;
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
        onClick: (e: Event) =>  {
          e.preventDefault()
          this.handleSubmit();
        },
        submit: (e: Event) => {
          e.preventDefault();
          this.handleSubmit();
        }
      }),

      linkButton: new Button({
        id: 'linkButton',
        class_name: 'button button__main button__transparent',
        text: 'Зарегистрироваться',
        type: 'button',
        onClick: (e: Event) =>  {
          console.log(e.target)
          router.navigateTo('/')
        },
      }),
    });
  }

  handleSubmit(): void | string{

    const form = document.querySelector('#loginForm')

    if (form) {
      const formData = new FormData(form as HTMLFormElement);
      const entries = Object.fromEntries(formData.entries());

      console.log(entries);

    }
    return 'Элмент формы не найден'
  }

  render(): HTMLElement {
    return this.compile(template, this.props);
  }
}


