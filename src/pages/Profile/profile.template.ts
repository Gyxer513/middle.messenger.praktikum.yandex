// language=hbs

export const template = `
<section class='profile__page'>
    {{{ profileAvatar }}}
    <h2 class='login__title'>Иван</h2>
  <form class="profile__form">
    {{{ emailInput }}}
    {{{ loginInput }}}
    {{{ firstNameInput }}}
    {{input class='input_profile input_border' placeholder='Фамилия' type='text' name='second_name' value='Пирожков'}}
    {{ input class='input_profile input_border' placeholder='Имя в чате' type='text' name='display_name' value='pirozhok'}}
    {{ input class='input_profile' placeholder='Телефон' type='text' name='phone' value='+ 7 999 99 99'}}
    <div class="profile__button-box">
      {{ button class='button button__transparent button__transparent_border' text='Изменить данные' type='submit'}}
      {{ button class='button button__transparent button__transparent_border' text='Изменить пароль' type='button'}}
      {{ button class='button button__transparent button__transparent_red' text='Выйти' type='button' }}
    </div>
  </form>
</section>`;