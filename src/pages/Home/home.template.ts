export const template = `<div class="home__page" >
        <h3 class="home__title">Ссылки на сверстанные страницы</h3>
        <nav class="home__link-box">
          {{{ linkToLogin }}}
          {{{ linkToRegister }}}
          {{{ linkToSettings }}}
          {{{ linkToChangePass }}}
          {{{ linkToChats }}}
          {{{ linkToError500 }}}
          {{{ linkToError400 }}}
        </nav>
      </div>`;
