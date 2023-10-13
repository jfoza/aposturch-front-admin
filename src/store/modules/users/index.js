/* eslint-disable no-shadow */
const state = {
  chooseUser: null,
  chooseCustomer: null,
}

const mutations = {
  SET_CHOOSE_USER(state, itemData) {
    state.chooseUser = itemData
  },
}

export default {
  namespaced: true,
  state,
  mutations,
}
