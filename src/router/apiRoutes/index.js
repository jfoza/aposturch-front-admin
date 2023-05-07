export default {
  login: '/admin/auth/login',
  logout: '/auth/logout',

  me: '/admin/admin-users/me',
  adminUsers: '/admin/admin-users',
  adminUserId: id => `/admin/admin-users/id/${id}`,
  updateAdminUserId: id => `/admin/admin-users/${id}`,
  profiles: '/admin/profiles',

  customers: '/admin/customers',
  customerId: id => `/admin/customers/${id}`,
  generateNewPassCustomerUserId: id => `/admin/customers/new-password/${id}`,

  citiesByUf: uf => `/cities/uf/${uf}`,
  citiesById: id => `/cities/id/${id}`,
  citiesInPersons: '/cities/in-persons',
  citiesInChurches: '/cities/in-churches',

  zipCode: zip => `/zip-code?zipCode=${zip}`,

  churches: 'admin/modules/membership/churches',
  churchId: id => `admin/modules/membership/churches/id/${id}`,
  churchIdDelete: id => `admin/modules/membership/churches/${id}`,
  churchUniqueName: uniqueName => `/admin/modules/membership/churches/unique-name/${uniqueName}`,
  churchImage: '/admin/modules/membership/churches/upload/image',

  membersResponsible: 'admin/modules/membership/members/responsible',
}
