<template>
  <div class="content-wrapper">
    <page-header
      screen-name="Cadastrar Nova"
      :link-items="linkItems"
    />

    <Form mode="insert" />
  </div>
</template>

<script>

// eslint-disable-next-line import/extensions
import PageHeader from '@/views/components/custom/PageHeader'
import Form from '@/views/modules/store/categories/Form.vue'

export default {
  components: {
    PageHeader,
    Form,
  },

  data() {
    return {
      linkItems: [
        {
          name: 'Gerenciar categorias',
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
    this.linkItems[0].routeName = this.getStoreModuleRoutes.categories.name

    this.$store.commit('storeModuleCategories/clearCategoriesForm')
  },
}
</script>
