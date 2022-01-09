<template>
  <q-page padding class="flex flex-center bg-animation">
    <q-card dark style="border-radius: 40px">
      <div class="text-h6 row flex-center">DVG Chat</div>
      <div class="flex column q-pt-md">
        <div class="row">
          <q-card-section class="flex" style="height: 20vw">
            <q-scroll-area style="width: 960px; height: calc(74vh - 50px)">
              <ul>
                <li v-for="message in messages" :key="message">
                  timestamp: {{ message.timestamp }}, userId:
                  {{ message.userId }}, message: {{ message.message }}
                </li>
              </ul>
              <!-- {{ messages }} -->
            </q-scroll-area>
          </q-card-section>
        </div>
        <q-form @submit="onClick">
          <div class="row">
            <div class="flex col-11 q-pl-lg q-pb-md">
              <q-input
                class="full-width"
                dark
                rounded
                outlined
                v-model="text"
                type="text"
                color="white"
                placeholder="Type your message here"
                dense
              />
            </div>
            <div class="flex q-pb-md col-1">
              <q-btn flat rounded color="white" icon="send" type="submit" />
            </div>
          </div>
        </q-form>
      </div>
    </q-card>
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

<style scoped>
.q-btn {
  display: inline;
  text-decoration: none;
}
</style>
