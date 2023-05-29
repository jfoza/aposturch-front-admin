<template>
  <button
    type="button"
    class="btn button-prev font-weight-bolder"
    :class="className"
    @click="action"
  >
    <feather-icon
      size="15"
      icon="ArrowLeftIcon"
    />

    <span class="btn-text">
      Voltar
    </span>
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

<style scoped lang="scss">
@import '@/assets/scss/variables/_variables.scss';

.button-prev {
  background-color: transparent;
  border-color: $colors-palette3;
  color: $colors-palette3;
  opacity: .65;
  transition: opacity .3s;
}

.button-prev:hover {
  opacity: 1;
}

  .btn-text {
    margin-left: .3rem;
  }
</style>
