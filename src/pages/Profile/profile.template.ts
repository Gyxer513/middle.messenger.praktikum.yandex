// language=hbs

export const template = `
<section class='profile__page'>
    {{{ profileAvatar }}}
    <h2 class='login__title'>Иван</h2>
  <form class="profile__form">
    {{{ emailInput }}}
    {{{ loginInput }}}
    {{{ firstNameInput }}}
    {{{  secondNameInput }}}
    {{{ displayNameInput }}}
    {{{ phoneNumberInput }}}
    <div class="profile__button-box">
      {{{ submitButton }}}
      {{{ linkButton }}}
      {{{ exitButton  }}}
    </div>
  </form>
</section>`;