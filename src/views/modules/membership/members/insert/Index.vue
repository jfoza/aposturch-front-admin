<template>
  <div class="content-wrapper">
    <page-header
      screen-name="Cadastrar Novo"
      :link-items="linkItems"
    />

    <b-row>
      <b-col cols="12">
        <overlay
          :show="getLoadingFormWizard"
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
                ref="form1"
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
                ref="form2"
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
                ref="form3"
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
                ref="form4"
                @handleNextTab="handleNextTab"
                @handlePrevTab="handlePrevTab"
                @handleFinish="handleInsertNewMember"
              />
            </tab-content>
          </form-wizard>
        </overlay>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { FormWizard, TabContent } from 'vue-form-wizard'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'
import { successMessage, warningMessage } from '@/libs/alerts/sweetalerts'
import { messages } from '@core/utils/validations/messages'
import { saveUserImageAvatar } from '@core/utils/requests/users'
import Overlay from '@/views/components/custom/Overlay.vue'
import { createUserMember } from '@core/utils/requests/members'
import { getArrayAttr, strClear } from '@core/utils/utils'
import { BCol, BRow } from 'bootstrap-vue'
import PageHeader from '@/views/components/custom/PageHeader.vue'
import Form1 from './forms/Form1.vue'
import Form2 from './forms/Form2.vue'
import Form3 from './forms/Form3.vue'
import Form4 from './forms/Form4.vue'

export default {
  components: {
    BCol,
    PageHeader,
    BRow,
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
      linkItems: [
        {
          name: 'Membros',
          routeName: '',
        },
        {
          name: 'Cadastrar Novo',
          active: true,
        },
      ],
    }
  },

  computed: {
    getFormData() {
      return this.$store.getters['membershipModuleMembers/getFormData']
    },

    getUploadData() {
      return this.$store.getters['membershipModuleMembers/getUploadData']
    },

    getLoadingFormWizard() {
      return this.$store.getters['membershipModuleMembers/getLoadingFormWizard']
    },

    getMembershipModuleRoutes() {
      return this.$store.getters['routes/getMembershipModuleRoutes']
    },
  },

  mounted() {
    this.$store.commit('membershipModuleMembers/clearFormData')

    this.formReset()

    this.linkItems[0].routeName = this.getMembershipModuleRoutes.members.name
  },

  methods: {
    async handleInsertNewMember() {
      this.setLoading(true)

      const formData = this.generateFormData()

      await createUserMember(formData)
        .then(response => {
          if (response.status === 201) {
            const { id } = response.data

            this.handleUploadImage(id)

            successMessage(messages.successSave)

            this.clear()
          }
        })
        .catch(error => {
          this.handleError(error.response)
        })

      this.setLoading(false)
    },

    async handleUploadImage(userId) {
      this.setLoading(true)

      if (this.getUploadData.files.length > 0 && userId) {
        const formDataUpload = new FormData()

        formDataUpload.append('image', this.getUploadData.files[0])
        formDataUpload.append('userId', userId)

        await saveUserImageAvatar(formDataUpload)
          .then(() => {
            this.clearUploadData()
          })
          .catch(() => {
            warningMessage(messages.errorUploadImage)
          })
      }

      this.setLoading(false)
    },

    setLoading(loading) {
      this.$store.commit('membershipModuleMembers/setLoadingFormWizard', loading)
    },

    clearUploadData() {
      this.getUploadData.files = []
    },

    handleNextTab() {
      this.$refs.formWizardElements.nextTab()
    },

    handlePrevTab() {
      this.$refs.formWizardElements.prevTab()
    },

    cancel() {},

    handleError(response) {
      const errors = response.status === 400 || response.status === 404

      if (errors) {
        return warningMessage(response.data.error)
      }

      return warningMessage(messages.impossible)
    },

    generateFormData() {
      return {
        name: this.getFormData.name,
        email: this.getFormData.email,
        password: this.getFormData.password,
        passwordConfirmation: this.getFormData.passwordConfirmation,
        profileId: this.getFormData.profile.id,
        modulesId: getArrayAttr(this.getFormData.modules, 'id'),
        churchId: this.getFormData.church.id,
        phone: strClear(this.getFormData.phone),
        zipCode: strClear(this.getFormData.zipCode),
        address: this.getFormData.address,
        numberAddress: this.getFormData.numberAddress,
        complement: this.getFormData.complement,
        district: this.getFormData.district,
        cityId: this.getFormData.city.id,
        uf: this.getFormData.state.uf,
      }
    },

    formReset() {
      this.$refs.formWizardElements.reset()

      const forms = [
        'form1',
        'form2',
        'form3',
        'form4',
      ]

      forms.forEach(form => {
        this.$refs[form].handleResetForm()
      })
    },

    clear() {
      this.$store.commit('membershipModuleMembers/clearFormData')

      this.formReset()
    },
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-wizard.scss';
@import '@core/scss/vue/libs/vue-select.scss';

@media(max-width: 400px) {
  .button-custom-size {
    width: 100%;
    margin-bottom: 1rem;
  }
}
</style>
