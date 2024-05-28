export default class FormValidator {
  private rules: { [key: string]: (value: string) => [boolean, string] } = {
    'login': this.validateLogin,
    'password': this.validatePassword
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
}
