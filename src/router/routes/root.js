import { actions, subjects } from '@/libs/acl/rules'
import {
  homeRouter,
  financialModuleRouter,
  membersModuleRouter,
  bookstoreModuleRouter,
  groupsModuleRouter,
  scheduleModuleRouter,
  usersModuleRouter,
} from '@/router/path/modules'

export default [
  {
    path: homeRouter.path,
    name: homeRouter.name,
    component: () => import('@/views/modules/Index.vue'),
    meta: {
      layout: 'modules',
      subject: subjects.ROOT,
      action: actions.VIEW,
    },
  },

  {
    path: usersModuleRouter.path,
    name: usersModuleRouter.name,
    component: () => import('@/views/modules/users/Users.vue'),
    meta: {
      subject: subjects.USERS_MODULE,
      action: actions.VIEW,
    },
  },

  {
    path: financialModuleRouter.path,
    name: financialModuleRouter.name,
    component: () => import('@/views/modules/financial/home/FinancialHome.vue'),
    meta: {
      subject: subjects.FINANCE_MODULE,
      action: actions.VIEW,
    },
  },

  {
    path: membersModuleRouter.path,
    name: membersModuleRouter.name,
    component: () => import('@/views/modules/members/home/MembersHome.vue'),
    meta: {
      subject: subjects.MEMBERS_MODULE,
      action: actions.VIEW,
    },
  },

  {
    path: bookstoreModuleRouter.path,
    name: bookstoreModuleRouter.name,
    component: () => import('@/views/modules/bookstore/home/BookstoreHome.vue'),
    meta: {
      subject: subjects.BOOKSTORE_MODULE,
      action: actions.VIEW,
    },
  },

  {
    path: groupsModuleRouter.path,
    name: groupsModuleRouter.name,
    component: () => import('@/views/modules/groups/home/GroupsHome.vue'),
    meta: {
      subject: subjects.GROUPS_MODULE,
      action: actions.VIEW,
    },
  },

  {
    path: scheduleModuleRouter.path,
    name: scheduleModuleRouter.name,
    component: () => import('@/views/modules/schedule/home/ScheduleHome.vue'),
    meta: {
      subject: subjects.SCHEDULE_MODULE,
      action: actions.VIEW,
    },
  },
]
