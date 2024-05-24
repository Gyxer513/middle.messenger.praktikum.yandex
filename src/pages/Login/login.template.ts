export const template =  `
<section class='login__page'>
  <form class="login__form">
    <h2 class='login__title'>Вход</h2>
    {{{ Input class_name='input' placeholder='Логин' type='text' name='login' }}}
    {{{ Input class_name='input' placeholder='Пароль' type='password' name='password' }}}
    <div class="login__button-box">
        {{{ Button class_name='button button__main' text='Войти' type='submit' }}}
        {{{ Button class_name='button button__transparent' text='Зарегистрироваться' type='button' onclick='' }}}
    </div>
  </form>
</section>
`;