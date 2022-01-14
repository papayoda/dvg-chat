<template>
  <q-page padding class="flex flex-center">
    <div class="column">
      <!-- <div class="row">
        <div class="col-10"></div>
        <div class="col-2">
          <q-btn
            color="white"
            text-color="dark"
            label="Log out"
            @click="logOut()"
            no-caps
          />
        </div>
      </div> -->
      <div class="row">
        <q-card class="chat-card" dark style="border-radius: 40px">
          <div class="flex column q-pt-md">
            <q-card-section>
              <q-scroll-area class="scroll-area-chat" ref="scroller" dark>
                <div v-for="message in messages" :key="message">
                  <q-chat-message
                    v-if="message.message != ''"
                    :name="
                      message.userId === profile.id ? 'me' : message.username
                    "
                    :text="message.message"
                    :stamp="returnDate(message.timestamp)"
                    :sent="message.userId === profile.id ? true : false"
                    class="q-pl-lg q-pr-lg"
                  />
                </div>
              </q-scroll-area>
            </q-card-section>
            <q-card-section class="full-width">
              <div class="row full-width">
                <q-form class="col-12" @submit="onClick()">
                  <q-input
                    rounded
                    outlined
                    standout
                    bottom-slots
                    v-model="text"
                    color="white"
                    placeholder="Type your message here"
                    dark
                    dense
                  >
                    <template v-slot:append>
                      <q-icon
                        name="send"
                        @click="onClick()"
                        class="cursor-pointer"
                      />
                    </template>
                  </q-input>
                </q-form>
              </div>
            </q-card-section>
          </div>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import { ref, computed, inject, watch } from "vue";
import { useStore } from "vuex";
import { date } from "quasar";
import { useRouter } from "vue-router";
export default {
  //name: 'PageName',
  setup() {
    const text = ref("");
    const store = useStore();
    const router = useRouter();
    const socket = inject("socket");
    const scroller = ref(null);
    const profile = computed({
      get: () => store.state.dvgchat.profile,
    });
    const messages = computed({
      get: () => store.state.dvgchat.messages,
    });
    watch(
      () => messages.value.length,
      (currentValue, oldValue) => {
        // console.log("calc", calc_messages.value.id);
        console.log("Current value:", currentValue);
        console.log("Old value:", oldValue);
        setTimeout(() => {
          scroller.value.setScrollPercentage("vertical", 1, 50);
        }, 200);
      }
    );
    socket.emit("getMessages");
    setTimeout(() => {
      scroller.value.setScrollPercentage("vertical", 1, 0);
    }, 200);
    return {
      text,
      store,
      router,
      socket,
      profile,
      messages,
      scroller,
      onClick() {
        if (text.value === "!clean") {
          socket.emit("clearMessages");
          text.value = "";
        } else if (text.value != "") {
          const message = {
            timestamp: new Date(),
            userId: profile.value.id,
            message: [text.value],
            username: profile.value.username,
          };
          socket.emit("sendMessage", message);
          text.value = "";
        }
      },
      returnDate(dateValue) {
        return date.formatDate(dateValue, "YYYY/MM/DD HH:mm:ss");
      },
      logOut() {
        store.dispatch("dvgchat/logout").then(() => {
          router.push("/");
        });
      },
    };
  },
  mounted() {
    window.chat = this;
  },
};
</script>

<style scoped>
.q-btn {
  display: inline;
  text-decoration: none;
}
</style>
