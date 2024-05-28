import Block from '@core/Block.ts';
import { template } from '@/components/Button/button.template.ts';
import './button.scss';

type TButtonProps = {
  id: string;
  class_name: string;
  type: string;
  disabled?: boolean;
  text: string;
  click?: (e: Event) => void;
  submit?: (e: Event) => void;
};

export class Button extends Block {
  constructor({
    id,
    text,
    class_name,
    type = 'submit',
    click,
    submit
  }: TButtonProps) {
    super({
      id,
      text,
      class_name,
      type,
      events: {
        //@ts-ignore
        click: click,
        submit: submit,
      }
    });
  }

  render(): HTMLElement {
    return this.compile(template, this.props);
  }
}
