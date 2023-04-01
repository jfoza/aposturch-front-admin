import general from '@/router/description'

export default [
  {
    path: general.notAuthorized.path,
    name: general.notAuthorized.name,
    component: () => import('@/views/pages/miscellaneous/NotAuthorized.vue'),
    meta: {
      layout: 'full',
    },
  },

  {
    path: general.notEnabled.path,
    name: general.notEnabled.name,
    component: () => import('@/views/pages/miscellaneous/NotEnabled.vue'),
    meta: {
      layout: 'full',
    },
  },

  {
    path: general.disconnected.path,
    name: general.disconnected.name,
    component: () => import('@/views/pages/miscellaneous/Disconnected.vue'),
    meta: {
      layout: 'full',
    },
  },

  {
    path: general.error404.path,
    name: general.error404.name,
    component: () => import('@/views/error/Error404.vue'),
    meta: {
      layout: 'full',
    },
  },
]
