// eslint-disable-next-line import/no-unresolved
import '@/assets/scss/sweetalerts.scss'
import Swal from 'sweetalert2'

export const errorMessage = message => Swal.fire({
  icon: 'error',
  html: `${message}`,
  confirmButtonText: 'Ok',
  customClass: {
    confirmButton: 'confirm-button-sweet',
  },
})

export const successMessage = (message, title) => Swal.fire({
  icon: 'success',
  title: title || '',
  html: `${message}`,
  confirmButtonText: 'Ok',
  customClass: {
    confirmButton: 'confirm-button-sweet',
  },
})

export const warningMessage = message => Swal.fire({
  icon: 'warning',
  html: `${message}`,
  confirmButtonText: 'Ok',
  customClass: {
    confirmButton: 'confirm-button-sweet',
  },
})

export const successMessageAction = message => new Promise(resolve => {
  Swal.fire({
    html: message,
    icon: 'success',
    confirmButtonText: 'Ok',
    customClass: {
      confirmButton: 'confirm-button-sweet',
    },
  }).then(result => {
    if (result.isConfirmed) {
      resolve()
    }
  })
})

export const warningMessageAction = message => new Promise(resolve => {
  Swal.fire({
    icon: 'warning',
    html: `${message}`,
    confirmButtonText: 'Ok',
    customClass: {
      confirmButton: 'confirm-button-sweet',
    },
  }).then(result => {
    if (result.isConfirmed) {
      resolve()
    }
  })
})

export const confirmAction = message => new Promise(resolve => {
  Swal.fire({
    html: message,
    icon: 'warning',
    showDenyButton: true,
    confirmButtonText: 'Sim',
    denyButtonText: 'Não',
    customClass: {
      confirmButton: 'confirm-button-sweet',
    },
  }).then(result => {
    if (result.isConfirmed) {
      resolve()
    }
  })
})
