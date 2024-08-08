// language=hbs
export const template = `
    {{#if handleData}}
        <div>
            {{#each users}}
                <p class="user-list__item" id='{{id}}'>{{first_name}} {{second_name}}  - {{action}}</p>
            {{/each}}
        </div>
    {{else}}
        <span>{{text}}</span>
    {{/if}}`;
