export default class FormValidator {
  private rules: { [key: string]: (value: string) => [boolean, string] } = {
    'login': this.validateLogin,
    'password': this.validatePassword,
    'phone': this.validatePhone
  };

  validate(fieldName: string, value: string): [boolean, string] {
    if (fieldName in this.rules) {
      return this.rules[fieldName](value);
    } else {
      throw new Error(`Не определено правило валидации для поля: ${fieldName}`);
    }
  }

  private validateLogin(value: string): [boolean, string] {
    // Правило для логина: минимум 5 символов, только буквы и цифры
    if (value.length < 5) {
      return [false, "Логин должен содержать минимум 5 символов."];
    }
    if (!/^[a-zA-Z0-9]+$/.test(value)) {
      return [false, "Логин может содержать только буквы и цифры."];
    }
    return [true, "Логин валиден."];
  }

  private validatePassword(value: string): [boolean, string] {
    // Правило для пароля: минимум 8 символов, минимум одна цифра и одна буква
    if (value.length < 8) {
      return [false, "Пароль должен содержать минимум 8 символов."];
    }
    if (!/\d/.test(value)) {
      return [false, "Пароль должен содержать как минимум одну цифру."];
    }
    if (!/[a-zA-Z]/.test(value)) {
      return [false, "Пароль должен содержать как минимум одну букву."];
    }
    return [true, "Пароль валиден."];
  }

  private validatePhone(value: string): [boolean, string] {
    // Правило для телефона +79999999999, принимает занчения с пробелоами (например +7 985 123 12 16)
    const sanitizedValue = value.replace(/\s+/g, ''); // Удаляем пробелы
    if (!/^\+7\d{10}$/.test(sanitizedValue)) {
      return [false, "Телефон должен быть в формате +79999999999."];
    }
    return [true, "Телефон валиден."];
  }

}

export class FormHandler {
  private validator = new FormValidator();

  handleSubmit(): void | string {
    const form = document.querySelector('#loginForm');

    if (form) {
      const formData = new FormData(form as HTMLFormElement);
      const entries = Object.fromEntries(formData.entries());

      for (const [field, value] of Object.entries(entries)) {
        const [isValid, message] = this.validator.validate(field, value as string);
        const errorField = document.querySelector(`#${field}`);
        if (!isValid) {
          errorField!.textContent = message;

          console.log(`Ошибка валидации поля "${field}": ${message}`);
        } else {
          errorField!.textContent = '';
          console.log('Все поля валидны:', entries);
        }
      }

      console.log("Все поля валидны:", entries);
    } else {
      return 'Элемент формы не найден';
    }
  }
}
