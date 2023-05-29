import axiosIns from '@/libs/axios'
import apiRoutes from '@/router/apiRoutes'

export const getAllMembers = params => new Promise((resolve, reject) => {
  axiosIns
    .get(apiRoutes.members, { params })
    .then(response => {
      resolve(response)
    })
    .catch(error => {
      reject(error)
    })
})

export const createUserMember = form => new Promise((resolve, reject) => {
  axiosIns
    .post(apiRoutes.members, form)
    .then(response => {
      resolve(response)
    })
    .catch(error => {
      reject(error)
    })
})
