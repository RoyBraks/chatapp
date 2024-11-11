<template>
  <div class="hello">
    {{ messages }}
    <input type="text" v-model="userPrompt">
    <li v-for="message in messages" :key="message">{{ message.role }} - {{ message.content }}</li>
    <button @click="submitPrompt()"></button>
  </div>
</template>



<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>

</style>

<script>
import axios from 'axios'
export default {
  name: 'ChatApp',
  data(){
    return {
      result: {},
      messages: [],
      userPrompt: ''
    }
  },
  methods: {
    submitPrompt() {
      const user_prompt = { role: 'user', content: this.userPrompt}
      this.messages.push(user_prompt)
      axios.post('https://api.openai.com/v1/chat/completions', {
          "model": "gpt-4o-mini",
          "messages": this.messages
        }, 
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer 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'
        }
      }).then(res => {
        this.result = res.data
        this.messages.push(res.data.choices[0].message) 
      })
    }
  }
}
</script>