// language=hbs
export const template = `
<section class="chats__page">
    <div class="chats__box">
        <div class="chats__title">
          <a class="chats__link" href="/settings">Профиль ></a>
          <input class="chats__input" type="text" placeholder="Поиск">
            {{{ createChatButton }}}
        </div>
        {{{ chatsList }}}
    </div>
    <div class="chats__message-box">
        {{{ chat }}}
    </div>
</section>
`;
