import { boot } from 'quasar/wrappers'
import VueSocketIO from 'vue-3-socket.io'
import SocketIO from 'socket.io-client'

export default boot(({ app, store }) => {
  const connection = SocketIO('https://api.dvgchat.eu')
  const socket = new VueSocketIO({
    debug: true,
    connection: connection,
    vuex: {
      store,
      actionPrefix: 'SOCKET_',
      mutationPrefix: 'SOCKET_'
    },
  })
  app.use(socket)
  app.provide('socket', connection)
})