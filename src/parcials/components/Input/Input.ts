// language=hbs

export default `
  <div class="box">
      <div class='container'>
          <input
                  class='{{class}}'
                  id='{{id}}' 
                  name='{{name}}'
                  placeholder=''
                  type='{{type}}' />
          <div class='input__labelline'>{{placeholder}}</div>
      </div>
      <span class="text__error">{{error-text}}</span>
  </div>  
`;
