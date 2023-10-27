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
    categories: [],
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
      categories,
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
      categories,
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
      categories: [],
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
