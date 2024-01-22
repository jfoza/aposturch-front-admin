<template>
  <b-card
    class="ecommerce-card"
    :class="className"
    no-body
  >
    <div class="item-img text-center">
      <b-link
        @click="redirectProductDetails"
      >
        <img
          alt=""
          :class="productImg ? 'img-fluid p-img' : 'img-fluid no-img'"
          :src="productImg ? productImg : noImageIcon"
        >
      </b-link>
    </div>

    <!-- Product Details -->
    <b-card-body class="custom-card-body">
      <div class="d-flex justify-content-between">
        <div class="p-price-area">
          <p class="p-money">
            R$
          </p>
          <p class="p-price">
            {{ getProductPrice.price }}
          </p>
          <p class="p-price-cents">
            {{ getProductPrice.priceCents }}
          </p>
        </div>

        <div class="item-balance">
          <span
            v-if="getProductBalance === 0 || !getProductBalance"
            class="text-danger"
          >
            Sem estoque
          </span>
          <div
            v-if="getProductBalance && getProductBalance > 0"
            class="d-flex"
          >
            <span class="text-success">Disponível:</span>
            <p class="balance-info">
              {{ getProductBalance }}
            </p>
          </div>
        </div>
      </div>
      <div class="p-info">
        <div class="item-name">
          <b-link
            @click="redirectProductDetails"
          >
            <h6>
              {{ productName }}
            </h6>
          </b-link>
        </div>

        <div class="item-add-cart">
          <button
            v-b-tooltip.hover
            type="button"
            :disabled="getProductBalance === 0 || !getProductBalance"
            :title="getProductBalance === 0 || !getProductBalance ? 'Produto sem estoque' : ''"
            class="btn btn-rounded"
          >
            <b-img
              class="icon-cart-plus-img"
              :src="cartPlusIcon"
            />
          </button>
        </div>
      </div>
    </b-card-body>
  </b-card>
</template>
<script>

import {
  BCard,
  BCardBody,
  BImg,
  BLink,
  VBTooltip,
} from 'bootstrap-vue'

import cartPlusIcon from '@/assets/images/icons/custom/cart-plus-light-icon.png'
import noImageIcon from '@/assets/images/icons/custom/no-image-icon.png'
import storeModuleRouter from '@/views/modules/store/routes'

export default {
  components: {
    BCard,
    BCardBody,
    BImg,
    BLink,
  },

  directives: {
    'b-tooltip': VBTooltip,
  },

  props: {
    className: {
      type: String,
      default: '',
    },

    productId: {
      type: String,
      default: '',
    },

    productUniqueName: {
      type: String,
      default: '',
    },

    productName: {
      type: String,
      default: '',
    },

    productImg: {
      type: String,
      default: '',
    },

    productPrice: {
      type: String,
      default: '0.00',
    },

    productBalance: {
      type: Number,
      default: 0,
    },
  },

  data() {
    return {
      cartPlusIcon,
      noImageIcon,

      storeModuleRouter,
    }
  },

  computed: {
    getProductPrice() {
      const productPrice = this.productPrice ? parseFloat(this.productPrice) : 0.00

      const priceStr = productPrice.toLocaleString('pt-br', { minimumFractionDigits: 2 })
      const priceSplit = priceStr.split(',')

      return {
        price: priceSplit[0] ? priceSplit[0] : '0',
        priceCents: priceSplit[1] ? priceSplit[1] : '00',
      }
    },

    getProductUniqueName() {
      return this.productUniqueName
    },

    getProductBalance() {
      return this.productBalance
    },
  },

  methods: {
    redirectProductDetails() {
      this.$emit('setLinkItemsRoute')

      this.$router.push({ path: `${storeModuleRouter.productDetails.path}/${this.getProductUniqueName}` })
    },
  },
}
</script>

<style scoped lang="scss">
@import './index';
</style>
