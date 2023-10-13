// eslint-disable-next-line import/no-unresolved
import '@/assets/scss/sweetalerts.scss'
import Swal from 'sweetalert2'

const successIcon = require('@/assets/images/icons/custom/check-success.png')
const exclamationWarningIcon = require('@/assets/images/icons/custom/exclamation-warning.png')
const exclamationInfoIcon = require('@/assets/images/icons/custom/exclamation-info-icon.png')
const errorIcon = require('@/assets/images/icons/custom/error-x.png')

const iconHtml = (icon, width) => `<img width="${width || 80}" src="${icon}" alt="" />`

export const errorMessage = message => Swal.fire({
  iconHtml: iconHtml(errorIcon),
  html: `${message || ''}`,
  confirmButtonText: 'Ok',
  customClass: {
    confirmButton: 'confirm-button-sweet',
  },
})

export const successMessage = (message, title) => Swal.fire({
  iconHtml: iconHtml(successIcon, 60),
  title: title || '',
  html: `${message || ''}`,
  confirmButtonText: 'Ok',
  customClass: {
    confirmButton: 'success-outline-button-sweet',
  },
})

export const warningMessage = message => Swal.fire({
  iconHtml: iconHtml(exclamationWarningIcon),
  html: `${message || ''}`,
  confirmButtonText: 'Ok',
  customClass: {
    confirmButton: 'confirm-button-sweet',
  },
})

export const warningInfoMessage = (title, message, messageButton) => Swal.fire({
  iconHtml: iconHtml(exclamationInfoIcon),
  title: title || '',
  html: `${message || ''}`,
  confirmButtonText: messageButton || '',
  customClass: {
    confirmButton: 'confirm-button-sweet',
  },
})

export const successMessageAction = message => new Promise(resolve => {
  Swal.fire({
    iconHtml: iconHtml(successIcon),
    html: `${message || ''}`,
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

export const warningMessageAction = (title, message, confirmButtonMessage) => new Promise(resolve => {
  Swal.fire({
    iconHtml: iconHtml(exclamationWarningIcon),
    title: title || '',
    html: `${message || ''}`,
    showDenyButton: true,
    confirmButtonText: confirmButtonMessage || '',
    denyButtonText: 'Cancelar',
    customClass: {
      confirmButton: 'confirm-button-sweet',
      denyButton: 'cancel-button-sweet',
    },
  }).then(result => {
    if (result.isConfirmed) {
      resolve()
    }
  })
})

export const confirmAction = message => new Promise(resolve => {
  Swal.fire({
    html: message || '',
    iconHtml: iconHtml(exclamationWarningIcon),
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
