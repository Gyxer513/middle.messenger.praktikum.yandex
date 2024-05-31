// language=hbs
export const template = `
<div class="card">
    <div class="card__body">
        <img class='card__image' alt='{{alt}}' src='{{src}}' />
        <div class="name__container">
          <h5 class="card__name">{{name}}</h5>
          <p class="card__message">{{message}}</p>
        </div>
    </div>
    <div class="card__time-box">
        <p class="card__time">{{time}}</p>
        <p class='{{counter_class}}'>{{counter_number}}</p>
    </div>
</div>
`;
