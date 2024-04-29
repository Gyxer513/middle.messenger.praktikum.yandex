// language=hbs

export default `
    <section class="error__page">
        <div class="error__container">
            <h1 class="error__title">{{ error_status }}</h1>
            <p class="error__text">{{ text }}</p>
            <a class="error__link" href="/static">Назад к чатам</a>
        </div>
    </section>`;
