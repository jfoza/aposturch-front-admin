<template>
  <overlay
    class-name="card p-3"
    :show="loading"
  >
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
                  v-model="getFormData.modules"
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
  </overlay>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import {
  BRow,
  BCol,
  BForm,
  BFormGroup,
} from 'bootstrap-vue'
import { required } from '@validations'
import vSelect from 'vue-select'
import { updateModulesData } from '@core/utils/requests/members'
import { successMessage } from '@/libs/alerts/sweetalerts'
import { messages } from '@core/utils/validations/messages'
import { getArrayAttr } from '@core/utils/utils'
import Overlay from '@/views/components/custom/Overlay.vue'

export default {
  components: {
    Overlay,
    ValidationObserver,
    ValidationProvider,
    BRow,
    BCol,
    BForm,
    BFormGroup,
    vSelect,
  },

  data() {
    return {
      required,

      loading: false,

      modules: this.$store.state.membershipModuleMembers.modulesInUpdateMember,
    }
  },

  computed: {
    getFormData() {
      return this.$store.getters['membershipModuleMembers/getFormData']
    },
  },

  methods: {
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
      this.loading = true

      const { userId } = this.getFormData

      const formData = {
        modulesId: getArrayAttr(this.getFormData.modules, 'id'),
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

      this.loading = false
    },
  },
}
</script>
