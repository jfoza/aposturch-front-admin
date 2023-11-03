<template>
  <font-awesome-icon
    :icon="getIconByProfile"
  />
</template>

<script>
import profilesUniqueName from '@core/utils/profiles'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faUserTie,
  faChurch,
  faPeopleCarryBox,
  faUser,
} from '@fortawesome/free-solid-svg-icons'
import Vue from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(
  faUserTie,
  faChurch,
  faPeopleCarryBox,
  faUser,
)

Vue.component('font-awesome-icon', FontAwesomeIcon)

export default {
  props: {
    profile: {
      type: String,
      default: '',
    },
  },

  computed: {
    getProfile() {
      return this.profile
    },

    getIconByProfile() {
      switch (this.getProfile) {
        case profilesUniqueName.ADMIN_CHURCH: return 'fa-solid fa-church'
        case profilesUniqueName.ADMIN_MODULE: return 'fa-solid fa-user-tie'
        case profilesUniqueName.ASSISTANT: return 'fa-solid fa-people-carry-box'
        case profilesUniqueName.MEMBER: return 'fa-solid fa-user'

        default: return ''
      }
    },
  },

  mounted() {
    console.log(this.getProfile)
  },
}
</script>

<style scoped lang="scss">

</style>
