// language=hbs

const template = `
  <div class="box">
      <div class='container'>
          <input
                  class='{{class}}'
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
