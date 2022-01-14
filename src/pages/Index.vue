<template>
  <q-layout>
    <q-page class="flex flex-center opacity">
      <q-card
        class="my-card"
        dark
        style="
          border-radius: 40px;
          width: 30vw;
          min-width: 300px;
          max-width: 350px;
        "
      >
        <q-card-section class="opacity">
          <q-tabs
            v-model="tabs"
            dense
            class="text-white opacity"
            active-color="white"
            indicator-color="white"
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
          <q-tab-panels
            v-model="tabs"
            animated
            style="background-color: rgba(0, 0, 0, 0)"
          >
            <q-tab-panel class="no-padding" name="login">
              <q-form @submit="onLogIn">
                <q-card-section class="flex flex-center">
                  <q-avatar
                    color
                    class="bg-animation3"
                    text-color="white"
                    size="6rem"
                    font-size="8rem"
                    icon="person"
                  />
                </q-card-section>
                <q-card-section>
                  <q-input
                    class="q-pa-sm"
                    bottom-slots
                    color="white"
                    label-color="white"
                    dark
                    v-model="username"
                    placeholder="Username"
                    :rules="[required]"
                  >
                    <template v-slot:before>
                      <q-icon name="person" color="white" />
                    </template>
                  </q-input>
                  <q-input
                    class="q-pa-sm"
                    bottom-slots
                    dark
                    v-model="password"
                    placeholder="Password"
                    color="white"
                    :rules="[required]"
                    :type="visibility ? 'password' : 'text'"
                  >
                    <template v-slot:before>
                      <q-icon name="lock" color="white" />
                    </template>
                    <template v-slot:append>
                      <q-icon
                        :name="visibility ? 'visibility_off' : 'visibility'"
                        class="cursor-pointer"
                        @click="visibility = !visibility"
                      />
                    </template>
                  </q-input>
                </q-card-section>
                <q-card-section>
                  <q-checkbox
                    class="q-pa-sm text-white"
                    size="xs"
                    dark
                    v-model="rememberMe"
                    val="xs"
                    label="Remember me"
                    color="dark"
                  />
                </q-card-section>
                <q-card-section class="flex flex-center">
                  <div class="flex flex-center" style="width: 40%">
                    <q-btn
                      class="full-width bg-animation2"
                      unelevated
                      rounded
                      text-color="white"
                      label="Log in"
                      no-caps
                      type="submit"
                    />
                  </div>
                </q-card-section>
              </q-form>
            </q-tab-panel>

            <q-tab-panel class="no-padding opacity" name="signup">
              <q-form @submit="onRegistration">
                <q-card-section class="flex flex-center">
                  <q-avatar
                    color
                    class="bg-animation3"
                    text-color="white"
                    size="6rem"
                    font-size="8rem"
                    icon="person"
                  />
                </q-card-section>
                <q-card-section>
                  <q-input
                    class="q-pa-sm"
                    bottom-slots
                    dark
                    v-model="usernameRegister"
                    :rules="[
                      required,
                      shortUser,
                      checkUsername,
                      checkUsernameCharacters,
                    ]"
                    placeholder="Username"
                    color="white"
                  >
                    <template v-slot:before>
                      <q-icon name="person" color="white" />
                    </template>
                  </q-input>
                  <q-input
                    class="q-pa-sm"
                    bottom-slots
                    dark
                    v-model="emailRegister"
                    :rules="[required, isEmail]"
                    placeholder="Email"
                    color="white"
                  >
                    <template v-slot:before>
                      <q-icon name="email" color="white" />
                    </template>
                  </q-input>
                  <q-input
                    class="q-pa-sm"
                    bottom-slots
                    dark
                    v-model="fullNameRegister"
                    :rules="[required]"
                    placeholder="Full Name"
                    color="white"
                  >
                    <template v-slot:before>
                      <q-icon name="text_fields" color="white" />
                    </template>
                  </q-input>

                  <q-input
                    class="q-pa-sm"
                    bottom-slots
                    dark
                    v-model="passwordRegister"
                    :rules="[required, isPassword]"
                    placeholder="Password"
                    color="white"
                    :type="visibilityRegister ? 'password' : 'text'"
                  >
                    <template v-slot:before>
                      <q-icon name="lock" color="white" />
                    </template>
                    <template v-slot:append>
                      <q-icon
                        :name="
                          visibilityRegister ? 'visibility_off' : 'visibility'
                        "
                        class="cursor-pointer"
                        @click="visibilityRegister = !visibilityRegister"
                      />
                    </template>
                  </q-input>
                  <q-input
                    class="q-pa-sm"
                    bottom-slots
                    dark
                    v-model="rePasswordRegister"
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
                <q-card-section class="flex flex-center">
                  <div class="flex flex-center" style="width: 40%">
                    <q-btn
                      class="full-width bg-animation2"
                      unelevated
                      rounded
                      text-color="white"
                      label="Sign up"
                      no-caps
                      type="submit"
                    />
                  </div>
                </q-card-section>
              </q-form>
            </q-tab-panel>
          </q-tab-panels>
        </q-card-section>
      </q-card>
    </q-page>
  </q-layout>
</template>

<script>
import { ref } from "vue";
import { api } from "boot/axios";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";

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
    const passwordFieldType = ref("password");
    const visibilityIcon = "visibility";
    const visibility = ref(true);
    const visibilityRegister = ref(true);
    const visibilityRePassword = ref(true);

    const store = useStore();
    const router = useRouter();
    const quasar = useQuasar();

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
      router,
      quasar,
      passwordFieldType,
      visibilityIcon,
      visibility,
      visibilityRegister,
      visibilityRePassword,

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
      checkUsernameCharacters(val) {
        const usernameRegex = /^[A-Za-z0-9 ]+$/;
        return new Promise((resolve) => {
          resolve(
            usernameRegex.test(val) || "Special characters aren't allowed"
          );
        });
      },
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
            quasar.notify({
              type: "positive",
              message: "You are logged in",
              position: "top",
            });
            router.push("/chat");
          })
          .catch((error) => {
            console.log("error: ", error);
            quasar.notify({
              type: "negative",
              message: "Please provide your username and password",
              position: "top",
            });
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
            quasar.notify({
              type: "positive",
              message: "You have been registered, you can log in now",
              position: "top",
            });
            tabs.value = "login";
            username.value = usernameRegister.value;
            usernameRegister.value = "";
            password.value = passwordRegister.value;
            passwordRegister.value = "";
            emailRegister.value = "";
            fullNameRegister.value = "";
          })
          .catch((error) => {
            console.log("error: ", error);
            quasar.notify({
              type: "negative",
              message: "An error occured, try again",
              position: "top",
            });
          });
      },
    };
  },
};
</script>
