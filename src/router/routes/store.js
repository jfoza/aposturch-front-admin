import { actions, subjects } from '@/libs/acl/rules'
import storeModuleRouter from '@/views/modules/store/routes'

export default [
  {
    path: storeModuleRouter.home.path,
    name: storeModuleRouter.home.name,
    component: () => import('@/views/modules/store/home/StoreHome.vue'),
    meta: {
      resource: 'ACL',
      subject: subjects.STORE_MODULE,
      action: actions.VIEW,
    },
  },

  // DEPARTMENTS
  {
    path: storeModuleRouter.departments.path,
    name: storeModuleRouter.departments.name,
    component: () => import('@/views/modules/store/departments/List.vue'),
    meta: {
      resource: 'ACL',
      subject: subjects.STORE_MODULE_DEPARTMENTS,
      action: actions.VIEW,
    },
  },

  {
    path: storeModuleRouter.departmentsInsert.path,
    name: storeModuleRouter.departmentsInsert.name,
    component: () => import('@/views/modules/store/departments/Insert.vue'),
    meta: {
      resource: 'ACL',
      subject: subjects.STORE_MODULE_DEPARTMENTS,
      action: actions.INSERT,
    },
  },

  {
    path: storeModuleRouter.departmentsUpdate.path,
    name: storeModuleRouter.departmentsUpdate.name,
    component: () => import('@/views/modules/store/departments/Update.vue'),
    meta: {
      resource: 'ACL',
      subject: subjects.STORE_MODULE_DEPARTMENTS,
      action: actions.UPDATE,
    },
  },

  // SUBCATEGORIES
  {
    path: storeModuleRouter.subcategories.path,
    name: storeModuleRouter.subcategories.name,
    component: () => import('@/views/modules/store/subcategories/List.vue'),
    meta: {
      resource: 'ACL',
      subject: subjects.STORE_MODULE_SUBCATEGORIES,
      action: actions.VIEW,
    },
  },

  {
    path: storeModuleRouter.subcategoriesInsert.path,
    name: storeModuleRouter.subcategoriesInsert.name,
    component: () => import('@/views/modules/store/subcategories/Insert.vue'),
    meta: {
      resource: 'ACL',
      subject: subjects.STORE_MODULE_SUBCATEGORIES,
      action: actions.INSERT,
    },
  },

  {
    path: storeModuleRouter.subcategoriesUpdate.path,
    name: storeModuleRouter.subcategoriesUpdate.name,
    component: () => import('@/views/modules/store/subcategories/Update.vue'),
    meta: {
      resource: 'ACL',
      subject: subjects.STORE_MODULE_SUBCATEGORIES,
      action: actions.UPDATE,
    },
  },

  // PREFIXES
  // {
  //   path: storeModuleRouter.prefixes.path,
  //   name: storeModuleRouter.prefixes.name,
  //   component: () => import('@/views/modules/store/prefixes/List.vue'),
  //   meta: {
  //     resource: 'ACL',
  //     subject: subjects.UNIQUE_CODE_PREFIXES,
  //     action: actions.VIEW,
  //   },
  // },
  //
  // {
  //   path: storeModuleRouter.prefixesInsert.path,
  //   name: storeModuleRouter.prefixesInsert.name,
  //   component: () => import('@/views/modules/store/prefixes/Insert.vue'),
  //   meta: {
  //     resource: 'ACL',
  //     subject: subjects.UNIQUE_CODE_PREFIXES,
  //     action: actions.INSERT,
  //   },
  // },
  //
  // {
  //   path: storeModuleRouter.prefixesUpdate.path,
  //   name: storeModuleRouter.prefixesUpdate.name,
  //   component: () => import('@/views/modules/store/prefixes/Update.vue'),
  //   meta: {
  //     resource: 'ACL',
  //     subject: subjects.UNIQUE_CODE_PREFIXES,
  //     action: actions.UPDATE,
  //   },
  // },

  // PRODUCTS
  {
    path: storeModuleRouter.products.path,
    name: storeModuleRouter.products.name,
    component: () => import('@/views/modules/store/products/List.vue'),
    meta: {
      resource: 'ACL',
      subject: subjects.STORE_MODULE_PRODUCTS,
      action: actions.VIEW,
    },
  },

  {
    path: storeModuleRouter.productsInsert.path,
    name: storeModuleRouter.productsInsert.name,
    component: () => import('@/views/modules/store/products/Insert.vue'),
    meta: {
      resource: 'ACL',
      subject: subjects.STORE_MODULE_PRODUCTS,
      action: actions.INSERT,
    },
  },

  {
    path: storeModuleRouter.productsUpdate.path,
    name: storeModuleRouter.productsUpdate.name,
    component: () => import('@/views/modules/store/products/Update.vue'),
    meta: {
      resource: 'ACL',
      subject: subjects.STORE_MODULE_PRODUCTS,
      action: actions.UPDATE,
    },
  },
]
