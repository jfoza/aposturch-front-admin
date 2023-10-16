import axiosIns from '@/libs/axios'
import apiRoutes from '@/router/apiRoutes'

export const getAllCategories = params => new Promise((resolve, reject) => {
  axiosIns
    .get(apiRoutes.categories, { params })
    .then(response => {
      resolve(response)
    })
    .catch(error => {
      reject(error)
    })
})

export const getCategoryId = id => new Promise((resolve, reject) => {
  axiosIns
    .get(apiRoutes.categoryId(id))
    .then(response => {
      resolve(response)
    })
    .catch(error => {
      reject(error)
    })
})

export const createCategory = form => new Promise((resolve, reject) => {
  axiosIns
    .post(apiRoutes.categories, form)
    .then(response => {
      resolve(response)
    })
    .catch(error => {
      reject(error)
    })
})

export const updateCategory = (id, form) => new Promise((resolve, reject) => {
  axiosIns
    .put(apiRoutes.categoryId(id), form)
    .then(response => {
      resolve(response)
    })
    .catch(error => {
      reject(error)
    })
})

export const updateStatusCategories = form => new Promise((resolve, reject) => {
  axiosIns
    .put(apiRoutes.categoriesStatus, form)
    .then(response => {
      resolve(response)
    })
    .catch(error => {
      reject(error)
    })
})

export const removeCategory = id => new Promise((resolve, reject) => {
  axiosIns
    .delete(apiRoutes.categoryId(id))
    .then(response => {
      resolve(response)
    })
    .catch(error => {
      reject(error)
    })
})
