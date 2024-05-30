import './register.scss';
import { router } from '@/index.ts';
import Block from '@core/Block.ts';
import { FormValidator } from '@core/FormValidator.ts';
import { Button, Input } from '@/components';

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
                placeholder: 'E-mail',
            }),
            loginInput: new Input({
                class_name: 'input',
                type: 'text',
                name: 'login',
                id: 'login',
                placeholder: 'Логин',
            }),
            firstNameInput: new Input({
                class_name: 'input',
                type: 'text',
                name: 'first_name',
                id: 'first_name',
                placeholder: 'Имя',
            }),
            secondNameInput: new Input({
                class_name: 'input',
                type: 'text',
                name: 'second_name',
                id: 'second_name',
                placeholder: 'Фамилия',
            }),
            phoneNumberInput: new Input({
                class_name: 'input',
                type: 'text',
                name: 'phone',
                id: 'phone',
                placeholder: 'Телефон',
            }),
            passwordInput: new Input({
                class_name: 'input',
                name: 'password',
                type: 'password',
                placeholder: 'Новый пароль',
                id: 'password',
            }),

            repeatPasswordInput: new Input({
                class_name: 'input',
                name: 'repeat_password',
                type: 'text',
                placeholder: 'Повторите пароль',
                id: 'repeat_password',
            }),

            submitButton: new Button({
                id: 'submitButton',
                class_name: 'button button__main',
                text: 'Изменить данные',
                type: 'submit',
                onClick: (e: Event) => {
                    e.preventDefault();
                    formHandler.handleSubmit('profileForm');
                },
                submit: (e: Event) => {
                    e.preventDefault();
                    formHandler.handleSubmit('profileForm');
                },
            }),
            linkButton: new Button({
                id: 'linkButton',
                class_name: 'button button__main button__transparent',
                text: 'Войти',
                type: 'button',
                onClick: (e: Event) => {
                    console.log(e.target);
                    router.navigateTo('/login');
                },
            }),
        });
    }

    render(): HTMLElement {
        return this.compile(template, this.props);
    }
}
