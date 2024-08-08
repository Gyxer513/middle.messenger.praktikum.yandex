import Block from '@core/Block.ts';
import { template } from './loader.template.ts';
import './loader.scss';

export class Loader extends Block {
    constructor() {
        super({});
    }

    render(): HTMLElement {
        return this.compile(template, this.props);
    }
}
