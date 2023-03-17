<template>
  <button
      :disabled="!getState"
      :type="type"
      class="btn"
      :style="getStyles"
      @click="actionButton"
  >
    <b-spinner v-if="!getState" variant="custom"></b-spinner>
    <span v-else>{{ getMessage }}</span>
  </button>
</template>

<script>
import { BSpinner } from 'bootstrap-vue'

export default {
  props: {
    state: {
      type: Boolean,
      default: true,
    },
    type: {
      type: String,
      default: 'button',
    },
    message: {
      type: String,
      default: 'Submit'
    },
    bgColor: {
      type: String,
      default: '#ec7c7d'
    },
    color: {
      type: String,
      default: '#fff'
    }
  },

  components: {
    BSpinner
  },

  data() {
    return {
      disabled: false,
    }
  },

  methods: {
    actionButton() {
      this.$emit('action');
    }
  },

  computed: {
    getStyles() {
      return {
        width: '100%',
        backgroundColor: this.bgColor,
        color: this.color,
        transition: '.3s background-color',
        marginBottom: '2rem'
      }
    },

    getState() {
      return this.state
    },

    getMessage() {
      return this.message
    }
  },
}
</script>

<style scoped>

</style>