<template>
  <button
    :disabled="!getState"
    :type="type"
    class="btn load-button"
    @click="actionButton"
  >
    <b-spinner
      v-if="!getState"
      variant="custom"
    />
    <span v-else>{{ getMessage }}</span>
  </button>
</template>

<script>
import { BSpinner } from 'bootstrap-vue'

export default {

  components: {
    BSpinner,
  },
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
      default: 'Submit',
    },
  },

  data() {
    return {
      disabled: false,
    }
  },

  computed: {
    getState() {
      return this.state
    },

    getMessage() {
      return this.message
    },
  },

  methods: {
    actionButton() {
      this.$emit('action')
    },
  },
}
</script>

<style scoped lang="scss">
@import "@/assets/scss/variables/_variables.scss";

.load-button {
  background-color: $colors-palette2;
  color: $white;
  width: 100%;
  transition: .3s background-color;
}

.load-button:hover {
  background-color: $colors-palette1;
}
</style>
