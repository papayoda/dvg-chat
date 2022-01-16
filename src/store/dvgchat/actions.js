import { api } from "boot/axios";
import { Loading } from 'quasar'

let jwt = ""
export function init({ commit, dispatch, state }, val) {
  return new Promise((resolve, reject) => {
    Loading.show()
    const token = localStorage.getItem('token')
    jwt = token
    if (token) {
      Loading.show()
      const vm = this
      api.get("/users/me", { headers: { "Authorization": `Bearer ${token}` } })
        .then((response) => {
          commit("setLoggedIn", true);
          commit("setProfile", response.data);
          commit("setToken", token);
          Loading.hide()
          vm.$router.push('/chat')
          resolve('user re-logged in')
        })
        .catch((error) => {
          // Handle error.
          Loading.hide()
          commit('setLoggedin', false);
        })
    } else {
      Loading.hide()
      resolve('user isnt authneticated');
    }
  })
}
export function authRequest({ commit, dispatch }, logIn) {
  return new Promise((resolve, reject) => {
    api
      .post("/auth/local", logIn.credentials)
      .then((response) => {
        commit("setLoggedIn", true);
        commit("setProfile", response.data.user);
        commit("setToken", response.data.jwt);
        jwt = response.data.jwt
        if (logIn.keepMe) {
          localStorage.setItem("token", response.data.jwt);
        }
        resolve("The user is logged in");
      })
      .catch((error) => {
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

export function updatePassword({ commit, dispatch }, password) {
  let head = {
    headers: {
      Authorization:
        'Bearer ' + jwt,
    },
  }
  return new Promise((resolve, reject) => {
    api
      .post("/updatemypassword", password, head)
      .then((response) => {
        resolve('Changes made for user')
      })
      .catch((error) => {
        // Handle error.
        ("An error occurred:", error.response);
        reject(error);
      })
  })
}

export function logout({ commit, dispatch }, user) {
  return new Promise((resolve, reject) => {
    commit('removeUser')
    resolve('user removed')
  })
}

export function SOCKET_connected({ commit, dispatch }, data) {
  console.log('Listener connected', data);
}

export function SOCKET_newMessage({ commit, dispatch }, data) {
  commit("addNewMessage", data);
}

export function SOCKET_messages({ commit, dispatch }, data) {
  commit("setMessages", data);
}
