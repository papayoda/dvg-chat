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