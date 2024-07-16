// language=hbs

export const template = `
<section class='profile__page'>
    {{{ profileAvatar }}}
    <h2 class='login__title'>{{ title }}</h2>
    <form class="profile__form" id="profileForm">
    {{{ emailInput }}}
    {{{ loginInput }}}
    {{{ firstNameInput }}}
    {{{  secondNameInput }}}
    {{{ displayNameInput }}}
    {{{ phoneNumberInput }}}
      {{{ submitButton }}}
    <div class="profile__button-box">
      {{{ linkToChangePass }}}
      {{{ exitButton  }}}
    </div>
  </form>
</section>`;
