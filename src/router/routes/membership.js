import { actions, subjects } from '@/libs/acl/rules'
import membershipModuleRouter from '@/views/modules/membership/routes'

export default [
  {
    path: membershipModuleRouter.home.path,
    name: membershipModuleRouter.home.name,
    component: () => import('@/views/modules/membership/home/MembersHome.vue'),
    meta: {
      resource: 'ACL',
      subject: subjects.MEMBERSHIP_MODULE,
      action: actions.VIEW,
    },
  },

  {
    path: membershipModuleRouter.churches.path,
    name: membershipModuleRouter.churches.name,
    component: () => import('@/views/modules/membership/churches/List.vue'),
    meta: {
      resource: 'ACL',
      subject: subjects.MEMBERSHIP_MODULE_CHURCH,
      action: actions.VIEW,
    },
  },

  {
    path: `${membershipModuleRouter.churchView.path}/:churchUniqueName`,
    name: membershipModuleRouter.churchView.name,
    component: () => import('@/views/modules/membership/churches/View.vue'),
    props: true,
    meta: {
      resource: 'ACL',
      subject: subjects.MEMBERSHIP_MODULE_CHURCH_DETAILS,
      action: actions.VIEW,
    },
  },

  {
    path: membershipModuleRouter.churchesInsert.path,
    name: membershipModuleRouter.churchesInsert.name,
    component: () => import('@/views/modules/membership/churches/Insert.vue'),
    meta: {
      resource: 'ACL',
      subject: subjects.MEMBERSHIP_MODULE_CHURCH,
      action: actions.INSERT,
    },
  },

  {
    path: membershipModuleRouter.churchesUpdate.path,
    name: membershipModuleRouter.churchesUpdate.name,
    component: () => import('@/views/modules/membership/churches/Update.vue'),
    meta: {
      resource: 'ACL',
      subject: subjects.MEMBERSHIP_MODULE_CHURCH,
      action: actions.UPDATE,
    },
  },
]
