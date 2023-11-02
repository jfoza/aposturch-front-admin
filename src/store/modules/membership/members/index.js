/* eslint-disable no-shadow */
const state = {
  chooseMemberUser: null,
  churchesUserLogged: [],
  profilesInUpdateMember: [],
  modulesInUpdateMember: [],
  churchesInUpdateMember: [],

  loadingFormWizard: false,

  formData: {
    userId: '',
    name: '',
    email: '',
    phone: '',
    zipCode: '',
    address: '',
    numberAddress: '',
    district: '',
    state: null,
    complement: '',
    active: { boolValue: true, description: 'Ativo' },
    city: null,
    church: null,
    profile: null,
    modules: [],
    image: {
      id: '',
      type: '',
      path: '',
    },
  },

  uploadData: {
    files: [],
  },
}

const mutations = {
  setChurchesUserLogged(state, itemData) {
    state.churchesUserLogged = itemData
  },

  setChooseMemberUser(state, itemData) {
    state.chooseMemberUser = itemData
  },

  setProfilesInUpdate(state, itemData) {
    state.profilesInUpdateMember = itemData
  },

  setModulesInUpdate(state, itemData) {
    state.modulesInUpdateMember = itemData
  },

  setChurchesInUpdate(state, itemData) {
    state.churchesInUpdateMember = itemData
  },

  setFormData(state, itemData) {
    state.formData = itemData
  },

  setUploadData(state, itemData) {
    state.uploadData = itemData
  },

  setLoadingFormWizard(state, itemData) {
    state.loadingFormWizard = itemData
  },

  clearFormData(state) {
    state.formData = {
      userId: '',
      name: '',
      email: '',
      phone: '',
      zipCode: '',
      address: '',
      numberAddress: '',
      district: '',
      state: null,
      complement: '',
      active: { boolValue: true, description: 'Ativo' },
      city: null,
      church: null,
      profile: null,
      modules: [],
      image: {
        id: '',
        type: '',
        path: '',
      },
    }

    state.uploadData = {
      files: [],
    }

    state.chooseMemberUser = null
    state.churchesUserLogged = []
    state.profilesInUpdateMember = []
    state.modulesInUpdateMember = []
    state.churchesInUpdateMember = []
  },
}

const getters = {
  getChooseChurchesUserLogged: state => state.churchesUserLogged,
  getChooseMemberUser: state => state.chooseMemberUser,
  getProfilesInUpdateMember: state => state.profilesInUpdateMember,
  getModulesInUpdateMember: state => state.modulesInUpdateMember,
  getChurchesInUpdateMember: state => state.churchesInUpdateMember,

  getFormData: state => state.formData,
  getUploadData: state => state.uploadData,
  getLoadingFormWizard: state => state.loadingFormWizard,
}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
}
