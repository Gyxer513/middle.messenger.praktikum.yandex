// language=hbs

export default `
<section class="chats__page">
    <div class="chats__box">
        <div class="chats__title">
          <a class="chats__link" href="/">Профиль ></a>
          <input class="chats__input" type="text" placeholder="Поиск">
        </div>
        {{> chatitem src='../../../assets/images/avatar.jpg' alt='avatar-cat' name='Антон' message='Привет' time='14:19' counter-class='counter counter_enabled' counter-number='30'}}
        {{> chatitem src='../../../assets/images/avatar-3.jpg' alt='avatar-yana'  name='Яна' message='Ты далеко?' time='12:18' }}
        {{> chatitem  src='../../../assets/images/avatar-girl.jpg' alt='avatar-girl' name='Катя' message='Встречаемся через час' alt='avatar-cat' time='Вчера' }}
        {{> chatitem src='../../../assets/images/avatar-4.jpeg' alt='avatar-cat' name='Nick' message='Hi' counter-class='counter counter_enabled' counter-number='12'  time='Вчера'}}
        {{> chatitem src='../../../assets/images/avatar-4.jpeg' alt='avatar'  name='Виталий' message='Привет'  time='Неделю назад' }}
    </div>
    <div class="chats__message-box"></div>
</section>
`;

