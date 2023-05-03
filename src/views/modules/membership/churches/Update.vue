<template>
  <div
    v-if="getValidation"
    class="content-wrapper"
  >
    <page-header
      screen-name="Editar Igreja"
      :link-items="linkItems"
    />

    <div
      v-if="loading"
      class="spinner-area"
    >
      <b-spinner
        variant="custom"
        label="Loading..."
      />
    </div>

    <Form
      v-if="!loading"
      :mode="formActions.updateAction"
      :form-data="form"
      @clear="clearForm"
    />
  </div>
</template>

<script>

import { BSpinner } from 'bootstrap-vue'
// eslint-disable-next-line import/extensions
import PageHeader from '@/views/components/custom/PageHeader'
import { warningMessage } from '@/libs/alerts/sweetalerts'
import { formActions } from '@core/utils/formActions'
import { messages } from '@core/utils/validations/messages'
import { getChurchId } from '@core/utils/requests/churches'
import { actions, subjects } from '@/libs/acl/rules'
import generalRoutes from '@/router/general/index'
import Form from './Form.vue'

export default {
  components: {
    BSpinner,
    PageHeader,
    Form,
  },

  data() {
    return {
      linkItems: [
        {
          name: 'Gerenciar Igrejas',
          routeName: '',
        },
        {
          name: 'Editar Igreja',
          active: true,
        },
      ],

      generalRoutes,

      loading: false,

      validation: false,

      formActions,

      chooseChurch: this.$store.state.chooseDataMembersModule.chooseChurch,

      form: {
        id: '',
        name: '',
        phone: '',
        email: '',
        youtube: '',
        facebook: '',
        instagram: '',
        zip_code: '',
        address: '',
        number_address: '',
        complement: '',
        district: '',
        state: null,
        city: null,
        responsible: [],
        image: {
          id: '',
          type: '',
          path: '',
        },
        active: {
          boolValue: true,
          description: 'Ativo',
        },
      },
    }
  },

  computed: {
    getValidation() {
      return this.validation
    },
  },

  // eslint-disable-next-line consistent-return
  created() {
    if (!this.chooseChurch) {
      this.redirectToMainPage()

      return false
    }

    if (!this.isEnabledToUpdate()) {
      this.$router.replace({ name: this.generalRoutes.notAuthorized.name })

      return false
    }

    this.validation = true
  },

  mounted() {
    this.getChooseChurch()
  },

  methods: {
    async getChooseChurch() {
      this.loading = true

      await getChurchId(this.chooseChurch.id)
        .then(response => {
          const {
            id,
            name,
            phone,
            email,
            youtube,
            facebook,
            instagram,
            zip_code,
            address,
            number_address,
            complement,
            district,
            image,
            admin_user,
            uf,
            city,
            active,
          } = response.data

          this.form = {
            id,
            name,
            phone,
            email,
            youtube,
            facebook,
            instagram,
            zip_code,
            address,
            number_address,
            complement,
            district,
            responsible: this.generateResponsibleStr(admin_user),
            image: image || { id: '', type: '', path: '' },
            state: {
              uf,
            },
            city,
            active: {
              boolValue: active,
              description: active ? 'Ativo' : 'Inativo',
            },
          }
        })
        .catch(() => {
          warningMessage(messages.impossible)
        })

      this.loading = false
    },

    isEnabledToUpdate() {
      if (this.$can(actions.UPDATE, subjects.MEMBERSHIP_MODULE_CHURCH_ADMIN_MASTER)) {
        return true
      }

      if (this.$can(actions.UPDATE, subjects.MEMBERSHIP_MODULE_CHURCH_ADMIN_CHURCH)) {
        const userLogged = this.$store.state.sessions.userData

        return userLogged.responsibleChurch.find(e => e.id === this.chooseChurch.id)
      }

      return false
    },

    generateResponsibleStr(adminUser) {
      const responsibleChurch = []

      adminUser.forEach(el => {
        responsibleChurch.push({
          admin_user_id: el.id,
          user_name: el.user.name,
        })
      })

      return responsibleChurch
    },

    redirectToMainPage() {
      this.clearForm()
      this.$store.commit('chooseDataMembersModule/SET_CHOOSE_CHURCH', null)
      this.$router.replace({ name: this.generalRoutes.homeRouter.name })
    },

    clearForm() {
      this.form = {
        id: '',
        name: '',
        phone: '',
        email: '',
        youtube: '',
        facebook: '',
        instagram: '',
        zip_code: '',
        address: '',
        number_address: '',
        complement: '',
        district: '',
        state: null,
        city: null,
        responsible: [],
        image: {
          id: '',
          type: '',
          path: '',
        },
        active: {
          boolValue: true,
          description: 'Ativo',
        },
      }
    },
  },
}
</script>

<style lang="scss" scoped>

</style>
