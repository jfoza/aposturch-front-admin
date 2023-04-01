import { subjects, actions } from '@/libs/acl/rules'
import bookstoreModuleRouter from '@/views/modules/bookstore/routes'

export default [
  {
    title: 'Bookstore',
    icon: 'HomeIcon',
    route: bookstoreModuleRouter.home.name,
    resource: subjects.BOOKSTORE_MODULE,
    action: actions.VIEW,
  },
]
