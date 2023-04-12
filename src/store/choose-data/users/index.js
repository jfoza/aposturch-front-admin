/* eslint-disable no-shadow */
const state = {
  chooseUser: null,
  chooseCustomer: null,
}

const mutations = {
  SET_CHOOSE_USER(state, itemData) {
    state.chooseUser = itemData
  },
  SET_CHOOSE_CUSTOMER(state, itemData) {
    state.chooseCustomer = itemData
  },
}

export default {
  namespaced: true,
  state,
  mutations,
}
