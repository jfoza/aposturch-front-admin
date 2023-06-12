<template>
  <div class="content-wrapper">
    <page-header
      screen-name="Cadastrar Novo"
      :link-items="linkItems"
    />

    <b-row>
      <b-col cols="12">
        <form-wizard />
      </b-col>
    </b-row>
  </div>
</template>

<script>

// eslint-disable-next-line import/extensions
import { BRow, BCol } from 'bootstrap-vue'
import PageHeader from '@/views/components/custom/PageHeader.vue'
import FormWizard from './FormWizard.vue'

export default {
  components: {
    BRow,
    BCol,
    PageHeader,
    FormWizard,
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
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-wizard.scss';
@import '@core/scss/vue/libs/vue-select.scss';
</style>
