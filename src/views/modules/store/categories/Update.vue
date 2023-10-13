<template>
  <overlay
    :show="loading"
  >
    <page-header
      screen-name="Editar categoria"
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
import { getCategoryId } from '@core/utils/requests/categories'
import Form from '@/views/modules/store/categories/Form.vue'
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
          name: 'Gerenciar categorias',
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
      return this.$store.getters['storeModuleCategories/getChooseCategory']
    },

    getStoreModuleRoutes() {
      return this.$store.getters['storeModuleCategories/getStoreModuleRoutes']
    },
  },

  created() {
    if (!this.getItemInStore) {
      this.redirectToMainPage()

      return false
    }
    this.linkItems[0].routeName = this.getStoreModuleRoutes.categories.name

    return this.handleGetCategory()
  },

  methods: {
    async handleGetCategory() {
      this.setLoading(true)

      await getCategoryId(this.getItemInStore.id)
        .then(response => {
          const {
            id,
            name,
            description,
            subcategory,
          } = response.data

          this.$store.commit('storeModuleCategories/setCategoriesForm', {
            id,
            name,
            description,
            subcategory,
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
      this.$store.commit('storeModuleCategories/clearCategoriesForm')
      this.$router.replace({ name: this.getStoreModuleRoutes.categories.name })
    },
  },
}
</script>
