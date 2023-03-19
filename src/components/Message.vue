<template>
  <div class="message-container">
    <div v-for="(msg, index) in messages" :key="index" class="message" :class="[msg.type]">
      {{ msg.text }}
    </div>
  </div>
</template>

<script>
import { ref, watchEffect } from 'vue';

export default {
  name: 'Message',
  setup() {
    const messages = ref([]);

    function addMessage(text, type = 'info') {
      messages.value.push({ text, type });
      setTimeout(() => {
        messages.value.splice(messages.value.indexOf({ text, type }), 1);
      }, 2000);
    }

    watchEffect(() => {
      if (messages.value.length > 0) {
        setTimeout(() => {
          messages.value.shift();
        }, 2000);
      }
    });

    return {
      messages,
      addMessage
    };
  }
};
</script>

<style>
.message-container {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9999;
}

.message {
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.2);
}

.success {
  background-color: #d4edda;
  color: #155724;
  border-color: #c3e6cb;
}

.error {
  background-color: rgb(205 39 39);
  color: rgb(255, 255, 255);
  font-size: 0.875rem;
}

.warning {
  background-color: #fff3cd;
  color: #856404;
  border-color: #ffeeba;
}

.info {
  background-color: #d1ecf1;
  color: #0c5460;
  border-color: #bee5eb;
}
</style>