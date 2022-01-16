<template>
  <q-page padding class="flex flex-center">
    <div class="column">
      <div class="row">
        <q-card class="settings-card" dark style="border-radius: 40px">
          <div class="flex column q-pt-md">
            <q-card-section>
              <q-input
                class="q-pa-sm"
                bottom-slots
                dark
                v-model="password"
                placeholder="Password"
                color="white"
                :type="visibilityPassword ? 'password' : 'text'"
              >
                <template v-slot:before>
                  <q-icon name="lock" color="white" />
                </template>
                <template v-slot:append>
                  <q-icon
                    :name="visibilityPassword ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="visibilityPassword = !visibilityPassword"
                  />
                </template>
              </q-input>
              <q-input
                class="q-pa-sm"
                bottom-slots
                dark
                v-model="rePassword"
                placeholder="Retype Password"
                color="white"
                :type="visibilityRePassword ? 'password' : 'text'"
              >
                <template v-slot:before>
                  <q-icon name="lock" color="white" />
                </template>
                <template v-slot:append>
                  <q-icon
                    :name="
                      visibilityRePassword ? 'visibility_off' : 'visibility'
                    "
                    class="cursor-pointer"
                    @click="visibilityRePassword = !visibilityRePassword"
                  />
                </template>
              </q-input>
              <q-btn
                color="primary"
                label="Change Password"
                @click="changePassword()"
              />
            </q-card-section>
          </div>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { ref, computed } from "vue";

export default {
  setup() {
    const password = ref("");
    const rePassword = ref("");
    const store = useStore();
    const router = useRouter();
    const profile = computed({
      get: () => store.state.dvgchat.profile,
    });
    const visibilityPassword = ref(true);
    const visibilityRePassword = ref(true);

    return {
      password,
      rePassword,
      store,
      router,
      profile,
      visibilityPassword,
      visibilityRePassword,
      changePassword() {
        console.log("password: ", password.value);
      },
    };
  },
};
</script>
