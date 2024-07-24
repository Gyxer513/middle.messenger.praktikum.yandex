import { template } from './chat.template.ts';

import './chat.scss';
import Block from '@core/Block.ts';
import { FormValidator } from '@core/FormValidator.ts';
import { Button } from '@/components';

const formValidator = new FormValidator();

interface IChatProps {
  submitButton?: Button;
}

export class Chat extends Block {
    constructor(props: IChatProps) {
        super({
            ...props,
            submitButton: new Button({
                id: 'submitButton',
                class_name: 'chat__send-button',
                text: 'Go',
                type: 'submit',
                onClick: (e: Event) => {
                    e.preventDefault();
                    formValidator.handleSubmit('chatForm');
                },
                submit: (e: Event) => {
                    e.preventDefault();
                    formValidator.handleSubmit('chatForm');
                },
            }),
        });
    }

    render(): HTMLElement {
        return this.compile(template, this.props);
    }
}


