// language=hbs
export const template = `<div>
<h1> Удалить пользователей </h1>
    <ul class="dropdown-content" id="dropdown-content">
        {{#each currentUsers}}
            <li id='{{id}}'>{{ first_name }}{{{ deleteButton }}}</li>
        {{/each}}
    </ul>
</div>`;
