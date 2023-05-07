import axiosIns from '@/libs/axios'
import apiRoutes from '@/router/apiRoutes'

export const getMembersResponsible = () => new Promise((resolve, reject) => {
  axiosIns
    .get(apiRoutes.membersResponsible)
    .then(response => {
      resolve(response)
    })
    .catch(error => {
      reject(error)
    })
})
