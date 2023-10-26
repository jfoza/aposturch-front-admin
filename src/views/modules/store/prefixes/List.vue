<template>
  <div class="content-wrapper">
    <page-header
      screen-name="Ver Prefixos"
      :link-items="linkItems"
    />

    <overlay
      :show="loading"
      class-name="card p-2"
    >
      <b-form>
        <b-row class="mb-2">
          <b-col cols="12">
            <h3>Lista de Prefixos</h3>
            <p>
              Para realizar uma busca, selecione o(s) filtros necessário(s) e clique no botão buscar:
            </p>
          </b-col>
        </b-row>

        <b-row class="align-items-center">
          <b-col
            sm="6"
            lg="4"
          >
            <b-form-group
              label="Nome"
              label-for="name"
            >
              <b-form-input
                id="name"
                v-model="search.prefix"
                placeholder="Nome"
                autocomplete="off"
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
              :to="{ name: getStoreModuleRoutes.prefixesInsert.name }"
            >
              <feather-icon
                icon="PlusIcon"
              />
              Adicionar novo prefixo
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
            <template #cell(prefix)="row">
              <span>{{ row.value }}</span>
            </template>

            <template #cell(created_at)="row">
              <span>{{ moment(row.value).format("DD/MM/YYYY HH:mm") }}</span>
            </template>

            <template #cell(active)="row">
              <status-field :status="row.value" />
            </template>

            <template #cell(actions)="row">
              <button-icon
                v-if="hasRemove"
                color="#2772C0"
                size="18"
                feather-icon="Trash2Icon"
                @action="handleConfirmToRemove(row.item)"
              />

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
  VBTooltip,
} from 'bootstrap-vue'
import PageHeader from '@/views/components/custom/PageHeader'
import moment from 'moment'
import vSelect from 'vue-select'
import CustomPagination from '@/views/components/custom/CustomPagination'
import ButtonIcon from '@/views/components/custom/ButtonIcon'
import { actions, subjects } from '@/libs/acl/rules'
import {
  confirmAction, successMessage, warningMessage,
} from '@/libs/alerts/sweetalerts'
import { messages } from '@core/utils/validations/messages'
import Overlay from '@/views/components/custom/Overlay.vue'
import StatusField from '@/views/components/custom/StatusField.vue'
import { getAllPrefixes, removePrefix } from '@core/utils/requests/prefixes'

export default {
  components: {
    StatusField,
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
    CustomPagination,
    ButtonIcon,
  },

  directives: {
    'b-tooltip': VBTooltip,
  },

  data() {
    return {
      moment,
      titlePage: '',

      loading: false,

      linkItems: [
        {
          name: 'Gerenciar Prefixos',
          routeName: '',
        },
        {
          name: 'Ver Prefixos',
          active: true,
        },
      ],

      search: {
        prefix: '',
      },

      showTable: false,

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
      return this.$can(actions.UPDATE, subjects.UNIQUE_CODE_PREFIXES)
    },

    hasRemove() {
      return this.$can(actions.DELETE, subjects.UNIQUE_CODE_PREFIXES)
    },

    getFields() {
      return [
        {
          key: 'prefix', label: 'NOME', sortable: true,
        },
        {
          key: 'created_at', label: 'CRIADO EM', thClass: 'text-center', tdClass: 'text-center',
        },
        {
          key: 'active', label: 'STATUS', thClass: 'text-center', tdClass: 'text-center',
        },
        {
          key: 'actions',
          label: 'AÇÕES',
          class: 'text-center',
        },
      ]
    },
  },

  mounted() {
    this.findAll()
  },

  methods: {
    findAll() {
      this.table.tableBusy = true

      this.table.tableError = false
      this.table.empty = false

      this.categoriesToUpdateStatus = []
      this.checkAll = false

      getAllPrefixes(this.getParams())
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
          this.handleRemovePrefix(id)
        })
    },

    async handleRemovePrefix(id) {
      this.loading = true

      await removePrefix(id)
        .then(response => {
          if (response.status === 204) {
            successMessage(messages.successDelete)

            this.findAll()
          }
        })
        .catch(error => {
          const errors = error.response.status === 400 || error.response.status === 404

          if (errors) {
            return warningMessage(error.response.data.error)
          }

          return warningMessage(messages.impossible)
        })

      this.loading = false
    },

    redirectUpdatePage(item) {
      this.$store.commit('storeModulePrefixes/setChoosePrefix', item)

      this.$router.replace({ name: this.getStoreModuleRoutes.prefixesUpdate.name })
    },

    clearFilters() {
      this.search.prefix = ''
      this.showTable = false
    },

    handleOrderTable(context) {
      this.table.tableColumnNameOrder = context.sortBy
      this.table.tableOrder = context.sortDesc ? 'desc' : 'asc'

      this.findAll()
    },

    getParams() {
      return {
        columnName: this.table.tableColumnNameOrder,
        columnOrder: this.table.tableOrder,
        perPage: this.paginationData.defaultSize,
        page: this.paginationData.currentPage,
        prefix: this.search.prefix,
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
