import Block from '@core/Block.ts';
import './home.scss';
import { template } from './home.template.ts';
import { AuthService } from '@core/api/services';

export class Home extends Block {

    componentDidMount() {
        return AuthService.fetchUser()
    }


    render(): HTMLElement {
        return this.compile(template, this.props);
    }
}
