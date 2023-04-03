<template>
  <b-link
    v-if="$can(getAbility.action, getAbility.subject)"
    class="module-card"
    @click="handleRedirectToModule"
  >
    <b-card
      class="mb-3 b-card-style"
    >
      <font-awesome-icon
        :icon="icon"
        :style="getStylesIcon"
      />

      <span class="card-title">{{ title }}</span>
    </b-card>
  </b-link>

</template>

<script>
/* eslint-disable import/no-extraneous-dependencies */
import {
  BLink,
  BCard,
} from 'bootstrap-vue'
import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faUsers,
  faHandHoldingDollar,
  faBookOpenReader,
  faChurch,
  faPeopleRoof,
  faCalendarCheck,
} from '@fortawesome/free-solid-svg-icons'

library.add(
  faUsers,
  faHandHoldingDollar,
  faBookOpenReader,
  faChurch,
  faPeopleRoof,
  faCalendarCheck,
)

Vue.component('font-awesome-icon', FontAwesomeIcon)

export default {
  components: {
    BLink,
    BCard,
  },

  props: {
    icon: {
      type: String,
      default: '',
    },

    title: {
      type: String,
      default: '',
    },

    description: {
      type: String,
      default: '',
    },

    ability: {
      type: Object,
      default: null,
    },

    menus: {
      type: Array,
      default: () => [],
    },

    routerName: {
      type: String,
      default: '',
    },
  },

  computed: {
    getMenus() {
      return this.menus
    },

    getAbility() {
      return this.ability
    },

    getStylesIcon() {
      return {
        width: '35px',
        height: '35px',
        marginBottom: '20px',
      }
    },
  },

  methods: {
    handleRedirectToModule() {
      this.$store.commit('defineMenus/HANDLE_DEFINE_MENUS', this.getMenus)

      this.$router.push({ name: this.routerName })
    },
  },
}
</script>

<style scoped>
  .module-card {
    width: 130px;
    margin: 0 15px;
  }

  .b-card-style {
    background-color: #fff;
    color: #5e5873;
    transition: .4s background-color;
  }

  .b-card-style:hover {
    background-color: #5BC0BE;
    color: #fff;
  }

  .card-body {
    padding: 2.3rem 1.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .module-card .card-icon {
    margin-bottom: 20px;
  }

  .module-card .card-title {
    font-size: 15px;
  }
</style>
