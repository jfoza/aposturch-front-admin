<template>
  <section class="card p-3">
    <validation-observer
      ref="generalInfo"
    >
      <b-form>
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
                  placeholder="email@email.com"
                  autocomplete="off"
                  type="email"
                />

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
  BFormInput,
} from 'bootstrap-vue'
import { required, confirmed } from '@validations'
import { statusForm } from '@core/utils/statusForm'
import { successMessage, warningMessage } from '@/libs/alerts/sweetalerts'
import { messages } from '@core/utils/validations/messages'
import { updateGeneralData } from '@core/utils/requests/members'
import { strClear } from '@core/utils/utils'

export default {
  components: {
    ValidationObserver,
    ValidationProvider,
    BRow,
    BCol,
    BForm,
    BFormGroup,
    BFormInput,
  },

  data() {
    return {
      required,
      confirmed,
      statusForm,

      formData: {
        name: '',
        phone: '',
        email: '',
      },
    }
  },

  computed: {
    getMemberInUpdate() {
      return this.$store.state.membershipModuleStore.memberInUpdate
    },
  },

  mounted() {
    this.setFormData()
  },

  methods: {
    setFormData() {
      const {
        name, phone, email,
      } = this.getMemberInUpdate

      this.formData = {
        name,
        phone,
        email,
      }
    },

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
        await this.update()
      }
    },

    async update() {
      this.$emit('setLoading', true)

      const { userId } = this.getMemberInUpdate

      const formData = {
        name: this.formData.name,
        email: this.formData.email,
        phone: strClear(this.formData.phone),
      }

      await updateGeneralData(userId, formData)
        .then(response => {
          if (response.status === 200) {
            successMessage(messages.successSave)
          }
        })
        .catch(error => {
          this.handleError(error.response)
        })

      this.$emit('setLoading', false)
    },

    handleError(errorResponse) {
      if (errorResponse && errorResponse.status === 400) {
        return warningMessage(errorResponse.data.error)
      }

      return warningMessage(messages.impossible)
    },
  },
}
</script>
