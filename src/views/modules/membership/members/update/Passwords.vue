<template>
  <section class="card p-3">
    <validation-observer
      ref="formPasswords"
    >
      <b-form>
        <b-row
          class="mb-2"
        >
          <!-- Password -->
          <b-col
            sm="12"
            lg="6"
          >
            <b-form-group
              label="Senha *"
              label-for="reset-password-new"
            >
              <validation-provider
                #default="{ errors }"
                name="Senha"
                vid="Password"
                rules="required|password"
              >
                <b-input-group
                  class="input-group-merge"
                  :class="errors.length > 0 ? 'is-invalid':null"
                >
                  <b-form-input
                    id="reset-password-new"
                    v-model="formData.password"
                    :type="password1FieldType"
                    class="form-control-merge"
                    name="reset-password-new"
                    placeholder="******"
                  />
                  <b-input-group-append is-text>
                    <feather-icon
                      class="cursor-pointer"
                      :icon="password1ToggleIcon"
                      @click="togglePassword1Visibility"
                    />
                  </b-input-group-append>
                </b-input-group>
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>

          <!-- Password Confirmation -->
          <b-col
            sm="12"
            lg="6"
          >
            <b-form-group
              label-for="reset-password-confirm"
              label="Confirmação de Senha *"
            >
              <validation-provider
                #default="{ errors }"
                name="Confirmação de Senha"
                rules="required|confirmed:Password"
              >
                <b-input-group
                  class="input-group-merge"
                  :class="errors.length > 0 ? 'is-invalid' : null"
                >
                  <b-form-input
                    id="reset-password-confirm"
                    v-model="formData.passwordConfirmation"
                    :type="password2FieldType"
                    class="form-control-merge"
                    name="reset-password-confirm"
                    placeholder="******"
                  />
                  <b-input-group-append is-text>
                    <feather-icon
                      class="cursor-pointer"
                      :icon="password2ToggleIcon"
                      @click="togglePassword2Visibility"
                    />
                  </b-input-group-append>
                </b-input-group>
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>
        </b-row>

        <b-row>
          <b-col
            cols="12"
            class="text-right"
          >
            <button
              type="button"
              class="btn button-form button-custom-size"
              @click="handleFormSubmit"
            >
              <feather-icon
                icon="CheckIcon"
              />
              Salvar alterações
            </button>
          </b-col>
        </b-row>
      </b-form>
    </validation-observer>
  </section>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import {
  BRow,
  BCol,
  BForm,
  BFormInput,
  BFormGroup,
  BInputGroup,
  BInputGroupAppend,
} from 'bootstrap-vue'
import { required } from '@validations'
import { updatePasswordData } from '@core/utils/requests/members'
import { successMessage } from '@/libs/alerts/sweetalerts'
import { messages } from '@core/utils/validations/messages'

export default {
  components: {
    ValidationObserver,
    ValidationProvider,
    BRow,
    BCol,
    BForm,
    BFormInput,
    BFormGroup,
    BInputGroup,
    BInputGroupAppend,
  },

  data() {
    return {
      required,

      loading: false,

      formData: {
        password: '',
        passwordConfirmation: '',
      },

      // Toggle Password
      password1FieldType: 'password',
      password2FieldType: 'password',
    }
  },

  computed: {
    password1ToggleIcon() {
      return this.password1FieldType === 'password' ? 'EyeIcon' : 'EyeOffIcon'
    },

    password2ToggleIcon() {
      return this.password2FieldType === 'password' ? 'EyeIcon' : 'EyeOffIcon'
    },

    getMemberInUpdate() {
      return this.$store.state.membershipModuleStore.memberInUpdate
    },
  },

  methods: {
    async handleFormSubmit() {
      const result = new Promise((resolve, reject) => {
        this.$refs.formPasswords.validate()
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
        await this.update()
      }
    },

    async update() {
      this.$emit('setLoading', true)

      const { userId } = this.getMemberInUpdate

      const formData = {
        password: this.formData.password,
        passwordConfirmation: this.formData.passwordConfirmation,
      }

      await updatePasswordData(userId, formData)
        .then(response => {
          if (response.status === 200) {
            this.clear()

            this.$refs.formPasswords.reset()

            successMessage(messages.successSave)
          }
        })
        .catch(error => {
          this.handleError(error.response)
        })

      this.$emit('setLoading', false)
    },

    clear() {
      this.formData.password = ''
      this.formData.passwordConfirmation = ''
    },

    togglePassword1Visibility() {
      this.password1FieldType = this.password1FieldType === 'password' ? 'text' : 'password'
    },
    togglePassword2Visibility() {
      this.password2FieldType = this.password2FieldType === 'password' ? 'text' : 'password'
    },
  },
}
</script>
