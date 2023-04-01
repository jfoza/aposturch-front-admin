import { actions, subjects } from '@/libs/acl/rules'
import general from '@/router/description'

export default [
  {
    path: general.homeRouter.path,
    name: general.homeRouter.name,
    component: () => import('@/views/modules/Index.vue'),
    meta: {
      layout: 'modules',
      resource: 'ACL',
      subject: subjects.ROOT,
      action: actions.VIEW,
    },
  },
]
