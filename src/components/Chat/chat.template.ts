// language=hbs
export const template = `
    <section class="chat">
        <div class="chat__header">
            <div class="avatar-container" id="avatar-container">
                <img src={{ src }} alt="Avatar" id="avatar-image" class="chat__avatar">
                <div class="upload-overlay" id="upload-overlay">
                    <input type="file" accept="image/*" id="upload-input" class="upload-input">
                    <label for="upload-input" class="upload-label">Upload</label>
                </div>
            </div>
            <h4 class="chat__name">Chat Id{{chatId}}</h4>
        </div>
        <button>{{some}}</button>
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
