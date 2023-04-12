export default {
  namespaced: true,
  state: {
    menus: [],
  },
  getters: {},
  mutations: {
    HANDLE_DEFINE_MENUS(state, val) {
      state.menus = val
    },
  },
}
