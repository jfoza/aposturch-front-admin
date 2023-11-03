import axiosIns from '@/libs/axios'
import apiRoutes from '@/router/apiRoutes'

export const getAdminUsers = params => new Promise((resolve, reject) => {
  axiosIns
    .get(apiRoutes.adminUsers, { params })
    .then(response => {
      resolve(response)
    })
    .catch(error => {
      reject(error)
    })
})

export const getUserId = id => new Promise((resolve, reject) => {
  axiosIns
    .get(apiRoutes.adminUserId(id))
    .then(response => {
      resolve(response)
    })
    .catch(error => {
      reject(error)
    })
})

export const getProfiles = params => new Promise((resolve, reject) => {
  axiosIns
    .get(apiRoutes.profiles, { params })
    .then(response => {
      resolve(response)
    })
    .catch(error => {
      reject(error)
    })
})

export const userAlreadyExistsValidation = email => new Promise((resolve, reject) => {
  axiosIns
    .get(apiRoutes.userAlreadyExistsByEmail(email))
    .then(response => {
      resolve(response)
    })
    .catch(error => {
      reject(error)
    })
})

export const createUser = form => new Promise((resolve, reject) => {
  axiosIns
    .post(apiRoutes.adminUsers, form)
    .then(response => {
      resolve(response)
    })
    .catch(error => {
      reject(error)
    })
})

export const saveUserImageAvatar = formData => new Promise((resolve, reject) => {
  axiosIns
    .post(apiRoutes.userImageAvatar, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then(response => {
      resolve(response)
    })
    .catch(error => {
      reject(error)
    })
})

export const removeUserImageAvatar = id => new Promise((resolve, reject) => {
  axiosIns
    .delete(apiRoutes.removeUserImageAvatar(id))
    .then(response => {
      resolve(response)
    })
    .catch(error => {
      reject(error)
    })
})

export const updateUser = (id, form) => new Promise((resolve, reject) => {
  axiosIns
    .put(apiRoutes.updateAdminUserId(id), form)
    .then(response => {
      resolve(response)
    })
    .catch(error => {
      reject(error)
    })
})
