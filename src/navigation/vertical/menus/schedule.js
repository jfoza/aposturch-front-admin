import { subjects, actions } from '@/libs/acl/rules'
import scheduleModuleRouter from '@/views/modules/schedule/routes'

export default [
  {
    title: 'Schedule',
    icon: 'HomeIcon',
    route: scheduleModuleRouter.home.name,
    resource: subjects.SCHEDULE_MODULE,
    action: actions.VIEW,
  },
]
