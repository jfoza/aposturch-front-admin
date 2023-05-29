<template>
  <button
    type="button"
    class="btn button-form font-weight-bolder"
    :class="className"
    @click="action"
  >
    <span class="btn-text">
      Próximo
    </span>

    <feather-icon
      size="15"
      icon="ArrowRightIcon"
    />
  </button>
</template>

<script>
export default {
  props: {
    className: {
      type: String,
      default: '',
    },
  },

  data() {
    return {
      btnClass: 'btn btn-custom-clear',
    }
  },

  methods: {
    action() {
      this.$emit('action')
    },
  },
}
</script>

<style scoped>
  .btn-text {
    margin-right: .3rem;
  }
</style>
