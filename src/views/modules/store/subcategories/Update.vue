<template>
  <overlay
    :show="loading"
  >
    <page-header
      screen-name="Editar subcategoria"
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
import Form from '@/views/modules/store/subcategories/Form.vue'
import Overlay from '@/views/components/custom/Overlay.vue'
import { getSubcategoryId } from '@core/utils/requests/subcategories'

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
          name: 'Gerenciar subcategorias',
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
      return this.$store.getters['storeModuleSubcategories/getChooseSubcategory']
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
    this.linkItems[0].routeName = this.getStoreModuleRoutes.subcategories.name

    return this.handleGetSubcategory()
  },

  methods: {
    async handleGetSubcategory() {
      this.setLoading(true)

      await getSubcategoryId(this.getItemInStore.id)
        .then(response => {
          const {
            id,
            name,
            description,
            category,
            product,
          } = response.data

          this.$store.commit('storeModuleSubcategories/setSubcategoriesForm', {
            id,
            name,
            description,
            category,
            products: product,
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
      this.$store.commit('storeModuleSubcategories/clearSubcategoriesForm')
      this.$router.replace({ name: this.getStoreModuleRoutes.subcategories.name })
    },
  },
}
</script>
