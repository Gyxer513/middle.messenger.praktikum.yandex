import './changePass.scss';
import Block from '@core/Block.ts';
import { FormValidator } from '@core/FormValidator.ts';
import { AuthService } from '@core/api/services';
import { router } from '@/index.ts';
import { withUserStore } from '@/pages/ChangeProfile/ChangeProfile.ts';
import { TUserData, UserService } from '@core/api/services/user.ts';
import { template } from './changePass.template.ts';
import { UserAvatar, Button, Input } from '@/components';

type TChangePassData = {
  old_password: string;
  password: string;
};

interface IChangePassProps {
  profileAvatar?: typeof UserAvatar;
  oldPasswordInput?: Input;
  passwordInput?: Input;
  repeatPasswordInput?: Input;
  submitButton?: Button;
  userData?: {
    avatar?: string;
  };
}

const formHandler = new FormValidator();

export class ChangePass extends Block {
    constructor(props: IChangePassProps) {
        super({
            ...props,
            profileAvatar: new UserAvatar({
                class: 'avatar__container',
                src:
          `https://ya-praktikum.tech/api/v2/resources${props.userData?.avatar}`
          || '',
                alt: 'аватар',
                size: 'medium',
                events: {
                    change: (event: Event) => this.handleAvatarChange(event),
                },
            }),
            oldPasswordInput: new Input({
                class_name: 'input',
                name: 'old_password',
                type: 'text',
                placeholder: 'Введите старый пароль',
                id: 'old_password',
                disabled: false,
            }),

            passwordInput: new Input({
                class_name: 'input',
                name: 'password',
                type: 'password',
                placeholder: 'Новый пароль',
                id: 'password',
                disabled: false,
            }),

            repeatPasswordInput: new Input({
                class_name: 'input',
                name: 'repeat_password',
                type: 'text',
                placeholder: 'Повторите пароль',
                id: 'repeat_password',
                disabled: false,
            }),

            submitButton: new Button({
                id: 'submitButton',
                class_name: 'button button__main',
                text: 'Сохранить',
                type: 'submit',
                onClick: (e: Event) => {
                    e.preventDefault();
                    const data = formHandler.handleSubmit('passwordForm');
                    const queryData = data.formData as TChangePassData;
                    if (data.isValid) {
                        return UserService.changePass({
                            oldPassword: queryData?.old_password,
                            newPassword: queryData?.password,
                        });
                    }
                    return 'Ok';
                },
                submit: (e: Event) => {
                    e.preventDefault();
                    formHandler.handleSubmit('passwordForm');
                },
            }),
        });
    }

    async componentDidMount() {
        await AuthService.fetchUser();
        if (!router.getAuthenticatedStatus()) {
            router.navigateTo('/');
        }
        this.updateChildProps(this.props.userData);
    }

    updateChildProps(userData: TUserData) {
        if (userData) {
            this.children.profileAvatar.setProps({
                src: `https://ya-praktikum.tech/api/v2/resources${userData.avatar}`,
            });
        }
    }

    private async handleAvatarChange(event: Event) {
        event.preventDefault();

        const input = event.target as HTMLInputElement;
        const avatar = input.files ? input?.files[0] : null;

        if (avatar) {
            const updatedUserData = (await UserService.changeAvatar(avatar)) as {
        avatar: string;
      };
            this.children.profileAvatar.setProps({
                src: `https://ya-praktikum.tech/api/v2/resources${updatedUserData.avatar}`,
            });
        }
    }

    render(): HTMLElement {
        return this.compile(template, this.props);
    }
}

export const ChangePassWithStore = withUserStore(ChangePass);
