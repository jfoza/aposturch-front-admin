/* eslint-disable no-shadow */
import storeModuleRoutes from '@/views/modules/store/routes'

const state = {
  storeModuleRoutes,

  chooseCategory: null,

  categoriesForm: {
    id: '',
    name: '',
    description: '',
    subcategory: [],
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
      subcategory,
    } = itemData

    state.categoriesForm = {
      id,
      name,
      description,
      subcategory,
    }
  },

  clearCategoriesForm(state) {
    state.categoriesForm = {
      id: '',
      name: '',
      description: '',
      subcategory: [],
    }

    state.chooseCategory = null
  },
}

const getters = {
  getChooseCategory: state => state.chooseCategory,
  getCategoriesForm: state => state.categoriesForm,

  getStoreModuleRoutes: state => state.storeModuleRoutes,
}

export default {
  namespaced: true,
  getters,
  state,
  mutations,
}
