import { subjects, actions } from '@/libs/acl/rules'
import { bookstoreModuleRouter } from '@/router/path/modules'

export default [
  {
    title: 'Bookstore',
    icon: 'HomeIcon',
    route: bookstoreModuleRouter.name,
    resource: subjects.BOOKSTORE_MODULE,
    action: actions.VIEW,
  },
]
