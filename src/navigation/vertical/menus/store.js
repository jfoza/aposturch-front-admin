import { subjects, actions } from '@/libs/acl/rules'
import storeModuleRouter from '@/views/modules/store/routes'

export default [
  {
    title: 'Store',
    icon: 'HomeIcon',
    route: storeModuleRouter.home.name,
    resource: subjects.STORE_MODULE,
    action: actions.VIEW,
  },

  {
    title: 'Categorias',
    icon: 'BoxIcon',
    children: [
      {
        title: 'Cadastrar nova',
        route: storeModuleRouter.categoriesInsert.name,
        resource: subjects.STORE_MODULE_CATEGORIES,
        action: actions.INSERT,
      },
      {
        title: 'Ver categorias',
        route: storeModuleRouter.categories.name,
        resource: subjects.STORE_MODULE_CATEGORIES,
        action: actions.VIEW,
      },
    ],
  },

  {
    title: 'Subcategorias',
    icon: 'LayersIcon',
    children: [
      {
        title: 'Cadastrar nova',
        route: storeModuleRouter.subcategoriesInsert.name,
        resource: subjects.STORE_MODULE_SUBCATEGORIES,
        action: actions.INSERT,
      },
      {
        title: 'Ver subcategorias',
        route: storeModuleRouter.subcategories.name,
        resource: subjects.STORE_MODULE_SUBCATEGORIES,
        action: actions.VIEW,
      },
    ],
  },

  // {
  //   title: 'Prefixos',
  //   icon: 'CodeIcon',
  //   children: [
  //     {
  //       title: 'Cadastrar novo',
  //       route: storeModuleRouter.prefixesInsert.name,
  //       resource: subjects.UNIQUE_CODE_PREFIXES,
  //       action: actions.INSERT,
  //     },
  //     {
  //       title: 'Ver prefixos',
  //       route: storeModuleRouter.prefixes.name,
  //       resource: subjects.UNIQUE_CODE_PREFIXES,
  //       action: actions.VIEW,
  //     },
  //   ],
  // },

  {
    title: 'Produtos',
    icon: 'ShoppingBagIcon',
    children: [
      {
        title: 'Cadastrar novo',
        route: storeModuleRouter.productsInsert.name,
        resource: subjects.STORE_MODULE_PRODUCTS,
        action: actions.INSERT,
      },
      {
        title: 'Ver produtos',
        route: storeModuleRouter.products.name,
        resource: subjects.STORE_MODULE_PRODUCTS,
        action: actions.VIEW,
      },
    ],
  },
]
