export default {
  login: '/admin/auth/login',
  logout: '/auth/logout',

  me: '/admin/admin-users/me',
  usersByChurchId: id => `admin/users/church/${id}`,
  adminUsers: '/admin/admin-users',
  adminUserId: id => `/admin/admin-users/id/${id}`,
  countUsers: '/admin/admin-users/count/profiles',
  profiles: '/admin/profiles',

  customers: '/admin/customers',
  customerId: id => `/admin/customers/${id}`,
  generateNewPassCustomerUserId: id => `/admin/customers/new-password/${id}`,

  citiesByUf: uf => `/cities/uf/${uf}`,
  citiesById: id => `/cities/id/${id}`,
  citiesInPersons: '/cities/in-persons',
  citiesInChurches: '/cities/in-churches',

  zipCode: zip => `/zip-code?zipCode=${zip}`,

  churches: 'admin/modules/members/churches',
  churchId: id => `admin/modules/members/churches/id/${id}`,
  churchUniqueName: uniqueName => `/admin/modules/members/churches/unique-name/${uniqueName}`,
  removeRelationshipChurch: id => `/admin/modules/members/churches/user/relationship/${id}`,
  churchImage: '/admin/modules/members/churches/upload/image',
}
