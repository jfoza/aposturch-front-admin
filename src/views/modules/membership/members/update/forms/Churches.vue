<template>
  <overlay
    class-name="card p-3"
    :show="loading"
  >
    <validation-observer
      ref="churches"
    >
      <b-form>
        <b-row
          class="mb-2"
        >
          <!-- Church -->
          <b-col
            sm="12"
            lg="6"
          >
            <b-form-group
              label="Igreja *"
              label-for="church"
            >
              <validation-provider
                #default="{ errors }"
                name="Igreja"
                rules="required"
              >
                <v-select
                  id="church"
                  v-model="getFormData.church"
                  :options="churches"
                  variant="custom"
                  item-text="name"
                  item-value="id"
                  placeholder="Escolha uma igreja"
                  label="name"
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
import { updateChurchData } from '@core/utils/requests/members'
import { successMessage } from '@/libs/alerts/sweetalerts'
import { messages } from '@core/utils/validations/messages'
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

      churches: this.$store.state.membershipModuleMembers.churchesInUpdateMember,
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
        this.$refs.churches.validate()
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
        churchId: this.getFormData.church.id,
      }

      await updateChurchData(userId, formData)
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
