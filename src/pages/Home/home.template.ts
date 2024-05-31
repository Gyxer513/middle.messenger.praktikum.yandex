export const template = `<div class="home__page" >
        <h3 class="home__title">Ссылки на сверстанные страницы</h3>
        <nav class="home__link-box">
          <a href="/login" onclick="router.navigateTo('/login'); return false;" class="home__link">Вход</a>
          <a href="/register" onclick="router.navigateTo('/register'); return false;" class="home__link">Регистрация</a>
          <a href="/profile" onclick="router.navigateTo('/profile'); return false;" class="home__link">Профиль</a>
          <a href="/change-password" onclick="router.navigateTo('/change-pass'); return false;" class="home__link">Изменить пароль</a>
          <a href="/chats" onclick="router.navigateTo('/charts'); return false;" class="home__link">Чаты</a>
          <a href="/404" onclick="router.navigateTo('/404'); return false;" class="home__link">Ошибка 404</a>
          <a href="/500" onclick="router.navigateTo('/500'); return false;" class="home__link">Ошибка 500</a>
        </nav>
      </div>`;
