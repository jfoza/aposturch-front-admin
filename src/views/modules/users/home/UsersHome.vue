<template>
  <b-container>
    <b-row
      v-if="loading"
      class="spinner-area"
    >
      <b-spinner
        variant="custom"
        label="Loading..."
      />
    </b-row>

    <b-row
      v-if="!loading"
    >
      <dashboard-card
        :icon="adminMasterCard.icon"
        :title="adminMasterCard.title"
        :statistic="adminMasterCard.statistic"
        :ability="adminMasterCard.ability"
        :router-name="adminMasterCard.routerName"
      />

      <dashboard-card
        :icon="adminChurchCard.icon"
        :title="adminChurchCard.title"
        :statistic="adminChurchCard.statistic"
        :ability="adminChurchCard.ability"
        :router-name="adminChurchCard.routerName"
      />

      <dashboard-card
        :icon="adminDepartmentCard.icon"
        :title="adminDepartmentCard.title"
        :statistic="adminDepartmentCard.statistic"
        :ability="adminDepartmentCard.ability"
        :router-name="adminDepartmentCard.routerName"
      />

      <dashboard-card
        :icon="assistantCard.icon"
        :title="assistantCard.title"
        :statistic="assistantCard.statistic"
        :ability="assistantCard.ability"
        :router-name="assistantCard.routerName"
      />

      <dashboard-card
        :icon="membersCard.icon"
        :title="membersCard.title"
        :statistic="membersCard.statistic"
        :ability="membersCard.ability"
        :router-name="membersCard.routerName"
      />
    </b-row>
  </b-container>
</template>

<script>
import {
  BContainer,
  BRow,
  BSpinner,
} from 'bootstrap-vue'
import DashboardCard from '@/views/components/custom/DashboardCard.vue'
import { actions, subjects } from '@/libs/acl/rules'
import { getCountUsersByProfiles } from '@core/utils/requests/users'

export default {
  components: {
    BContainer,
    BRow,
    BSpinner,
    DashboardCard,
  },

  data() {
    return {
      loading: true,

      adminMasterCard: {
        icon: 'UsersIcon',
        title: 'Admin Master',
        statistic: 0,
        ability: {
          subject: subjects.ROOT,
          action: actions.VIEW,
        },
        routerName: '',
      },

      adminChurchCard: {
        icon: 'UsersIcon',
        title: 'Admin Igreja',
        statistic: 0,
        ability: {
          subject: subjects.ROOT,
          action: actions.VIEW,
        },
        routerName: '',
      },

      adminDepartmentCard: {
        icon: 'UsersIcon',
        title: 'Admin Departamento',
        statistic: 0,
        ability: {
          subject: subjects.ROOT,
          action: actions.VIEW,
        },
        routerName: '',
      },

      assistantCard: {
        icon: 'UsersIcon',
        title: 'Auxiliar',
        statistic: 0,
        ability: {
          subject: subjects.ROOT,
          action: actions.VIEW,
        },
        routerName: '',
      },

      membersCard: {
        icon: 'UsersIcon',
        title: 'Membro',
        statistic: 0,
        ability: {
          subject: subjects.ROOT,
          action: actions.VIEW,
        },
        routerName: '',
      },
    }
  },

  mounted() {
    this.handleGetCountUsers()
  },

  methods: {
    async handleGetCountUsers() {
      this.loading = true

      await getCountUsersByProfiles()
        .then(response => {
          if (response.status === 200) {
            const res = response.data

            this.adminMasterCard.statistic = res.adminMasterCount ? res.adminMasterCount : 0
            this.adminChurchCard.statistic = res.adminChurchCount ? res.adminChurchCount : 0
            this.adminDepartmentCard.statistic = res.adminDepartmentCount ? res.adminDepartmentCount : 0
            this.assistantCard.statistic = res.assistantCount ? res.assistantCount : 0
            this.membersCard.statistic = res.memberCount ? res.memberCount : 0
          }
        })

      this.loading = false
    },
  },
}
</script>

<style scoped lang="scss">
</style>
