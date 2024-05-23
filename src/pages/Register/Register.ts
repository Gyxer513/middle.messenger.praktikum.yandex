// language=hbs

export default `
<section class='login__page'>
  <form class="login__form">
    <h2 class='login__title'>Регистрация</h2>
    {{> input class='input' placeholder='Почта' type='text' name='email'}}
    {{> input class='input' placeholder='Логин' type='text' name='login'}}
    {{> input class='input' placeholder='Имя' type='text' name='first_name'}}
    {{> input class='input' placeholder='Фамилия' type='text' name='second_name'}}
    {{> input class='input' placeholder='Телефон' type='text' name='phone'}}
    {{> input class='input input_error' placeholder='Пароль' type='password' error-text="ошибка" name='password'}}
    {{> input class='input input_error' placeholder='Пароль (еще раз)' type='password' error-text="ошибка, пароли не совпадают" name='repeat-pass'}}
    <div class="login__button-box">
      {{> button class='button button__main' text='Заоегистрироваться' type='submit' }}
      {{> button class='button button__transparent' text='Войти' type='button' onclick=''}}
    </div>
  </form>
</section>
`;

