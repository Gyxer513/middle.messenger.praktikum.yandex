import Block, { Props } from '@core/Block.ts';
import { Avatar, Button, Input, Link } from '@/components';
import { template } from './profile.template.ts';
import './profile.scss';
import { FormValidator } from '@core/FormValidator.ts';
import { AuthService } from '@core/api/services';
import { withStore } from '@core/Store/withStore.ts';
import { router } from '@/index.ts';

const formHandler = new FormValidator();

interface iProfileProps {
  profileAvatar?: Avatar;
  emailInput?: Input;
  loginInput?: Input;
  firstNameInput?: Input;
  secondNameInput?: Input;
  displayNameInput?: Input;
  phoneInput?: Input;
  disabledInput?: boolean;
  submitButton?: Button;
  linkButton?: Button;
  exitButton?: Button;
  userData?: {
    email?: string;
    login?: string;
    first_name?: string;
    second_name?: string;
    display_name?: string;
    phone?: string;
    avatar?: string;
  };
}
class Profile extends Block {
  constructor(props: iProfileProps) {
    super({
      ...props,
      profileAvatar: new Avatar({
        class: 'avatar__container',
        src: `https://ya-praktikum.tech/api/v2/resources${props.userData.avatar}`,
        alt:'аватар'
      }),
      emailInput: new Input({
        class_name: 'input input_profile input_border',
        name: 'email',
        type: 'text',
        id: 'email',
        value: 'ivan-pirizjok@gmail.com',
        placeholder: 'E-mail'
      }),
      loginInput: new Input({
        class_name: 'input input_profile input_border',
        type: 'text',
        name: 'login',
        id: 'login',
        placeholder: 'Логин',
        value: 'ivan336'
      }),
      firstNameInput: new Input({
        class_name: 'input input_profile input_border',
        type: 'text',
        name: 'first_name',
        id: 'first_name',
        placeholder: 'Имя',
        value: 'Иван'
      }),
      secondNameInput: new Input({
        class_name: 'input input_profile input_border',
        type: 'text',
        name: 'second_name',
        id: 'second_name',
        placeholder: 'Фамилия',
        value: 'Пирожков',
        disabled: props.disabledInput
      }),
      displayNameInput: new Input({
        class_name: 'input input_profile input_border',
        type: 'text',
        name: 'message',
        id: 'message',
        placeholder: 'Ник в чате',
        value: 'Pirojok12'
      }),
      phoneNumberInput: new Input({
        class_name: 'input input_profile input_border',
        type: 'text',
        name: 'phone',
        id: 'phone',
        placeholder: 'Телефон',
        value: '+7 999 123 55 13'
      }),

      // Кнопки

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
        }
      }),
      linkToChangePass: new Link({
        path: '/change-password',
        text: 'Изменить пароль'
      }),
      exitButton: new Button({
        id: 'exitButton',
        class_name: 'button button__transparent button__transparent_red',
        text: 'Выйти',
        type: 'button',
        onClick: (e: Event) => {
          return AuthService.logout();
        }
      })
    });
  }

  componentDidMount= async () => {
    if (!router.getAuthenticatedStatus()) {
      router.navigateTo('/')
    }
  }

  protected componentDidUpdate(oldProps: Props, newProps: iProfileProps): boolean {
    this.children.profileAvatar.setProps({...oldProps, newProps})
  }

  render(): HTMLElement {
    return this.compile(template, {...this.props});
  }
}

const withUserStore = withStore(state => ({ userData: { ...state.userData } }));

export const ProfileWithStore = withUserStore(Profile)
