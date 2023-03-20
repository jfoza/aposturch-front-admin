import { subjects, actions } from '@/libs/acl/rules'
import { financialModuleRouter } from '@/router/path/modules'

export default [
  {
    title: 'Financial',
    icon: 'HomeIcon',
    route: financialModuleRouter.name,
    resource: subjects.ROOT,
    action: actions.VIEW,
  },
]
