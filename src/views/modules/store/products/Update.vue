<template>
  <overlay
    :show="loading"
  >
    <page-header
      screen-name="Editar produto"
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
import Form from '@/views/modules/store/products/Form.vue'
import Overlay from '@/views/components/custom/Overlay.vue'
import { getProductId } from '@core/utils/requests/products'

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
          name: 'Gerenciar produtos',
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
      return this.$store.getters['storeModuleProducts/getChooseProduct']
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
    this.$store.commit('storeModuleProducts/clearProductsForm')

    this.linkItems[0].routeName = this.getStoreModuleRoutes.products.name

    return this.handleGetProduct()
  },

  methods: {
    async handleGetProduct() {
      this.setLoading(true)

      await getProductId(this.getItemInStore.id)
        .then(response => {
          const {
            id,
            product_name,
            product_description,
            product_code,
            product_value,
            product_quantity,
            product_balance,
            highlight_product,
            category,
            image,
          } = response.data

          let imageLinks = [{ id: '', type: '', path: '' }]

          if (image.length > 0) {
            imageLinks = image
          }

          this.$store.commit('storeModuleProducts/setProductsForm', {
            id,
            productName: product_name,
            productDescription: product_description,
            productCode: product_code,
            productValue: product_value,
            productBalance: product_balance,
            productQuantity: product_quantity,
            highlightProduct: highlight_product,
            categories: category,
            imageLinks,
          })

          this.linkItems[1].name = product_name
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
      this.$store.commit('storeModuleProducts/clearProductsForm')
      this.$router.replace({ name: this.getStoreModuleRoutes.products.name })
    },
  },
}
</script>
