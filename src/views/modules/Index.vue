<template>
  <b-container
    fluid
    class="p-container"
  >
    <b-row class="cards-area">
      <Card
        v-for="(module, index) in modules"
        :key="index"
        :icon="module.icon"
        :title="module.title"
        :description="module.description"
        :ability="module.ability"
        :menus="module.menus"
        :router-name="module.routerName"
        :define-menus="true"
      />
    </b-row>
  </b-container>
</template>

<script>
import {
  BContainer,
  BRow,
} from 'bootstrap-vue'

import Card from '@/views/components/custom/Card.vue'
import modules from '@/views/modules'

export default {
  components: {
    BContainer,
    BRow,
    Card,
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
    padding: 5rem 2rem;
  }

  .cards-area {
    display: flex;
    justify-content: center;
  }
</style>
