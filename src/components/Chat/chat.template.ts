// language=hbs
export const template = `
    <section class="chat">
        <div class="chat-container">
            <div class="message sender">Hello, how are you?</div>
            <div class="message receiver">I'm good, thanks! How about you?</div>
            <div class="message sender">I'm doing well. What are you up to?</div>
            <div class="message receiver">Just working on a project. You?</div>
        </div>
        <div class="input-container">
            <input type="text" class="message-input" placeholder="Type your message...">
            <button class="send-button">&#10145;</button>
        </div>
    </section>
`;
