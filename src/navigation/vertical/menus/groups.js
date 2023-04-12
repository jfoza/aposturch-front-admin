import { subjects, actions } from '@/libs/acl/rules'
import groupsModuleRouter from '@/views/modules/groups/routes'

export default [
  {
    title: 'Groups',
    icon: 'HomeIcon',
    route: groupsModuleRouter.home.name,
    resource: subjects.GROUPS_MODULE,
    action: actions.VIEW,
  },
]
