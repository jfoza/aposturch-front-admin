import { subjects, actions } from '@/libs/acl/rules'

export default [
  {
    title: 'Início',
    icon: 'HomeIcon',
    route: 'home',
    resource: subjects.ROOT,
    action: actions.VIEW,
  },
]
