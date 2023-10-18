/* eslint-disable no-shadow */

const state = {
  chooseSubcategory: null,

  subcategoriesForm: {
    id: '',
    category: null,
    name: '',
    description: '',
    products: [],
  },
}

const mutations = {
  setChooseSubcategory(state, itemData) {
    state.chooseSubcategory = itemData
  },

  setSubcategoriesForm(state, itemData) {
    const {
      id,
      category,
      name,
      description,
      products,
    } = itemData

    state.subcategoriesForm = {
      id,
      category,
      name,
      description,
      products,
    }
  },

  clearSubcategoriesForm(state) {
    state.subcategoriesForm = {
      id: '',
      category: null,
      name: '',
      description: '',
      products: [],
    }

    state.chooseSubcategory = null
  },
}

const getters = {
  getChooseSubcategory: state => state.chooseSubcategory,
  getSubcategoriesForm: state => state.subcategoriesForm,
}

export default {
  namespaced: true,
  getters,
  state,
  mutations,
}
