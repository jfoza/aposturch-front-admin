<template>
  <div
    v-if="validation"
    class="content-wrapper"
  >
    <page-header
      screen-name="Editar Igreja"
      :link-items="linkItems"
    />
    <Form
      ref="form"
      :mode="formActions.updateAction"
      :form-data="form"
      @clear="clearForm"
    />
  </div>
</template>

<script>

// eslint-disable-next-line import/extensions
import PageHeader from '@/views/components/custom/PageHeader'
import { warningMessage } from '@/libs/alerts/sweetalerts'
import { formActions } from '@core/utils/formActions'
import { messages } from '@core/utils/validations/messages'
import { getChurchId } from '@core/utils/requests/churches'
import { actions, subjects } from '@/libs/acl/rules'
import generalRoutes from '@/router/general/index'
import Form from '@/views/modules/membership/churches/Form.vue'

export default {
  components: {
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

      validation: false,

      formActions,

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
    getDataInStore() {
      return this.$store.state.membershipModuleStore.chooseChurch
    },
  },

  // eslint-disable-next-line consistent-return
  created() {
    if (!this.getDataInStore) {
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
      this.$refs.form.loading = true

      await getChurchId(this.getDataInStore.id)
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

      this.$refs.form.loading = false
    },

    isEnabledToUpdate() {
      if (this.$can(actions.UPDATE, subjects.MEMBERSHIP_MODULE_CHURCH_ADMIN_MASTER)) {
        return true
      }

      if (this.$can(actions.UPDATE, subjects.MEMBERSHIP_MODULE_CHURCH_ADMIN_CHURCH)) {
        const userLogged = this.$store.state.sessions.userData

        return userLogged.churches.find(e => e.id === this.getDataInStore.id)
      }

      return false
    },

    redirectToMainPage() {
      this.clearForm()
      this.$store.commit('membershipModuleStore/SET_CHOOSE_CHURCH', null)
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
