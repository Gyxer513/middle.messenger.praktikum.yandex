// language=hbs
export const template = `
  <div>
      <h1>Добавить пользователя в чат</h1>
      <form id="searchForm">
          <input name="message" type="text" class="chat__message-input" placeholder="Поиск по нику">
          <span id="message_error" class="text-error"></span>
      </form>
      <div>
          {{{ usersList }}}
      </div>
</div>`;
