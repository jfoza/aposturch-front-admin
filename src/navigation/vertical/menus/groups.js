import { subjects, actions } from '@/libs/acl/rules'
import { groupsModuleRouter } from '@/router/path/modules'

export default [
  {
    title: 'Groups',
    icon: 'HomeIcon',
    route: groupsModuleRouter.name,
    resource: subjects.GROUPS_MODULE,
    action: actions.VIEW,
  },
]
