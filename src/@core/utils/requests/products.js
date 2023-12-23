import axiosIns from '@/libs/axios'
import apiRoutes from '@/router/apiRoutes'

export const getAllProducts = params => new Promise((resolve, reject) => {
  axiosIns
    .get(apiRoutes.products, { params })
    .then(response => {
      resolve(response)
    })
    .catch(error => {
      reject(error)
    })
})

export const getProductId = id => new Promise((resolve, reject) => {
  axiosIns
    .get(apiRoutes.productId(id))
    .then(response => {
      resolve(response)
    })
    .catch(error => {
      reject(error)
    })
})

export const getProductUniqueName = uniqueName => new Promise((resolve, reject) => {
  axiosIns
    .get(apiRoutes.productUniqueName(uniqueName))
    .then(response => {
      resolve(response)
    })
    .catch(error => {
      reject(error)
    })
})

export const createProduct = form => new Promise((resolve, reject) => {
  axiosIns
    .post(apiRoutes.products, form)
    .then(response => {
      resolve(response)
    })
    .catch(error => {
      reject(error)
    })
})

export const updateProduct = (id, form) => new Promise((resolve, reject) => {
  axiosIns
    .put(apiRoutes.productId(id), form)
    .then(response => {
      resolve(response)
    })
    .catch(error => {
      reject(error)
    })
})

export const updateStatusProducts = form => new Promise((resolve, reject) => {
  axiosIns
    .put(apiRoutes.productsStatus, form)
    .then(response => {
      resolve(response)
    })
    .catch(error => {
      reject(error)
    })
})

export const removeProduct = id => new Promise((resolve, reject) => {
  axiosIns
    .delete(apiRoutes.productId(id))
    .then(response => {
      resolve(response)
    })
    .catch(error => {
      reject(error)
    })
})
