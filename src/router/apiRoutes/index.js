const membershipModule = 'admin/modules/membership'
const storeModule = 'admin/modules/store'

export default {
  login: '/admin/auth/login',
  logout: '/auth/logout',

  me: '/admin/admin-users/me',
  adminUsers: '/admin/admin-users',
  adminUserId: id => `/admin/admin-users/id/${id}`,
  updateAdminUserId: id => `/admin/admin-users/${id}`,
  updateStatusUser: id => `/admin/users/status/id/${id}`,
  userAlreadyExistsByEmail: email => `/admin/users/email/${email}`,
  userImageAvatar: '/admin/users/upload/image',
  profiles: '/admin/profiles',

  customers: '/admin/customers',
  customerId: id => `/admin/customers/${id}`,
  generateNewPassCustomerUserId: id => `/admin/customers/new-password/${id}`,

  citiesByUf: uf => `/cities/uf/${uf}`,
  citiesById: id => `/cities/id/${id}`,
  citiesInPersons: '/cities/in-persons',
  citiesInChurches: '/cities/in-churches',

  zipCode: zip => `/zip-code?zipCode=${zip}`,

  modulesList: 'admin/modules/list',

  churches: `${membershipModule}/churches`,
  churchesUserLogged: `${membershipModule}/churches/user`,
  churchId: id => `${membershipModule}/churches/id/${id}`,
  churchIdDelete: id => `${membershipModule}/churches/${id}`,
  churchUniqueName: uniqueName => `${membershipModule}/churches/unique-name/${uniqueName}`,
  churchImage: `${membershipModule}/churches/upload/image`,

  members: `${membershipModule}/members`,
  memberUserId: id => `${membershipModule}/members/user/${id}`,

  memberUpdateGeneralData: id => `${membershipModule}/members/general-data/id/${id}`,
  memberUpdateAddressData: id => `${membershipModule}/members/address-data/id/${id}`,
  memberUpdateChurchData: id => `${membershipModule}/members/church-data/id/${id}`,
  memberUpdateModulesData: id => `${membershipModule}/members/modules-data/id/${id}`,
  memberUpdateProfileData: id => `${membershipModule}/members/profile-data/id/${id}`,
  memberUpdatePasswordData: id => `${membershipModule}/members/password-data/id/${id}`,

  categories: `${storeModule}/categories`,
  categoryId: id => `${storeModule}/categories/id/${id}`,
  categoriesStatus: `${storeModule}/categories/status`,

  subcategories: `${storeModule}/subcategories`,
  subcategoryId: id => `${storeModule}/subcategories/id/${id}`,
  subcategoriesStatus: `${storeModule}/subcategories/status`,

  prefixes: '/unique-code/prefixes',
  prefixId: id => `/unique-code/prefixes/id/${id}`,

  uniqueCodeGenerator: '/unique-code/generator',

  products: `${storeModule}/products`,
  productsStatus: `${storeModule}/products/status`,
  productId: id => `${storeModule}/products/id/${id}`,
}
