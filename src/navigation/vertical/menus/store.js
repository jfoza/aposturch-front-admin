import { subjects, actions } from '@/libs/acl/rules'
import storeModuleRouter from '@/views/modules/store/routes'

export default [
  {
    title: 'Store',
    icon: 'HomeIcon',
    route: storeModuleRouter.home.name,
    resource: subjects.STORE_MODULE,
    action: actions.VIEW,
  },
]
