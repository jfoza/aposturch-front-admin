/* eslint-disable no-shadow */
const state = {
  chooseChurch: null,
  chooseMemberUserId: null,
  profilesInUpdateMember: [],
  modulesInUpdateMember: [],
  churchesInUpdateMember: [],
  memberInUpdate: {
    userId: '',
    name: '',
    email: '',
    phone: '',
    zipCode: '',
    address: '',
    numberAddress: '',
    district: '',
    uf: '',
    complement: '',
    active: { boolValue: true, description: 'Ativo' },
    city: { id: '', description: '' },
    church: { id: '', name: '' },
    profile: { id: '', description: '' },
    modules: [],
  },
}

const mutations = {
  SET_CHOOSE_CHURCH(state, itemData) {
    state.chooseChurch = itemData
  },
  SET_CHOOSE_MEMBER_USER_ID(state, itemData) {
    state.chooseMemberUserId = itemData
  },
  SET_PROFILES_IN_UPDATE_MEMBER(state, itemData) {
    state.profilesInUpdateMember = itemData
  },
  SET_MODULES_IN_UPDATE_MEMBER(state, itemData) {
    state.modulesInUpdateMember = itemData
  },
  SET_CHURCHES_IN_UPDATE_MEMBER(state, itemData) {
    state.churchesInUpdateMember = itemData
  },
  SET_MEMBER_IN_UPDATE(state, itemData) {
    state.memberInUpdate = itemData
  },
}

export default {
  namespaced: true,
  state,
  mutations,
}
