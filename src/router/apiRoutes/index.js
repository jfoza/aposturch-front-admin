export default {
  login: '/admin/auth/login',
  logout: '/auth/logout',

  me: '/admin/admin-users/me',
  usersByChurchId: id => `admin/users/church/${id}`,
  responsibleChurch: id => `admin/admin-users/responsible/church/${id}`,
  adminUsers: '/admin/admin-users',
  adminUsersByProfile: uniqueName => `/admin/admin-users/profile-unique-name/${uniqueName}`,
  adminUserId: id => `/admin/admin-users/id/${id}`,
  updateAdminUserId: id => `/admin/admin-users/${id}`,
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

  churches: 'admin/modules/membership/churches',
  churchId: id => `admin/modules/membership/churches/id/${id}`,
  churchUniqueName: uniqueName => `/admin/modules/membership/churches/unique-name/${uniqueName}`,
  removeMemberRelationshipChurch: id => `/admin/modules/membership/churches/user/member-relationship/${id}`,
  removeResponsibleRelationshipChurch: id => `/admin/modules/membership/churches/user/responsible-relationship/${id}`,
  churchImage: '/admin/modules/membership/churches/upload/image',
}
