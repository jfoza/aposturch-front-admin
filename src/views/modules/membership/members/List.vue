<template>
  <div class="content-wrapper">
    <page-header
      screen-name="Ver Membros"
      :link-items="linkItems"
    />

    <overlay
      class-name="card p-2"
      :show="loading"
    >
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
            <!-- Name -->
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

            <!-- Email -->
            <b-col
              sm="6"
              lg="4"
            >
              <b-form-group
                label="E-mail"
                label-for="email"
              >
                <validation-provider
                  #default="{ errors }"
                  name="E-mail"
                  rules="email"
                >
                  <b-form-input
                    id="email"
                    v-model="search.email"
                    placeholder="E-mail"
                    autocomplete="off"
                  />

                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>

            <!-- Phone -->
            <b-col
              sm="6"
              lg="4"
            >
              <b-form-group
                label="Telefone"
                label-for="phone"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Telefone"
                >
                  <b-form-input
                    id="phone"
                    v-model="search.phone"
                    v-mask="'(##) #####-####'"
                    placeholder="Telefone"
                    autocomplete="off"
                  />

                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>

            <!-- Profile -->
            <b-col
              sm="6"
              lg="4"
            >
              <b-form-group
                label="Perfil"
                label-for="profiles"
              >
                <v-select
                  id="profiles"
                  v-model="search.profile"
                  :options="profiles"
                  variant="custom"
                  item-text="description"
                  item-value="id"
                  placeholder="Selecione um perfil"
                  label="description"
                />
              </b-form-group>
            </b-col>

            <!-- Church -->
            <b-col
              sm="6"
              lg="4"
            >
              <b-form-group
                label="Igreja"
                label-for="churches"
              >
                <v-select
                  id="churches"
                  v-model="search.church"
                  :options="churches"
                  variant="custom"
                  item-text="name"
                  item-value="id"
                  placeholder="Selecione uma igreja"
                  label="name"
                />
              </b-form-group>
            </b-col>

            <!-- City -->
            <b-col
              sm="6"
              lg="4"
            >
              <b-form-group
                label="Cidade"
                label-for="cities"
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
            class="mt-3 mb-1"
          >
            <b-col>
              <b-link
                type="button"
                class="btn button-form button-plus"
                :to="{ name: membershipModuleRoutes.membersInsert.name }"
              >
                <feather-icon
                  icon="PlusIcon"
                />
                Adicionar novo membro
              </b-link>
            </b-col>
          </b-row>
        </b-form>
      </validation-observer>

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
          v-if="showTable && !table.tableBusy"
          cols="12"
          class="my-2"
        >
          <b-table
            responsive
            sticky-header="380px"
            :busy.sync="table.tableBusy"
            :no-local-sorting="true"
            :fields="table.fields"
            :items="table.items"
            @context-changed="handleOrderTable"
          >
            <template #cell(name)="row">
              <div class="d-flex align-items-center">
                <icon-by-profile
                  :profile="row.item.profile_unique_name"
                />
                <span style="margin-left: .3rem">{{ row.value }}</span>
              </div>
            </template>

            <template #cell(phone)="row">
              <b-link
                @click="handleRedirectWhatsApp(row.value)"
              >
                <font-awesome-icon
                  icon="fa-brands fa-whatsapp"
                />
                {{ row.value | VMask('(##) #####-####') }}
              </b-link>
            </template>

            <template #cell(profile_description)="row">
              <span>{{ row.value }}</span>
            </template>

            <template #cell(active)="row">
              <b-form-checkbox
                v-if="isEnabledToUpdateStatus(row.item)"
                :disabled="disabledSwitch"
                :checked="row.value"
                class="custom-control-success"
                name="check-button"
                switch
                @change="handleConfirmUpdateCategoryStatus(row.item)"
              >
                <span class="switch-icon-left">
                  <feather-icon icon="CheckIcon" />
                </span>
                <span class="switch-icon-right">
                  <feather-icon icon="XIcon" />
                </span>
              </b-form-checkbox>

              <status-field
                v-else
                :status="row.value"
              />
            </template>

            <template #cell(user_created_at)="row">
              <span>{{ moment(row.value).format("DD/MM/YYYY HH:mm") }}</span>
            </template>

            <template #cell(actions)="row">
              <button-icon
                v-if="isEnabledToUpdate(row.item)"
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
            :pagination-data="paginationData"
            @page-cliked="updateCurrentPage"
          />
        </b-col>
      </b-row>

    </overlay>
  </div>
</template>

<script>
/* eslint-disable import/extensions,import/no-extraneous-dependencies,camelcase */
import {
  BAlert,
  BCol,
  BForm,
  BFormGroup,
  BFormInput,
  BLink,
  BRow,
  BSpinner,
  BTable,
  BFormCheckbox,
} from 'bootstrap-vue'
import PageHeader from '@/views/components/custom/PageHeader'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import { email } from '@validations'
import moment from 'moment'
import vSelect from 'vue-select'
import CustomPagination from '@/views/components/custom/CustomPagination'
import ButtonIcon from '@/views/components/custom/ButtonIcon'
import StatusField from '@/views/components/custom/StatusField'
import membershipModuleRoutes from '@/views/modules/membership/routes'
import { messages } from '@core/utils/validations/messages'
import { getAllMembers, updateStatusUserMember } from '@core/utils/requests/members'
import { getLinkWhatsApp } from '@core/utils/whatsApp'
import { getProfiles } from '@core/utils/requests/users'
import { warningMessage, warningMessageUpdateStatus } from '@/libs/alerts/sweetalerts'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { subjects, actions } from '@/libs/acl/rules'
import profilesUniqueName from '@core/utils/profiles'
import IconByProfile from '@/views/modules/membership/members/components/IconByProfile.vue'
import {
  faWhatsapp,
} from '@fortawesome/free-brands-svg-icons'
import Vue from 'vue'
import { getCitiesInPersons } from '@core/utils/requests/cities'
import { getChurchesUserLogged } from '@core/utils/requests/churches'
import { strClear } from '@core/utils/utils'
import profileTypes from '@core/utils/profileTypes'
import Overlay from '@/views/components/custom/Overlay.vue'
import {
  isEnabledToUpdateByAssistant,
  isEnabledToUpdateByAdminModule,
  isEnabledToUpdateByAdminChurch,
  isEnabledToUpdateStatusByAdminChurch,
} from './utils'

library.add(
  faWhatsapp,
)

Vue.component('font-awesome-icon', FontAwesomeIcon)

export default {
  components: {
    Overlay,
    ValidationProvider,
    ValidationObserver,
    PageHeader,
    vSelect,
    IconByProfile,
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
    StatusField,
    ButtonIcon,
    BFormCheckbox,
  },

  data() {
    return {
      moment,
      email,

      profilesUniqueName,

      messages,

      loading: true,

      titlePage: '',

      userLogged: this.$store.state.sessions.userData,

      membershipModuleRoutes,

      disabledSwitch: false,

      linkItems: [
        {
          name: 'Gerenciar Membros',
          routeName: '',
        },
        {
          name: 'Ver Membros',
          active: true,
        },
      ],

      profiles: [],
      churches: [],
      cities: [],

      search: {
        name: '',
        email: '',
        phone: '',
        profile: null,
        church: null,
        city: null,
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
        tableEmpty: false,
        tableError: false,
        tableBusy: false,
        tableQtdRows: [10, 25, 50, 100],
        tableOrder: '',
        tableOrderField: '',
        fields: [
          { key: 'name', label: 'NOME', sortable: true },
          { key: 'phone', label: 'TELEFONE', sortable: true },
          { key: 'profile_description', label: 'Perfil', sortable: true },
          { key: 'active', label: 'STATUS' },
          { key: 'user_created_at', label: 'CRIADO EM' },
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
  },

  mounted() {
    this.index()
  },

  methods: {
    async index() {
      this.loading = true

      await getProfiles({ profileTypeUniqueName: profileTypes.MEMBERSHIP }).then(response => {
        this.profiles = response.data
      })

      await getChurchesUserLogged().then(response => {
        this.churches = response.data
      })

      await getCitiesInPersons().then(response => {
        this.cities = response.data
      })

      this.loading = false

      this.findAll()
    },

    findAll() {
      this.table.tableBusy = true

      this.table.tableError = false
      this.table.empty = false

      this.table.items = []

      getAllMembers(this.setParams())
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

    handleConfirmUpdateCategoryStatus({ user_id, active }) {
      const { title1, title2, value } = messages.confirmUpdateMemberStatus

      warningMessageUpdateStatus(active ? title1 : title2, value)
        .then(() => {
          this.handleUpdateStatus(user_id)
        })
        .catch(() => {
          this.table.items = []
          this.findAll()
        })
    },

    async handleUpdateStatus(user_id) {
      this.disabledSwitch = true

      await updateStatusUserMember(user_id)
        .then(response => {
          if (response.status === 200) {
            this.findAll()
          }
        })
        .catch(() => {
          warningMessage(messages.impossible)
        })

      this.disabledSwitch = false
    },

    handleSubmitFormFilters() {
      this.$refs.formFilters.validate()
        .then(success => {
          if (success) {
            this.findAll()
          }
        })
    },

    isEnabledToView(member) {

    },

    isEnabledToUpdate(member) {
      if (this.$can(actions.UPDATE, subjects.MEMBERSHIP_MODULE_MEMBERS_ADMIN_MASTER)) {
        return true
      }

      if (this.$can(actions.UPDATE, subjects.MEMBERSHIP_MODULE_MEMBERS_ADMIN_CHURCH)) {
        return isEnabledToUpdateByAdminChurch(member)
      }

      if (this.$can(actions.UPDATE, subjects.MEMBERSHIP_MODULE_MEMBERS_ADMIN_MODULE)) {
        return isEnabledToUpdateByAdminModule(member)
      }

      if (this.$can(actions.UPDATE, subjects.MEMBERSHIP_MODULE_MEMBERS_ASSISTANT)) {
        return isEnabledToUpdateByAssistant(member)
      }

      return false
    },

    isEnabledToUpdateStatus(member) {
      if (this.$can(actions.UPDATE, subjects.USERS_ADMIN_MASTER_UPDATE_STATUS)) {
        return true
      }

      const isMembers = this.$can(actions.UPDATE, subjects.USERS_ADMIN_CHURCH_UPDATE_STATUS)
          || this.$can(actions.UPDATE, subjects.USERS_ADMIN_MODULE_UPDATE_STATUS)

      if (isMembers) {
        return isEnabledToUpdateStatusByAdminChurch(member)
      }

      return false
    },

    redirectUpdatePage(item) {
      this.$store.commit('membershipModuleMembers/setChooseMemberUser', item)

      this.$router.replace({ name: membershipModuleRoutes.membersUpdate.name })
    },

    redirectViewPage(chooseItem) {
      // this.$router.push({ path: `${membershipModuleRoutes.churchView.path}/${chooseItem.unique_name}` })
    },

    clearFilters() {
      this.search = {
        name: '',
        email: '',
        phone: '',
        profile: null,
        church: null,
        city: null,
      }
      this.showTable = false
    },

    handleOrderTable(context) {
      this.table.tableOrderField = context.sortBy
      this.table.tableOrder = context.sortDesc ? 'desc' : 'asc'

      this.findAll()
    },

    handleRedirectWhatsApp(cellPhone) {
      if (cellPhone.length >= 10) {
        getLinkWhatsApp(cellPhone)
      }
    },

    setParams() {
      return {
        columnName: this.table.tableOrderField,
        columnOrder: this.table.tableOrder,
        perPage: this.paginationData.defaultSize,
        page: this.paginationData.currentPage,
        name: this.search.name,
        email: this.search.email,
        phone: strClear(this.search.phone),
        profileId: this.search.profile ? this.search.profile.id : null,
        churchId: this.search.church ? this.search.church.id : null,
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
