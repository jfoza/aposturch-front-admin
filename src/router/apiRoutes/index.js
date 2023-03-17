import Vue from 'vue'

export const apiRoutes = {
  login: '/admin/auth/login',
  logout: '/auth/logout',

  me: '/admin/admin-users/me',
  adminUsers: '/admin/admin-users',
  adminUserId: id => `/admin/admin-users/${id}`,
  profiles: '/admin/profiles',

  themes: '/admin/themes',
  themeId: id => `/admin/themes/${id}`,

  categories: '/admin/categories',
  categoryId: id => `/admin/categories/${id}`,

  events: '/admin/events',
  eventId: id => `/admin/events/${id}`,

  products: '/admin/products',
  productImage: '/images/products',
  productId: id => `/admin/products/${id}`,

  customers: '/admin/customers',
  customerId: id => `/admin/customers/${id}`,
  generateNewPassCustomerUserId: id => `/admin/customers/new-password/${id}`,

  citiesByUf: uf => `/cities/uf/${uf}`,
  citiesById: id => `/cities/id/${id}`,
  citiesInPersons: '/cities/in-persons',

  zipCode: zip => `/zip-code?zipCode=${zip}`,

  system: '/admin/system',
  systemId: id => `/admin/system/${id}`,
}

Vue.prototype.$apiRoutes = apiRoutes
