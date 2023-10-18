/* eslint-disable no-shadow */
import membershipModuleRoutes from '@/views/modules/membership/routes'
import storeModuleRoutes from '@/views/modules/store/routes'

const state = {
  membershipModuleRoutes,
  storeModuleRoutes,
}

const getters = {
  getMembershipModuleRoutes: state => state.membershipModuleRoutes,
  getStoreModuleRoutes: state => state.storeModuleRoutes,
}

export default {
  namespaced: true,
  state,
  getters,
}
