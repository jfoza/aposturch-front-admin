<template>
  <div
    v-if="getValidation"
    class="content-wrapper"
  >
    <page-header
      screen-name="Editar Igreja"
      :link-items="linkItems"
    />

    <div
      v-if="loading"
      class="spinner-area"
    >
      <b-spinner
        variant="custom"
        label="Loading..."
      />
    </div>

    <Form
      v-if="!loading"
      :mode="formActions.updateAction"
      :form-data="form"
      @clear="clearForm"
    />
  </div>
</template>

<script>

import { BSpinner } from 'bootstrap-vue'
// eslint-disable-next-line import/extensions
import PageHeader from '@/views/components/custom/PageHeader'
import { warningMessage } from '@/libs/alerts/sweetalerts'
import { formActions } from '@core/utils/formActions'
import { messages } from '@core/utils/validations/messages'
import { getChurchId } from '@core/utils/requests/churches'
import Form from './Form.vue'

export default {
  components: {
    BSpinner,
    PageHeader,
    Form,
  },

  data() {
    return {
      linkItems: [
        {
          name: 'Gerenciar Igrejas',
          routeName: '',
        },
        {
          name: 'Editar Igreja',
          active: true,
        },
      ],

      loading: false,

      validation: false,

      formActions,

      churchIdStore: this.$store.state.chooseData.chooseChurch,

      form: {
        id: '',
        name: '',
        phone: '',
        email: '',
        youtube: '',
        facebook: '',
        instagram: '',
        zip_code: '',
        address: '',
        number_address: '',
        complement: '',
        district: '',
        state: null,
        city: null,
        image: {
          id: '',
          type: '',
          path: '',
        },
        active: {
          boolValue: true,
          description: 'Ativo',
        },
      },
    }
  },

  computed: {
    getValidation() {
      return this.validation
    },
  },

  watch: {
    churchIdStore(value) {
      return value
    },
  },

  // eslint-disable-next-line consistent-return
  created() {
    if (!this.churchIdStore) {
      this.redirectToMainPage()

      return false
    }

    this.validation = true
  },

  mounted() {
    this.getChooseChurch()
  },

  methods: {
    async getChooseChurch() {
      this.loading = true

      await getChurchId(this.churchIdStore)
        .then(response => {
          const {
            id,
            name,
            phone,
            email,
            youtube,
            facebook,
            instagram,
            zip_code,
            address,
            number_address,
            complement,
            district,
            image,
            uf,
            city,
            active,
          } = response.data

          this.form = {
            id,
            name,
            phone,
            email,
            youtube,
            facebook,
            instagram,
            zip_code,
            address,
            number_address,
            complement,
            district,
            image: image || { id: '', type: '', path: '' },
            state: {
              uf,
            },
            city,
            active: {
              boolValue: active,
              description: active ? 'Ativo' : 'Inativo',
            },
          }
        })
        .catch(() => {
          warningMessage(messages.impossible)
        })

      this.loading = false
    },

    redirectToMainPage() {
      this.clearForm()
      this.$store.commit('chooseData/SET_CHOOSE_CHURCH', null)
      this.$router.replace({ name: 'home' })
    },

    clearForm() {
      this.form = {
        id: '',
        name: '',
        phone: '',
        email: '',
        youtube: '',
        facebook: '',
        instagram: '',
        zip_code: '',
        address: '',
        number_address: '',
        complement: '',
        district: '',
        state: null,
        city: null,
        image: {
          id: '',
          type: '',
          path: '',
        },
        active: {
          boolValue: true,
          description: 'Ativo',
        },
      }
    },
  },
}
</script>

<style lang="scss" scoped>

</style>
