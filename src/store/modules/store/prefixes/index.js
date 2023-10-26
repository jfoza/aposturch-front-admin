/* eslint-disable no-shadow */

const state = {
  choosePrefix: null,

  prefixForm: {
    id: '',
    prefix: '',
    active: {
      boolValue: true,
      description: 'Ativo',
    },
  },
}

const mutations = {
  setChoosePrefix(state, itemData) {
    state.choosePrefix = itemData
  },

  setPrefixForm(state, itemData) {
    const {
      id,
      prefix,
      active,
    } = itemData

    state.prefixForm = {
      id,
      prefix,
      active,
    }
  },

  clearPrefixForm(state) {
    state.prefixForm = {
      id: '',
      prefix: '',
      active: {
        boolValue: true,
        description: 'Ativo',
      },
    }

    state.choosePrefix = null
  },
}

const getters = {
  getChoosePrefix: state => state.choosePrefix,
  getPrefixForm: state => state.prefixForm,
}

export default {
  namespaced: true,
  getters,
  state,
  mutations,
}
