import { actions, subjects } from '@/libs/acl/rules'
import menus from '@/navigation/vertical'
import usersModuleRoutes from '@/views/modules/users/routes'
import financialModuleRoutes from '@/views/modules/financial/routes'
import membershipModuleRoutes from '@/views/modules/membership/routes'
import groupsModuleRoutes from '@/views/modules/groups/routes'
import scheduleModuleRoutes from '@/views/modules/schedule/routes'
import patrimonyModuleRoutes from '@/views/modules/patrimony/routes'
import storeModuleRoutes from '@/views/modules/store/routes'

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
    icon: 'fa-solid fa-cart-shopping',
    title: 'Loja',
    description: '',
    ability: {
      subject: subjects.STORE_MODULE,
      action: actions.VIEW,
    },
    menus: menus.storeMenus,
    routerName: storeModuleRoutes.home.name,
  },

  {
    icon: 'fa-solid fa-church',
    title: 'Membresia',
    description: '',
    ability: {
      subject: subjects.MEMBERSHIP_MODULE,
      action: actions.VIEW,
    },
    menus: menus.membershipMenus,
    routerName: membershipModuleRoutes.home.name,
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

  {
    icon: 'fa-solid fa-screwdriver-wrench',
    title: 'Patrimônio',
    description: '',
    ability: {
      subject: subjects.PATRIMONY_MODULE,
      action: actions.VIEW,
    },
    menus: menus.patrimonyMenus,
    routerName: patrimonyModuleRoutes.home.name,
  },
]
