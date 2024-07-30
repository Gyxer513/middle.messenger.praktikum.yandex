import Block from '@core/Block.ts';
import { Avatar, Button, Input, Link } from '@/components';
import { template } from './changeProfile.template.ts';
import './changeProfile.scss';
import { FormValidator } from '@core/FormValidator.ts';
import { AuthService } from '@core/api/services';
import { withStore } from '@core/Store/withStore.ts';
import { router } from '@/index.ts';
import { UserService } from '@core/api/services/user.ts';

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
  name: string;
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
class ChangeProfile extends Block {
  constructor(props: iProfileProps) {
    super({
      ...props,
      title: props.userData?.first_name,
      profileAvatar: new Avatar({
        class: 'avatar__container',
        src:
          `https://ya-praktikum.tech/api/v2/resources${props.userData?.avatar}` ||
          '',
        alt: 'аватар',
        events: {
          change: (event: Event) => this.handleAvatarChange(event)
        }
      }),
      emailInput: new Input({
        class_name: 'input input_profile input_border',
        name: 'email',
        type: 'text',
        id: 'email',
        value: props.userData?.email,
        placeholder: 'E-mail'
      }),
      loginInput: new Input({
        class_name: 'input input_profile input_border',
        type: 'text',
        name: 'login',
        id: 'login',
        placeholder: 'Логин',
        value: props.userData?.login
      }),
      firstNameInput: new Input({
        class_name: 'input input_profile input_border',
        type: 'text',
        name: 'first_name',
        id: 'first_name',
        placeholder: 'Имя',
        value: props.userData?.first_name
      }),
      secondNameInput: new Input({
        class_name: 'input input_profile input_border',
        type: 'text',
        name: 'second_name',
        id: 'second_name',
        placeholder: 'Фамилия',
        value: props.userData?.second_name,
        disabled: props.disabledInput
      }),
      displayNameInput: new Input({
        class_name: 'input input_profile input_border',
        type: 'text',
        name: 'display_name',
        id: 'display_name',
        placeholder: 'Ник в чате',
        value: props.userData?.display_name
      }),
      phoneNumberInput: new Input({
        class_name: 'input input_profile input_border',
        type: 'text',
        name: 'phone',
        id: 'phone',
        placeholder: 'Телефон',
        value: props.userData?.phone
      }),

      // Кнопки

      submitButton: new Button({
        id: 'submitButton',
        class_name: 'button button__main',
        text: 'Изменить данные',
        type: 'submit',
        onClick: (e: Event) => {
          e.preventDefault();
          const formValues = formHandler.handleSubmit('profileForm');
          if (formValues.isValid) {
            return UserService.updateUserData(formValues.formData);
          }
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
          e.preventDefault();
          return AuthService.logout();
        }
      })
    });
  }

  async componentDidMount() {
    await AuthService.fetchUser();
    if (!router.getAuthenticatedStatus()) {
      router.navigateTo('/');
    }
    this.updateChildProps(this.props.userData);
  }

  updateChildProps(userData: iProfileProps['userData']) {
    if (userData) {
      this.children.emailInput.setProps({ value: userData.email });
      this.children.loginInput.setProps({ value: userData.login });
      this.children.firstNameInput.setProps({ value: userData.first_name });
      this.children.secondNameInput.setProps({ value: userData.second_name });
      this.children.displayNameInput.setProps({ value: userData.display_name });
      this.children.phoneNumberInput.setProps({ value: userData.phone });
      this.children.profileAvatar.setProps({
        src: `https://ya-praktikum.tech/api/v2/resources${userData.avatar}`
      });
      this.setProps({ title: userData.first_name });
    }
  }

  async handleAvatarChange(event: Event) {
    event.preventDefault();

    const input = event.target as HTMLInputElement;
    const avatar = input.files ? input?.files[0] : null;

    if (avatar) {
      const updatedUserData = (await UserService.changeAvatar(avatar)) as any;
      this.children.profileAvatar.setProps({
        src: `https://ya-praktikum.tech/api/v2/resources${updatedUserData?.avatar}`
      });
    }
  }

  render(): HTMLElement {
    return this.compile(template, { ...this.props });
  }
}

export const withUserStore = withStore(state => ({
  userData: { ...state.userData }
}));

export const ProfileWithStore = withUserStore(ChangeProfile);
