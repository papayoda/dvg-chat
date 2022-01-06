<template>
  <q-page padding>
    <div class="column">
      <div class="row">
        <ul>
          <li v-for="message in messages" :key="message">
            timestamp: {{ message.timestamp }}, userId: {{ message.userId }},
            message: {{ message.message }}
          </li>
        </ul>
        <!-- {{ messages }} -->
      </div>
      <div class="row">
        <div class="col-6">
          <q-input v-model="text" type="text" label="Label" />
        </div>
        <div class="col-6">
          <q-btn color="primary" icon="check" label="OK" @click="onClick" />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { ref, computed, inject } from "vue";
import { useStore } from "vuex";
export default {
  //name: 'PageName',
  setup() {
    const text = ref("");
    const store = useStore();
    const socket = inject("socket");
    const profile = computed({
      get: () => store.state.dvgchat.profile,
    });
    const messages = computed({
      get: () => store.state.dvgchat.messages,
    });
    socket.emit("getMessages");
    return {
      text,
      store,
      socket,
      profile,
      messages,
      onClick() {
        const message = {
          timestamp: new Date(),
          userId: profile.value.id,
          message: text.value,
        };
        socket.emit("sendMessage", message);
        text.value = "";
      },
    };
  },
};
</script>
