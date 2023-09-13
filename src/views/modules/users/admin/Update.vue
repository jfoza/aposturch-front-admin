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

      userStore: this.$store.state.chooseDataUsersModule.chooseUser,

      form: {
        id: '',
        name: '',
        email: '',
        password: '',
        passwordConfirmation: '',
        profile: null,
      },
    }
  },

  computed: {
    getValidation() {
      return this.validation
    },
  },

  // eslint-disable-next-line consistent-return
  created() {
    if (!this.userStore) {
      // this.redirectToMainPage()

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

      await getUserId(this.userStore.id)
        .then(response => {
          const {
            id,
            name,
            email,
            profile,
            active,
          } = response.data

          this.form = {
            id,
            name,
            email,
            profile,
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
      this.$store.commit('chooseDataUsersModule/SET_CHOOSE_USER', null)
      this.$router.replace({ name: 'home' })
    },

    clearForm() {
      this.form = {
        name: '',
        email: '',
        password: '',
        passwordConfirmation: '',
        active: {
          boolValue: true,
          description: 'Ativo',
        },
        profile: null,
      }
    },
  },
}
</script>

<style lang="scss" scoped>

</style>
