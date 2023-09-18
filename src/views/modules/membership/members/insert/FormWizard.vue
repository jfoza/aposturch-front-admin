<template>
  <overlay
    :show="loading"
  >
    <form-wizard
      ref="formWizardElements"
      color="#1C2541"
      :title="null"
      :subtitle="null"
      :hide-buttons="true"
      shape="square"
      step-size="lg"
      class="steps-transparent mb-3"
    >
      <!-- profile and module -->
      <tab-content
        title="Perfil e Módulos"
        icon="feather icon-user-check"
      >
        <form-1
          ref="profileAndModules"
          :form-data="formData"
          @setLoading="setLoading"
          @handleNextTab="handleNextTab"
        />
      </tab-content>

      <!-- church -->
      <tab-content
        ref="tabAddress"
        title="Igreja"
        icon="feather icon-book-open"
      >
        <form-2
          :form-data="formData"
          @setLoading="setLoading"
          @handleNextTab="handleNextTab"
          @handlePrevTab="handlePrevTab"
        />
      </tab-content>

      <!-- general info -->
      <tab-content
        title="Informações Gerais"
        icon="feather icon-user"
      >
        <form-3
          :form-data="formData"
          :upload-data="uploadData"
          @setLoading="setLoading"
          @clearUploadData="clearUploadData"
          @handleNextTab="handleNextTab"
          @handlePrevTab="handlePrevTab"
        />
      </tab-content>

      <!-- address -->
      <tab-content
        title="Endereço"
        icon="feather icon-map-pin"
      >
        <form-4
          :form-data="formData"
          @setLoading="setLoading"
          @handleUploadImage="handleUploadImage"
          @handleNextTab="handleNextTab"
          @handlePrevTab="handlePrevTab"
          @handleFinish="handleFinish"
        />
      </tab-content>
    </form-wizard>
  </overlay>
</template>

<script>
import { FormWizard, TabContent } from 'vue-form-wizard'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'
import { warningMessage } from '@/libs/alerts/sweetalerts'
import { messages } from '@core/utils/validations/messages'
import { saveUserImageAvatar } from '@core/utils/requests/users'
import Overlay from '@/views/components/custom/Overlay.vue'
import Form1 from './forms/Form1.vue'
import Form2 from './forms/Form2.vue'
import Form3 from './forms/Form3.vue'
import Form4 from './forms/Form4.vue'

export default {
  components: {
    Overlay,
    FormWizard,
    TabContent,
    Form1,
    Form2,
    Form3,
    Form4,
  },

  data() {
    return {
      formData: {
        name: '',
        email: '',
        password: '',
        passwordConfirmation: '',
        profile: null,
        modules: [],
        church: null,
        phone: '',
        zipCode: '',
        address: '',
        numberAddress: '',
        complement: '',
        district: '',
        city: null,
        state: null,
        image: {
          id: '',
          type: '',
          path: '',
        },
      },

      loading: true,

      uploadData: {
        files: [],
      },
    }
  },

  methods: {
    async handleUploadImage(userId) {
      if (this.uploadData.files.length > 0 && userId) {
        const formDataUpload = new FormData()

        formDataUpload.append('image', this.uploadData.files[0])
        formDataUpload.append('userId', userId)

        await saveUserImageAvatar(formDataUpload)
          .then(() => {
            this.clearUploadData()
          })
          .catch(() => {
            warningMessage(messages.errorUploadImage)
          })
      }
    },

    setLoading(loading) {
      this.loading = loading
    },

    clearUploadData() {
      this.uploadData.files = []
      this.formData.image = {
        id: '',
        type: '',
        path: '',
      }
    },

    handleNextTab() {
      this.$refs.formWizardElements.nextTab()
    },

    handlePrevTab() {
      this.$refs.formWizardElements.prevTab()
    },

    handleFinish() {
      this.clear()
      this.$refs.formWizardElements.reset()
      this.$refs.profileAndModules.handleResetForm()
    },

    cancel() {},

    clear() {
      this.formData = {
        name: '',
        email: '',
        password: '',
        passwordConfirmation: '',
        profile: null,
        modules: [],
        church: null,
        phone: '',
        zipCode: '',
        address: '',
        numberAddress: '',
        complement: '',
        district: '',
        city: null,
        state: null,
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
