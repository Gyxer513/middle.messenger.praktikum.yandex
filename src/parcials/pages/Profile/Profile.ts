// language=hbs

export default `
<section class='login__page'>
  <form class="login__form">
    <h2 class='login__title'>Вход</h2>
    {{> input class='input' placeholder='Логин' type='text'}}
    {{> input class='input' placeholder='Пароль' type='password' }}
    <div class="login__button-box">
      {{> button class='button button__main' text='Заоегистрироваться' type='submit' }}
      {{> button class='button button__transparent' text='Войти' type='button' onclick=''}}
    </div>
  </form>
</section>`;
