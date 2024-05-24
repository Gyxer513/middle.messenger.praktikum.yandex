import Block from '@core/Block.ts';
import { template } from '@/pages/Login/login.template.ts';
import './login.scss';
import { registerComponent } from '@core/RegisterComponent.ts';
import { Button, Input } from '@/components';

registerComponent(Input, 'Input');
registerComponent(Button, 'Button')

export class Login extends Block<Object> {
  protected render(): string {
    return template;
  }
}



