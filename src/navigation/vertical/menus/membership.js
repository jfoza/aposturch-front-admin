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
    title: 'Igrejas',
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

  {
    title: 'Membros',
    icon: 'UsersIcon',
    children: [
      {
        title: 'Cadastrar novo',
        route: membershipModuleRouter.membersInsert.name,
        resource: subjects.MEMBERSHIP_MODULE_MEMBERS,
        action: actions.INSERT,
      },
      {
        title: 'Ver Membros',
        route: membershipModuleRouter.members.name,
        resource: subjects.MEMBERSHIP_MODULE_MEMBERS,
        action: actions.VIEW,
      },
    ],
  },
]
