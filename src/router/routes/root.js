import { actions, subjects } from '@/libs/acl/rules'
import {
  homeRouter,
  financialModuleRouter,
  membersModuleRouter,
  bookstoreModuleRouter,
  groupsModuleRouter,
  scheduleModuleRouter,
} from '@/router/path/modules'

export default [
  {
    path: homeRouter.path,
    name: homeRouter.name,
    component: () => import('@/views/modules/Index.vue'),
    meta: {
      layout: 'modules',
      resource: 'AUTH',
      // subject: subjects.ROOT,
      // action: actions.VIEW,
    },
  },

  {
    path: financialModuleRouter.path,
    name: financialModuleRouter.name,
    component: () => import('@/views/modules/financial/home/FinancialHome.vue'),
    meta: {
      resource: 'AUTH',
      // subject: subjects.ROOT,
      // action: actions.VIEW,
    },
  },

  {
    path: membersModuleRouter.path,
    name: membersModuleRouter.name,
    component: () => import('@/views/modules/members/home/MembersHome.vue'),
    meta: {
      resource: 'AUTH',
      // subject: subjects.ROOT,
      // action: actions.VIEW,
    },
  },

  {
    path: bookstoreModuleRouter.path,
    name: bookstoreModuleRouter.name,
    component: () => import('@/views/modules/bookstore/home/BookstoreHome.vue'),
    meta: {
      resource: 'AUTH',
      // subject: subjects.ROOT,
      // action: actions.VIEW,
    },
  },

  {
    path: groupsModuleRouter.path,
    name: groupsModuleRouter.name,
    component: () => import('@/views/modules/groups/home/GroupsHome.vue'),
    meta: {
      resource: 'AUTH',
      // subject: subjects.ROOT,
      // action: actions.VIEW,
    },
  },

  {
    path: scheduleModuleRouter.path,
    name: scheduleModuleRouter.name,
    component: () => import('@/views/modules/schedule/home/ScheduleHome.vue'),
    meta: {
      resource: 'AUTH',
      // subject: subjects.ROOT,
      // action: actions.VIEW,
    },
  },
]
