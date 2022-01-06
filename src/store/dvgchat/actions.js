import { api } from "boot/axios";

export function authRequest({ commit, dispatch }, logIn) {
  return new Promise((resolve, reject) => {
    console.log("keepMe: ", logIn.keepMe);
    api
      .post("/auth/local", logIn.credentials)
      .then((response) => {
        // console.log("response: ", response.data);
        // console.log("user: ", response.data.user);
        // console.log("Jwt: ", response.data.jwt);
        commit("setLoggedIn", true);
        commit("setProfile", response.data.user);
        commit("setToken", response.data.jwt);
        if (logIn.keepMe) {
          localStorage.setItem("token", response.data.jwt);
        }
        resolve("The user is logged in");
      })
      .catch((error) => {
        // console.log("error: ", error);
        reject(error);
      });
  });
}

export function registerRequest({ commit, dispatch }, registration) {
  // ("signup");
  return new Promise((resolve, reject) => {
    api
      .post("/auth/local/register", registration)
      .then(() => {
        resolve("User is Registered");
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function SOCKET_connected({ commit, dispatch }, data) {
  console.log('Listener connected', data);
}

export function SOCKET_newMessage({ commit, dispatch }, data) {
  console.log('Listener new message', data);
  commit("addNewMessage", data);
}

export function SOCKET_messages({ commit, dispatch }, data) {
  console.log('Listener messages', data);
  commit("setMessages", data);
}