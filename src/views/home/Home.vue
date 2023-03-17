<template>
  <div class="welcome-img-container">
    <div class="welcome-img">
      <img
        :src="require('@/assets/images/custom/logo/lalak-logo-large.png')"
        alt=""
      >
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      data: {},
    }
  },
}
</script>

<style lang="scss">
  .welcome-img-container {
    display: flex;
    justify-content: center;

    .welcome-img {
      max-width: 1000px;
      margin-top: 50px;

      img {
        max-width: 100%;
        max-height: 100%;
        opacity: .2;
      }
    }
  }
</style>
