// language=hbs
export const template = `
<section class='createChat'>
  <form class="createChat__form" id="createChatForm">
      <h1>Введите называние нового чата</h1>
      {{{ chatNameInput }}}
      {{{ submitButton }}}
   </form>
</section>
`