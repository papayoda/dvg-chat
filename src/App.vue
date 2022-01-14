<template>
  <router-view class="bg-animation" />
</template>
<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",
  mounted() {
    this.$store.dispatch("dvgchat/init");
  },
});
</script>
