<template>
  <div class="content-wrapper">
    <page-header
      screen-name="Cadastrar Novo"
      :link-items="linkItems"
    />

    <Form mode="insert" />
  </div>
</template>

<script>

import PageHeader from '@/views/components/custom/PageHeader.vue'
import Form from '@/views/modules/store/products/Form.vue'

export default {
  components: {
    PageHeader,
    Form,
  },

  data() {
    return {
      linkItems: [
        {
          name: 'Gerenciar produtos',
          active: true,
          routeName: '',
        },
        {
          name: 'Cadastrar Novo',
          active: true,
        },
      ],
    }
  },

  computed: {
    getStoreModuleRoutes() {
      return this.$store.getters['routes/getStoreModuleRoutes']
    },
  },

  mounted() {
    this.$store.commit('storeModuleProducts/clearProductsForm')
    this.linkItems[0].routeName = this.getStoreModuleRoutes.products.name
  },
}
</script>
