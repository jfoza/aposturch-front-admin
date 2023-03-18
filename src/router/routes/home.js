import { subjects, actions } from '@/libs/acl/rules'

export default [
  {
    path: '/admin',
    name: 'home',
    component: () => import('@/views/home/Home.vue'),
    meta: {
      resource: 'ACL',
      subject: subjects.ROOT,
      action: actions.VIEW,
    },
  },
]
