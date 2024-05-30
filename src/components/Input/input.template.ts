// language=hbs

export const template = `
  <div class="box">
      <label class='container'>
          <input
                  class='{{class_name}}'
                  name='{{name}}'
                  placeholder=''
                  type='{{type}}' 
                  value='{{value}}'
  {{#if disabled}}
          disabled
  {{/if}}
          />
          <div class='input__labelline'>{{placeholder}}</div>
      </label>
      <span id="{{id}}_error" class="text-error"></span>
  </div>  
`;

export default template;
