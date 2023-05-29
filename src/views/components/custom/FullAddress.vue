<template>
  <span>
    {{ address }}, {{ numberAddress }} {{ complement }},<br>
    {{ district }}, {{ city }} - {{ state }}, {{ zipCode }}
  </span>
</template>

<script>
export default {
  props: {
    zipCode: {
      type: String,
      default: '',
    },
    address: {
      type: String,
      default: '',
    },
    numberAddress: {
      type: String,
      default: '',
    },
    complement: {
      type: String,
      default: '',
    },
    district: {
      type: String,
      default: '',
    },
    city: {
      type: String,
      default: '',
    },
    state: {
      type: String,
      default: '-',
    },
  },
}
</script>
