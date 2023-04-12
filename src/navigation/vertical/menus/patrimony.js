import { subjects, actions } from '@/libs/acl/rules'
import patrimonyModuleRouter from '@/views/modules/patrimony/routes'

export default [
  {
    title: 'Patrimony',
    icon: 'HomeIcon',
    route: patrimonyModuleRouter.home.name,
    resource: subjects.PATRIMONY_MODULE,
    action: actions.VIEW,
  },
]
