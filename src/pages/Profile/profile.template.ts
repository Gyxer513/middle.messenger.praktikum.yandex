// language=hbs

export const template = `
<section class='profile__page'>
    {{{ profileAvatar }}}
    <h2 class='login__title'>Иван</h2>
    <form class="profile__form" id="profileForm">
    {{{ emailInput }}}
    {{{ loginInput }}}
    {{{ firstNameInput }}}
    {{{  secondNameInput }}}
    {{{ displayNameInput }}}
    {{{ phoneNumberInput }}}
      {{{ submitButton }}}
    <div class="profile__button-box">
      {{{ linkButton }}}
      {{{ exitButton  }}}
    </div>
  </form>
</section>`;