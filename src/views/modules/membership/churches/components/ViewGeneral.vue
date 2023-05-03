<template>
  <div :class="className">
    <b-container>
      <b-row>
        <b-col
          xl="4"
          lg="6"
          md="12"
          class="mb-3"
        >
          <div class="col-content">
            <h5 class="font-weight-bolder">
              Nome
            </h5>

            <p>{{ generalData.name || '-' }}</p>
          </div>
        </b-col>

        <b-col
          xl="4"
          lg="6"
          md="12"
          class="mb-3"
        >
          <div class="col-content">
            <h5 class="font-weight-bolder">
              Telefone
            </h5>

            <p>{{ generalData.phone || '-' | VMask('(##) #####-####') }}</p>
          </div>
        </b-col>

        <b-col
          xl="4"
          lg="6"
          md="12"
          class="mb-3"
        >
          <div class="col-content">
            <h5 class="font-weight-bolder">
              E-mail
            </h5>

            <p>{{ generalData.email || '-' }}</p>
          </div>
        </b-col>

        <b-col
          xl="4"
          lg="6"
          md="12"
          class="mb-3"
        >
          <div class="col-content">
            <h5 class="font-weight-bolder">
              YouTube
            </h5>

            <b-link
              :href="generalData.youtube"
              target="_blank"
            >
              {{ generalData.youtube || '-' }}
            </b-link>
          </div>
        </b-col>

        <b-col
          xl="4"
          lg="6"
          md="12"
          class="mb-3"
        >
          <div class="col-content">
            <h5 class="font-weight-bolder">
              Facebook
            </h5>

            <b-link
              :href="generalData.facebook"
              target="_blank"
            >
              {{ generalData.facebook || '-' }}
            </b-link>
          </div>
        </b-col>

        <b-col
          xl="4"
          lg="6"
          md="12"
          class="mb-3"
        >
          <div class="col-content">
            <h5 class="font-weight-bolder">
              Instagram
            </h5>

            <b-link
              :href="generalData.instagram"
              target="_blank"
            >
              {{ generalData.instagram || '-' }}
            </b-link>
          </div>
        </b-col>

        <b-col
          xl="4"
          lg="6"
          md="12"
          class="mb-3"
        >
          <div class="col-content">
            <h5 class="font-weight-bolder">
              Status
            </h5>

            <p>{{ generalData.active || '-' }}</p>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import {
  BContainer,
  BRow,
  BCol,
  BLink,
} from 'bootstrap-vue'

export default {
  components: {
    BContainer,
    BRow,
    BCol,
    BLink,
  },

  props: {
    className: {
      type: String,
      default: '',
    },

    generalData: {
      type: Object,
      default: () => null,
    },
  },
}
</script>

<style scoped>
</style>
