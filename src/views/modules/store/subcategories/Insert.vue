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
import Form from '@/views/modules/store/subcategories/Form.vue'

export default {
  components: {
    PageHeader,
    Form,
  },

  data() {
    return {
      linkItems: [
        {
          name: 'Gerenciar subcategorias',
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

  mounted() {
    this.$store.commit('storeModuleSubcategories/clearSubcategoriesForm')
  },
}
</script>
