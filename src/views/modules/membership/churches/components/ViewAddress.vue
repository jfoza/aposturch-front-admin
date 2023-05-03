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
              CEP
            </h5>

            <p>{{ addressData.zipCode || '-' | VMask('#####-###') }}</p>
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
              Endereço
            </h5>

            <p>{{ addressData.address || '-' }}</p>
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
              Número
            </h5>

            <p>{{ addressData.numberAddress || '-' }}</p>
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
              Complemento
            </h5>

            <p>{{ addressData.complement || '-' }}</p>
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
              Cidade
            </h5>

            <p>{{ addressData.city.description || '-' }}</p>
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
              UF
            </h5>

            <p>{{ addressData.uf || '-' }}</p>
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
} from 'bootstrap-vue'

export default {
  components: {
    BContainer,
    BRow,
    BCol,
  },

  props: {
    className: {
      type: String,
      default: '',
    },

    addressData: {
      type: Object,
      default: () => null,
    },
  },
}
</script>

<style scoped>
</style>
