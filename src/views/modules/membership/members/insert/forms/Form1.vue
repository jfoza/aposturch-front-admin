<template>
  <validation-observer
    ref="profileAndModules"
  >
    <b-form>
      <b-row class="mb-2">
        <b-col cols="12">
          <h6>Escolha o perfil do novo membro e os módulos no qual terá acesso:</h6>
        </b-col>
      </b-row>
      <b-row
        class="mb-2"
      >
        <!-- Profile -->
        <b-col
          sm="6"
          lg="4"
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
                v-model="getFormData.profile"
                :options="profiles"
                variant="custom"
                item-text="description"
                item-value="id"
                placeholder="Escolha um perfil"
                label="description"
                @input="selectAllModulesAndDisableSelect"
              />

              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>
        </b-col>

        <!-- Module -->
        <b-col
          sm="6"
          lg="4"
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
          <button-next
            class-name="button-custom-size mb-1"
            @action="handleFormSubmit"
          />
        </b-col>
      </b-row>
    </b-form>
  </validation-observer>
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
import ButtonNext from '@/views/components/custom/ButtonNext.vue'
import { getProfiles } from '@core/utils/requests/users'
import { getModules } from '@core/utils/requests/modules'
import profileTypes from '@core/utils/profileTypes'
import profiles from '@core/utils/profiles'

export default {
  components: {
    ValidationObserver,
    ValidationProvider,
    BRow,
    BCol,
    BForm,
    BFormGroup,
    ButtonNext,
    vSelect,
  },

  data() {
    return {
      required,

      loading: false,

      profiles: [],
      modules: [],
    }
  },

  computed: {
    getFormData() {
      return this.$store.getters['membershipModuleMembers/getFormData']
    },
  },

  mounted() {
    this.index()
  },

  methods: {
    async index() {
      this.setLoading(true)

      await getProfiles({ profileTypeUniqueName: profileTypes.MEMBERSHIP }).then(response => {
        this.profiles = response.data
      })

      await getModules().then(response => {
        this.modules = response.data
      })

      this.setLoading(false)
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
        this.$emit('handleNextTab')
      }
    },

    handleResetForm() {
      this.$refs.profileAndModules.reset()
    },

    setLoading(loading) {
      this.$store.commit('membershipModuleMembers/setLoadingFormWizard', loading)
    },

    selectAllModulesAndDisableSelect() {
      this.getFormData.modules = []

      if (this.getFormData.profile) {
        const uniqueName = this.getFormData.profile.unique_name

        // eslint-disable-next-line no-unused-expressions
        uniqueName === profiles.ADMIN_CHURCH
          ? this.getFormData.modules = this.modules
          : this.getFormData.modules = []
      }
    },
  },
}
</script>

<style scoped>

</style>
