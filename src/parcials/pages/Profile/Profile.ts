// language=hbs

export default `
<section class='profile__page'>
    {{> avatar class='avatar__container' src='../../../assets/images/avatar.jpg' alt='аватар' }}
    <h2 class='login__title'>Иван</h2>
  <form class="profile__form">
    {{> input class='input_profile input_border' placeholder='Почта' type='text' name='email' value='email' disabled='true'}}
    {{> input class='input_profile input_border' placeholder='Логин' type='text' name='login' value='ivan'}}
    {{> input class='input_profile input_border' placeholder='Имя' type='text' name='name' value='Иван'}}
    {{> input class='input_profile input_border' placeholder='Фамилия' type='text' name='surname' value='Пирожков'}}
    {{> input class='input_profile' placeholder='Телефон' type='text' name='phone' value='+ 7 999 99 99'}}
    <div class="profile__button-box">
      {{> button class='button button__transparent button__transparent_border' text='Изменить данные' type='submit'}}
      {{> button class='button button__transparent button__transparent_border' text='Изменить пароль' type='button'}}
      {{> button class='button button__transparent button__transparent_red' text='Выйти' type='button' onclick=''}}
    </div>
  </form>
</section>`;

