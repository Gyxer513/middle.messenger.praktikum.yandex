import Block from '@core/Block.ts';
import { Avatar, Input } from '@/components';
import { template } from './profile.template.ts';
import './profile.scss'
import '../../assets/images/avatar.jpg'

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
        disabled: true,
      }),
      firstNameInput: new Input({
        class_name:'input input_profile input_border',
        type: 'text',
        name: 'first_name',
        id: 'first_name',
        placeholder: 'Имя',
        value:'Иван',
        disabled: true,
      }),
      loginInput: new Input({
        class_name:'input input_profile input_border',
        type: 'text',
        name: 'login' ,
        id: 'login',
        placeholder: 'Логин',
        value:'ivan336',
        disabled: true,
      })
    })
  }

  render(): HTMLElement {
    return this.compile(template, this.props);
  }
}

