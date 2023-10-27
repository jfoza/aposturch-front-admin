/* eslint-disable no-shadow */

const state = {
  chooseCategory: null,

  categoriesForm: {
    id: '',
    department: null,
    name: '',
    description: '',
    products: [],
  },
}

const mutations = {
  setChooseCategory(state, itemData) {
    state.chooseCategory = itemData
  },

  setCategoriesForm(state, itemData) {
    const {
      id,
      department,
      name,
      description,
      products,
    } = itemData

    state.categoriesForm = {
      id,
      department,
      name,
      description,
      products,
    }
  },

  clearCategoriesForm(state) {
    state.categoriesForm = {
      id: '',
      department: null,
      name: '',
      description: '',
      products: [],
    }

    state.chooseCategory = null
  },
}

const getters = {
  getChooseCategory: state => state.chooseCategory,
  getCategoriesForm: state => state.categoriesForm,
}

export default {
  namespaced: true,
  getters,
  state,
  mutations,
}
