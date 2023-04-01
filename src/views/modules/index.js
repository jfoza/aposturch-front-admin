/* eslint-disable global-require */
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
    icon: 'UsersIcon',
    title: 'Usuários',
    hoverStyle: {
      hoverBg: '#5BC0BE',
      hoverColor: '#fff',
    },
    description: '',
    ability: {
      subject: subjects.USERS_MODULE,
      action: actions.VIEW,
    },
    menus: menus.usersMenus,
    routerName: usersModuleRoutes.home.name,
  },

  {
    icon: 'DollarSignIcon',
    title: 'Financeiro',
    hoverStyle: {
      hoverBg: '#5BC0BE',
      hoverColor: '#fff',
    },
    description: '',
    ability: {
      subject: subjects.FINANCE_MODULE,
      action: actions.VIEW,
    },
    menus: menus.financialMenus,
    routerName: financialModuleRoutes.home.name,
  },

  {
    icon: 'BookOpenIcon',
    title: 'Livraria',
    hoverStyle: {
      hoverBg: '#5BC0BE',
      hoverColor: '#fff',
    },
    description: '',
    ability: {
      subject: subjects.BOOKSTORE_MODULE,
      action: actions.VIEW,
    },
    menus: menus.bookstoreMenus,
    routerName: bookstoreModuleRoutes.home.name,
  },

  {
    icon: 'UserIcon',
    title: 'Membresia',
    hoverStyle: {
      hoverBg: '#5BC0BE',
      hoverColor: '#fff',
    },
    description: '',
    ability: {
      subject: subjects.MEMBERS_MODULE,
      action: actions.VIEW,
    },
    menus: menus.membersMenus,
    routerName: membersModuleRoutes.home.name,
  },

  {
    icon: 'LayersIcon',
    title: 'Grupos',
    hoverStyle: {
      hoverBg: '#5BC0BE',
      hoverColor: '#fff',
    },
    description: '',
    ability: {
      subject: subjects.GROUPS_MODULE,
      action: actions.VIEW,
    },
    menus: menus.groupsMenus,
    routerName: groupsModuleRoutes.home.name,
  },

  {
    icon: 'CalendarIcon',
    title: 'Agenda',
    hoverStyle: {
      hoverBg: '#5BC0BE',
      hoverColor: '#fff',
    },
    description: '',
    ability: {
      subject: subjects.SCHEDULE_MODULE,
      action: actions.VIEW,
    },
    menus: menus.scheduleMenus,
    routerName: scheduleModuleRoutes.home.name,
  },
]
