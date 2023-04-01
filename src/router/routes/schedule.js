import { actions, subjects } from '@/libs/acl/rules'
import scheduleModuleRouter from '@/views/modules/schedule/routes'

export default [
  {
    path: scheduleModuleRouter.home.path,
    name: scheduleModuleRouter.home.name,
    component: () => import('@/views/modules/schedule/home/ScheduleHome.vue'),
    meta: {
      resource: 'ACL',
      subject: subjects.SCHEDULE_MODULE,
      action: actions.VIEW,
    },
  },
]
