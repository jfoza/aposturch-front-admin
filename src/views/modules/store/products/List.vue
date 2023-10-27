<template>
  <div class="content-wrapper">
    <page-header
      screen-name="Ver Produtos"
      :link-items="linkItems"
    />

    <overlay
      :show="loading"
      class-name="card p-2"
    >
      <b-form>
        <b-row class="mb-2">
          <b-col cols="12">
            <h3>Lista de Produtos</h3>
            <p>
              Para realizar uma busca, selecione o(s) filtros necessário(s) e clique no botão buscar:
            </p>
          </b-col>
        </b-row>

        <b-row class="align-items-center">
          <b-col
            sm="6"
            lg="4"
            xl="3"
          >
            <b-form-group
              label="Nome"
              label-for="name"
            >
              <b-form-input
                id="name"
                v-model="search.name"
                placeholder="Nome"
                autocomplete="off"
              />
            </b-form-group>
          </b-col>

          <b-col
            sm="6"
            lg="4"
            xl="3"
          >
            <b-form-group
              label="Código"
              label-for="code"
            >
              <b-form-input
                id="name"
                v-model="search.code"
                placeholder="Código"
                autocomplete="off"
              />
            </b-form-group>
          </b-col>

          <b-col
            sm="6"
            lg="4"
            xl="3"
          >
            <b-form-group
              label="Categorias"
              label-for="categories"
            >
              <v-select
                id="categories"
                v-model="search.categories"
                :options="categories"
                variant="custom"
                item-text="name"
                item-value="id"
                placeholder="Selecione uma ou mais"
                label="name"
                :disabled="loadingSelects"
                multiple
              />
            </b-form-group>
          </b-col>

          <b-col
            sm="6"
            lg="4"
            xl="3"
          >
            <b-form-group
              label="Em destaque"
              label-for="highlight"
            >
              <b-form-radio-group
                v-model="search.highlight"
                :options="radioOptions"
                class="demo-inline-spacing mb-1"
                value-field="value"
                text-field="text"
                disabled-field="disabled"
                @change="findAll"
              />
            </b-form-group>
          </b-col>

          <b-col
            sm="12"
            lg="4"
            class="actions-area"
          >
            <div class="action-search">
              <button
                type="button"
                class="btn button-form button-config mr-2"
                @click.prevent="findAll"
              >
                <feather-icon
                  icon="SearchIcon"
                />
                Pesquisar
              </button>

              <button
                type="button"
                class="btn btn-outline-form button-config"
                @click="clearFilters"
              >
                <feather-icon
                  icon="XIcon"
                />
                Limpar
              </button>
            </div>
          </b-col>
        </b-row>

        <b-row class="mt-3 mb-1">
          <b-col>
            <b-link
              type="button"
              class="btn button-form button-plus"
              :to="{ name: getStoreModuleRoutes.productsInsert.name }"
            >
              <feather-icon
                icon="PlusIcon"
              />
              Adicionar novo produto
            </b-link>
          </b-col>
        </b-row>
      </b-form>

      <b-row>
        <b-col
          md="12"
          lg="6"
        >
          <h1 class="px-2">
            {{ titlePage }}
          </h1>
        </b-col>
      </b-row>

      <b-row class="mt-3 mb-1">
        <b-col
          md="6"
        >
          <div
            v-if="showTable"
            class="d-flex justify-center-center align-items-center"
          >
            <span class="mr-50">Mostrar</span>
            <v-select
              id="orders"
              v-model="paginationData.defaultSize"
              :options="table.tableRows"
              :clearable="false"
              @input="updateQtdView($event)"
            >
              <span slot="no-options">Nenhuma opção selecionável.</span>
            </v-select>
          </div>
        </b-col>

        <b-col
          v-if="hasUpdateStatus"
          class="btn-update-status-container"
          md="6"
        >
          <button
            :disabled="!checkAll && productsToUpdateStatus.length === 0"
            type="button"
            class="btn btn-outline-form"
            @click="handleConfirmUpdateManyProductsStatus"
          >
            Alterar status dos selecionados
          </button>
        </b-col>
      </b-row>

      <b-row>
        <b-col cols="12">
          <b-alert
            variant="primary"
            :show="table.empty"
            class="mx-2 mt-5"
          >
            <div class="alert-body d-flex justify-content-center">
              <span class="text-primary">
                <strong
                  class="text-primary"
                >Nenhum registro encontrado.</strong>
              </span>
            </div>
          </b-alert>

          <b-alert
            variant="primary"
            :show="table.tableError"
            class="mx-2 mt-5"
          >
            <div class="alert-body d-flex justify-content-center">
              <span class="text-primary">
                <strong
                  class="text-primary"
                >Sistema de busca indisponível no momento.</strong>
              </span>
            </div>
          </b-alert>
        </b-col>

        <b-col
          cols="12"
        >
          <div
            v-if="table.tableBusy"
            class="spinner-area"
          >
            <b-spinner class="spinner-border text-custom-blue" />
          </div>
        </b-col>

        <b-col
          v-if="showTable"
          cols="12"
          class="my-2"
        >
          <b-table
            responsive
            sticky-header="380px"
            :busy.sync="table.tableBusy"
            :no-local-sorting="true"
            :fields="getFields"
            :items="table.items"
            @context-changed="handleOrderTable"
          >
            <template
              #head(id)="data"
            >
              <b-form-checkbox
                v-model="checkAll"
                :disabled="table.items.length === 0"
                class="p-0"
                @change="checkOrUncheckAll()"
              />
            </template>

            <template #cell(id)="row">
              <b-form-checkbox
                v-model="productsToUpdateStatus"
                :value="row.item.id"
              />
            </template>

            <template #cell(product_code)="row">
              <span>{{ row.value }}</span>
            </template>

            <template #cell(product_name)="row">
              <span>{{ row.value }}</span>
            </template>

            <template #cell(value)="row">
              <span>{{ moneyFormatBRL(row.value) }}</span>
            </template>

            <template #cell(quantity_balance)="row">
              <span>{{ row.item.quantity + '/' + row.item.balance }}</span>
            </template>

            <template #cell(active)="row">
              <b-form-checkbox
                v-if="hasUpdateStatus"
                :checked="row.value"
                class="custom-control-success"
                name="check-button"
                switch
                @change="handleConfirmUpdateProductStatus(row.item)"
              >
                <span class="switch-icon-left">
                  <feather-icon icon="CheckIcon" />
                </span>
                <span class="switch-icon-right" />
              </b-form-checkbox>

              <b-form-checkbox
                v-if="!hasUpdateStatus"
                v-b-tooltip.hover
                title="Não é possível alterar o status deste registro"
                :disabled="true"
                :checked="row.value"
                class="custom-control-success"
                name="check-button"
                switch
              >
                <span class="switch-icon-left">
                  <feather-icon icon="CheckIcon" />
                </span>
                <span class="switch-icon-right" />
              </b-form-checkbox>
            </template>

            <template #cell(actions)="row">
              <button-icon
                color="#2772C0"
                size="18"
                feather-icon="EditIcon"
                @action="redirectUpdatePage(row.item)"
              />
            </template>
          </b-table>
        </b-col>

        <b-col
          v-if="showTable"
          class="px-3"
          sm="12"
        >
          <CustomPagination
            :paginacao="paginationData"
            @page-cliked="updateCurrentPage"
          />
        </b-col>
      </b-row>

    </overlay>
  </div>
</template>

<script>
/* eslint-disable import/extensions,import/no-extraneous-dependencies */
import {
  BRow,
  BCol,
  BForm,
  BFormGroup,
  BFormInput,
  BTable,
  BSpinner,
  BAlert,
  BLink,
  BFormCheckbox,
  VBTooltip,
  BFormRadioGroup,
} from 'bootstrap-vue'
import PageHeader from '@/views/components/custom/PageHeader'
import { required, email } from '@validations'
import moment from 'moment'
import vSelect from 'vue-select'
import CustomPagination from '@/views/components/custom/CustomPagination'
import ButtonIcon from '@/views/components/custom/ButtonIcon'
import { actions, subjects } from '@/libs/acl/rules'
import {
  confirmAction, warningMessageUpdateStatus,
} from '@/libs/alerts/sweetalerts'
import { messages } from '@core/utils/validations/messages'
import Overlay from '@/views/components/custom/Overlay.vue'
import { getArrayAttr, moneyFormatBRL } from '@core/utils/utils'
import { getAllCategories } from '@core/utils/requests/categories'
import { getAllProducts, updateStatusProducts } from '@core/utils/requests/products'

export default {
  components: {
    BFormRadioGroup,
    Overlay,
    PageHeader,
    vSelect,
    BRow,
    BCol,
    BForm,
    BFormGroup,
    BFormInput,
    BTable,
    BSpinner,
    BAlert,
    BLink,
    BFormCheckbox,
    CustomPagination,
    ButtonIcon,
  },

  directives: {
    'b-tooltip': VBTooltip,
  },

  data() {
    return {
      moment,
      required,
      email,

      titlePage: '',

      loading: false,
      loadingSelects: false,

      linkItems: [
        {
          name: 'Gerenciar Produtos',
          routeName: '',
        },
        {
          name: 'Ver Produtos',
          active: true,
        },
      ],

      categories: [],

      checkAll: false,

      search: {
        name: '',
        categories: null,
        code: '',
        highlight: null,
      },

      showTable: false,

      productsToUpdateStatus: [],

      radioOptions: [
        { text: 'Todos', value: null, disabled: this.getTableBusy },
        { text: 'Sim', value: 1, disabled: this.getTableBusy },
        { text: 'Não', value: 0, disabled: this.getTableBusy },
      ],

      paginationData: {
        currentPage: 0,
        totalLines: 0,
        fromLine: 0,
        toLine: 0,
        defaultSize: 10,
      },

      table: {
        empty: false,
        tableError: false,
        tableBusy: true,
        tableRows: [10, 25, 50, 100],
        tableOrder: '',
        tableColumnNameOrder: '',
        items: [],
      },
    }
  },

  computed: {
    getTableBusy() {
      return this.table.tableBusy
    },

    getStoreModuleRoutes() {
      return this.$store.getters['routes/getStoreModuleRoutes']
    },

    hasUpdateStatus() {
      return this.$can(actions.UPDATE, subjects.STORE_MODULE_PRODUCTS_STATUS)
    },

    hasRemove() {
      return this.$can(actions.DELETE, subjects.STORE_MODULE_PRODUCTS)
    },

    getFields() {
      return [
        this.hasUpdateStatus
          ? { key: 'id', label: '#', class: 'text-center' }
          : null,
        { key: 'product_code', label: 'CÓDIGO', sortable: true },
        { key: 'product_name', label: 'NOME', sortable: true },
        {
          key: 'value', label: 'VALOR',
        },
        {
          key: 'quantity_balance', label: 'QUANTIDADE/SALDO', thClass: 'text-center', tdClass: 'text-center', sortable: true,
        },
        {
          key: 'active', label: 'STATUS', sortable: true,
        },
        {
          key: 'actions', label: 'AÇÕES', class: 'text-center',
        },
      ]
    },
  },

  mounted() {
    this.handleGetCategories()
    this.findAll()
  },

  methods: {
    moneyFormatBRL,
    async handleGetCategories() {
      this.loadingSelects = true

      await getAllCategories({ hasProducts: 1 })
        .then(response => {
          if (response.status === 200) {
            this.categories = response.data
          }
        })

      this.loadingSelects = false
    },

    findAll() {
      this.table.tableBusy = true

      this.table.tableError = false
      this.table.empty = false

      this.table.items = []
      this.productsToUpdateStatus = []
      this.checkAll = false

      getAllProducts(this.getParams())
        .then(response => {
          if (response.status === 200) {
            if (response.data.data.length > 0) {
              this.showTable = true
              this.table.items = response.data.data
              this.table.tableBusy = false
              this.handlePagination(response.data)
              return
            }

            this.table.empty = true
            this.showTable = false
            this.table.tableBusy = false
          }
        })
        .catch(() => {
          this.table.tableError = true
          this.table.tableBusy = false
          this.showTable = false
        })
    },

    handleConfirmToRemove({ id }) {
      confirmAction(messages.confirmDelete)
        .then(() => {
          this.handleRemoveProduct(id)
        })
    },

    handleRemoveProduct(id) {},

    handleConfirmUpdateManyProductsStatus() {
      const { title, value } = messages.confirmUpdateManyProductsStatus

      warningMessageUpdateStatus(title, value)
        .then(() => {
          this.handleUpdateStatus(this.productsToUpdateStatus)
        })
        .catch(() => {
          this.table.items = []
          this.findAll()
        })
    },

    handleConfirmUpdateProductStatus({ id, active }) {
      const { title1, title2, value } = messages.confirmUpdateUniqueProductStatus

      warningMessageUpdateStatus(active ? title1 : title2, value)
        .then(() => {
          this.handleUpdateStatus([id])
        })
        .catch(() => {
          this.table.items = []
          this.findAll()
        })
    },

    async handleUpdateStatus(productsId) {
      this.loading = true

      await updateStatusProducts({ productsId })
        .then(response => {
          if (response.status === 200) {
            this.productsToUpdateStatus = []
            this.checkAll = false

            this.findAll()
          }
        })

      this.loading = false
    },

    checkOrUncheckAll() {
      let products = this.table.items

      if (this.checkAll) {
        products = products.filter(item => item.id)

        this.productsToUpdateStatus = getArrayAttr(products, 'id')
      } else {
        this.productsToUpdateStatus = []
        this.checkAll = false
      }
    },

    redirectUpdatePage(item) {
      this.$store.commit('storeModuleProducts/setChooseProduct', item)

      this.$router.replace({ name: this.getStoreModuleRoutes.productsUpdate.name })
    },

    clearFilters() {
      this.search.name = ''
      this.search.code = ''
      this.search.highlight = null
      this.search.categories = []
      this.showTable = false
    },

    handleOrderTable(context) {
      this.table.tableColumnNameOrder = context.sortBy
      this.table.tableOrder = context.sortDesc ? 'desc' : 'asc'

      this.findAll()
    },

    getParams() {
      let categoriesId = []

      if (this.search.categories) {
        if (this.search.categories.length > 0) {
          categoriesId = getArrayAttr(this.search.categories, 'id')
        }
      }

      return {
        columnName: this.table.tableColumnNameOrder,
        columnOrder: this.table.tableOrder,
        perPage: this.paginationData.defaultSize,
        page: this.paginationData.currentPage,
        name: this.search.name,
        code: this.search.code,
        highlight: this.search.highlight,
        categoriesId,
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
      this.findAll()
    },

    updateCurrentPage(page) {
      this.paginationData.currentPage = page
      this.findAll()
    },
  },
}
</script>

<style lang="scss" scoped>
.action-search {
  display: flex;
}

.btn-update-status-container {
  text-align: right;
}

@media (max-width: 767px) {
  .btn-update-status-container {
    text-align: left;
    margin-top: 2rem;
  }
}

@media (max-width: 400px) {
  .action-search {
    display: flex;
    flex-direction: column;

    button {
      width: 100%;
    }
  }

  .button-plus {
    width: 100%;
  }
}
</style>
