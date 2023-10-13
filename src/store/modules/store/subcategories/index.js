/* eslint-disable no-shadow */
const state = {
  chooseSubcategory: null,

  subcategoryForm: {
    categoryId: '',
    name: '',
    description: '',
  },
}

const mutations = {
  setChooseSubcategory(state, itemData) {
    state.chooseSubcategory = itemData
  },

  setSubcategoryForm(state, itemData) {
    const {
      categoryId,
      name,
      description,
    } = itemData

    state.subcategoryForm = {
      categoryId,
      name,
      description,
    }
  },
}

const getters = {
  getChooseSubcategory: state => state.chooseSubcategory,
  getSubcategoriesForm: state => state.subcategoryForm,
}

export default {
  namespaced: true,
  getters,
  state,
  mutations,
}
