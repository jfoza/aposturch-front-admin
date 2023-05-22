<template>
  <form-wizard
    ref="wizard"
    color="#1C2541"
    :title="null"
    :subtitle="null"
    :hide-buttons="true"
    shape="circle"
    step-size="sm"
    class="mb-3"
  >
    <!-- general info -->
    <tab-content
      ref="tabGeneralInfo"
      title="Informações gerais"
      icon="feather icon-file-text"
    >
      1
    </tab-content>

    <!-- address -->
    <tab-content
      ref="tabAddress"
      title="Endereços"
      icon="feather icon-map-pin"
    >
      2
    </tab-content>

    <!-- employees -->
    <tab-content
      title="Funcionários"
      icon="feather icon-user"
    />

    <!-- social link -->
    <tab-content
      title="Produtos"
      icon="feather icon-bookmark"
    />
  </form-wizard>
</template>

<script>
/* eslint-disable import/extensions */
import {
  BRow,
  BCol,
  BForm,
  BFormGroup,
  BFormInput,
  BSpinner,
} from 'bootstrap-vue'
import Upload from '@/views/components/custom/Upload'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import {
  required, email, min,
} from '@validations'
import { statusForm } from '@core/utils/statusForm'
import vSelect from 'vue-select'
import { successMessage, warningMessage } from '@/libs/alerts/sweetalerts'
import { formActions } from '@core/utils/formActions'
import { getAddressByZipCode } from '@core/utils/requests/zipCode'
import { states } from '@core/utils/states'
import { getCitiesByUf } from '@core/utils/requests/cities'
import { messages } from '@core/utils/validations/messages'
import membershipModuleRoutes from '@/views/modules/membership/routes'
import { FormWizard, TabContent } from 'vue-form-wizard'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'

export default {
  components: {
    Upload,
    ValidationProvider,
    ValidationObserver,
    vSelect,
    BRow,
    BCol,
    BForm,
    BFormGroup,
    BFormInput,
    BSpinner,
    FormWizard,
    TabContent,
  },

  props: {
    mode: {
      type: String,
      default: 'insert',
    },

    formData: {
      type: Object,
      default: null,
    },
  },

  data() {
    return {
      states,
      required,
      email,
      min,
      statusForm,
      titlePage: '',

      cities: [],

      uploadData: {
        files: [],
      },

      redirect: false,

      loading: false,

      profiles: [],

      formActions,
    }
  },

  computed: {
    getMode() {
      return this.mode
    },

    getFormData() {
      return this.formData
    },
  },

  mounted() {

  },

  methods: {
    async getAddressByZipCode() {
      // if (this.getFormData.zip_code.length === 9) {
      //   this.loading = true
      //
      //   await getAddressByZipCode(strClear(this.getFormData.zip_code))
      //     .then(response => {
      //       const res = response.data
      //
      //       this.getFormData.numberAddress = ''
      //       this.getFormData.complement = ''
      //       this.cities = res.citiesByUF
      //
      //       this.getFormData.address = res.address
      //       this.getFormData.district = res.district
      //
      //       this.states.forEach(obj => {
      //         if (obj.uf === res.city.uf) {
      //           this.getFormData.state = obj
      //         }
      //       })
      //
      //       this.getFormData.city = res.city
      //     })
      //     .catch(error => {
      //       if (this.getMode === this.formActions.updateAction) {
      //         this.getCitiesByUFSelect()
      //       }
      //       this.clearZipCodeAddress()
      //
      //       if (error.response.status === 404) {
      //         warningMessage(error.response.data.error)
      //       } else {
      //         warningMessage(messages.impossible)
      //       }
      //     })
      //
      //   this.loading = false
      // }
    },

    async getCitiesByUFSelect() {
      if (this.getFormData.state) {
        await getCitiesByUf(this.getFormData.state.uf)
          .then(response => {
            if (response.status === 200) {
              this.cities = response.data
            }
          })
      } else {
        this.clearZipCodeAddress()
      }
    },

    async handleUploadImage(churchId) {
      const formDataUpload = new FormData()

      formDataUpload.append('image', this.uploadData.files[0])
      formDataUpload.append('churchId', churchId)

      await saveChurchImage(formDataUpload)
        .then(() => {
          this.clearUploadData()
        })
        .catch(() => {
          warningMessage(messages.errorUploadImage)
        })
    },

    setFormData() {
      return {

      }
    },

    handleError(response) {
      const errors = response.status === 400 || response.status === 404

      if (errors) {
        return warningMessage(response.data.error)
      }

      return warningMessage(messages.impossible)
    },

    cancel() {
      if (this.getMode === this.formActions.insertAction) {
        this.redirect = true
        this.clear()
      } else {
        this.$router.replace({
          name: membershipModuleRoutes.churches.name,
          params: {
            dispatchList: true,
          },
        })
      }
    },

    clear() {
      this.$emit('clear')
      this.$store.commit('chooseDataMembershipModule/SET_CHOOSE_CHURCH', null)

      if (this.redirect) {
        this.$router.replace({
          name: membershipModuleRoutes.churches.name,
          params: {
            dispatchList: true,
          },
        })
      }
    },

    clearUploadData() {
      this.uploadData.files = []
      this.getFormData.image.path = ''
    },

    clearZipCodeAddress() {
      if (this.getMode === this.formActions.insertAction) {
        this.getFormData.zip_code = ''
        this.getFormData.address = ''
        this.getFormData.numberAddress = ''
        this.getFormData.complement = ''
        this.getFormData.district = ''
        this.getFormData.city = null
        this.getFormData.state = null
        this.cities = []
      } else {
        this.getFormData.zip_code = ''
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@media(max-width: 400px) {
  .button-custom-size {
    width: 100%;
    margin-bottom: 1rem;
  }
}
</style>
