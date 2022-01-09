<template>
  <q-page padding>
    <div class="row">
      <ul>
        <li v-for="message in messages" :key="message">
          timestamp: {{ message.timestamp }}, userId: {{ message.userId }},
          message: {{ message.message }}
        </li>
      </ul>
      <!-- {{ messages }} -->
    </div>
    <q-form @submit="onClick">
      <div class="row">
        <div class="col-6">
          <q-input v-model="text" type="text" label="Label" />
        </div>
        <div class="col-6">
          <q-btn
            color="primary"
            icon="check"
            label="Send"
            :disable="text.length === 0"
            type="sumbit"
            no-caps
          />
        </div>
      </div>
    </q-form>
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
        if (text.value === "!clean") {
          socket.emit("clearMessages");
          text.value = "";
        } else {
          const message = {
            timestamp: new Date(),
            userId: profile.value.id,
            message: text.value,
          };
          socket.emit("sendMessage", message);
          text.value = "";
        }
      },
    };
  },
};
</script>
