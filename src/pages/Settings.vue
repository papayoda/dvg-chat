<template>
  <q-page padding class="flex flex-center">
    <div class="column">
      <div class="row">
        <q-card class="settings-card" dark style="border-radius: 40px">
          <div class="flex column q-pt-md flex flex-center q-pa-md">
            <q-card-section>
              <div class="text-h6">Change your password</div>
            </q-card-section>
            <q-form @submit="changePassword()" class="q-gutter-md">
              <q-card-section class="flex flex-center">
                <q-input
                  class="q-pa-sm"
                  bottom-slots
                  dark
                  v-model="password"
                  placeholder="Password"
                  :rules="[required, isPassword]"
                  color="white"
                  :type="visibilityPassword ? 'password' : 'text'"
                >
                  <template v-slot:before>
                    <q-icon name="lock" color="white" />
                  </template>
                  <template v-slot:append>
                    <q-icon
                      :name="
                        visibilityPassword ? 'visibility_off' : 'visibility'
                      "
                      class="cursor-pointer"
                      @click="visibilityPassword = !visibilityPassword"
                    />
                  </template>
                </q-input>
              </q-card-section>
              <q-card-section>
                <q-input
                  class="q-pa-sm"
                  bottom-slots
                  dark
                  v-model="rePassword"
                  :rules="[required, samePassword]"
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
              </q-card-section>
              <q-card-section>
                <q-btn
                  no-caps
                  :disable="password != rePassword"
                  label="Change Password"
                  class="full-width bg-animation2"
                  unelevated
                  rounded
                  text-color="white"
                  type="submit"
                />
              </q-card-section>
            </q-form>
          </div>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import { useStore } from "vuex";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";
import { ref, computed } from "vue";

export default {
  setup() {
    const password = ref("");
    const rePassword = ref("");
    const store = useStore();
    const router = useRouter();
    const q = useQuasar();
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
      q,
      visibilityPassword,
      visibilityRePassword,
      changePassword() {
        let ch = {
          password: password.value,
        };
        store
          .dispatch("dvgchat/updatePassword", ch)
          .then((response) => {
            password.value = "";
            rePassword.value = "";
            q.notify({
              color: "green",
              message: "Your password is updated",
              position: "top",
            });
          })
          .catch((error) => {
            password.value = "";
            rePassword.value = "";
            q.notify({
              color: "red",
              message: "Your password is updated",
              position: "top",
            });
          });
      },

      required(val) {
        return new Promise((resolve) => {
          resolve(!!val || "* Required");
        });
      },
      isPassword(val) {
        const passwordRegex =
          /^(?=.*[0-9])(?=.*[!@#$%^&*+:])[a-zA-Z0-9!@#$%^&*+:]{7,}$/;
        return new Promise((resolve) => {
          resolve(
            passwordRegex.test(val) ||
              "7 characters minimum which contain at least one numeric digit and a special character"
          );
        });
      },
      samePassword(val) {
        return new Promise((resolve) => {
          resolve(val === rePassword.value || "Not the same password");
        });
      },
    };
  },
};
</script>
