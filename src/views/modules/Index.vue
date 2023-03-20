<template>
  <b-container
    fluid
    class="m-container"
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
          icon: '',
          title: '',
          description: '',
          routerName: '',
        },
      ],
    }
  },
}
</script>

<style scoped>
  .m-container {
    margin: 3rem 1rem;
  }
</style>
