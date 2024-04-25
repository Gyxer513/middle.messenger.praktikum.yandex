export default `
    <div class='container'>
        <input 
        class='{{class}}' 
        id={{id}} name={{name}} 
        placeholder=''
        type={{type}} />
        <div class='input__labelline'>{{placeholder}}</div>
        <span>{{errorText}}</span>
    </div>
    `;