import { subjects, actions } from '@/libs/acl/rules'
import usersModuleRouter from '@/views/modules/users/routes'

export default [
  {
    path: usersModuleRouter.home.path,
    name: usersModuleRouter.home.name,
    component: () => import('@/views/modules/users/home/UsersHome.vue'),
    meta: {
      resource: 'ACL',
      subject: subjects.USERS_MODULE,
      action: actions.VIEW,
    },
  },

  {
    path: usersModuleRouter.usersList.path,
    name: usersModuleRouter.usersList.name,
    component: () => import('@/views/modules/users/admin/List.vue'),
    meta: {
      resource: 'ACL',
      subject: subjects.ADMIN_USERS_VIEW,
      action: actions.VIEW,
    },
  },

  {
    path: usersModuleRouter.usersInsert.path,
    name: usersModuleRouter.usersInsert.name,
    component: () => import('@/views/modules/users/admin/Insert.vue'),
    meta: {
      resource: 'ACL',
      subject: subjects.ADMIN_USERS_INSERT,
      action: actions.INSERT,
    },
  },

  {
    path: usersModuleRouter.usersUpdate.path,
    name: usersModuleRouter.usersUpdate.name,
    component: () => import('@/views/modules/users/admin/Update.vue'),
    meta: {
      resource: 'ACL',
      subject: subjects.ADMIN_USERS_UPDATE,
      action: actions.UPDATE,
    },
  },
]
