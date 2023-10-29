/* eslint-disable no-shadow */

const state = {
  chooseDepartment: null,

  departmentsForm: {
    id: '',
    name: '',
    description: '',
    categories: [],
  },
}

const mutations = {
  setChooseDepartment(state, itemData) {
    state.chooseDepartment = itemData
  },

  setDepartmentsForm(state, itemData) {
    const {
      id,
      name,
      description,
      categories,
    } = itemData

    state.departmentsForm = {
      id,
      name,
      description,
      categories,
    }
  },

  clearDepartmentsForm(state) {
    state.departmentsForm = {
      id: '',
      name: '',
      description: '',
      categories: [],
    }

    state.chooseDepartment = null
  },
}

const getters = {
  getChooseDepartment: state => state.chooseDepartment,
  getDepartmentsForm: state => state.departmentsForm,
}

export default {
  namespaced: true,
  getters,
  state,
  mutations,
}
