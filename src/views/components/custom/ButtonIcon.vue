<template>
  <button
    type="button"
    :style="getBtnStyles"
    @click="action"
  >
    <feather-icon
      :size="size"
      :icon="featherIcon"
    />
  </button>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: '#2772C0',
    },
    size: {
      type: String,
      default: '18',
    },
    featherIcon: {
      type: String,
      default: '',
    },
  },

  data() {
    return {
      btnClass: 'btn btn-custom-clear',
    }
  },

  computed: {
    getBtnStyles() {
      return {
        color: this.color,
        backgroundColor: 'transparent',
        padding: 0,
        margin: '.2rem',
        border: 'none',
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
