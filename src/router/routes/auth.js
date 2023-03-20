import { loginRouter } from '@/router/path/general'

export default [
  {
    path: loginRouter.path,
    name: loginRouter.name,
    component: () => import('@/views/pages/authentication/Login.vue'),
    meta: {
      layout: 'full',
      resource: 'AUTH',
      redirectIfLoggedIn: true,
    },
  },
]
