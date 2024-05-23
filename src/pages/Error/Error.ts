import Block from '@core/Block.ts';
import './error.scss'
import { template } from './error.template.ts';

type TErrorProps = {
  text: string;
  error_status: number;
};

export class Error extends Block<Object> {

  constructor({text, error_status}: TErrorProps) {
    super({text, error_status});
  }

  protected render(): string {
    return template;
  }
}