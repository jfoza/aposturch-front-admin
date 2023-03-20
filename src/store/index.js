import Vue from 'vue'
import Vuex from 'vuex'

// Modules
import createPersistedState from 'vuex-persistedstate'
import ecommerceStoreModule from '@/views/apps/e-commerce/eCommerceStoreModule'
import sessions from '@/store/sessions'
import app from './app'
import appConfig from './app-config'
import verticalMenu from './vertical-menu'
import defineMenus from './define-menus'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    sessions,
    app,
    appConfig,
    verticalMenu,
    defineMenus,
    'app-ecommerce': ecommerceStoreModule,
  },
  plugins: [
    createPersistedState({
      paths: [
        'sessions',
        'defineMenus',
      ],
    }),
  ],
  strict: process.env.DEV,
})
