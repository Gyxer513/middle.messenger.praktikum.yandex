// language=hbs
export const template = `
    <div>
        {{#each items}}
            <div id='{{id}}' class="card">
                <div class="card__body">
                    <img class='card__image' alt='Аватар чата' src='https://ya-praktikum.tech/api/v2/resources{{avatar}}' />
                    <div class="name__container">
                        <h5 class="card__name">{{title}}</h5>
                        <p class="card__message">{{last_message.content}}</p>
                    </div>
                </div>
                <div class="card__time-box">
                    <p class="card__time">{{time}}</p>
                    <p class='{{counter_class}}'>{{counter_number}}</p>
                </div>
            </div>
        {{/each}}
    </div>
`;
