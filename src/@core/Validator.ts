export default class Validator {
  private rules: { [key: string]: (value: string) => [boolean, string] } = {
    'login': this.validateLogin,
    'password': this.validatePassword,
    'phone': this.validatePhone,
    'email': this.validateEmail,
    'first_name': this.validateName,
    'second_name': this.validateName,
    'message': this.validateMessage
  };

  public validate(fieldName: string, value: string): [boolean, string] {
    // Общий метод валидации для работы снаружи.
    if (fieldName in this.rules) {
      return this.rules[fieldName](value);
    } else {
      throw new Error(`Не определено правило валидации для поля: ${fieldName}`);
    }
  }

  private validateEmail(value: string): [boolean, string] {
    // Удаляем пробелы в начале и конце строки
    const trimmedValue = value.trim();
    // Правило для email
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(trimmedValue)) {
      return [false, "Неверный формат электронной почты."];
    }
    return [true, "Email валиден."];
  }

  private validateName(value: string): [boolean, string] {
    // Правило для валидации: Имя должно начинаться с заглавной буквы, содержать только буквы латиницы или кириллицы и может включать дефис.
    if (!/^[A-ZА-Я][a-zа-яA-ZА-Я-]*$/.test(value)) {
      return [false, "Имя должно начинаться с заглавной буквы, содержать только буквы латиницы или кириллицы и может включать дефис."];
    }
    return [true, "Имя валидно."];
  }

  private validateLogin(value: string): [boolean, string] {
    // Правило для логина: минимум 5 символов, только буквы и цифры
    if (value.length < 5) {
      return [false, "Логин должен содержать минимум 5 символов."];
    }
    if (!/^[a-zA-Z0-9]+$/.test(value)) {
      return [false, "Логин может содержать только латинские буквы и цифры."];
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

  private validateMessage(value: string): [boolean, string] {
    if (value.trim().length === 0) {
      return [false, "Сообщение не должно быть пустым."];
    }
    return [true, "Сообщение валидно."];
  }

}


