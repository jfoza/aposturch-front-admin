/* eslint-disable no-shadow */
import membershipModuleRoutes from '@/views/modules/membership/routes'
import storeModuleRoutes from '@/views/modules/store/routes'
import general from '@/router/general'

const state = {
  general,
  membershipModuleRoutes,
  storeModuleRoutes,
}

const getters = {
  getGeneralRoutes: state => state.general,
  getMembershipModuleRoutes: state => state.membershipModuleRoutes,
  getStoreModuleRoutes: state => state.storeModuleRoutes,
}

export default {
  namespaced: true,
  state,
  getters,
}
