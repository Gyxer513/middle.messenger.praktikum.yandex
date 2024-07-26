// language=hbs
export const template = `
    <section class="chat">
        <div class="chat__header">
        <img src="https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png" alt="аватар" class="chat__avatar">
            <h4 class="chat__name">Иван</h4>
        </div>
        <div class="chat__container">
            {{#each messages}}
                <div class="chat__message chat__sender">{{content}}</div>
            {{/each}}
        </div>
        <form class="chat__input-container" id="chatForm">
            <input name="message" type="text" class="chat__message-input" placeholder="Введите свое сообщение">
           <span id="message_error" class="text-error"></span>
            {{{ submitButton }}}
        </form>
    </section>
`;
