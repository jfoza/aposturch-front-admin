export default {
  login: '/admin/auth/login',
  logout: '/auth/logout',

  me: '/admin/admin-users/me',
  adminUsers: '/admin/admin-users',
  adminUserId: id => `/admin/admin-users/id/${id}`,
  updateAdminUserId: id => `/admin/admin-users/${id}`,
  updateStatusUser: id => `/admin/users/status/id/${id}`,
  userAlreadyExistsByEmail: email => `/admin/users/email/${email}`,
  profiles: '/admin/profiles',
  profilesInListMembers: '/admin/profiles/members',

  customers: '/admin/customers',
  customerId: id => `/admin/customers/${id}`,
  generateNewPassCustomerUserId: id => `/admin/customers/new-password/${id}`,

  citiesByUf: uf => `/cities/uf/${uf}`,
  citiesById: id => `/cities/id/${id}`,
  citiesInPersons: '/cities/in-persons',
  citiesInChurches: '/cities/in-churches',

  zipCode: zip => `/zip-code?zipCode=${zip}`,

  modulesList: 'admin/modules/list',

  churches: 'admin/modules/membership/churches',
  churchesUserLogged: 'admin/modules/membership/churches/user',
  churchId: id => `admin/modules/membership/churches/id/${id}`,
  churchIdDelete: id => `admin/modules/membership/churches/${id}`,
  churchUniqueName: uniqueName => `/admin/modules/membership/churches/unique-name/${uniqueName}`,
  churchImage: '/admin/modules/membership/churches/upload/image',

  members: 'admin/modules/membership/members',
}
