<template>
  <overlay
    :show="loading"
  >
    <page-header
      screen-name="Editar prefixo"
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
import Form from '@/views/modules/store/prefixes/Form.vue'
import Overlay from '@/views/components/custom/Overlay.vue'
import { getPrefixId } from '@core/utils/requests/prefixes'

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
          name: 'Gerenciar prefixos',
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
      return this.$store.getters['storeModulePrefixes/getChoosePrefix']
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
    this.linkItems[0].routeName = this.getStoreModuleRoutes.prefixes.name

    return this.handleGetPrefix()
  },

  methods: {
    async handleGetPrefix() {
      this.setLoading(true)

      await getPrefixId(this.getItemInStore.id)
        .then(response => {
          const {
            id,
            prefix,
            active,
          } = response.data

          this.$store.commit('storeModulePrefixes/setPrefixForm', {
            id,
            prefix,
            active: {
              boolValue: active,
              description: active ? 'Ativo' : 'Inativo',
            },
          })

          this.linkItems[1].name = prefix
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
      this.$store.commit('storeModulePrefixes/clearPrefixForm')
      this.$router.replace({ name: this.getStoreModuleRoutes.prefixes.name })
    },
  },
}
</script>
