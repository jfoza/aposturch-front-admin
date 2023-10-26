/* eslint-disable no-shadow */

const state = {
  chooseProduct: null,

  productsForm: {
    id: '',
    productName: '',
    productDescription: '',
    prefix: null,
    productCode: '',
    productValue: '',
    productQuantity: '',
    productBalance: '',
    highlightProduct: false,
    subcategories: [],
  },
}

const mutations = {
  setChooseProduct(state, itemData) {
    state.chooseProduct = itemData
  },

  setProductsForm(state, itemData) {
    const {
      id,
      productName,
      productDescription,
      productCode,
      productValue,
      productQuantity,
      productBalance,
      highlightProduct,
      subcategories,
    } = itemData

    state.productsForm = {
      id,
      productName,
      productDescription,
      productCode,
      productValue,
      productQuantity,
      productBalance,
      highlightProduct,
      subcategories,
    }
  },

  clearProductsForm(state) {
    state.productsForm = {
      id: '',
      productName: '',
      productDescription: '',
      prefix: null,
      productCode: '',
      productValue: '',
      productQuantity: '',
      productBalance: '',
      highlightProduct: false,
      subcategories: [],
    }
  },

  clearChooseProduct(state) {
    state.chooseProduct = null
  },
}

const getters = {
  getChooseProduct: state => state.chooseProduct,
  getProductsForm: state => state.productsForm,
}

export default {
  namespaced: true,
  getters,
  state,
  mutations,
}
