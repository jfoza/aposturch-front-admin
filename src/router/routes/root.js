import { actions, subjects } from '@/libs/acl/rules'
import { homeRouter } from '@/router/path/modules'

export default [
  {
    path: homeRouter.path,
    name: homeRouter.name,
    component: () => import('@/views/modules/Index.vue'),
    meta: {
      layout: 'modules',
      resource: 'ACL',
      subject: subjects.ROOT,
      action: actions.VIEW,
    },
  },
]
