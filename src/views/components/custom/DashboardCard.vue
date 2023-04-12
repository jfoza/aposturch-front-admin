<template>
  <statistic-card-vertical
    v-if="$can(getAbility.action, getAbility.subject)"
    class="s-card"
    :style="getStylesCard"
    :icon="icon"
    :statistic="statistic"
    :statistic-title="title"
    color="info"
  />
</template>

<script>
/* eslint-disable import/no-extraneous-dependencies */
import StatisticCardVertical from '@core/components/statistics-cards/StatisticCardVertical.vue'

export default {
  components: {
    StatisticCardVertical,
  },

  props: {
    icon: {
      type: String,
      default: '',
    },

    statistic: {
      type: Number,
      default: 0,
    },

    title: {
      type: String,
      default: '',
    },

    ability: {
      type: Object,
      default: null,
    },

    routerName: {
      type: String,
      default: '',
    },
  },

  computed: {
    getAbility() {
      return this.ability
    },

    getStylesCard() {
      return {
        width: '150px',
        height: '174px',
        color: '#5e5873',
        marginRight: '30px',
        marginBottom: '30px',
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

</style>
