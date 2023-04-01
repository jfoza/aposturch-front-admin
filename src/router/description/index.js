export default {
  loginRouter: {
    path: '/login',
    name: 'auth-login',
  },

  notAuthorized: {
    path: '/nao-autorizado',
    name: 'misc-not-authorized',
  },

  notEnabled: {
    path: '/nao-habilitado',
    name: 'misc-not-enabled',
  },

  disconnected: {
    path: '/sessao-expirada',
    name: 'disconnected',
  },

  error404: {
    path: '/pagina-nao-encontrada',
    name: 'error404',
  },

  homeRouter: {
    path: '/',
    name: 'home',
  },
}
