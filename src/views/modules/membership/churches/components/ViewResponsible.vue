<template>
  <div>
    <b-row
      v-if="loadingTable"
      class="spinner-area"
    >
      <b-spinner
        variant="custom"
        label="Loading..."
      />
    </b-row>

    <b-row
      v-if="!loadingTable"
      :class="className"
    >
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
        >
          <template #cell(user_name)="row">
            <span>{{ row.value }}</span>
          </template>

          <template #cell(user_email)="row">
            <span>{{ row.value }}</span>
          </template>

          <template #cell(actions)="row">
            <button-icon
              v-if="getAdminMasterRule"
              color="#2772C0"
              size="18"
              feather-icon="Trash2Icon"
              @action="openModalDelete(row.item)"
            />
          </template>
        </b-table>
      </b-col>
    </b-row>
  </div>
</template>

<script>
/* eslint-disable import/extensions,import/no-extraneous-dependencies */
import {
  BRow,
  BCol,
  BTable,
  BSpinner,
  BAlert,
} from 'bootstrap-vue'
import { required } from '@validations'
import moment from 'moment'
import ButtonIcon from '@/views/components/custom/ButtonIcon'
import { confirmAction, successMessage, warningMessage } from '@/libs/alerts/sweetalerts'
import { messages } from '@core/utils/validations/messages'
import {
  getResponsibleChurch,
  removeResponsibleChurch,
} from '@core/utils/requests/users'
import { actions, subjects } from '@/libs/acl/rules'

export default {
  components: {
    BRow,
    BCol,
    BTable,
    BSpinner,
    BAlert,
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

      table: {
        tableEmpty: false,
        tableError: false,
        tableBusy: false,
        tableQtdRows: [10, 25, 50, 100],
        tableOrder: '',
        tableOrderField: '',
        fields: [
          { key: 'user_name', label: 'NOME' },
          { key: 'user_email', label: 'E-MAIL' },
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
    getAdminMasterRule() {
      return this.$can(actions.DELETE, subjects.MEMBERSHIP_MODULE_CHURCH_ADMIN_MASTER)
    },
  },

  mounted() {
    this.findAll()
  },

  methods: {
    async findAll() {
      this.table.tableError = false
      this.table.tableEmpty = false
      this.loadingTable = true

      await getResponsibleChurch(this.churchId)
        .then(response => {
          if (response.status === 200) {
            if (response.data.length > 0) {
              this.showTable = true
              this.table.items = response.data
              this.table.tableBusy = false
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

    openModalDelete({ admin_user_id }) {
      confirmAction(messages.confirmDeleteUserChurch)
        .then(() => {
          this.handleRemoveResponsibleChurch(admin_user_id)
        })
    },

    async handleRemoveResponsibleChurch(userId) {
      this.loadingTable = true

      await removeResponsibleChurch(userId, { churchId: this.churchId })
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
