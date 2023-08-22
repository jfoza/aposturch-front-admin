<template>
  <section class="card p-3">
    <validation-observer
      ref="profileForm"
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
          <!-- Profile -->
          <b-col
            sm="12"
            lg="6"
          >
            <b-form-group
              label="Perfil *"
              label-for="profile"
            >
              <validation-provider
                #default="{ errors }"
                name="Perfil"
                rules="required"
              >
                <v-select
                  id="profile"
                  v-model="formData.profile"
                  :options="profiles"
                  variant="custom"
                  item-text="description"
                  item-value="id"
                  placeholder="Escolha um perfil"
                  label="description"
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
import { updateChurchData, updateProfileData } from '@core/utils/requests/members'
import { successMessage } from '@/libs/alerts/sweetalerts'
import { messages } from '@core/utils/validations/messages'

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

      loading: false,

      formData: {
        profile: null,
      },

      profiles: this.$store.state.chooseDataMembershipModule.profilesInUpdateMember,
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
      const { profile } = this.getMemberInUpdate

      this.formData = {
        profile,
      }
    },

    async handleFormSubmit() {
      const result = new Promise((resolve, reject) => {
        this.$refs.profileForm.validate()
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

      const { userId } = this.getMemberInUpdate

      const formData = {
        profileId: this.formData.profile.id,
      }

      await updateProfileData(userId, formData)
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

<style scoped>

</style>
