import { actions, subjects } from '@/libs/acl/rules'
import menus from '@/navigation/vertical'
import financialImg from '@/assets/images/custom/modules/financial.png'
import bookstoreImg from '@/assets/images/custom/modules/bookstore.png'
import membersImg from '@/assets/images/custom/modules/members.png'
import groupsImg from '@/assets/images/custom/modules/groups.png'
import scheduleImg from '@/assets/images/custom/modules/schedule.png'
import {
  bookstoreModuleRouter,
  financialModuleRouter,
  groupsModuleRouter,
  membersModuleRouter, scheduleModuleRouter,
} from '@/router/path/modules'

export default [
  {
    icon: financialImg,
    title: 'Financeiro',
    description: '',
    ability: {
      subject: subjects.FINANCE_MODULE,
      action: actions.VIEW,
    },
    menus: menus.financialMenus,
    routerName: financialModuleRouter.name,
  },

  {
    icon: bookstoreImg,
    title: 'Livraria',
    description: '',
    ability: {
      subject: subjects.BOOKSTORE_MODULE,
      action: actions.VIEW,
    },
    menus: menus.bookstoreMenus,
    routerName: bookstoreModuleRouter.name,
  },

  {
    icon: membersImg,
    title: 'Membresia',
    description: '',
    ability: {
      subject: subjects.MEMBERS_MODULE,
      action: actions.VIEW,
    },
    menus: menus.membersMenus,
    routerName: membersModuleRouter.name,
  },

  {
    icon: groupsImg,
    title: 'Grupos',
    description: '',
    ability: {
      subject: subjects.GROUPS_MODULE_VIEW,
      action: actions.VIEW,
    },
    menus: menus.groupsMenus,
    routerName: groupsModuleRouter.name,
  },

  {
    icon: scheduleImg,
    title: 'Agenda',
    description: '',
    ability: {
      subject: subjects.SCHEDULE_MODULE,
      action: actions.VIEW,
    },
    menus: menus.scheduleMenus,
    routerName: scheduleModuleRouter.name,
  },
]
