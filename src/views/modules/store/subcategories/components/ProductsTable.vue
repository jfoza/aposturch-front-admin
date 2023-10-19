<template>
  <overlay
    :show="loading"
    :class-name="className"
  >
    <b-form>
      <b-row class="align-items-center">
        <b-col
          sm="6"
          md="4"
          lg="2"
        >
          <b-form-group
            label="Código do produto*"
            label-for="code"
          >
            <b-form-input
              id="name"
              v-model="search.productCode"
              autocomplete="off"
            />
          </b-form-group>
        </b-col>

        <b-col
          sm="6"
          md="4"
          lg="2"
        >
          <products-auto-suggest
            ref="productNameAutoSuggest"
            @focus="searchEmptyError = false"
            @setProductName="setProductName"
          />
        </b-col>

        <b-col
          sm="12"
          lg="6"
          xl="4"
        >
          <button
            :disabled="disableAddProduct"
            type="button"
            class="btn button-form button-config mr-2"
            @click="formSubmit()"
          >
            <feather-icon icon="PlusIcon" />
            Adicionar produto
          </button>

          <button
            v-if="search.productName || search.productCode"
            type="button"
            class="btn btn-outline-form button-config"
            @click="
              clearAutoSuggest();
              clearFilters();
            "
          >
            <feather-icon icon="XIcon" />
            Limpar
          </button>
        </b-col>
      </b-row>
    </b-form>

    <b-row>
      <b-col cols="12">
        <b-alert
          variant="primary"
          :show="dismissCountDownAlerts"
          class="mx-2 mt-5"
          @dismissed="dismissCountDownAlerts = 0"
          @dismiss-count-down="countDownChangedAlerts"
        >
          <div class="alert-body d-flex justify-content-center">
            <span class="text-primary">
              <strong class="text-primary">
                Nenhum registro encontrado.
              </strong>
            </span>
          </div>
        </b-alert>

        <b-alert
          variant="primary"
          :show="tableError"
          class="mx-2 mt-5"
        >
          <div class="alert-body d-flex justify-content-center">
            <span class="text-primary">
              <strong class="text-primary">
                Ocorreu um erro ao buscar os dados. Entre em contato com o suporte.
              </strong>
            </span>
          </div>
        </b-alert>
      </b-col>
    </b-row>

    <b-row>
      <b-col cols="12">
        <div
          v-if="loadingTable"
          class="spinner-area"
        >
          <b-spinner class="spinner-border text-custom-blue" />
        </div>
      </b-col>

      <b-col
        v-if="!loadingTable"
        cols="12"
        class="my-2"
      >
        <div class="b-table-sticky-header table-responsive">
          <div class="custom-header">
            <div class="d-flex">
              <b-form-checkbox
                v-model="checkAll"
                :disabled="products.length === 0"
                @change="checkOrUncheckAll()"
              />
              <h4>Produtos vinculados</h4>
            </div>

            <button
              type="button"
              class="btn btn-clear btn-disable-all"
              :disabled="productsToRemove.length === 0"
              @click="handleConfirmRemoveProduct(true)"
            >
              <feather-icon icon="XIcon" />
              DESVINCULAR TODOS
            </button>
          </div>

          <b-col
            cols="12"
            class="text-center"
          >
            <p
              v-if="products.length === 0"
              class="table-empty"
            >
              A subcategoria possui nenhum produto vinculado.
            </p>
          </b-col>

          <table class="table">
            <tbody>
              <tr
                v-for="(product, index) in products"
                :key="index"
              >
                <td>
                  <div>
                    <div class="d-flex">
                      <b-form-checkbox
                        v-model="productsToRemove"
                        :value="product.id"
                      />
                      <span>
                        {{ product.product_name }}
                      </span>
                    </div>
                    <br>
                    <span>
                      <strong>Código:</strong>
                      {{ product.product_code }}
                    </span>

                    <span class="pipe">|</span>

                    <span>
                      <strong>Valor:</strong>
                      {{ product.value }}
                    </span>

                    <span class="pipe">|</span>

                    <span>
                      <strong>Quantidade/Saldo:</strong>
                      {{ product.quantity+'/'+product.balance }}
                    </span>
                  </div>
                </td>

                <td>
                  <button
                    type="button"
                    class="btn btn-clear btn-disable-one"
                    @click="
                      handleConfirmRemoveProduct(false, product.id)
                    "
                  >
                    <feather-icon icon="XIcon" />
                    DESVINCULAR
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </b-col>
    </b-row>
  </overlay>
</template>

<script>
import { required } from '@validations'
import {
  BAlert,
  BCol,
  BForm,
  BFormCheckbox,
  BFormGroup,
  BFormInput,
  BRow,
  BSpinner,
} from 'bootstrap-vue'
import { getArrayAttr } from '@core/utils/utils'
import Overlay from '@/views/components/custom/Overlay.vue'
import ProductsAutoSuggest from '@/views/modules/store/subcategories/components/ProductsAutoSuggest.vue'
import { getAllProducts } from '@core/utils/requests/products'
import { warningMessageRemoveProduct } from '@/libs/alerts/sweetalerts'

export default {
  components: {
    ProductsAutoSuggest,
    BFormCheckbox,
    BAlert,
    BSpinner,
    BFormGroup,
    BFormInput,
    BCol,
    BForm,
    BRow,
    Overlay,
  },

  props: {
    mode: {
      type: String,
      default: 'insert',
    },
    className: {
      type: String,
      default: '',
    },
  },

  data() {
    return {
      required,

      dismissSecsAlerts: 3,
      dismissCountDownAlerts: 0,

      loading: false,
      loadingTable: false,

      searchEmptyError: false,

      checkAll: false,

      search: {
        productName: '',
        productCode: '',
      },

      productsToRemove: [],

      products: [],

      tableError: false,

      buttonDisabled: false,
    }
  },

  computed: {
    getMode() {
      return this.mode
    },

    getFormData() {
      return this.$store.getters['storeModuleSubcategories/getSubcategoriesForm']
    },

    getProductsInUpdate() {
      return this.getFormData.products
    },

    getSearch() {
      return this.search
    },

    disableAddProduct() {
      return !this.getSearch.productName && !this.getSearch.productCode
    },
  },

  watch: {
    productsToRemove(value) {
      if (value.length === 0) {
        this.checkAll = false
      }
    },

    products: {
      handler(value) {
        if (value.length === 0) {
          this.productsToRemove = []

          this.tableError = false
          this.checkAll = false
        }
      },
      deep: true,
    },

    getSearch: {
      handler(value) {
        return value
      },
      deep: true,
    },
  },

  mounted() {
    if (this.getMode === 'update') {
      this.products = this.getProductsInUpdate
    }
  },

  methods: {
    async formSubmit() {
      if (!this.disableAddProduct) {
        await this.findAndPopulateProductsList()
      }
    },

    async findAndPopulateProductsList() {
      const exists = this.products.filter(
        val => val.product_code === this.search.productCode,
      )

      if (exists.length > 0) {
        return false
      }

      this.loadingTable = true

      this.tableError = false

      await getAllProducts(this.getParams())
        .then(response => {
          if (response.status === 200) {
            const { data } = response.data

            if (data.length > 0) {
              data.forEach(item => {
                this.products.push(item)
              })

              this.clearFilters()
              this.clearAutoSuggest()

              this.setProducts()
            } else {
              this.dismissCountDownAlerts = this.dismissSecsAlerts
            }
          }
        })
        .catch(() => {
          this.tableError = true
        })

      this.loadingTable = false

      return true
    },

    setProductName({ productNameSuggest, productCodeSuggest }) {
      this.search.productName = productNameSuggest
      this.search.productCode = productCodeSuggest
    },

    handleConfirmRemoveProduct(removeMany, product) {
      warningMessageRemoveProduct(this.getFormData.name).then(() => {
        if (removeMany) {
          return this.removeManyProducts()
        }

        return this.removeProduct(product)
      })
    },

    removeProduct(value) {
      this.products = this.products.filter(
        i => i.id !== value,
      )

      this.setProducts()
    },

    removeManyProducts() {
      this.productsToRemove.forEach(item => {
        this.products = this.products.filter(
          i => i.id !== item,
        )
      })

      this.setProducts()

      this.checkAll = false
    },

    checkOrUncheckAll() {
      let { products } = this

      if (this.checkAll) {
        products = products.filter(item => item.id)

        this.productsToRemove = getArrayAttr(products, 'id')
      } else {
        this.productsToRemove = []
      }
    },

    setProducts() {
      this.$emit('setProducts', this.products)
    },

    getParams() {
      return {
        perPage: 1000,
        page: 1,
        name: this.search.productName,
        code: this.search.productCode,
      }
    },

    clear() {
      this.products = []
      this.productsToRemove = []

      this.tableError = false
      this.checkAll = false

      this.search.productName = ''
      this.search.productCode = ''
    },

    clearAutoSuggest() {
      this.$refs.productNameAutoSuggest.chooseProduct = null
      this.$refs.productNameAutoSuggest.results = []
      this.$refs.productNameAutoSuggest.result = []
      this.$refs.productNameAutoSuggest.suggestions = []
      this.$refs.productNameAutoSuggest.selected = null
    },

    clearFilters() {
      this.search.productName = ''
      this.search.productCode = ''
    },

    countDownChangedAlerts(dismissCountDown) {
      this.dismissCountDownAlerts = dismissCountDown
    },
  },
}
</script>

<style scoped lang="scss">
@import "@/assets/scss/custom/products-table";
</style>
