import { boot } from 'quasar/wrappers'
import VueSocketIO from 'vue-3-socket.io'
import SocketIO from 'socket.io-client'
export default boot(({ app, store }) => {
  new VueSocketIO({
    debug: true,
    connection: SocketIO('https://api.dvgchat.eu'),
    vuex: {
      store,
      actionPrefix: 'SOCKET_',
      mutationPrefix: 'SOCKET_'
    },
  })
})