<template>
  <div :class="className">
    <section class="p-2">
      <validation-observer ref="formFilters">
        <b-form>
          <b-row class="mb-2">
            <b-col cols="12">
              <h3>Lista de Membros</h3>
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
                <validation-provider
                  #default="{ errors }"
                  name="Nome"
                >
                  <b-form-input
                    id="name"
                    v-model="search.name"
                    placeholder="Nome"
                    autocomplete="off"
                  />

                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
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
                  @click.prevent="handleSubmitFormFilters"
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
        </b-form>
      </validation-observer>
    </section>

    <section v-if="loadingTable">
      <div class="spinner-area">
        <b-spinner
          variant="custom"
          label="Loading..."
        />
      </div>
    </section>

    <section v-if="!loadingTable">
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

      <b-row class="my-2">
        <b-col
          class="px-3"
          sm="6"
        >
          <div
            v-if="showTable"
            class="d-flex justify-center-center align-items-center"
          >
            <span class="mr-50">Mostrar</span>
            <v-select
              id="orders"
              v-model="paginationData.defaultSize"
              :options="table.tableQtdRows"
              :clearable="false"
              @input="updateQtdView($event)"
            >
              <span slot="no-options">Nenhuma opção selecionável.</span>
            </v-select>
          </div>
        </b-col>

        <b-col cols="12">
          <b-alert
            variant="primary"
            :show="table.tableEmpty"
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
          v-if="showTable"
          cols="12"
          class="my-2"
        >
          <b-table
            id="listCompaniesTable"
            responsive
            sticky-header="380px"
            :busy.sync="table.tableBusy"
            :no-local-sorting="true"
            :fields="table.fields"
            :items="table.items"
            @context-changed="handleOrderTable"
          >
            <template #cell(name)="row">
              <span>{{ row.value }}</span>
            </template>

            <template #cell(phone)="row">
              <span>{{ row.item.person.phone | VMask('(##) #####-####') }}</span>
            </template>

            <template #cell(email)="row">
              <span>{{ row.value }}</span>
            </template>

            <template #cell(address)="row">
              <span>
                {{ row.item.person.address }}, {{ row.item.person.number_address }},<br>
                {{ row.item.person.district }}, {{ row.item.person.city.description }} - {{ row.item.person.uf }},<br>
                {{ row.item.person.zip_code | VMask('#####-###') }}
              </span>
            </template>

            <template #cell(actions)="row">
              <button-icon
                color="#2772C0"
                size="18"
                feather-icon="Trash2Icon"
                @action="openModalDelete(row.item)"
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
    </section>
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
} from 'bootstrap-vue'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import { required } from '@validations'
import moment from 'moment'
import vSelect from 'vue-select'
import CustomPagination from '@/views/components/custom/CustomPagination'
import ButtonIcon from '@/views/components/custom/ButtonIcon'
import { confirmAction, successMessage, warningMessage } from '@/libs/alerts/sweetalerts'
import { messages } from '@core/utils/validations/messages'
import { getUsersMembers, removeUserChurch } from '@core/utils/requests/users'

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
    vSelect,
    BRow,
    BCol,
    BForm,
    BFormGroup,
    BFormInput,
    BTable,
    BSpinner,
    BAlert,
    CustomPagination,
    ButtonIcon,
  },

  props: {
    className: {
      type: String,
      default: '',
    },

    churchId: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      moment,
      required,

      messages,

      titlePage: '',

      search: {
        name: '',
      },

      loadingTable: false,
      showTable: false,

      paginationData: {
        currentPage: 0,
        totalLines: 0,
        fromLine: 0,
        toLine: 0,
        defaultSize: 10,
      },

      table: {
        tableEmpty: false,
        tableError: false,
        tableBusy: false,
        tableQtdRows: [10, 25, 50, 100],
        tableOrder: '',
        tableOrderField: '',
        fields: [
          { key: 'name', label: 'NOME', sortable: true },
          { key: 'phone', label: 'TELEFONE' },
          { key: 'email', label: 'E-MAIL' },
          { key: 'address', label: 'ENDEREÇO' },
          {
            key: 'actions',
            label: 'AÇÕES',
            class: 'width-custom-column text-center',
          },
        ],
        items: [],
      },
    }
  },

  methods: {
    findAll() {
      this.table.tableError = false
      this.table.tableEmpty = false
      this.loadingTable = true

      getUsersMembers(this.setParams())
        .then(response => {
          if (response.status === 200) {
            if (response.data.data.length > 0) {
              this.showTable = true
              this.table.items = response.data.data
              this.table.tableBusy = false
              this.handlePagination(response.data)
              return
            }

            this.table.tableEmpty = true
            this.showTable = false
          }
        })
        .catch(() => {
          this.table.tableError = true
          this.showTable = false
        })

      this.loadingTable = false
    },

    handleSubmitFormFilters() {
      this.$refs.formFilters.validate()
        .then(success => {
          if (success) {
            this.findAll()
          }
        })
    },

    openModalDelete({ id }) {
      confirmAction(messages.confirmDeleteUserChurch)
        .then(() => {
          this.handleRemoveUserChurch(id)
        })
    },

    async handleRemoveUserChurch(id) {
      this.loadingTable = true

      await removeUserChurch(id)
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

      this.loadingTable = false
    },

    clearFilters() {
      this.search.name = ''
      this.showTable = false
    },

    handleOrderTable(context) {
      this.table.tableOrderField = context.sortBy
      this.table.tableOrder = context.sortDesc ? 'desc' : 'asc'

      this.findAll()
    },

    setParams() {
      return {
        columnName: this.table.tableOrderField,
        columnOrder: this.table.tableOrder,
        perPage: this.paginationData.defaultSize,
        page: this.paginationData.currentPage,
        name: this.search.name,
        churchId: this.churchId,
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
