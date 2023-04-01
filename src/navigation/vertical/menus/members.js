import { subjects, actions } from '@/libs/acl/rules'
import membersModuleRouter from '@/views/modules/members/routes'

export default [
  {
    title: 'Members',
    icon: 'HomeIcon',
    route: membersModuleRouter.home.name,
    resource: subjects.MEMBERS_MODULE,
    action: actions.VIEW,
  },
]
