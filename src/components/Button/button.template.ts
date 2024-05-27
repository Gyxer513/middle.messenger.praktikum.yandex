// language=hbs

export const template = `
<button 
        id='{{id}}'
        class='{{class_name}}'
        type='{{type}}'
        disabled='{{disabled}}'
        click="{{{ onClick }}}"
        submit="{{{ onSubmit }}}"
>
   {{text}}
</button>`