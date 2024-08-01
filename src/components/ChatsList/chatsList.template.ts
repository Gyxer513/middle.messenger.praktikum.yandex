// language=hbs
export const template = `
    <div>
        {{#each items}}
            <div id='{{id}}' class="card">
                <div id='{{id}}' class="card__body">
                    <img id='{{id}}' class='card__image' alt='Аватар чата' src='https://ya-praktikum.tech/api/v2/resources{{avatar}}' />
                    <div id='{{id}}' class="name__container">
                        <h5 id='{{id}}' class="card__name">{{title}}</h5>
                        <p id='{{id}}' class="card__message">{{last_message.content}}</p>
                    </div>
                </div>
                <div id='{{id}}' class="card__time-box">
                    <p id='{{id}}' class="card__time">{{time}}</p>
                    <p id='{{id}}' class='{{counter_class}}'>{{counter_number}}</p>
                </div>
            </div>
        {{/each}}
    </div>
`;
