// language=hbs

export const template = `
  <div class="box">
      <div class='container'>
          <input
                  class='{{class_name}}'
                  name='{{name}}'
                  placeholder=''
                  type='{{type}}' 
                  value='{{value}}'
                  disabled='{{disabled}}'
          />
          <div class='input__labelline'>{{placeholder}}</div>
      </div>
      <span id="{{id}}" class="text__error">{{error_text}}</span>
  </div>  
`;

export default template;
