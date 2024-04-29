// language=hbs

export default `
<section class='login__page'>
  <form class="login__form">
    <h2 class='login__title'>Вход</h2>
    {{> input class='input' placeholder='Логин' type='text' name='login'}}
    {{> input class='input' placeholder='Пароль' type='password' name='password' }}
    <div class="login__button-box">
        {{> button class='button button__main' text='Войти' type='submit' }}
        {{> button class='button button__transparent' text='Зарегистрироваться' type='button' onclick=''}}
    </div>
  </form>
</section>
`;
