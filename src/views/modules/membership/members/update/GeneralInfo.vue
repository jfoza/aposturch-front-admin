<template>
  <section class="card p-3">
    <validation-observer
      ref="generalInfo"
    >
      <div
        v-if="loading"
        class="spinner-area"
      >
        <b-spinner
          variant="custom"
          label="Loading..."
        />
      </div>

      <b-form
        v-if="!loading"
      >
        <b-row
          class="mb-2"
        >
          <!-- Name -->
          <b-col
            sm="12"
            lg="6"
          >
            <b-form-group
              label="Nome *"
              label-for="name"
            >
              <validation-provider
                #default="{ errors }"
                name="Nome"
                rules="required"
              >
                <b-form-input
                  id="name"
                  v-model="formData.name"
                  :state="errors.length > 0 ? false : null"
                  autocomplete="off"
                />

                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>

          <!-- Phone -->
          <b-col
            sm="12"
            lg="6"
          >
            <b-form-group
              label="Telefone *"
              label-for="phone"
            >
              <validation-provider
                #default="{ errors }"
                name="Telefone"
                rules="required|min:13"
              >
                <b-form-input
                  id="phone"
                  v-model="formData.phone"
                  v-mask="'(##) #####-####'"
                  :state="errors.length > 0 ? false : null"
                  autocomplete="off"
                />

                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>

          <!-- Email -->
          <b-col
            sm="12"
            lg="6"
          >
            <b-form-group
              label="E-mail *"
              label-for="email"
            >
              <validation-provider
                #default="{ errors }"
                name="E-mail"
                rules="required|email"
              >
                <b-form-input
                  id="email"
                  v-model="formData.email"
                  :state="errors.length > 0 ? false : null"
                  placeholder="email@email.com"
                  autocomplete="off"
                  type="email"
                />

                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>

          <!-- Active -->
          <b-col
            sm="12"
            lg="6"
          >
            <b-form-group
              label="Status *"
              label-for="status"
            >
              <validation-provider
                #default="{ errors }"
                name="Status"
                rules="required"
              >
                <v-select
                  id="categories"
                  v-model="formData.active"
                  :options="statusForm"
                  variant="custom"
                  item-text="description"
                  item-value="id"
                  placeholder="Selecione o status"
                  label="description"
                />

                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>

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
                    :state="errors.length > 0 ? false:null"
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
                    :state="errors.length > 0 ? false:null"
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
  BFormGroup,
  BInputGroup,
  BInputGroupAppend,
  BFormInput,
  BSpinner,
} from 'bootstrap-vue'
import { required, confirmed } from '@validations'
import vSelect from 'vue-select'
import { statusForm } from '@core/utils/statusForm'
import { warningMessage } from '@/libs/alerts/sweetalerts'
import { messages } from '@core/utils/validations/messages'

export default {
  components: {
    ValidationObserver,
    ValidationProvider,
    BRow,
    BCol,
    BForm,
    BFormGroup,
    BInputGroup,
    BInputGroupAppend,
    BFormInput,
    BSpinner,
    vSelect,
  },

  data() {
    return {
      required,
      confirmed,
      statusForm,

      loading: false,

      formData: {
        name: '',
        email: '',
        password: '',
        passwordConfirmation: '',
        active: {
          boolValue: true,
          description: 'Ativo',
        },
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
  },

  methods: {
    async handleFormSubmit() {
      const result = new Promise((resolve, reject) => {
        this.$refs.generalInfo.validate()
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
        //
      }
    },

    handleError(response) {
      if (response.status === 400) {
        return warningMessage(response.data.error)
      }

      return warningMessage(messages.impossible)
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

<style scoped>

</style>
