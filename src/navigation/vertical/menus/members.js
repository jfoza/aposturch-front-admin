import { subjects, actions } from '@/libs/acl/rules'
import { membersModuleRouter } from '@/router/path/modules'

export default [
  {
    title: 'Members',
    icon: 'HomeIcon',
    route: membersModuleRouter.name,
    resource: subjects.ROOT,
    action: actions.VIEW,
  },
]
