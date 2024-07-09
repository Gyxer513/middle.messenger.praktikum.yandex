// language=hbs

export const template = `
<section class='profile__page'>
    {{{ profileAvatar }}}
    <h2 class='login__title'>Иван</h2>
    <form class="profile__form" id="profileForm">
    {{> Input class='input_profile input_border' placeholder='Почта' type='text' name='email' value='ddd'disabled='true' }}
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
