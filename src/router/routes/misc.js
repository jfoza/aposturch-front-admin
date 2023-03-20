import {
  notAuthorized,
  notEnabled,
  disconnected,
  error404,
} from '@/router/path/general'

export default [
  {
    path: notAuthorized.path,
    name: notAuthorized.name,
    component: () => import('@/views/pages/miscellaneous/NotAuthorized.vue'),
    meta: {
      layout: 'full',
    },
  },

  {
    path: notEnabled.path,
    name: notEnabled.name,
    component: () => import('@/views/pages/miscellaneous/NotEnabled.vue'),
    meta: {
      layout: 'full',
    },
  },

  {
    path: disconnected.path,
    name: disconnected.name,
    component: () => import('@/views/pages/miscellaneous/Disconnected.vue'),
    meta: {
      layout: 'full',
    },
  },

  {
    path: error404.path,
    name: error404.name,
    component: () => import('@/views/error/Error404.vue'),
    meta: {
      layout: 'full',
    },
  },
]
