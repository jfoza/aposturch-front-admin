<template>
  <overlay
    :show="loading"
  >
    <page-header
      screen-name="Detalhes"
      :link-items="getLinkItems"
    />

    <section
      v-if="!loading"
      class="app-ecommerce-details"
    >
      <b-card
        no-body
      >
        <b-row class="my-2">
          <b-col
            cols="12"
            md="5"
            class="mb-2 mb-md-0"
          >
            <img
              v-if="product.image.length === 0"
              alt=""
              class="img-fluid no-img"
              :src="noImageIcon"
            >

            <b-carousel
              v-if="product.image.length > 0"
              id="carousel-crossfade"
              controls
            >
              <b-carousel-slide
                v-for="(image, key) in product.image"
                :key="key"
                class="product-slide"
              >
                <img
                  slot="img"
                  :src="image.path"
                  :alt="product.productName"
                  class="img-fluid w-100 d-block cursor-pointer"
                  @click="openModalImg({ src: image.path, alt: product.productName })"
                >
              </b-carousel-slide>
            </b-carousel>
          </b-col>

          <b-col
            cols="12"
            md="7"
          >
            <div class="p-text">
              <h4>{{ product.productName }}</h4>

              <div class="ecommerce-details-price d-flex flex-wrap mt-1">
                <h4 class="item-price mr-1 mb-0">
                  {{ moneyFormatBRL(product.productValue) }}
                </h4>
              </div>

              <p class="mt-1">
                Disponível - <span class="text-success">Em estoque</span>
              </p>

              <b-card-text>
                {{ product.productDescription }}
              </b-card-text>

              <div class="d-flex flex-column flex-sm-row pt-1">
                <b-button
                  v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                  variant="colors-palette2"
                  class="btn-cart mr-0 mr-sm-1 mb-1 mb-sm-0"
                >
                  <feather-icon
                    icon="ShoppingCartIcon"
                    class="mr-50"
                  />
                  <span>Adicionar ao carrinho</span>
                </b-button>
              </div>
            </div>
          </b-col>
        </b-row>
      </b-card>

      <modal-image
        ref="modalImage"
        :alt-name="modalImageAlt"
        :src-name="modalImageSrc"
      />

    </section>
  </overlay>
</template>

<script>
import {
  BCard,
  BRow,
  BCol,
  BCardText,
  BButton,
  BCarousel,
  BCarouselSlide,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import Overlay from '@/views/components/custom/Overlay.vue'
import PageHeader from '@/views/components/custom/PageHeader.vue'
import { getProductUniqueName } from '@core/utils/requests/products'
import {
  warningMessageBasicAction,
} from '@/libs/alerts/sweetalerts'
import { messages } from '@core/utils/validations/messages'
import noImageIcon from '@/assets/images/icons/custom/no-image-icon.png'
import { moneyFormatBRL } from '@core/utils/utils'
import ModalImage from '@/views/components/custom/ModalImage.vue'

export default {
  directives: {
    Ripple,
  },
  components: {
    ModalImage,
    PageHeader,
    Overlay,
    BCard,
    BRow,
    BCol,
    BCardText,
    BButton,
    BCarousel,
    BCarouselSlide,
  },

  props: {
    productUniqueName: {
      type: String,
      default: '',
    },
  },

  data() {
    return {
      loading: true,

      noImageIcon,

      showModalImage: false,
      modalImageAlt: '',
      modalImageSrc: '',

      linkItemsName: {
        name: '...',
        active: true,
      },

      product: {
        id: '',
        productName: '',
        productDescription: '',
        productCode: '',
        productValue: '',
        productQuantity: '',
        productBalance: '',
        highlightProduct: false,
        category: [],
        image: [],
      },
    }
  },

  computed: {
    getLinkItemsRoutes() {
      return this.$store.getters['storeModuleProducts/getLinkItemsRoutes']
    },

    getLinkItems() {
      return [
        this.getLinkItemsRoutes,
        this.linkItemsName,
      ]
    },

    getProductUniqueNameProp() {
      return this.productUniqueName
    },

    getGeneralRoutes() {
      return this.$store.getters['routes/getGeneralRoutes']
    },
  },

  created() {
    if (!this.getProductUniqueNameProp) {
      this.$router.replace({ name: this.getGeneralRoutes.error404.name })

      return false
    }

    return this.handleFindByUniqueName()
  },

  methods: {
    moneyFormatBRL,

    async handleFindByUniqueName() {
      this.loading = true

      await getProductUniqueName(this.getProductUniqueNameProp)
        .then(response => {
          const {
            id,
            product_name,
            product_description,
            product_code,
            product_value,
            product_quantity,
            product_balance,
            highlight_product,
            category,
            image,
          } = response.data

          this.product = {
            id,
            productName: product_name,
            productDescription: product_description,
            productCode: product_code,
            productValue: product_value,
            productQuantity: product_quantity,
            productBalance: product_balance,
            highlightProduct: highlight_product,
            category,
            image: image.length > 0 ? image : [],
          }

          this.linkItemsName.name = this.product.productName

          this.loading = false
        })
        .catch(error => {
          this.handleError(error.response)
        })
    },

    handleError(response) {
      const errors = response.status === 404

      if (errors) {
        warningMessageBasicAction('Registro não encontrado.')
          .then(() => {
            this.$router.replace({ name: 'home' })
          })
      } else {
        warningMessageBasicAction(messages.impossible)
          .then(() => {
            this.$router.replace({ name: 'home' })
          })
      }
    },

    openModalImg({ src, alt }) {
      this.$refs.modalImage.showModalImg = true

      this.modalImageSrc = src
      this.modalImageAlt = alt
    },
  },
}
</script>

<style lang="scss">
@import '@/assets/scss/variables/variables';
@import "~@core/scss/base/pages/app-ecommerce-details";

.product-slide img {
  width: 100%;
  height: 430px;
  object-fit: contain;
  object-position: center;
}

.item-price {
  color: $colors-palette2
}

.p-text {
  padding-right: 2rem;
}

@media (width < 768px) {
  .p-text {
    padding-right: 2rem;
    padding-left: 2rem;
  }
}
</style>
