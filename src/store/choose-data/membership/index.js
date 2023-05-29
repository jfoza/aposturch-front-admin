/* eslint-disable no-shadow */
const state = {
  chooseChurch: null,
  chooseMember: null,
}

const mutations = {
  SET_CHOOSE_CHURCH(state, itemData) {
    state.chooseChurch = itemData
  },
  SET_CHOOSE_MEMBER(state, itemData) {
    state.chooseMember = itemData
  },
}

export default {
  namespaced: true,
  state,
  mutations,
}
