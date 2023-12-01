<template>
  <div class="content-wrapper">
    <page-header
      screen-name="Ver Vendas"
      :link-items="linkItems"
    />

    <overlay
      :show="loading"
      class-name="card p-2"
    >
      Sales
    </overlay>
  </div>
</template>

<script>

import PageHeader from '@/views/components/custom/PageHeader.vue'
import Overlay from '@/views/components/custom/Overlay.vue'

export default {
  components: {
    Overlay,
    PageHeader,
  },

  data() {
    return {
      titlePage: '',

      loading: false,

      linkItems: [
        {
          name: 'Gerenciar Vendas',
          routeName: '',
        },
        {
          name: 'Ver Vendas',
          active: true,
        },
      ],
    }
  },

  computed: {

  },

  methods: {

  },
}
</script>

<style lang="scss" scoped>

</style>
