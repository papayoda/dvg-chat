<template>
  <q-layout view="hHh lpR fFf">
    <q-header class="bg-transparent">
      <q-toolbar>
        <q-space />
        <q-toolbar-title class="text-center"> DVG Chat </q-toolbar-title>
        <q-space />
        <!-- <q-btn
          flat
          round
          dense
          icon="logout"
          label="Logout"
          @click="logOut()"
          no-caps
          class="q-mr-sm"
        />
        <q-btn flat round dense icon="menu" class="q-mr-sm" @click="" /> -->
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "MainLayout",

  setup() {
    const leftDrawerOpen = ref(false);

    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
});
</script>
