<template>
  <section>
    <validation-observer
      ref="general"
    >
      <b-form>
        <b-row class="mb-2">
          <b-col cols="12">
            <h6>Agora vamos definir os dados gerais do novo membro:</h6>
          </b-col>
        </b-row>

        <b-row class="mb-3">
          <b-col
            cols="12"
          >
            <b-form-group
              label-for="image"
              label="Imagem de Perfil"
            />
            <Upload
              ref="upload"
              :upload-data="getUploadData"
              :image="getFormData.image"
              @clearUploadData="clearUploadData"
            />
          </b-col>
        </b-row>

        <b-row
          class="mb-2"
        >
          <!-- Name -->
          <b-col
            sm="6"
            lg="4"
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
                  v-model="getFormData.name"
                  autocomplete="off"
                />

                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>

          <!-- Phone -->
          <b-col
            sm="6"
            lg="4"
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
                  v-model="getFormData.phone"
                  v-mask="'(##) #####-####'"
                  autocomplete="off"
                />

                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>

          <!-- Email -->
          <b-col
            sm="6"
            lg="4"
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
                  v-model="getFormData.email"
                  placeholder="email@email.com"
                  autocomplete="off"
                  type="email"
                />

                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>

          <!-- Password -->
          <b-col
            sm="6"
            lg="4"
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
                >
                  <b-form-input
                    id="reset-password-new"
                    v-model="getFormData.password"
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
            sm="6"
            lg="4"
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
                >
                  <b-form-input
                    id="reset-password-confirm"
                    v-model="getFormData.passwordConfirmation"
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
            md="6"
            class="text-left"
          >
            <button-prev
              class-name="button-custom-size mb-1"
              @action="handlePrevTab"
            />
          </b-col>

          <b-col
            md="6"
            class="text-right"
          >
            <button-next
              class-name="button-custom-size mb-1"
              @action="handleFormSubmit"
            />
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
} from 'bootstrap-vue'
import { required, confirmed } from '@validations'
import ButtonNext from '@/views/components/custom/ButtonNext.vue'
import ButtonPrev from '@/views/components/custom/ButtonPrev.vue'
import { statusForm } from '@core/utils/statusForm'
import { warningMessage } from '@/libs/alerts/sweetalerts'
import { messages } from '@core/utils/validations/messages'
import Upload from '@/views/components/custom/Upload.vue'

export default {
  components: {
    ValidationObserver,
    ValidationProvider,
    Upload,
    BRow,
    BCol,
    BForm,
    BFormGroup,
    BInputGroup,
    BInputGroupAppend,
    BFormInput,
    ButtonNext,
    ButtonPrev,
  },

  data() {
    return {
      required,
      confirmed,
      statusForm,

      churches: [],

      // Toggle Password
      password1FieldType: 'password',
      password2FieldType: 'password',
    }
  },

  computed: {
    getFormData() {
      return this.$store.getters['membershipModuleMembers/getFormData']
    },

    getUploadData() {
      return this.$store.getters['membershipModuleMembers/getUploadData']
    },

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
        this.$refs.general.validate()
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
        this.$emit('handleNextTab')
      }
    },

    setLoading(loading) {
      this.$store.commit('membershipModuleMembers/setLoadingFormWizard', loading)
    },

    handlePrevTab() {
      this.$emit('handlePrevTab')
    },

    handleError(response) {
      if (response.status === 400) {
        return warningMessage(response.data.error)
      }

      return warningMessage(messages.impossible)
    },

    clearUploadData() {
      this.$store.commit('membershipModuleMembers/setUploadData', { files: [] })
      this.getFormData.image = {
        id: '',
        type: '',
        path: '',
      }
    },

    handleResetForm() {
      this.$refs.general.reset()
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
