<template>
  <b-container
    fluid
    class="p-container"
  >
    <b-row>
      <b-col
        v-for="(module, index) in modules"
        :key="index"
        xl="3"
        lg="4"
        md="6"
        sm="12"
      >
        <modules-card
          :icon="module.icon"
          :title="module.title"
          :description="module.description"
          :router-name="module.routerName"
        />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import {
  BContainer,
  BRow,
  BCol,
} from 'bootstrap-vue'

import ModulesCard from '@/views/components/custom/ModulesCard.vue'
import financialImg from '@/assets/images/custom/modules/financial.png'
import bookstoreImg from '@/assets/images/custom/modules/bookstore.png'
import membersImg from '@/assets/images/custom/modules/members.png'
import groupsImg from '@/assets/images/custom/modules/groups.png'
import scheduleImg from '@/assets/images/custom/modules/schedule.png'

import {
  financialModuleRouter,
  membersModuleRouter,
  bookstoreModuleRouter,
  groupsModuleRouter,
  scheduleModuleRouter,
} from '@/router/path/modules'

export default {
  components: {
    BContainer,
    BRow,
    BCol,
    ModulesCard,
  },

  data() {
    return {
      modules: [
        {
          icon: financialImg,
          title: 'Financeiro',
          description: '',
          routerName: financialModuleRouter.name,
        },
        {
          icon: bookstoreImg,
          title: 'Livraria',
          description: '',
          routerName: bookstoreModuleRouter.name,
        },
        {
          icon: membersImg,
          title: 'Membresia',
          description: '',
          routerName: membersModuleRouter.name,
        },
        {
          icon: groupsImg,
          title: 'Grupos',
          description: '',
          routerName: groupsModuleRouter.name,
        },
        {
          icon: scheduleImg,
          title: 'Agenda',
          description: '',
          routerName: scheduleModuleRouter.name,
        },
      ],
    }
  },
}
</script>

<style scoped>
  .p-container {
    padding: 3rem 2rem;
  }
</style>
