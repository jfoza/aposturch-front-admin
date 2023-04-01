import { actions, subjects } from '@/libs/acl/rules'
import membersModuleRouter from '@/views/modules/members/routes'

export default [
  {
    path: membersModuleRouter.home.path,
    name: membersModuleRouter.home.name,
    component: () => import('@/views/modules/members/home/MembersHome.vue'),
    meta: {
      resource: 'ACL',
      subject: subjects.MEMBERS_MODULE,
      action: actions.VIEW,
    },
  },
]
