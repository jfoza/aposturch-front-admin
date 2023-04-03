<template>
  <div
    v-if="getValidation"
    class="content-wrapper"
  >
    <page-header
      screen-name="Editar Usuário"
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
import { getUserId } from '@core/utils/requests/users'
import { warningMessage } from '@/libs/alerts/sweetalerts'
import { formActions } from '@core/utils/formActions'
import { messages } from '@core/utils/validations/messages'
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
          name: 'Gerenciar Usuários',
          routeName: '',
        },
        {
          name: 'Editar Usuário',
          active: true,
        },
      ],

      loading: false,

      validation: false,

      formActions,

      userIdStore: this.$store.state.chooseData.chooseUser,

      form: {
        id: '',
        name: '',
        email: '',
        profile: null,
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
    userIdStore(value) {
      return value
    },
  },

  // eslint-disable-next-line consistent-return
  created() {
    if (!this.userIdStore) {
      this.redirectToMainPage()

      return false
    }

    this.validation = true
  },

  mounted() {
    this.getChooseUser()
  },

  methods: {
    async getChooseUser() {
      this.loading = true

      await getUserId(this.userIdStore)
        .then(response => {
          const res = response.data

          this.form.id = res.user_id
          this.form.name = res.user_name
          this.form.email = res.user_email
          this.form.profile = {
            id: res.profile_id,
            description: res.profile_description,
          }
          this.form.active = {
            boolValue: res.user_active,
            description: res.user_active ? 'Ativo' : 'Inativo',
          }
        })
        .catch(() => {
          warningMessage(messages.impossible)
        })

      this.loading = false
    },

    redirectToMainPage() {
      this.clearForm()
      this.$store.commit('chooseData/SET_CHOOSE_USER', null)
      this.$router.replace({ name: 'home' })
    },

    clearForm() {
      this.form = {
        name: '',
        email: '',
        active: null,
        profile: null,
      }
    },
  },
}
</script>

<style lang="scss" scoped>

</style>
