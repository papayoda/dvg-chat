<template>
  <q-page padding class="flex flex-center bg-animation">
    <div class="flex fixed-right">
      <q-btn
        class="overflow-hidden"
        flat
        text-color="black"
        label="Log out"
        style="height: 2vh"
        no-caps
      />
    </div>
    <q-card
      class="my-card"
      dark
      style="
        border-radius: 40px;
        width: 90vw;
        min-height: 40vw;
        max-height: 200vw;
        min-width: 300px;
        max-width: 1000px;
      "
    >
      <div class="text-h6 absolute-top text-center">DVG Chat</div>
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
        <div class="row">
          <div class="flex col-6 q-pl-lg q-pb-md absolute-bottom">
            <q-input
              dark
              rounded
              outlined
              v-model="text"
              type="text"
              color="white"
              style="min-width: 900px"
              placeholder="Type your message here"
              dense
            />
          </div>
          <div class="flex q-pb-md absolute-bottom-right">
            <q-btn flat rounded color="white" icon="send" @click="onClick" />
          </div>
        </div>
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

<style scoped>
.q-btn {
  display: inline;
  text-decoration: none;
}
</style>
