import { actions, subjects } from '@/libs/acl/rules'
import bookstoreModuleRouter from '@/views/modules/bookstore/routes'

export default [
  {
    path: bookstoreModuleRouter.home.path,
    name: bookstoreModuleRouter.home.name,
    component: () => import('@/views/modules/bookstore/home/BookstoreHome.vue'),
    meta: {
      resource: 'ACL',
      subject: subjects.BOOKSTORE_MODULE,
      action: actions.VIEW,
    },
  },
]
