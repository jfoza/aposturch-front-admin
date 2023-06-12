<template>
  <section class="card p-3">
    <validation-observer
      ref="profileAndModules"
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
import { getProfiles } from '@core/utils/requests/users'
import { getModules } from '@core/utils/requests/modules'

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

      loading: true,

      formData: {
        profile: null,
        modules: [],
      },

      profiles: [],
      modules: [],
    }
  },

  mounted() {
    this.handlePopulateSelects()
  },

  methods: {
    async handlePopulateSelects() {
      this.loading = true

      await getProfiles().then(response => {
        this.profiles = response.data
      })

      await getModules().then(response => {
        this.modules = response.data
      })

      this.loading = false
    },

    async handleFormSubmit() {
      const result = new Promise((resolve, reject) => {
        this.$refs.profileAndModules.validate()
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
  },
}
</script>

<style scoped>

</style>
