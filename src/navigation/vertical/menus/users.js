import { subjects, actions } from '@/libs/acl/rules'
import usersModuleRouter from '@/views/modules/users/routes'

export default [
  {
    title: 'Início',
    icon: 'HomeIcon',
    route: usersModuleRouter.home.name,
    resource: subjects.USERS_MODULE,
    action: actions.VIEW,
  },

  {
    title: 'Gerenciar usuários',
    icon: 'UsersIcon',
    children: [
      {
        title: 'Cadastrar novo',
        route: usersModuleRouter.usersList.name,
        resource: subjects.ADMIN_USERS_INSERT,
        action: actions.INSERT,
      },
      {
        title: 'Ver usuários',
        route: usersModuleRouter.usersUpdate.name,
        resource: subjects.ADMIN_USERS_VIEW,
        action: actions.VIEW,
      },
    ],
  },
]
