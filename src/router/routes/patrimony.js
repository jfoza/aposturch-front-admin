import { actions, subjects } from '@/libs/acl/rules'
import patrimonyModuleRouter from '@/views/modules/patrimony/routes'

export default [
  {
    path: patrimonyModuleRouter.home.path,
    name: patrimonyModuleRouter.home.name,
    component: () => import('@/views/modules/patrimony/home/PatrimonyHome.vue'),
    meta: {
      resource: 'ACL',
      subject: subjects.PATRIMONY_MODULE,
      action: actions.VIEW,
    },
  },
]
