/* eslint-disable no-shadow */
const state = {
  chooseChurch: null,
}

const mutations = {
  SET_CHOOSE_CHURCH(state, itemData) {
    state.chooseChurch = itemData
  },
}

export default {
  namespaced: true,
  state,
  mutations,
}
