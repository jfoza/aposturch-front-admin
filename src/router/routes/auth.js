import general from '@/router/general'

export default [
  {
    path: general.loginRouter.path,
    name: general.loginRouter.name,
    component: () => import('@/views/pages/authentication/Login.vue'),
    meta: {
      layout: 'full',
      resource: 'AUTH',
      redirectIfLoggedIn: true,
    },
  },
]
