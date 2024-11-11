<template>
    <div>
        <div v-for="(message, index) in messages" :key="index">
            <p>{{ message.role }}: {{ message.content }}</p>
        </div>
        <input v-model="userInput" placeholder="Type your message here..." @keyup.enter="sendMessage">
        <button @click="sendMessage">Send</button>
    </div>
</template>
  
  
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
  
</style>
  
<script>
import OpenAI from 'openai';
const openai = new OpenAI({
    apiKey: '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', dangerouslyAllowBrowser: true,
});
  export default {
    data() {
    return {
      messages: [
        { role: 'assistant', content: 'Hoe kan ik je helpen vandaag?' }
      ],
      userInput: '',
      threadId: null, // Om een unieke thread te identificeren
      assistantId: "asst_DfGvqOzJAqC0oxvba55M6qBL"
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
          await openai.beta.threads.messages.create({
            role: 'user',
            content: input,
          });
        }
       
      } catch (error) {
        console.error('Er ging iets mis:', error);
        this.messages.push({ role: 'assistant', content: 'Er ging iets mis, probeer het opnieuw.' });
      }
    },
  },
  }
</script>