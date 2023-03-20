<template>
  <b-link
    :to="{ name: routerName }"
  >
    <b-card
      class="mb-3"
    >
      <div class="card-content">
        <img
          :src="icon"
          :alt="title"
        >

        <div class="card-text">
          <h4>{{ title }}</h4>

          <p>
            {{ description }}
          </p>
        </div>
      </div>
    </b-card>
  </b-link>
</template>

<script>
import {
  BLink,
  BCard,
} from 'bootstrap-vue'

export default {
  components: {
    BLink,
    BCard,
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
    align-items: center;
  }

  .card-text {
    width: 100%;
    margin: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  @media (max-width: 300px) {
    .card-content {
      display: flex;
      flex-direction: column;
    }
  }
</style>
