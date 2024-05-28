import Block from '@core/Block.ts';
import { template } from '@/pages/Login/login.template.ts';
import './login.scss';
import { Button, Input } from '@/components';
import { router } from '@/index.ts';
import FormValidator from '@core/FormValidator.ts'

const validator = new FormValidator();

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
      }),

      passwordInput: new Input({
        class_name: 'input',
        name: 'password',
        type: 'password',
        placeholder: 'Пароль',
        id: 'password'
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

      for (const [field, value] of Object.entries(entries)) {
        const [isValid, message] = validator.validate(field, value as string);
        const errorField = document.querySelector(`#${field}`);
        if (!isValid) {

          errorField!.textContent = message

          console.log(`Ошибка валидации поля "${field}": ${message}`);
        } else {
          errorField!.textContent = ""
          console.log("Все поля валидны:", entries);
        }
      }
    }
    return 'Элмент формы не найден'
  }

  render(): HTMLElement {
    return this.compile(template, this.props);
  }
}


