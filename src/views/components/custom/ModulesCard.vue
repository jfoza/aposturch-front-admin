<template>
  <b-link
    v-if="$can(getAbility.action, getAbility.subject)"
    class="module-card"
    @click="handleRedirectToModule"
  >
    <b-card
      class="mb-3 b-card-style"
      :style="getStyles"
    >
      <feather-icon
        :icon="icon"
        size="30"
        class="card-icon"
      />

      <span class="card-title">{{ title }}</span>
    </b-card>
  </b-link>

</template>

<script>
import {
  BLink,
  BCard,
} from 'bootstrap-vue'

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

    hoverStyle: {
      type: Object,
      default: () => ({
        hoverBg: '',
        hoverColor: '',
      }),
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

  data() {
    return {
      classLink: 'card-link',
    }
  },

  computed: {
    getMenus() {
      return this.menus
    },

    getAbility() {
      return this.ability
    },

    getStyles() {
      return {
        '--bg-color-hover': this.hoverStyle.hoverBg,
        '--color-hover': this.hoverStyle.hoverColor,
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
  :root {
    --color-hover: '';
    --bg-color-hover: '';
  }

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
    background-color: var(--bg-color-hover);
    color: var(--color-hover);
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

  /*.module-card .card-icon {*/
  /*  color: #5e5873;*/
  /*  transition: .4s background-color;*/
  /*}*/
</style>
