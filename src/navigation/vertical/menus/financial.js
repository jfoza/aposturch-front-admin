import { subjects, actions } from '@/libs/acl/rules'
import financialModuleRouter from '@/views/modules/financial/routes'

export default [
  {
    title: 'Financial',
    icon: 'HomeIcon',
    route: financialModuleRouter.home.name,
    resource: subjects.FINANCE_MODULE,
    action: actions.VIEW,
  },
]
