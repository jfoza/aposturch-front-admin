/* eslint-disable no-shadow */
const state = {
  chooseUser: null,
  chooseCustomer: null,
  chooseChurch: null,
}

const mutations = {
  SET_CHOOSE_USER(state, itemData) {
    state.chooseUser = itemData
  },
  SET_CHOOSE_CUSTOMER(state, itemData) {
    state.chooseCustomer = itemData
  },
  SET_CHOOSE_CHURCH(state, itemData) {
    state.chooseChurch = itemData
  },
}

export default {
  namespaced: true,
  state,
  mutations,
}
