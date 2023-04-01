<template>
  <b-container
    fluid
    class="p-container"
  >
    <section class="cards-area">
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
    </section>
  </b-container>
</template>

<script>
import {
  BContainer,
} from 'bootstrap-vue'

import ModulesCard from '@/views/components/custom/ModulesCard.vue'
import modules from '@/views/modules'

export default {
  components: {
    BContainer,
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
    padding: 7.6rem 2rem;
  }

  .cards-area {
    display: flex;
    justify-content: center;
  }
</style>
