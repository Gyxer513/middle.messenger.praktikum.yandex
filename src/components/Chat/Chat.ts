import { template } from './chat.template.ts';
import './chat.scss';
import Block from '@core/Block.ts';
import { FormValidator } from '@core/FormValidator.ts';
import { Button } from '@/components';
import { withStore } from '@core/Store/withStore.ts';

const formValidator = new FormValidator();

interface IChatProps {
  submitButton?: Button;
  messages: Array<any>;
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

    dispatchComponentDidMount() {
        console.log(this.props)
    }
    componentDidUpdate(): boolean {
        console.log(this.props)
    }

    render(): HTMLElement {
        return this.compile(template, this.props);
    }
}

const withMessages = withStore((state) => ({
    messages: state.chats
}))

export const ChatWithStore = withMessages(Chat);

