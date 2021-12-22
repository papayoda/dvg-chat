<template>
  <q-page class="flex flex-center">
    <q-card
      class="my-card"
      style="
        border-radius: 40px;
        width: 30vw;
        min-width: 300px;
        max-width: 350px;
      "
    >
      <q-card-section>
        <q-tabs
          v-model="tabs"
          dense
          class="text-grey"
          active-color="primary"
          indicator-color="primary"
          align="justify"
          narrow-indicator
        >
          <q-tab
            name="login"
            label="Log in"
            no-caps
            style="border-radius: 40px"
          />
          <q-tab
            name="signup"
            label="Sign up"
            no-caps
            style="border-radius: 40px"
          />
        </q-tabs>
        <q-tab-panels v-model="tabs" animated>
          <q-tab-panel class="no-padding" name="login">
            <q-card-section class="flex flex-center">
              <q-avatar
                color="red"
                text-color="white"
                size="5rem"
                font-size="5rem"
                icon="account_circle"
              />
            </q-card-section>
            <q-card-section>
              <q-input
                class="q-pa-sm"
                bottom-slots
                v-model="username"
                placeholder="Username"
                :rules="[required]"
              >
                <template v-slot:before>
                  <q-icon name="person" />
                </template>
              </q-input>
              <q-input
                class="q-pa-sm"
                bottom-slots
                v-model="password"
                placeholder="Password"
                :rules="[required]"
              >
                <template v-slot:before>
                  <q-icon name="lock" />
                </template>
              </q-input>
            </q-card-section>
            <q-card-section>
              <q-checkbox
                class="q-pa-sm"
                size="xs"
                v-model="rememberMe"
                val="xs"
                label="Remember me"
              />
            </q-card-section>
            <q-card-section class="flex flex-center">
              <div class="flex flex-center" style="width: 40%">
                <q-btn
                  class="full-width"
                  unelevated
                  rounded
                  color="primary"
                  label="Log in"
                  no-caps
                  @click="onLogIn()"
                />
              </div>
            </q-card-section>
          </q-tab-panel>

          <q-tab-panel class="no-padding" name="signup">
            <q-card-section class="flex flex-center">
              <q-avatar
                color="red"
                text-color="white"
                size="5rem"
                font-size="5rem"
                icon="account_circle"
              />
            </q-card-section>
            <q-card-section>
              <q-input
                class="q-pa-sm"
                bottom-slots
                v-model="usernameRegister"
                :rules="[required, shortUser, checkUsername]"
                placeholder="Username"
              >
                <template v-slot:before>
                  <q-icon name="person" />
                </template>
              </q-input>
              <q-input
                class="q-pa-sm"
                bottom-slots
                v-model="emailRegister"
                :rules="[required, isEmail]"
                placeholder="Email"
              >
                <template v-slot:before>
                  <q-icon name="email" />
                </template>
              </q-input>
              <q-input
                class="q-pa-sm"
                bottom-slots
                v-model="fullNameRegister"
                :rules="[required]"
                placeholder="Full Name"
              >
                <template v-slot:before>
                  <q-icon name="text_fields" />
                </template>
              </q-input>
              <q-input
                class="q-pa-sm"
                bottom-slots
                v-model="passwordRegister"
                :rules="[required, isPassword]"
                placeholder="Password"
              >
                <template v-slot:before>
                  <q-icon name="lock" />
                </template>
              </q-input>
              <q-input
                class="q-pa-sm"
                bottom-slots
                v-model="rePasswordRegister"
                :rules="[required, samePassword]"
                placeholder="Retype Password"
              >
                <template v-slot:before>
                  <q-icon name="lock" />
                </template>
              </q-input>
            </q-card-section>
            <q-card-section class="flex flex-center">
              <div class="flex flex-center" style="width: 40%">
                <q-btn
                  class="full-width"
                  unelevated
                  rounded
                  color="primary"
                  label="Sign up"
                  no-caps
                  @click="onRegistration()"
                />
              </div>
            </q-card-section>
          </q-tab-panel>
        </q-tab-panels>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { ref } from "vue";
import { api } from "boot/axios";
import { useStore } from "vuex";

export default {
  name: "PageIndex",
  setup() {
    const password = ref("");
    const username = ref("");
    const usernameRegister = ref("");
    const emailRegister = ref("");
    const fullNameRegister = ref("");
    const passwordRegister = ref("");
    const rePasswordRegister = ref("");

    const store = useStore();

    const tabs = ref("login");
    const rememberMe = ref(false);
    return {
      password,
      username,
      rememberMe,
      tabs,
      usernameRegister,
      emailRegister,
      fullNameRegister,
      passwordRegister,
      rePasswordRegister,
      store,

      required(val) {
        return new Promise((resolve) => {
          resolve(!!val || "* Required");
        });
      },
      isPassword(val) {
        const passwordRegex =
          /^(?=.*[0-9])(?=.*[!@#$%^&*:])[a-zA-Z0-9!@#$%^&*:]{7,15}$/;
        return new Promise((resolve) => {
          resolve(
            passwordRegex.test(val) ||
              "7 to 15 characters which contain at least one numeric digit and a special character"
          );
        });
      },
      samePassword(val) {
        return new Promise((resolve) => {
          resolve(val === passwordRegister.value || "Not the same password");
        });
      },
      isEmail(val) {
        return new Promise((resolve) => {
          const emailPattern =
            /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
          resolve(emailPattern.test(val) || "Enter a valid email");
        });
      },
      shortUser(val) {
        return new Promise((resolve) => {
          resolve((val && val.length > 3) || "Very short username");
        });
      },
      checkUsername(val) {
        return new Promise((resolve) => {
          api.get("checkusername/" + val).then((response) => {
            resolve(!response.data || "This username is taken");
          });
        });
      },
      // checkUsernameCharacters(val){
      //   const usernameRegex = /^[A-Za-z0-9 ]+$/;
      //   return new Promise((resolve) => {
      //     resolve(usernameRegex.test(val) || "Special characters aren't allowed" );
      //   })
      // }
      onLogIn() {
        const logIn = {
          credentials: {
            identifier: username.value,
            password: password.value,
          },
          keepMe: rememberMe.value,
        };

        store
          .dispatch("dvgchat/authRequest", logIn)
          .then((response) => {
            console.log("response index.vue", response);
          })
          .catch((error) => {
            console.log("error: ", error);
          });
      },

      onRegistration() {
        const registration = {
          username: usernameRegister.value,
          email: emailRegister.value,
          password: passwordRegister.value,
          name: fullNameRegister.value,
        };
        store
          .dispatch("dvgchat/registerRequest", registration)
          .then((response) => {
            console.log("response index.vue", response);
          })
          .catch((error) => {
            console.log("error: ", error);
          });
      },
    };
  },
};
</script>
