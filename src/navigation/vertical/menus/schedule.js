import { subjects, actions } from '@/libs/acl/rules'
import { scheduleModuleRouter } from '@/router/path/modules'

export default [
  {
    title: 'Schedule',
    icon: 'HomeIcon',
    route: scheduleModuleRouter.name,
    resource: subjects.ROOT,
    action: actions.VIEW,
  },
]
