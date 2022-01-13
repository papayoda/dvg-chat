export default function () {
  return {
    loggedIn: false,
    profile: {},
    token: "",
    messages: [{
      timestamp: 0,
      userId: 0,
      message: [""],
      username: "",
    }]
  }
}
