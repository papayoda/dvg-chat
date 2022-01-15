<template>
  <q-layout view="hHh lpR fFf">
    <q-header class="bg-transparent">
      <q-toolbar class="flex">
        <div class="col-4"></div>
        <div class="col-4 text-center text-h6">DVG Chat</div>
        <div class="col-4">
          <q-btn
            class="float-right"
            flat
            icon="logout"
            label="Logout"
            @click="logOut()"
            no-caps
          />
          <q-btn
            class="float-right"
            flat
            icon="settings"
            label="Profile Settings"
            @click="profileSettings()"
            no-caps
          />
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

export default {
  name: "MainLayout",

  setup() {
    const router = useRouter();
    const store = useStore();

    return {
      router,
      store,
      logOut() {
        store.dispatch("dvgchat/logout").then(() => {
          router.push("/");
        });
      },
      profileSettings() {
        router.push("/settings");
      },
    };
  },
};
</script>
