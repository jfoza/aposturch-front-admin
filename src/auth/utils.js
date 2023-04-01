import provider from '@/store'
import axiosIns from '@/libs/axios'
import apiRoutes from '@/router/apiRoutes'
import general from '@/router/description'

const baseURL = process.env.VUE_APP_APP_URL

const login = baseURL + general.loginRouter
const notAuthorized = baseURL + general.notAuthorized

export const clearStore = () => {
  provider.dispatch('sessions/logout').then()
}

export const getHomeRouteForLoggedInUser = userRole => {
  if (userRole) {
    return '/'
  }

  clearStore()
  return { name: 'auth-login' }
}

export const isUserLoggedIn = () => provider.getters['sessions/isLoggedIn']

export const getToken = () => provider.state.sessions.token

export const getUserData = () => provider.state.sessions.userData

export const startCount = () => {
  provider.dispatch('sessions/startCount').then()
}

export const redirectToNotAuthorized = () => {
  location.href = notAuthorized
}

export const logoutUser = () => new Promise((resolve, reject) => {
  axiosIns.get(apiRoutes.logout)
    .then(response => {
      clearStore()
      resolve(response)
    })
    .catch(error => {
      clearStore()
      reject(error)
    })
})

export const logoutUserRedirectToLogin = () => {
  clearStore()
  location.href = login
}

export const setLoggedUserData = () => {
  axiosIns.get(apiRoutes.me)
    .then(response => {
      const userData = response.data

      provider.commit('sessions/SET_USER_DATA', userData)
    })
}
