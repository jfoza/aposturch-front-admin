import { actions, subjects } from '@/libs/acl/rules'
import menus from '@/navigation/vertical'
import usersModuleRoutes from '@/views/modules/users/routes'
import financialModuleRoutes from '@/views/modules/financial/routes'
import bookstoreModuleRoutes from '@/views/modules/bookstore/routes'
import membersModuleRoutes from '@/views/modules/members/routes'
import groupsModuleRoutes from '@/views/modules/groups/routes'
import scheduleModuleRoutes from '@/views/modules/schedule/routes'

export default [
  {
    icon: 'fa-solid fa-users',
    title: 'Usuários',
    description: '',
    ability: {
      subject: subjects.USERS_MODULE,
      action: actions.VIEW,
    },
    menus: menus.usersMenus,
    routerName: usersModuleRoutes.home.name,
  },

  {
    icon: 'fa-solid fa-hand-holding-dollar',
    title: 'Financeiro',
    description: '',
    ability: {
      subject: subjects.FINANCE_MODULE,
      action: actions.VIEW,
    },
    menus: menus.financialMenus,
    routerName: financialModuleRoutes.home.name,
  },

  {
    icon: 'fa-solid fa-book-open-reader',
    title: 'Livraria',
    description: '',
    ability: {
      subject: subjects.BOOKSTORE_MODULE,
      action: actions.VIEW,
    },
    menus: menus.bookstoreMenus,
    routerName: bookstoreModuleRoutes.home.name,
  },

  {
    icon: 'fa-solid fa-church',
    title: 'Membresia',
    description: '',
    ability: {
      subject: subjects.MEMBERS_MODULE,
      action: actions.VIEW,
    },
    menus: menus.membersMenus,
    routerName: membersModuleRoutes.home.name,
  },

  {
    icon: 'fa-solid fa-people-roof',
    title: 'Grupos',
    description: '',
    ability: {
      subject: subjects.GROUPS_MODULE,
      action: actions.VIEW,
    },
    menus: menus.groupsMenus,
    routerName: groupsModuleRoutes.home.name,
  },

  {
    icon: 'fa-solid fa-calendar-check',
    title: 'Agenda',
    description: '',
    ability: {
      subject: subjects.SCHEDULE_MODULE,
      action: actions.VIEW,
    },
    menus: menus.scheduleMenus,
    routerName: scheduleModuleRoutes.home.name,
  },
]
