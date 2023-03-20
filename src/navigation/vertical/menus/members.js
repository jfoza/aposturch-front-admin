import { subjects, actions } from '@/libs/acl/rules'
import { membersModuleRouter } from '@/router/path/modules'

export default [
  {
    title: 'Members',
    icon: 'HomeIcon',
    route: membersModuleRouter.name,
    resource: subjects.MEMBERS_MODULE,
    action: actions.VIEW,
  },
]
