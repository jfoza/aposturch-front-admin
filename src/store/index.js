/* eslint-disable import/no-cycle */
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
import usersModuleStore from './modules/users'
import routes from './routes'
import membershipModuleStore from './modules/membership'
import storeModuleCategories from './modules/store/categories'
import storeModuleSubcategories from './modules/store/subcategories'
import storeModulePrefixes from './modules/store/prefixes'
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
    membershipModuleStore,
    storeModuleCategories,
    storeModuleSubcategories,
    storeModulePrefixes,
    storeModuleProducts,
    'app-ecommerce': ecommerceStoreModule,
  },
  plugins: [
    createPersistedState({
      paths: [
        'sessions',
        'defineMenus',
        'routes',
        'usersModuleStore',
        'membershipModuleStore',
        'storeModuleCategories',
        'storeModuleSubcategories',
        'storeModulePrefixes',
      ],
    }),
  ],
  strict: process.env.DEV,
})
