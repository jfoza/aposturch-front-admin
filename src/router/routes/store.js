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
      subject: subjects.STORE_MODULE_SUBCATEGORIES,
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

  // PRODUCTS
  // {
  //   path: storeModuleRouter.products.path,
  //   name: storeModuleRouter.products.name,
  //   component: () => import('@/views/modules/store/products/List.vue'),
  //   meta: {
  //     resource: 'ACL',
  //     subject: subjects.STORE_MODULE_PRODUCTS,
  //     action: actions.VIEW,
  //   },
  // },
  //
  // {
  //   path: storeModuleRouter.products.path,
  //   name: storeModuleRouter.products.name,
  //   component: () => import('@/views/modules/store/products/Insert.vue'),
  //   meta: {
  //     resource: 'ACL',
  //     subject: subjects.STORE_MODULE_PRODUCTS,
  //     action: actions.INSERT,
  //   },
  // },
  //
  // {
  //   path: storeModuleRouter.products.path,
  //   name: storeModuleRouter.products.name,
  //   component: () => import('@/views/modules/store/products/Update.vue'),
  //   meta: {
  //     resource: 'ACL',
  //     subject: subjects.STORE_MODULE_PRODUCTS,
  //     action: actions.UPDATE,
  //   },
  // },
]
