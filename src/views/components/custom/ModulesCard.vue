<template>
  <b-link
    :to="{ name: routerName }"
  >
    <b-card
      img-src="https://placekitten.com/50/50"
      img-alt="Card image"
      img-left
      class="mb-3"
    >
      <b-card-text>
        Some quick example text to build on the card and make up the bulk of the card's content.
      </b-card-text>
    </b-card>
  </b-link>
</template>

<script>
import {
  BLink,
  BCard,
  BCardText,
} from 'bootstrap-vue'

export default {
  components: {
    BLink,
    BCard,
    BCardText,
  },

  props: {
    icon: {
      type: String,
      default: '',
    },

    title: {
      type: String,
      default: '',
    },

    description: {
      type: String,
      default: '',
    },

    routerName: {
      type: String,
      default: '',
    },
  },
}
</script>

<style scoped>
  .card-content {
    display: flex;
  }
</style>
