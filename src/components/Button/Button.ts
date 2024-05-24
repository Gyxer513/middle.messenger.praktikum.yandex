import Block from '@core/Block.ts';
import { template } from '@/components/Button/button.template.ts';
import './button.scss'

type TButtonProps = {
  class_name:string;
  type: string;
  disabled?: boolean;
  onClick?: () => void;
  onSubmit?: () => void;
  text: string;
}

export class Button extends Block<object> {

  constructor({ class_name, type, disabled = false, text, onClick, onSubmit }: TButtonProps) {
    super({ class_name, type, disabled, text, events: { onClick, onSubmit } });
  }

  protected render(): string {
    return template;
  }

}

