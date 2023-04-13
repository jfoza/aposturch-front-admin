export const strClear = str => str.replace(/\D/g, '')

export const getArrayAttr = (array, field) => array.map(item => item[field])

export const randomNumberInterval = (a, b) => Math.floor(Math.random() * (b - a + 1)) + a

export const moneyFormatBRL = value => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)

export const moneyFormatEN = value => {
  let aux = value

  aux = aux.replace('.', '')

  return aux.replace(',', '.')
}

export const money = {
  decimal: ',',
  thousands: '.',
  prefix: '',
  suffix: '',
  precision: 2,
  masked: false,
}
