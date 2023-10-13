import axiosIns from '@/libs/axios'
import apiRoutes from '@/router/apiRoutes'

export const getAllSubcategories = params => new Promise((resolve, reject) => {
  axiosIns
    .get(apiRoutes.subcategories, { params })
    .then(response => {
      resolve(response)
    })
    .catch(error => {
      reject(error)
    })
})

export const getSubcategoryId = id => new Promise((resolve, reject) => {
  axiosIns
    .get(apiRoutes.subcategoryId(id))
    .then(response => {
      resolve(response)
    })
    .catch(error => {
      reject(error)
    })
})

export const createSubcategory = form => new Promise((resolve, reject) => {
  axiosIns
    .post(apiRoutes.subcategories, form)
    .then(response => {
      resolve(response)
    })
    .catch(error => {
      reject(error)
    })
})

export const updateSubcategory = (id, form) => new Promise((resolve, reject) => {
  axiosIns
    .put(apiRoutes.subcategoryId(id), form)
    .then(response => {
      resolve(response)
    })
    .catch(error => {
      reject(error)
    })
})

export const removeSubcategory = id => new Promise((resolve, reject) => {
  axiosIns
    .delete(apiRoutes.subcategoryId(id))
    .then(response => {
      resolve(response)
    })
    .catch(error => {
      reject(error)
    })
})
