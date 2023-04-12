<template>
  <div
    id="user-profile"
  >
    <view-header :header-data="churchData.header" />
  </div>
</template>

<script>
import { BRow, BCol } from 'bootstrap-vue'

import ViewHeader from '@/views/modules/members/churches/components/ViewHeader.vue'

/* eslint-disable global-require */
export default {
  components: {
    BRow,
    BCol,
    ViewHeader,
  },
  data() {
    return {
      churchData: {
        header: {
          coverImg: require('@/assets/images/custom/background-view.jpg'),
          profileImg: require('@/assets/images/custom/ibv.jpg'),
          name: 'Igreja Viver NH',
        },
      },
    }
  },
}
/* eslint-disable global-require */
</script>

<style lang="scss" >
@import '@core/scss/vue/pages/page-profile.scss';
</style>
