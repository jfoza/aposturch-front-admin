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

// eslint-disable-next-line import/extensions
import PageHeader from '@/views/components/custom/PageHeader'
import Form from '@/views/modules/store/departments/Form.vue'

export default {
  components: {
    PageHeader,
    Form,
  },

  data() {
    return {
      linkItems: [
        {
          name: 'Gerenciar departamentos',
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
    this.linkItems[0].routeName = this.getStoreModuleRoutes.departments.name

    this.$store.commit('storeModuleDepartments/clearDepartmentsForm')
  },
}
</script>
