export const template =  `
<section class='login__page'>
  <form class="login__form">
    <h2 class='login__title'>Вход</h2>
    {{{ loginInput }}}
    {{{ passwordInput }}}
    <div class="login__button-box">
        {{{ submitButton }}}
        {{{ linkButton }}}
    </div>
  </form>
</section>
`;