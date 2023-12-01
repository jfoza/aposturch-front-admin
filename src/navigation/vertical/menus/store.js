import { subjects, actions } from '@/libs/acl/rules'
import storeModuleRouter from '@/views/modules/store/routes'

export default [
  {
    title: 'Home',
    icon: 'HomeIcon',
    route: storeModuleRouter.home.name,
    resource: subjects.STORE_MODULE,
    action: actions.VIEW,
  },

  {
    title: 'Departamentos',
    icon: 'BoxIcon',
    children: [
      {
        title: 'Cadastrar novo',
        route: storeModuleRouter.departmentsInsert.name,
        resource: subjects.STORE_MODULE_DEPARTMENTS,
        action: actions.INSERT,
      },
      {
        title: 'Listar departamentos',
        route: storeModuleRouter.departments.name,
        resource: subjects.STORE_MODULE_DEPARTMENTS,
        action: actions.VIEW,
      },
    ],
  },

  {
    title: 'Categorias',
    icon: 'LayersIcon',
    children: [
      {
        title: 'Cadastrar nova',
        route: storeModuleRouter.categoriesInsert.name,
        resource: subjects.STORE_MODULE_CATEGORIES,
        action: actions.INSERT,
      },
      {
        title: 'Listar categorias',
        route: storeModuleRouter.categories.name,
        resource: subjects.STORE_MODULE_CATEGORIES,
        action: actions.VIEW,
      },
    ],
  },

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
        title: 'Listar produtos',
        route: storeModuleRouter.products.name,
        resource: subjects.STORE_MODULE_PRODUCTS,
        action: actions.VIEW,
      },
    ],
  },

  {
    title: 'Vendas',
    icon: 'ShoppingCartIcon',
    children: [
      {
        title: 'Nova venda',
        route: storeModuleRouter.salesInsert.name,
        resource: subjects.STORE_MODULE_PRODUCTS,
        action: actions.INSERT,
      },
      {
        title: 'Listar vendas',
        route: storeModuleRouter.sales.name,
        resource: subjects.STORE_MODULE_PRODUCTS,
        action: actions.VIEW,
      },
    ],
  },
]
