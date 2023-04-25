<template>
  <div class="content-wrapper">
    <page-header
      screen-name="Cadastrar Nova"
      :link-items="linkItems"
    />

    <Form
      :mode="formActions.insertAction"
      :form-data="form"
      @clear="clearForm"
    />
  </div>
</template>

<script>

// eslint-disable-next-line import/extensions
import PageHeader from '@/views/components/custom/PageHeader'
import { formActions } from '@core/utils/formActions'
import Form from './Form.vue'

export default {
  components: {
    PageHeader,
    Form,
  },

  data() {
    return {
      linkItems: [
        {
          name: 'Gerenciar Igrejas',
          routeName: '',
        },
        {
          name: 'Cadastrar Nova',
          active: true,
        },
      ],

      formActions,

      form: {
        name: '',
        phone: '',
        email: '',
        youtube: '',
        facebook: '',
        instagram: '',
        zip_code: '',
        address: '',
        number_address: '',
        complement: '',
        district: '',
        state: null,
        city: null,
        responsible: [],
        image: {
          id: '',
          type: '',
          path: '',
        },
        active: {
          boolValue: true,
          description: 'Ativo',
        },
      },
    }
  },

  methods: {
    clearForm() {
      this.form = {
        name: '',
        phone: '',
        email: '',
        youtube: '',
        facebook: '',
        instagram: '',
        zip_code: '',
        address: '',
        number_address: '',
        complement: '',
        district: '',
        state: null,
        city: null,
        responsible: [],
        image: {
          id: '',
          type: '',
          path: '',
        },
        active: {
          boolValue: true,
          description: 'Ativo',
        },
      }
    },
  },
}
</script>

<style lang="scss" scoped>

</style>
