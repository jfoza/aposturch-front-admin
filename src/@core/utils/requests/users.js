import axiosIns from '@/libs/axios'
import apiRoutes from '@/router/apiRoutes'

export const getUsersByChurchId = (id, params) => new Promise((resolve, reject) => {
  axiosIns
    .get(apiRoutes.usersByChurchId(id), { params })
    .then(response => {
      resolve(response)
    })
    .catch(error => {
      reject(error)
    })
})

export const getResponsibleChurch = id => new Promise((resolve, reject) => {
  axiosIns
    .get(apiRoutes.responsibleChurch(id))
    .then(response => {
      resolve(response)
    })
    .catch(error => {
      reject(error)
    })
})

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

export const getAdminUsersByProfile = uniqueName => new Promise((resolve, reject) => {
  axiosIns
    .get(apiRoutes.adminUsersByProfile(uniqueName))
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

export const getCountUsersByProfiles = () => new Promise((resolve, reject) => {
  axiosIns
    .get(apiRoutes.countUsers)
    .then(response => {
      resolve(response)
    })
    .catch(error => {
      reject(error)
    })
})

export const getProfiles = () => new Promise((resolve, reject) => {
  axiosIns
    .get(apiRoutes.profiles)
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

export const removeUserChurch = id => new Promise((resolve, reject) => {
  axiosIns
    .delete(apiRoutes.removeMemberRelationshipChurch(id))
    .then(response => {
      resolve(response)
    })
    .catch(error => {
      reject(error)
    })
})

export const removeResponsibleChurch = (userId, params) => new Promise((resolve, reject) => {
  axiosIns
    .delete(apiRoutes.removeResponsibleRelationshipChurch(userId), { params })
    .then(response => {
      resolve(response)
    })
    .catch(error => {
      reject(error)
    })
})
