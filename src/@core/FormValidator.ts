import Validator from '@core/Validator.ts';

interface IResult {
  isError: boolean;
  isValid: boolean;
  formData:
    | Record<string, string | number | string[]>
    | string
    | number
    | string[];
  errorMessage: string;
}

export class FormValidator {
  private validator = new Validator();

  public handleInputChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const fieldName = target.name;
    const { value } = target;
    const errorSpan = document.querySelector(
      `#${fieldName}_error`
    ) as HTMLElement;

    const [isValid, message] = this.validator.validate(fieldName, value);
    if (!isValid) {
      errorSpan.textContent = message;
    } else {
      errorSpan.textContent = '';
    }
  }

  public handleSubmit(formId: string): IResult {
    const form = document.querySelector(`#${formId}`);

    if (form) {
      const formData = new FormData(form as HTMLFormElement);
      const entries = Object.fromEntries(formData.entries());
      const result: { [key: string]: string | string[] } = {};
      const errors: { [key: string]: string } = {};

      for (const [field, value] of Object.entries(entries)) {
        const [isValid, message] = this.validator.validate(
          field,
          value as string
        );
        const errorField = document.querySelector(`#${field}_error`);

        if (!isValid) {
          errorField!.textContent = message;
          errors[field] = message;
        } else {
          errorField!.textContent = '';
          result[field] = value as string;
        }
      }
      if (Object.keys(errors).length > 0) {
        // Возвращаем ошибки валидации
        return {
          isError: false,
          isValid: false,
          formData: errors,
          errorMessage: ''
        } as IResult;
      } else {
        // Возвращаем валидную форму
        return {
          isError: false,
          isValid: true,
          formData: result,
          errorMessage: ''
        } as IResult;
      }
    } else {
      // Возвращаем ошибку
      return {
        isError: false,
        isValid: true,
        formData: {},
        errorMessage: 'Элемент формы не найден'
      };
    }
  }

  public validateFieldById(id: string, ruleName: string): void {
    const input = document.getElementById(id) as HTMLInputElement;
    const errorSpan = document.querySelector(`#${id}_error`) as HTMLElement;

    if (input) {
      const { value } = input;
      const [isValid, message] = this.validator.validate(ruleName, value);

      if (!isValid) {
        errorSpan.textContent = message;
      } else {
        errorSpan.textContent = '';
      }
    } else {
      console.error(`Элемент с id "${id}" не найден.`);
    }
  }
}
