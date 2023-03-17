export default [
  {
    path: '/admin/login',
    name: 'auth-login',
    component: () => import('@/views/pages/authentication/Login.vue'),
    meta: {
      layout: 'full',
      resource: 'AUTH',
      redirectIfLoggedIn: true,
    },
  },
]
