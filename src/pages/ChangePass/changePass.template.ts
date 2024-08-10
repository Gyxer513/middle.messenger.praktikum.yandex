// language=hbs
export const template = `
    <section class='profile__page'>
        {{{ profileAvatar }}}
        <form class="profile-form" id="passwordForm">
            {{{ oldPasswordInput }}}
            {{{ passwordInput }}}
            {{{ repeatPasswordInput }}}
            <div class="profile__button-box">
                {{{ submitButton }}}
            </div>
        </form>
    </section>`;
