export function setLoggedIn(state, data) {
  state.loggedIn = data;
}
export function setProfile(state, data) {
  state.profile = data;
}
export function setToken(state, data) {
  state.token = data;
}
export function setMessages(state, data) {
  state.messages = data;
}
export function addNewMessage(state, data) {
  state.messages.push(data);
}
export function removeUser(state) {
  localStorage.removeItem('token')
  state.loggedIn = false;
  state.profile = {};
  state.token = "";
  state.messages = [{
    timestamp: 0,
    userId: 0,
    message: [""],
    username: "",
  }];
}