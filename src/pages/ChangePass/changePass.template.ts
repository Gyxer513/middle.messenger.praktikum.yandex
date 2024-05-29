// language=hbs
export const template = `
    <section class='profile__page'>
        {{> avatar class='avatar__container' src='../../../assets/images/avatar.jpg' alt='аватар' }}
        <form class="profile__form">
            {{> input class='input_profile input_border' placeholder='Старый пароль' type='password' name='old-pass'}}
            {{> input class='input_profile input_border' placeholder='Новый пароль' type='password' name='password'}}
            {{> input class='input_profile' placeholder='Новый пароль (еще раз)' type='password' name='repeat-pass'}}
            <div class="profile__button-box">
                {{> button class='button button__main' text='Сохранить' type='submit' onclick=''}}
            </div>
        </form>
    </section>`;
