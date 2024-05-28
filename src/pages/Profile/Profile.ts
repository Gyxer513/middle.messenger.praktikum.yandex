import Block from '@core/Block.ts';
import { Avatar, Button, Input } from '@/components';
import { template } from './profile.template.ts';
import './profile.scss';
import '../../assets/images/avatar.jpg';
import { FormHandler } from '@core/FormValidator.ts';
import { router } from '@/index.ts';

 const formHandler = new FormHandler();

interface iProfileProps {
  profileAvatar?: Avatar;
  emailInput?: Input;
  loginInput?: Input;
  firstNameInput?: Input;
  secondNameInput?: Input;
  displayNameInput?: Input;
  phoneInput?: Input;
}

export class Profile extends Block {
  constructor(props: iProfileProps) {
    super({
      ...props,
      profileAvatar: new Avatar({
        class: 'avatar__container',
        src: 'https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png',
        alt: 'аватар'
      }),
      emailInput: new Input({
        class_name: 'input input_profile input_border',
        name: 'email',
        type: 'text',
        id: 'email',
        value: 'ivan-pirizjok@gmail.com',
        placeholder: 'E-mail',
        disabled: true
      }),
      loginInput: new Input({
        class_name: 'input input_profile input_border',
        type: 'text',
        name: 'login',
        id: 'login',
        placeholder: 'Логин',
        value: 'ivan336',
        disabled: true
      }),
      firstNameInput: new Input({
        class_name: 'input input_profile input_border',
        type: 'text',
        name: 'first_name',
        id: 'first_name',
        placeholder: 'Имя',
        value: 'Иван',
        disabled: true
      }),
      secondNameInput: new Input({
        class_name: 'input input_profile input_border',
        type: 'text',
        name: 'second_name',
        id: 'second_name',
        placeholder: 'Фамилия',
        value: 'Пирожков',
        disabled: true
      }),
      displayNameInput: new Input({
        class_name: 'input input_profile input_border',
        type: 'text',
        name: 'display_name',
        id: 'display_name',
        placeholder: 'Ник в чате',
        value: 'Piropzjok12',
        disabled: true
      }),
      phoneNumberInput: new Input({
        class_name: 'input input_profile input_border',
        type: 'text',
        name: 'phone',
        id: 'phone',
        placeholder: 'Телефон',
        value: '+7 999 123 55 13',
        disabled: true
      }),
      submitButton: new Button({
        id: 'submitButton',
        class_name: 'button button__main',
        text: 'Войти',
        type: 'submit',
        onClick: (e: Event) => {
          e.preventDefault();
         console.warn('click')
        },
        submit: (e: Event) => {
          e.preventDefault();
          formHandler.handleSubmit();
        }
      }),
      linkButton: new Button({
        id: 'linkButton',
        class_name: 'button button__main button__transparent',
        text: 'Изменить пароль',
        type: 'button',
        onClick: (e: Event) => {
          console.log(e.target);
          router.navigateTo('/change-password');
        }
      }),
      exitButton: new Button({
        id: 'exitButton',
        class_name: 'button button__transparent button__transparent_red',
        text: 'Выйти',
        type: 'button',
        onClick: (e: Event) => {
          console.log(e.target);
          console.warn(`exit`)
        }
      })
    });
  }


  render(): HTMLElement {
    return this.compile(template, this.props);
  }
}
