<template>
  <div>
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
          @handleNextTab="handleNextTab"
          @handlePrevTab="handlePrevTab"
          @handleFinish="handleFinish"
          @clearAll="clear"
        />
      </tab-content>
    </form-wizard>
  </div>
</template>

<script>
import { FormWizard, TabContent } from 'vue-form-wizard'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'
import Form1 from '@/views/modules/membership/members/forms/Form1.vue'
import Form2 from '@/views/modules/membership/members/forms/Form2.vue'
import Form3 from '@/views/modules/membership/members/forms/Form3.vue'
import Form4 from '@/views/modules/membership/members/forms/Form4.vue'

export default {
  components: {
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
        name: 'Membro Teste',
        email: 'membro-teste1@gmail.com',
        password: 'Teste123',
        passwordConfirmation: 'Teste123',
        active: {
          boolValue: true,
          description: 'Ativo',
        },
        profile: null,
        modules: [],
        church: null,
        phone: '51999887766',
        zipCode: '',
        address: '',
        numberAddress: '',
        complement: '',
        district: '',
        city: null,
        state: null,
      },
    }
  },

  methods: {
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
        active: {
          boolValue: true,
          description: 'Ativo',
        },
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
