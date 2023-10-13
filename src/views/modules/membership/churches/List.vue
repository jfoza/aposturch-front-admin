<template>
  <div class="content-wrapper">
    <page-header
      screen-name="Ver Igrejas"
      :link-items="linkItems"
    />

    <overlay
      class-name="card"
      :show="loading"
    >
      <section class="p-2">
        <validation-observer ref="formFilters">
          <b-form>
            <b-row class="mb-2">
              <b-col cols="12">
                <h3>Lista de Igrejas</h3>
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
                sm="6"
                lg="4"
              >
                <b-form-group
                  label="Cidade"
                  label-for="city"
                >
                  <v-select
                    id="categories"
                    v-model="search.city"
                    :options="cities"
                    variant="custom"
                    item-text="description"
                    item-value="id"
                    placeholder="Selecione uma cidade"
                    label="description"
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

            <b-row
              v-if="getAbilityInsert"
              class="mt-3 mb-1"
            >
              <b-col>
                <b-link
                  type="button"
                  class="btn button-form button-plus"
                  :to="{ name: membershipModuleRoutes.churchesInsert.name }"
                >
                  <feather-icon
                    icon="PlusIcon"
                  />
                  Adicionar nova igreja
                </b-link>
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

              <template #cell(city)="row">
                <span>{{ row.item.city.description }}</span>
              </template>

              <template #cell(active)="row">
                <status-field
                  :status="row.value"
                />
              </template>

              <template #cell(created_at)="row">
                <span>{{ moment(row.value).format("DD/MM/YYYY HH:mm") }}</span>
              </template>

              <template #cell(actions)="row">
                <button-icon
                  v-if="isEnabledToView(row.item)"
                  color="#2772C0"
                  size="18"
                  feather-icon="EyeIcon"
                  @action="redirectViewPage(row.item)"
                />
                <button-icon
                  v-if="isEnabledToUpdate(row.item)"
                  color="#2772C0"
                  size="18"
                  feather-icon="EditIcon"
                  @action="redirectUpdatePage(row.item)"
                />
                <button-icon
                  v-if="getAbilityDelete"
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
    </overlay>

  </div>
</template>

<script>
/* eslint-disable import/extensions,import/no-extraneous-dependencies */
import {
  BAlert, BCol, BForm, BFormGroup, BFormInput, BLink, BRow, BSpinner, BTable,
} from 'bootstrap-vue'
import PageHeader from '@/views/components/custom/PageHeader'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import { required } from '@validations'
import moment from 'moment'
import vSelect from 'vue-select'
import CustomPagination from '@/views/components/custom/CustomPagination'
import ButtonIcon from '@/views/components/custom/ButtonIcon'
import StatusField from '@/views/components/custom/StatusField'
import membershipModuleRoutes from '@/views/modules/membership/routes'
import { getAllChurches, removeChurch } from '@core/utils/requests/churches'
import { confirmAction, successMessage, warningMessage } from '@/libs/alerts/sweetalerts'
import { messages } from '@core/utils/validations/messages'
import { actions, subjects } from '@/libs/acl/rules'
import { getCitiesInChurches } from '@core/utils/requests/cities'
import Overlay from '@/views/components/custom/Overlay.vue'

export default {
  components: {
    Overlay,
    ValidationProvider,
    ValidationObserver,
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
    StatusField,
    CustomPagination,
    ButtonIcon,
  },

  data() {
    return {
      moment,
      required,

      loading: true,

      messages,

      titlePage: '',

      userLogged: this.$store.state.sessions.userData,

      membershipModuleRoutes,

      linkItems: [
        {
          name: 'Gerenciar Igrejas',
          routeName: '',
        },
        {
          name: 'Ver Igrejas',
          active: true,
        },
      ],

      cities: [],

      search: {
        name: '',
        city: null,
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
          { key: 'city', label: 'CIDADE' },
          { key: 'active', label: 'STATUS' },
          { key: 'created_at', label: 'CRIADO EM', sortable: true },
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

  computed: {
    getDispatchList() {
      return this.$route.params.dispatchList
    },

    getAbilityInsert() {
      return this.$can(actions.INSERT, subjects.MEMBERSHIP_MODULE_CHURCH_ADMIN_MASTER)
    },

    getAbilityDelete() {
      return this.$can(actions.DELETE, subjects.MEMBERSHIP_MODULE_CHURCH_ADMIN_MASTER)
    },
  },

  mounted() {
    this.findAllCities()

    if (this.getDispatchList) {
      this.findAll()
    }
  },

  methods: {
    async findAllCities() {
      this.loading = true

      await getCitiesInChurches()
        .then(response => {
          this.cities = response.data
        })
        .catch(() => {

        })

      this.loading = false
    },

    findAll() {
      this.table.tableError = false
      this.table.tableEmpty = false
      this.loadingTable = true

      getAllChurches(this.setParams())
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

    isEnabledToView({ id }) {
      if (this.$can(actions.VIEW, subjects.MEMBERSHIP_MODULE_CHURCH_ADMIN_MASTER_DETAILS)) {
        return true
      }

      if (this.$can(actions.VIEW, subjects.MEMBERSHIP_MODULE_CHURCH_ADMIN_CHURCH_DETAILS)) {
        return this.userLogged.churches.find(e => e.id === id)
      }

      return false
    },

    isEnabledToUpdate({ id }) {
      if (this.$can(actions.UPDATE, subjects.MEMBERSHIP_MODULE_CHURCH_ADMIN_MASTER)) {
        return true
      }

      if (this.$can(actions.UPDATE, subjects.MEMBERSHIP_MODULE_CHURCH_ADMIN_CHURCH)) {
        return this.userLogged.churches.find(e => e.id === id)
      }

      return false
    },

    redirectUpdatePage(chooseItem) {
      this.$store.commit('membershipModuleStore/SET_CHOOSE_CHURCH', chooseItem)

      this.$router.replace({ name: membershipModuleRoutes.churchesUpdate.name })
    },

    redirectViewPage(chooseItem) {
      this.$router.push({ path: `${membershipModuleRoutes.churchView.path}/${chooseItem.unique_name}` })
    },

    openModalDelete({ id }) {
      confirmAction(messages.confirmDelete)
        .then(() => {
          this.handleRemoveItem(id)
        })
    },

    async handleRemoveItem(id) {
      this.loadingTable = true

      await removeChurch(id)
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
      this.search.city = null
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
        cityId: this.search.city ? this.search.city.id : null,
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
