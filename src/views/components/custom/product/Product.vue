<template>
  <b-card
    class="ecommerce-card"
    :class="className"
    no-body
  >
    <div class="item-img text-center">
      <img
        alt=""
        :class="productImg ? 'img-fluid p-img' : 'img-fluid no-img'"
        :src="productImg ? productImg : noImageIcon"
      >
    </div>

    <!-- Product Details -->
    <b-card-body class="custom-card-body">
      <div class="item-wrapper">
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
      </div>
      <div class="p-info">
        <div class="item-name">
          <h6>
            {{ productName }}
          </h6>
        </div>

        <div class="item-add-cart">
          <b-link
            class="btn btn-rounded"
          >
            <b-img
              class="icon-cart-plus-img"
              :src="cartPlusIcon"
            />
          </b-link>
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
} from 'bootstrap-vue'

import cartPlusIcon from '@/assets/images/icons/custom/cart-plus-light-icon.png'
import noImageIcon from '@/assets/images/icons/custom/no-image-icon.png'

export default {
  components: {
    BCard,
    BCardBody,
    BImg,
    BLink,
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
  },

  data() {
    return {
      cartPlusIcon,
      noImageIcon,
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
  },
}
</script>

<style scoped lang="scss">
@import './index';
</style>
