import { api } from "boot/axios";

export function init({ commit, dispatch, state }, val) {
  return new Promise((resolve, reject) => {
    //Loading.show()
    const token = localStorage.getItem('token')
    //console.log('token :', token)
    if (token) {
      console.log("mphka apo edw")
      const vm = this
      api.get("/users/me", { headers: { "Authorization": `Bearer ${token}` } })
        .then((response) => {
          // console.log("Response: ", response)
          commit("setLoggedIn", true);
          // console.log("Logged In", state.loggedIn)
          commit("setProfile", response.data);
          commit("setToken", token);
          //Loading.hide()
          vm.$router.push('/chat')
          resolve('user re-logged in')
        })
        .catch((error) => {
          // Handle error.
          Loading.hide()
          commit('setLoggedin', false);
          //console.log("An error occurred:", error.response);
        })
    } else {
      vm.$router.push('/')
      //Loading.hide()
      resolve('user isnt authneticated');
    }
  })
}
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