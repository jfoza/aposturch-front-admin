<template>
  <div class="content-wrapper">
    <page-header
      screen-name="Nova Venda"
      :link-items="linkItems"
    />

    <section class="ecommerce-searchbar mt-1 mb-4">
      <b-row
        class="justify-content-center"
      >
        <b-col
          md="12"
          xl="7"
        >
          <b-input-group class="input-group-merge">
            <b-form-input
              v-model="search.nameOrCode"
              placeholder="Encontre um produto"
              class="search-product"
              @keyup="handleSearchProducts"
            />
            <b-input-group-append is-text>
              <feather-icon
                :icon="search.nameOrCode ? 'XIcon' : 'SearchIcon'"
                :class="search.nameOrCode ? 'cursor-pointer' : 'text-muted'"
                @click="clearFiltersAndFindAll"
              />
            </b-input-group-append>
          </b-input-group>
        </b-col>
      </b-row>
    </section>

    <overlay
      :show="loading"
    >
      <section>
        <div class="products-list">
          <div
            v-for="(item, index) in products"
            :key="index"
          >
            <Product
              :product-id="item.id"
              :product-name="item.product_name"
              :product-img="item.image.length > 0 ? item.image[0].path : null"
              :product-price="item.product_value"
            />
          </div>
        </div>
      </section>

      <section
        v-if="products.length > 0"
        class="mt-3"
      >
        <b-row>
          <b-col
            class="px-3"
            sm="12"
          >
            <CustomPagination
              :pagination-data="paginationData"
              @page-cliked="updateCurrentPage"
            />
          </b-col>
        </b-row>
      </section>

      <section>
        <b-row>
          <b-col
            cols="12"
            class="text-center"
          >
            <p
              v-if="products.length === 0"
              class="table-empty"
            >
              Nenhum registro encontrado.
            </p>
          </b-col>
        </b-row>
      </section>
    </overlay>
  </div>
</template>

<script>

import PageHeader from '@/views/components/custom/PageHeader.vue'
import Overlay from '@/views/components/custom/Overlay.vue'

import {
  BRow,
  BCol,
  BInputGroup,
  BInputGroupAppend,
  BFormInput,
} from 'bootstrap-vue'
import Product from '@/views/components/custom/product/Product.vue'
import { getAllProducts } from '@core/utils/requests/products'
import CustomPagination from '@/views/components/custom/CustomPagination.vue'

export default {
  components: {
    CustomPagination,
    Product,
    Overlay,
    PageHeader,
    BRow,
    BCol,
    BInputGroup,
    BInputGroupAppend,
    BFormInput,
  },

  data() {
    return {
      titlePage: '',

      loading: false,

      linkItems: [
        {
          name: 'Gerenciar Vendas',
          routeName: '',
        },
        {
          name: 'Nova Venda',
          active: true,
        },
      ],

      paginationData: {
        currentPage: 0,
        totalLines: 0,
        fromLine: 0,
        toLine: 0,
        defaultSize: 30,
      },

      products: [],

      search: {
        nameOrCode: '',
      },
    }
  },

  mounted() {
    this.handleGetProducts()
  },

  methods: {
    async handleGetProducts() {
      this.loading = true

      await getAllProducts(this.getParams())
        .then(response => {
          const { data, status } = response

          if (status === 200 && data.data.length > 0) {
            this.products = data.data
            this.handlePagination(data)
          }
        })
        .catch(() => {

        })

      this.loading = false
    },

    async handleSearchProducts() {
      if (this.search.nameOrCode.length === 0 || this.search.nameOrCode.length >= 3) {
        await this.handleGetProducts()
      }
    },

    async clearFiltersAndFindAll() {
      this.search.nameOrCode = ''

      await this.handleGetProducts()
    },

    getParams() {
      return {
        perPage: this.paginationData.defaultSize,
        page: this.paginationData.currentPage,
        nameOrCode: this.search.nameOrCode,
      }
    },

    handlePagination(data) {
      this.paginationData.fromLine = data.from
      this.paginationData.toLine = data.to
      this.paginationData.totalLines = data.total
      this.paginationData.currentPage = data.current_page
    },

    updateQtdView(event) {
      if (!event) {
        this.paginationData.defaultSize = 10
      }

      this.paginationData.currentPage = 1
      this.handleGetProducts()
    },

    updateCurrentPage(page) {
      this.paginationData.currentPage = page
      this.handleGetProducts()
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variables/variables';

.search-product:focus{
  box-shadow: none !important;
}

.ecommerce-searchbar {
  .input-group {
    box-shadow: 0 2px 8px 0 rgba($black, 0.14);
    border-radius: 0.3rem;
  }
}

.search-product,
.input-group-text {
  height: 48px;
  border: none;
  font-size: 0.95rem;
  padding-left: 1.25rem;

  &::placeholder {
    font-size: 0.95rem;
  }
}

.products-list {
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax($product-card-width, 1fr));
  justify-content: center;
  justify-items: center;
  padding: 1rem;
}

.table-empty {
  font-size: 16px;
}
</style>
