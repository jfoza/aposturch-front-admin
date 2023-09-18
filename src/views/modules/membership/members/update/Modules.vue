<template>
  <section class="card p-3">
    <validation-observer
      ref="modulesForm"
    >
      <b-form>
        <b-row
          class="mb-2"
        >
          <!-- Module -->
          <b-col
            sm="12"
            lg="6"
          >
            <b-form-group
              label="Módulos *"
              label-for="module"
            >
              <validation-provider
                #default="{ errors }"
                name="Módulos"
                rules="required"
              >
                <v-select
                  id="module"
                  v-model="formData.modules"
                  :options="modules"
                  variant="custom"
                  item-text="module_description"
                  item-value="id"
                  placeholder="Escolha um Módulo ou mais"
                  label="module_description"
                  multiple
                  multiselect
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
  BSpinner,
} from 'bootstrap-vue'
import { required } from '@validations'
import vSelect from 'vue-select'
import { updateModulesData } from '@core/utils/requests/members'
import { successMessage } from '@/libs/alerts/sweetalerts'
import { messages } from '@core/utils/validations/messages'
import { getArrayAttr } from '@core/helpers/helpers'

export default {
  components: {
    ValidationObserver,
    ValidationProvider,
    BRow,
    BCol,
    BForm,
    BFormGroup,
    BSpinner,
    vSelect,
  },

  data() {
    return {
      required,

      formData: {
        modules: [],
      },

      modules: this.$store.state.chooseDataMembershipModule.modulesInUpdateMember,
    }
  },

  computed: {
    getMemberInUpdate() {
      return this.$store.state.chooseDataMembershipModule.memberInUpdate
    },
  },

  mounted() {
    this.setFormData()
  },

  methods: {
    setFormData() {
      const { modules } = this.getMemberInUpdate

      this.formData = {
        modules,
      }
    },

    async handleFormSubmit() {
      const result = new Promise((resolve, reject) => {
        this.$refs.modulesForm.validate()
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
        modulesId: getArrayAttr(this.formData.modules, 'id'),
      }

      await updateModulesData(userId, formData)
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
  },
}
</script>
