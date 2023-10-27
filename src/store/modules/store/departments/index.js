/* eslint-disable no-shadow */

const state = {
  chooseDepartment: null,

  departmentsForm: {
    id: '',
    name: '',
    description: '',
    subcategories: [],
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
      subcategories,
    } = itemData

    state.departmentsForm = {
      id,
      name,
      description,
      subcategories,
    }
  },

  clearDepartmentsForm(state) {
    state.departmentsForm = {
      id: '',
      name: '',
      description: '',
      subcategories: [],
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
