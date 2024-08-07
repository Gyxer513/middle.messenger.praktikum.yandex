// language=hbs
export const template = `
        {{#each users}}
                <p class="userList__item" id='{{id}}'>{{first_name}} {{second_name}}  - Удалить</p>
        {{/each}}`;
