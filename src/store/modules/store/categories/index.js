/* eslint-disable no-shadow */

const state = {
  chooseCategory: null,

  categoriesForm: {
    id: '',
    name: '',
    description: '',
    subcategories: [],
  },
}

const mutations = {
  setChooseCategory(state, itemData) {
    state.chooseCategory = itemData
  },

  setCategoriesForm(state, itemData) {
    const {
      id,
      name,
      description,
      subcategories,
    } = itemData

    state.categoriesForm = {
      id,
      name,
      description,
      subcategories,
    }
  },

  clearCategoriesForm(state) {
    state.categoriesForm = {
      id: '',
      name: '',
      description: '',
      subcategories: [],
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
