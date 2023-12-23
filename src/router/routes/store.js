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

  // CATEGORIES
  {
    path: storeModuleRouter.categories.path,
    name: storeModuleRouter.categories.name,
    component: () => import('@/views/modules/store/categories/List.vue'),
    meta: {
      resource: 'ACL',
      subject: subjects.STORE_MODULE_CATEGORIES,
      action: actions.VIEW,
    },
  },

  {
    path: storeModuleRouter.categoriesInsert.path,
    name: storeModuleRouter.categoriesInsert.name,
    component: () => import('@/views/modules/store/categories/Insert.vue'),
    meta: {
      resource: 'ACL',
      subject: subjects.STORE_MODULE_CATEGORIES,
      action: actions.INSERT,
    },
  },

  {
    path: storeModuleRouter.categoriesUpdate.path,
    name: storeModuleRouter.categoriesUpdate.name,
    component: () => import('@/views/modules/store/categories/Update.vue'),
    meta: {
      resource: 'ACL',
      subject: subjects.STORE_MODULE_CATEGORIES,
      action: actions.UPDATE,
    },
  },

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
    path: `${storeModuleRouter.productDetails.path}/:productUniqueName`,
    name: storeModuleRouter.productDetails.name,
    component: () => import('@/views/modules/store/products/ProductDetails.vue'),
    props: true,
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

  // SALES
  {
    path: storeModuleRouter.sales.path,
    name: storeModuleRouter.sales.name,
    component: () => import('@/views/modules/store/sales/List.vue'),
    meta: {
      resource: 'ACL',
      subject: subjects.STORE_MODULE_PRODUCTS,
      action: actions.VIEW,
    },
  },

  {
    path: storeModuleRouter.salesInsert.path,
    name: storeModuleRouter.salesInsert.name,
    component: () => import('@/views/modules/store/sales/Insert.vue'),
    meta: {
      resource: 'ACL',
      subject: subjects.STORE_MODULE_PRODUCTS,
      action: actions.INSERT,
    },
  },
]
