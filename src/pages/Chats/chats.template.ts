// language=hbs

export const template = `
<section class="chats__page">
    <div class="chats__box">
        <div class="chats__title">
          <a class="chats__link" href="/">Профиль ></a>
          <input class="chats__input" type="text" placeholder="Поиск">
        </div>
        {{{ chatItem1 }}}
        {{{ chatItem2 }}}
        {{{ chatItem3 }}}
    </div>
    <div class="chats__message-box">
        {{{ chat }}}
    </div>
</section>
`;
