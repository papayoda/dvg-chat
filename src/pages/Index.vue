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
          <q-tab name="signup" label="Sign up" no-caps style="border-radius: 40px" />
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

export default {
  name: "PageIndex",
  setup() {
    const password = ref("");
    const username = ref("");
    const usernameRegister = ref("");
    
    const tabs = ref("signup");
    const rememberMe = ref(false);
    return { password, username, rememberMe, tabs };
  },
};
</script>
