<template>
  <b-col
    v-if="$can(getAbility.action, getAbility.subject)"
    xl="3"
    lg="4"
    md="6"
    sm="12"
  >
    <b-link
      @click="handleRedirectToModule"
    >
      <b-card
        class="mb-3"
      >
        <div class="card-content">
          <img
            :src="icon"
            :alt="title"
          >

          <div class="card-text">
            <h4>{{ title }}</h4>

            <p>
              {{ description }}
            </p>
          </div>
        </div>
      </b-card>
    </b-link>
  </b-col>
</template>

<script>
import {
  BLink,
  BCard,
  BCol,
} from 'bootstrap-vue'

export default {
  components: {
    BLink,
    BCard,
    BCol,
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
  .card-content {
    display: flex;
    align-items: center;
  }

  .card-text {
    width: 100%;
    margin: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  @media (max-width: 300px) {
    .card-content {
      display: flex;
      flex-direction: column;
    }
  }
</style>
