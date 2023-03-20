import { subjects, actions } from '@/libs/acl/rules'
import { usersModuleRouter } from '@/router/path/modules'

export default [
  {
    title: 'Users',
    icon: 'HomeIcon',
    route: usersModuleRouter.name,
    resource: subjects.USERS_MODULE,
    action: actions.VIEW,
  },
]
