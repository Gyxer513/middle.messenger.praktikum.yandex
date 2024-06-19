import Block from '@core/Block.ts';
import { template } from './link.template.ts';
import './link.scss';
import { router } from '@/index.ts';

interface ILinkProps {
  path: string;
  text: string;
  onClick?: (e: Event) => void;
  isPrivate?: boolean;
}

export class Link extends Block {
    constructor({ path, text, isPrivate = false }: ILinkProps) {
        super({
            path,
            text,
            events: {
                click: (e: Event) => {
                  e.preventDefault();
                  router.navigateTo(path, isPrivate)
                }
            },
        });
    }

    render(): HTMLElement {
        return this.compile(template, this.props);
    }
}
