// language=hbs

export const template = `
<section class='login__page'>
  <form class="login__form" id="profileForm"">
    <h2 class='login__title'>Регистрация</h2>
    {{{ emailInput }}}
    {{{ loginInput }}}
    {{{ firstNameInput }}}
    {{{ secondNameInput }}}
    {{{ phoneNumberInput }}}
    {{{ passwordInput }}}
    {{{ repeatPasswordInput }}}
    <div class="login__button-box">
        {{{ submitButton }}}
        {{{ linkToLogin }}}
    </div>
  </form>
</section>
`;
