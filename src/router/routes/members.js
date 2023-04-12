import { actions, subjects } from '@/libs/acl/rules'
import membersModuleRouter from '@/views/modules/members/routes'

export default [
  {
    path: membersModuleRouter.home.path,
    name: membersModuleRouter.home.name,
    component: () => import('@/views/modules/members/home/MembersHome.vue'),
    meta: {
      resource: 'ACL',
      subject: subjects.MEMBERS_MODULE,
      action: actions.VIEW,
    },
  },

  {
    path: membersModuleRouter.churches.path,
    name: membersModuleRouter.churches.name,
    component: () => import('@/views/modules/members/churches/List.vue'),
    meta: {
      resource: 'ACL',
      subject: subjects.MEMBERS_MODULE_CHURCH,
      action: actions.VIEW,
    },
  },

  {
    path: membersModuleRouter.churchesInsert.path,
    name: membersModuleRouter.churchesInsert.name,
    component: () => import('@/views/modules/members/churches/Insert.vue'),
    meta: {
      resource: 'ACL',
      subject: subjects.MEMBERS_MODULE_CHURCH,
      action: actions.INSERT,
    },
  },

  {
    path: membersModuleRouter.churchesUpdate.path,
    name: membersModuleRouter.churchesUpdate.name,
    component: () => import('@/views/modules/members/churches/Update.vue'),
    meta: {
      resource: 'ACL',
      subject: subjects.MEMBERS_MODULE_CHURCH,
      action: actions.UPDATE,
    },
  },
]
