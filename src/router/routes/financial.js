import { actions, subjects } from '@/libs/acl/rules'
import financialModuleRouter from '@/views/modules/financial/routes'

export default [
  {
    path: financialModuleRouter.home.path,
    name: financialModuleRouter.home.name,
    component: () => import('@/views/modules/financial/home/FinancialHome.vue'),
    meta: {
      resource: 'ACL',
      subject: subjects.FINANCE_MODULE,
      action: actions.VIEW,
    },
  },
]
