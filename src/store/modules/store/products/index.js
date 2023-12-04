/* eslint-disable no-shadow */

import { uuidV4Generate } from '@core/utils/validations/uuidv4'

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
    imageLinks: [],
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
      imageLinks,
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
      imageLinks,
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
      imageLinks: [
        { id: '', type: '', path: '' },
      ],
    }
  },

  clearChooseProduct(state) {
    state.chooseProduct = null
  },

  handlePushImageLink(state) {
    state.productsForm.imageLinks.push({
      id: '',
      type: '',
      path: '',
    })
  },

  handleRemoveImageLink(state, item) {
    state.productsForm.imageLinks.splice(item, 1)
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
