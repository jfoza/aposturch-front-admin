<template>
  <b-container
    fluid
    class="p-container"
  >
    <b-row>
      <modules-card
        v-for="(module, index) in modules"
        :key="index"
        :icon="module.icon"
        :title="module.title"
        :description="module.description"
        :ability="module.ability"
        :menus="module.menus"
        :router-name="module.routerName"
      />
    </b-row>
  </b-container>
</template>

<script>
import {
  BContainer,
  BRow,
} from 'bootstrap-vue'

import ModulesCard from '@/views/components/custom/ModulesCard.vue'
import modules from './modules'

export default {
  components: {
    BContainer,
    BRow,
    ModulesCard,
  },

  data() {
    return {
      modules,
    }
  },
}
</script>

<style scoped>
  .p-container {
    padding: 3rem 2rem;
  }
</style>
