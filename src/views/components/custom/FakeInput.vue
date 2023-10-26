<template>
  <div
    class="fake-input"
    :class="className"
  >
    {{ textInput }}
  </div>
</template>

<script>
export default {
  props: {
    textInput: {
      type: String,
      default: '',
    },

    className: {
      type: String,
      default: '',
    },
  },
}
</script>

<style scoped lang="scss">
  .fake-input {
    padding: 0.438rem 1rem;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #d8d6de;
    border-radius: 0.357rem;
    width: 100%;
    height: 38px;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.45;
    color: #6e6b7b;
  }
</style>
