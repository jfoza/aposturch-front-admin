<template>
  <div class="auth-wrapper auth-v2">
    <b-row class="w-100 m-0">
      <b-col
        lg="12"
        class="d-flex justify-content-center"
      >
        <div class="page-misc-view">
          <application-logo />
          <div class="page-misc-card">
            <slot />
          </div>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import ApplicationLogo from '@/views/components/custom/ApplicationLogo.vue'
// eslint-disable-next-line import/extensions
import {
  BRow,
  BCol,
} from 'bootstrap-vue'

export default {
  components: {
    ApplicationLogo,
    BRow,
    BCol,
  },
  data() {
    return {}
  },
  computed: {

  },
  methods: {

  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/pages/page-misc.scss';
</style>
