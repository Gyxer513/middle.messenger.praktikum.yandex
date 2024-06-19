import './register.scss';
import Block from '@core/Block.ts';
import { FormValidator } from '@core/FormValidator.ts';
import { Button, Input, Link } from '@/components';
import { AuthService } from '@core/api/services';
import { template } from './register.template.ts';

const formHandler = new FormValidator();

interface IRegisterProps {
  emailInput?: Input;
  loginInput?: Input;
  firstNameInput?: Input;
  secondNameInput?: Input;
  phoneInput?: Input;
  passwordInput?: Input;
  repeatPasswordInput?: Input;
  submitButton?: Button;
}

export class Register extends Block {
  constructor(props: IRegisterProps) {
    super({
      ...props,
      emailInput: new Input({
        class_name: 'input',
        name: 'email',
        type: 'text',
        id: 'email',
        placeholder: 'E-mail'
      }),
      loginInput: new Input({
        class_name: 'input',
        type: 'text',
        name: 'login',
        id: 'login',
        placeholder: 'Логин'
      }),
      firstNameInput: new Input({
        class_name: 'input',
        type: 'text',
        name: 'first_name',
        id: 'first_name',
        placeholder: 'Имя'
      }),
      secondNameInput: new Input({
        class_name: 'input',
        type: 'text',
        name: 'second_name',
        id: 'second_name',
        placeholder: 'Фамилия'
      }),
      phoneNumberInput: new Input({
        class_name: 'input',
        type: 'text',
        name: 'phone',
        id: 'phone',
        placeholder: 'Телефон'
      }),
      passwordInput: new Input({
        class_name: 'input',
        name: 'password',
        type: 'password',
        placeholder: 'Новый пароль',
        id: 'password'
      }),

      repeatPasswordInput: new Input({
        class_name: 'input',
        name: 'repeat_password',
        type: 'text',
        placeholder: 'Повторите пароль',
        id: 'repeat_password'
      }),

      submitButton: new Button({
        id: 'submitButton',
        class_name: 'button button__main',
        text: 'Изменить данные',
        type: 'submit',
        onClick: (e: Event) => {
          e.preventDefault();
          const queryData = formHandler.handleSubmit('profileForm');
          if (queryData.isValid) {
            return AuthService.createUser(queryData.formData);
          }
        },
        submit: (e: Event) => {
          e.preventDefault();
          const queryData = formHandler.handleSubmit('profileForm');
          if (queryData.isValid) {
            return AuthService.createUser(queryData.formData);
          }
        }
      }),
      linkToLogin: new Link({
        path: '/login',
        text: 'Войти'
      })
    });
  }

  render(): HTMLElement {
    return this.compile(template, this.props);
  }
}
