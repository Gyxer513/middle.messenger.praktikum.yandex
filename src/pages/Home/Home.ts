import Block from '@core/Block.ts';
import './home.scss';
import { template } from './home.template.ts';
import { AuthService } from '@core/api/services';
import { Link } from '@/components';

export class Home extends Block {
    constructor() {
        super({
            linkToLogin: new Link({
                path: '/login',
                text: 'Вход'
            }),
            linkToRegister: new Link({
                path: '/login',
                text: 'Регистрация'
            }),
            linkToSettings: new Link({
                path: '/Settings',
                text: 'Изменить профиль'
            }),
            linkToChangePass: new Link({
                path: '/change-password',
                text: 'Поменять пароль'
            }),
            linkToChats: new Link({
                path: '/chats',
                text: 'Чаты'
            }),
            linkToError500: new Link({
                path: '/500',
                text: 'Ошибка 500'
            }),
            linkToError404: new Link({
                path: '/404',
                text: 'Ошибака 404'
            })
        });
    }

    componentDidMount() {
        return AuthService.fetchUser()
    }


    render(): HTMLElement {
        return this.compile(template, this.props);
    }
}
