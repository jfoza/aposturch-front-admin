import { actions, subjects } from '@/libs/acl/rules'

export const financialMenus = [
  {
    title: 'Início',
    icon: 'HomeIcon',
    route: 'home',
    resource: subjects.ROOT,
    action: actions.VIEW,
  },
]
