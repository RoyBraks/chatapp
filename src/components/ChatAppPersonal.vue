<template>
    <div class="chat-container">
        <div class="chat-container-chats">
          <div v-for="(message, index) in messages" :key="index">
            <div class="chat-container-chats-message" v-if="message.role === 'user' " id="user">
              <p id="user-text">{{message.content}}</p>
            </div>
            <div class="chat-container-chats-message" v-else id="assistant">
              <img v-if="assistant === 'Donald Trump'" src="https://hips.hearstapps.com/hmg-prod/images/republican-presidential-candidate-former-president-donald-news-photo-1721157463.jpg">
              <img v-if="assistant === 'Alex Soze'" src="https://jalta.nl/wp-content/uploads/2024/05/alex-soze-operatie-300x300.jpg">
              <img v-if="assistant === 'Arnold Schwarzenegger'" src="https://images.bstatic.de/gAGwUI5npbyXsXvX9Bu-SsNPO4w=/1200x1200/filters:focal(371x204:391x224)/images/ce3b174d/e9a6/4064/8c4a/da1e6a4809dc.jpg">
              <p id="assistant-text">{{ message.content }} </p>
            </div>
          </div>
        </div>
        <div class="chat-container-input">
          <div class="chat-container-input-assistantmenu" v-if="chooseAssistant">
              <button @click="this.assistant = 'Donald Trump', chooseAssistant = !chooseAssistant">
                <p>Donald Trump</p>
              </button>
              <button @click="this.assistant = 'Alex Soze', chooseAssistant = !chooseAssistant">
                <p>Alex Soze</p>
              </button>
              <button @click="this.assistant = 'Arnold Schwarzenegger', chooseAssistant = !chooseAssistant">
                <p>Arnold Schwarzenegger</p>
              </button>
          </div>
          <div class="chat-container-input-message">
            <button @click="chooseAssistant = !chooseAssistant" class="chat-container-input-message-character">
              <img v-if="assistant === 'Donald Trump'" src="https://hips.hearstapps.com/hmg-prod/images/republican-presidential-candidate-former-president-donald-news-photo-1721157463.jpg">
              <img v-if="assistant === 'Alex Soze'" src="https://jalta.nl/wp-content/uploads/2024/05/alex-soze-operatie-300x300.jpg">
              <img v-if="assistant === 'Arnold Schwarzenegger'" src="https://images.bstatic.de/gAGwUI5npbyXsXvX9Bu-SsNPO4w=/1200x1200/filters:focal(371x204:391x224)/images/ce3b174d/e9a6/4064/8c4a/da1e6a4809dc.jpg">
            </button>
            <div class="chat-container-input-message-text">
              <input class="chat-container-input-message-text-input" v-model="userInput" placeholder="Type your message here..." @keyup.enter="sendMessage">
              <button @click="sendMessage">></button>
            </div>
          </div>
        </div>
    </div>
</template>
  
  
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
  .chat-container{
    position: relative;
    height: 100vh;
    box-sizing: content-box;
    &-chats::-webkit-scrollbar{
      display: none;
      }
    &-chats{
      -ms-overflow-style: none;
      scrollbar-width: none;
      max-height: 87vh;
      padding: 1rem;
      display: flex;
      overflow: scroll;
      scroll: hidden;
      flex-direction: column;
      gap: 2rem;
      #assistant{
        flex-direction: row;
        &-text{
          background: #F3F3F3;
        }
      }
      #user{
        flex-direction: row-reverse;
        &-text{
          background: #D1D1D1;
        }
      }
      &-message{
        display: flex;
        gap: 1rem;
        align-items: stretch;
        img{
          width: 2.5rem; 
          height: 2.5rem;
          border-radius: 50%;
          object-fit: cover;
        }
        p{
          padding: 1rem;
          border-radius: 0.5rem;
        }
      }
    }
    &-input{
      background: #D1D1D1;
      width: 100vw;
      position: absolute;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      bottom: 0;
      &-assistantmenu{
        padding: 1rem 0.8rem;
      }
      &-message{
        height: 5rem;
        padding: 1rem 0.8rem;
        display: flex;
        gap: 1rem;
        align-items: center;
        box-sizing: border-box;
        &-character{
          display: flex;
          align-items: center;
          border: none;
          background: none;
          img{
            width: 2.5rem; 
            height: 2.5rem;
            border-radius: 50%;
            object-fit: cover;
          }  
        }
        &-text{
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          background: white;
          height: 100%;
          border-radius: 0.5rem;
          padding: 0rem 1rem;

          &-input, button{
            border: none;
            background: none;
          }
          &-input{
            width: 100%;
          }
          &-input:focus{
            border-color: none;  
            outline: none;
          }
        }
      }
    }
  }
</style>
  
<script>
import OpenAI from 'openai';
const openai = new OpenAI({
    apiKey: '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', dangerouslyAllowBrowser: true,
});
  export default {
    data() {
    return {
      messages: [],
      userInput: '',
      threadId: null, // Om een unieke thread te identificeren
      assistantId: "asst_DfGvqOzJAqC0oxvba55M6qBL",
      assistant: 'Donald Trump',
      chooseAssistant: false,
    };
  },
  methods: {

    async sendMessage() {
      if (!this.userInput.trim()) return;

      // Voeg het bericht van de gebruiker toe aan de messages array
      this.messages.push({ role: 'user', content: this.userInput });

      // Sla de huidige invoer op en reset de invoerveld
      const input = this.userInput;
      this.userInput = '';

      try {
        // Controleer of een thread bestaat; maak er anders een nieuwe aan
        if (!this.threadId) {
          const threadResponse = await openai.beta.threads.create({
            messages: [{ role: 'user', content: input }],
          });
          this.threadId = threadResponse.id;
        } else {
          // Voeg een bericht toe aan de bestaande thread
          await openai.beta.threads.messages.create(this.threadId,{
            role: 'user',
            content: input,
          });
        }

        if (this.assistant === 'Donald Trump') {
          this.assistantId = "asst_DfGvqOzJAqC0oxvba55M6qBL"
        } else if (this.assistant === 'Alex Soze') {
          this.assistantId = "asst_qaPMUMfHwlSeUrvnVt2LUf4b"
        } else if (this.assistant === 'Arnold Schwarzenegger') {
          this.assistantId = "asst_4PbTAgWGyXdQ3NiTT3QHhZj1"
        }

        // start thread met de juiste assistant
        let run = await openai.beta.threads.runs.createAndPoll(this.threadId, {
            assistant_id: this.assistantId,
          },
        );

        if (run.status === 'in_progress') {
          this.showTyping = true;
        }
        
        if (run.status === 'completed') {
            const thread_messages = await openai.beta.threads.messages.list(
                run.thread_id,
            );
            const thread_message = thread_messages.data[0]
                if (thread_message.assistant_id === this.assistantId) {
                    this.messages.push({ role: this.chosenAssistant, content: thread_message.content[0].text.value })
                }
                
        }
      } catch (error) {
        console.error('Er ging iets mis:', error);
        this.messages.push({ role: 'assistant', content: 'Er ging iets mis, probeer het opnieuw.' });
      }
    },
  },
  }
</script>