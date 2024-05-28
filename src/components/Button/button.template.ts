// language=hbs

export const template = `
<button 
        id='{{id}}'
        class='{{class_name}}'
        type='{{type}}'
    {{#if disabled}}
        disabled
    {{/if}}
>
   {{text}}
</button>`