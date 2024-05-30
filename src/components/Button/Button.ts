import { template } from '@/components/Button/button.template.ts';
import Block from '@core/Block.ts';
import './button.scss';

type TButtonProps = {
  id: string;
  class_name: string;
  type: string;
  disabled?: boolean;
  text: string;
  onClick?: (e: Event) => void;
  submit?: (e: Event) => void;
};

export class Button extends Block {
    constructor({
        id,
        text,
        // eslint-disable-next-line no-use-before-define
        class_name,
        type = 'submit',
        onClick,
        submit,
    }: TButtonProps) {
        super({
            id,
            text,
            // eslint-disable-next-line no-use-before-define
            class_name,
            type,
            events: {
                click: onClick,
                submit,
            },
        });
    }

    render(): HTMLElement {
        return this.compile(template, this.props);
    }
}
