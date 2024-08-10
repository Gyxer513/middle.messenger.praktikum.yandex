// language=hbs
export const template = `
    <section class="chat">
        <div class="chat__header">
          {{{ chatAvatar }}}
            <h4 class="chat__name">Chat Id{{chatId}}</h4>
            {{{ deleteChatButton }}}
            {{{ deleteUsersButton }}}
            {{{ addUserButton }}}
            </div>
        </div>
        
        <div class="chat__container">
            {{#each messages}}
                <div class="chat__message {{cls}}">{{content}}</div>
            {{/each}}
        </div>
        <form class="chat__input-container" id="chatForm">
            <input name="message" type="text" class="chat__message-input" placeholder="Введите свое сообщение">
           <span id="message_error" class="text-error"></span>
            {{{ submitButton }}}
        </form>
    </section>
`;
