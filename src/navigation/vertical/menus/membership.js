import { subjects, actions } from '@/libs/acl/rules'
import membershipModuleRouter from '@/views/modules/membership/routes'

export default [
  {
    title: 'Início',
    icon: 'HomeIcon',
    route: membershipModuleRouter.home.name,
    resource: subjects.MEMBERSHIP_MODULE,
    action: actions.VIEW,
  },

  {
    title: 'Gerenciar Igrejas',
    icon: 'BookOpenIcon',
    children: [
      {
        title: 'Cadastrar nova',
        route: membershipModuleRouter.churchesInsert.name,
        resource: subjects.MEMBERSHIP_MODULE_CHURCH,
        action: actions.INSERT,
      },
      {
        title: 'Ver igrejas',
        route: membershipModuleRouter.churches.name,
        resource: subjects.MEMBERSHIP_MODULE_CHURCH,
        action: actions.VIEW,
      },
    ],
  },
]
