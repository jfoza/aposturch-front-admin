<template>
  <overlay
    :show="loading"
  >
    <page-header
      screen-name="Editar departamento"
      :link-items="linkItems"
    />

    <Form
      v-if="!loading"
      mode="update"
    />
  </overlay>
</template>

<script>

// eslint-disable-next-line import/extensions
import PageHeader from '@/views/components/custom/PageHeader'
import { warningMessage } from '@/libs/alerts/sweetalerts'
import { formActions } from '@core/utils/formActions'
import { messages } from '@core/utils/validations/messages'
import { getDepartmentId } from '@core/utils/requests/departments'
import Form from '@/views/modules/store/departments/Form.vue'
import Overlay from '@/views/components/custom/Overlay.vue'

export default {
  components: {
    Overlay,
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
          name: '...',
          active: true,
        },
      ],

      formActions,

      loading: true,
    }
  },

  computed: {
    getItemInStore() {
      return this.$store.getters['storeModuleDepartments/getChooseDepartment']
    },

    getStoreModuleRoutes() {
      return this.$store.getters['routes/getStoreModuleRoutes']
    },
  },

  created() {
    if (!this.getItemInStore) {
      this.redirectToMainPage()

      return false
    }
    this.linkItems[0].routeName = this.getStoreModuleRoutes.departments.name

    return this.handleGetDepartment()
  },

  methods: {
    async handleGetDepartment() {
      this.setLoading(true)

      await getDepartmentId(this.getItemInStore.id)
        .then(response => {
          const {
            id,
            name,
            description,
            category,
          } = response.data

          this.$store.commit('storeModuleDepartments/setDepartmentsForm', {
            id,
            name,
            description,
            category,
          })

          this.linkItems[1].name = name
        })
        .catch(() => {
          warningMessage(messages.impossible)
        })

      this.setLoading(false)
    },

    setLoading(loading) {
      this.loading = loading
    },

    redirectToMainPage() {
      this.$store.commit('storeModuleDepartments/clearDepartmentsForm')
      this.$router.replace({ name: this.getStoreModuleRoutes.departments.name })
    },
  },
}
</script>
