// language=hbs

export const template = `
  <div class="box">
      <div class='container'>
          <input
                  class_name='{{class}}'
                  name='{{name}}'
                  placeholder=''
                  type='{{type}}' 
                  value='{{value}}'
          />
          <div class='input__labelline'>{{placeholder}}</div>
      </div>
      <span class="text__error">{{error-text}}</span>
  </div>  
`;

export default template;
