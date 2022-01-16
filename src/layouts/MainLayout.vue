<template>
  <q-layout view="hHh lpR fFf">
    <q-header class="bg-transparent">
      <q-toolbar class="flex">
        <div class="col-4"></div>
        <div class="col-4 text-center text-h6">DVG Chat</div>
        <div class="col-4">
          <div v-if="q.screen.gt.sm">
            <q-btn
              class="float-right"
              flat
              icon="logout"
              label="Logout"
              @click="logOut()"
              no-caps
            />
            <q-btn
              v-if="$route.fullPath.indexOf('chat') > -1"
              class="float-right"
              flat
              icon="settings"
              label="Profile Settings"
              @click="profileSettings()"
              no-caps
            />
            <q-btn
              v-else
              class="float-right"
              flat
              icon="chat"
              label="Chat"
              @click="chat()"
              no-caps
            />
          </div>
          <div v-else>
            <q-btn-dropdown
              flat
              fab
              dropdown-icon="menu"
              color="white"
              class="float-right"
            >
              <q-list>
                <q-item
                  clickable
                  v-close-popup
                  @click="profileSettings()"
                  v-if="$route.fullPath.indexOf('chat') > -1"
                >
                  <q-item-section avatar>
                    <q-avatar
                      icon="settings"
                      color="dark"
                      text-color="white"
                    ></q-avatar>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Profile Settings</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item clickable v-close-popup @click="chat()()" v-else>
                  <q-item-section avatar>
                    <q-avatar
                      icon="chat"
                      color="dark"
                      text-color="white"
                    ></q-avatar>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Chat</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item clickable v-close-popup @click="logOut()">
                  <q-item-section avatar>
                    <q-avatar
                      icon="logout"
                      color="dark"
                      text-color="white"
                    ></q-avatar>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Logout</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-btn-dropdown>
          </div>
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { useQuasar } from "quasar";

export default {
  name: "MainLayout",

  setup() {
    const router = useRouter();
    const store = useStore();
    const q = useQuasar();

    q.screen.setSizes({ sm: 600, md: 1024, lg: 1920 });

    return {
      router,
      store,
      q,
      logOut() {
        store.dispatch("dvgchat/logout").then(() => {
          router.push("/");
        });
      },
      profileSettings() {
        router.push("/settings");
      },
      chat() {
        router.push("/chat");
      },
    };
  },
};
</script>
