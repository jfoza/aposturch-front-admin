import { actions, subjects } from '@/libs/acl/rules'
import groupsModuleRouter from '@/views/modules/groups/routes'

export default [
  {
    path: groupsModuleRouter.home.path,
    name: groupsModuleRouter.home.name,
    component: () => import('@/views/modules/groups/home/GroupsHome.vue'),
    meta: {
      resource: 'ACL',
      subject: subjects.GROUPS_MODULE,
      action: actions.VIEW,
    },
  },
]
