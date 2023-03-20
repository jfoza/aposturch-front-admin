<template>
  <validation-observer ref="login">
    <b-row class="w-100 m-0">
      <b-col
        lg="12"
        class="d-flex justify-content-center"
      >
        <section class="card-auth-admin">
          <div class="custom-logo-app">
            <application-logo />
          </div>

          <b-card-title
            class="mt-2 mb-1 font-weight-bold text-center"
            title-tag="h2"
          >
            Seja bem-vind@!
          </b-card-title>
          <b-card-text class="mb-2">
            Por favor, insira os dados da sua conta para acessar a área administrativa.
          </b-card-text>

          <b-alert
            v-if="alert.show"
            show
            fade
            variant="danger"
          >
            <div class="custom-alert">
              <span>
                <BIconExclamationCircle />
                {{ alert.message }}
              </span>
            </div>
          </b-alert>

          <b-form
            class="mt-2 w-100"
            @submit.prevent="formSubmit"
          >
            <!-- email -->
            <b-form-group
              label="E-mail"
              label-for="login-email"
            >
              <validation-provider
                #default="{ errors }"
                name="E-mail"
                rules="required|email"
              >
                <b-form-input
                  id="login-email"
                  v-model="auth.email"
                  name="login-email"
                  :state="errors.length > 0 ? false : null"
                  placeholder="email@email.com"
                  autocomplete="off"
                  @focus="alert.show = false"
                />

                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>

            <!-- forgot password -->
            <b-form-group>
              <validation-provider
                #default="{ errors }"
                name="Senha"
                rules="required"
              >
                <b-input-group
                  class="input-group-merge"
                  :class="errors.length > 0 ? 'is-invalid':null"
                >
                  <b-form-input
                    id="password"
                    v-model="auth.password"
                    :type="passwordFieldType"
                    class="form-control-merge"
                    :state="errors.length > 0 ? false : null"
                    placeholder="********"
                  />

                  <b-input-group-append is-text>
                    <feather-icon
                      class="cursor-pointer"
                      :icon="passwordToggleIcon"
                      @click="togglePasswordVisibility"
                    />
                  </b-input-group-append>
                </b-input-group>
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>

            <load-button
              type="submit"
              :state="state"
              message="Entrar"
            />
          </b-form>

          <b-link
            :to="{ name: '' }"
            class="text-center"
          >
            <BIconChevronLeft />
            <span class="ml-1">Voltar ao Site</span>
          </b-link>
        </section>
      </b-col>
    </b-row>
  </validation-observer>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import { required, email } from '@validations'
import ApplicationLogo from '@/views/components/custom/ApplicationLogo.vue'
import LoadButton from '@/views/components/custom/LoadButton.vue'

import {
  BRow,
  BCol,
  BLink,
  BFormGroup,
  BFormInput,
  BInputGroupAppend,
  BIconChevronLeft,
  BInputGroup,
  BCardText,
  BCardTitle,
  BForm,
  BAlert,
  VBTooltip,
  BIconExclamationCircle,
} from 'bootstrap-vue'
import { togglePasswordVisibility } from '@core/mixins/ui/forms'
import { getHomeRouteForLoggedInUser } from '@/auth/utils'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import { messages } from '@core/utils/validations/messages'

export default {
  directives: {
    'b-tooltip': VBTooltip,
  },
  components: {
    ValidationObserver,
    ValidationProvider,
    ApplicationLogo,
    BRow,
    BCol,
    BLink,
    BFormGroup,
    BFormInput,
    BInputGroupAppend,
    BInputGroup,
    BIconChevronLeft,
    BCardText,
    BCardTitle,
    BForm,
    BAlert,
    BIconExclamationCircle,
    LoadButton,
  },
  mixins: [togglePasswordVisibility],
  data() {
    return {
      required,
      email,

      auth: {
        email: '',
        password: '',
      },
      alert: {
        show: false,
        message: '',
        variant: '',
      },
      state: true,

      msgButton: 'Entrar',

      disabledButton: false,

      formErrors: {},
    }
  },

  computed: {
    passwordToggleIcon() {
      return this.passwordFieldType === 'password' ? 'EyeIcon' : 'EyeOffIcon'
    },
  },

  watch: {
    state(value) {
      return value
    },
  },

  methods: {
    async formSubmit() {
      const result = new Promise((resolve, reject) => {
        this.$refs.login.validate()
          .then(success => {
            if (success) {
              resolve(true)
            }
          })
          .catch(() => {
            reject()
          })
      })

      if (await result) {
        await this.handleLogin()
      }
    },

    async handleLogin() {
      this.state = false

      await this.$store.dispatch('sessions/login', this.auth)
        .then(response => {
          const { status } = response.request
          const token = response.data.accessToken
          const userData = response.data.user

          if (status === 200 && token) {
            this.abilitySessionAndRedirect(userData)
          }
        })
        .catch(error => {
          this.errorHandling(error.response)
        })

      this.state = true
    },

    // eslint-disable-next-line consistent-return
    abilitySessionAndRedirect(userData) {
      if (!userData.ability || userData.ability.length === 0) {
        this.$store.dispatch('sessions/logout').then()
        this.$router.replace({ name: 'misc-not-enabled' })

        return false
      }

      if (userData.status) {
        // eslint-disable-next-line no-param-reassign
        userData.status = 'active'
      }

      this.$ability.update(userData.ability)

      this.$router.replace(getHomeRouteForLoggedInUser('admin'))
        .then(() => {
          this.$toast({
            component: ToastificationContent,
            position: 'top-right',
            props: {
              title: `Bem-vindo(a) ${userData.fullName}`,
              icon: 'CoffeeIcon',
              variant: 'success',
              text: '',
            },
          })
        })
    },

    errorHandling(response) {
      const { status } = response
      const message = response.data.error ?? messages.impossible

      if (status === 401) {
        this.showAlert(
          message,
          'danger',
        )
      } else {
        this.showAlert(
          messages.impossible,
          'danger',
        )
      }
    },

    showAlert(message, variant) {
      this.alert.show = true
      this.alert.message = message
      this.alert.variant = variant
    },
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/pages/page-auth.scss';
</style>
