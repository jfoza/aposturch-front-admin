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
]
