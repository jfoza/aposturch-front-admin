import Vue from 'vue'
import VueRouter from 'vue-router'

// Routes
import { canNavigate } from '@/libs/acl/routeProtection'
import { getHomeRouteForLoggedInUser, getUserData, isUserLoggedIn } from '@/auth/utils'
import generalRoutes from '@/router/general'
import auth from './routes/auth'
import misc from './routes/misc'
import root from './routes/root'
import users from './routes/users'
import financial from './routes/financial'
import store from './routes/store'
import membership from './routes/membership'
import groups from './routes/groups'
import patrimony from './routes/patrimony'
import schedule from './routes/schedule'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior() {
    return { x: 0, y: 0 }
  },
  routes: [
    { path: '/', redirect: { name: generalRoutes.homeRouter.name } },
    ...auth,
    ...misc,
    ...root,
    ...users,
    ...financial,
    ...store,
    ...membership,
    ...groups,
    ...patrimony,
    ...schedule,
    {
      path: '*',
      redirect: { name: generalRoutes.error404.name },
    },
  ],
})

router.beforeEach((to, _, next) => {
  const userData = getUserData()
  const isLoggedIn = isUserLoggedIn()

  if (to.meta.resource === 'AUTH' && isLoggedIn) {
    return next(getHomeRouteForLoggedInUser(userData ? userData.role : null))
  }

  if (to.meta.resource === 'ACL') {
    if (!isLoggedIn) return next({ name: generalRoutes.loginRouter.name })

    if (!canNavigate(to)) {
      return next({ name: generalRoutes.notAuthorized.name })
    }
  }

  return next()
})

// ? For splash screen
// Remove afterEach hook if you are not using splash screen
router.afterEach(() => {
  // Remove initial loading
  const appLoading = document.getElementById('loading-bg')
  if (appLoading) {
    appLoading.style.display = 'none'
  }
})

export default router
