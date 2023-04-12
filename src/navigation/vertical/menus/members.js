import { subjects, actions } from '@/libs/acl/rules'
import membersModuleRouter from '@/views/modules/members/routes'

export default [
  {
    title: 'Início',
    icon: 'HomeIcon',
    route: membersModuleRouter.home.name,
    resource: subjects.MEMBERS_MODULE,
    action: actions.VIEW,
  },

  {
    title: 'Gerenciar Igrejas',
    icon: 'BookOpenIcon',
    children: [
      {
        title: 'Cadastrar nova',
        route: membersModuleRouter.churchesInsert.name,
        resource: subjects.MEMBERS_MODULE_CHURCH,
        action: actions.INSERT,
      },
      {
        title: 'Ver igrejas',
        route: membersModuleRouter.churches.name,
        resource: subjects.MEMBERS_MODULE_CHURCH,
        action: actions.VIEW,
      },
    ],
  },
]
