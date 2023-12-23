/* eslint-disable import/no-cycle */
import Vue from 'vue'
import Vuex from 'vuex'

// Modules
import createPersistedState from 'vuex-persistedstate'
import sessions from '@/store/sessions'
import app from './app'
import appConfig from './app-config'
import verticalMenu from './vertical-menu'
import defineMenus from './define-menus'
import usersModuleStore from './modules/users'
import routes from './routes'
import membershipModuleMembers from './modules/membership/members'
import storeModuleDepartments from './modules/store/departments'
import storeModuleCategories from './modules/store/categories'
import storeModuleProducts from './modules/store/products'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    sessions,
    app,
    appConfig,
    verticalMenu,
    defineMenus,
    routes,
    usersModuleStore,
    membershipModuleMembers,
    storeModuleDepartments,
    storeModuleCategories,
    storeModuleProducts,
  },
  plugins: [
    createPersistedState({
      paths: [
        'sessions',
        'defineMenus',
        'routes',
        'usersModuleStore',
        'membershipModuleMembers',
      ],
    }),
  ],
  strict: process.env.DEV,
})
