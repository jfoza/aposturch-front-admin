<template>
  <button
    type="button"
    :style="getBtnStyles"
    :class="`btn btn-icon rounded-circle btn-${variant}`"
    @click="action"
  >
    <feather-icon
      :icon="featherIcon"
    />
  </button>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: '#fff',
    },
    variant: {
      type: String,
      default: 'colors-palette2',
    },
    buttonSize: {
      type: String,
      default: '30',
    },
    featherIcon: {
      type: String,
      default: '',
    },
  },

  computed: {
    getBtnStyles() {
      return {
        color: this.color,
        backgroundColor: this.bgColor,
        padding: 0,
        width: `${this.buttonSize}px`,
        height: `${this.buttonSize}px`,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }
    },
  },

  methods: {
    action() {
      this.$emit('action')
    },
  },
}
</script>
