// language=hbs
export const template = `
    {{#if handleData}}
        <div>
            {{#each users}}
                <p class="user-list__item" id='{{id}}'>{{first_name}} {{second_name}}  -{{#if delete}} Удалить {{else}} Добавить {{/if}}</p>
            {{/each}}
        </div>
    {{else}}
        <span>{{text}}</span>
    {{/if}}`;
