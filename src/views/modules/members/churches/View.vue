<template>
  <div
    id="user-profile"
  >
    <div
      v-if="loading"
      class="spinner-area"
    >
      <b-spinner />
    </div>

    <div
      v-if="!loading"
    >

      <b-link
        style="color: #5e5873"
        :to="{ name: membersModuleRouter.churches.name }"
      >
        <feather-icon
          class="mb-2"
          icon="ArrowLeftIcon"
          size="19"
        />
      </b-link>

      <view-header
        ref="navHeader"
        :header-data="churchData.header"
        @generalData="showGeneralData"
        @addressData="showAddressData"
        @membersData="showMembersData"
      />

      <view-general
        v-if="tab1 === currentTab"
        :general-data="churchData.general"
        class-name="card p-card-form"
      />

      <view-address
        v-if="tab2 === currentTab"
        :address-data="churchData.address"
        class-name="card p-card-form"
      />

      <view-members
        v-if="tab3 === currentTab"
        :church-id="churchData.header.id"
        class-name="card"
      />
    </div>
  </div>
</template>

<script>
import { BSpinner, BLink } from 'bootstrap-vue'
import ViewHeader from '@/views/modules/members/churches/components/ViewHeader.vue'
import ViewGeneral from '@/views/modules/members/churches/components/ViewGeneral.vue'
import ViewAddress from '@/views/modules/members/churches/components/ViewAddress.vue'
import ViewMembers from '@/views/modules/members/churches/components/ViewMembers.vue'
import { getChurchUniqueName } from '@core/utils/requests/churches'
import { warningMessage } from '@/libs/alerts/sweetalerts'
import { messages } from '@core/utils/validations/messages'
import membersModuleRouter from '@/views/modules/members/routes'
import { actions, subjects } from '@/libs/acl/rules'
import generalRoutes from '@/router/general/index'

/* eslint-disable global-require */
export default {
  components: {
    BSpinner,
    BLink,
    ViewHeader,
    ViewGeneral,
    ViewAddress,
    ViewMembers,
  },

  props: {
    churchUniqueName: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      loading: true,

      currentTab: 1,

      membersModuleRouter,
      generalRoutes,

      tab1: 1,
      tab2: 2,
      tab3: 3,

      churchData: {
        header: {
          id: '',
          profileImg: '',
          name: '',
        },

        general: {
          name: '',
          phone: '',
          email: '',
          youtube: '',
          facebook: '',
          instagram: '',
          active: '',
        },

        address: {
          zipCode: '',
          address: '',
          numberAddress: '',
          complement: '',
          district: '',
          city: '',
          uf: '',
        },

        members: {
          membersData: [],
        },
      },
    }
  },

  computed: {
    getChurchUniqueName() {
      return this.churchUniqueName
    },

    getAbilityView() {
      const adminMaster = this.$can(actions.VIEW, subjects.MEMBERS_MODULE_CHURCH_ADMIN_MASTER_DETAILS)
      const adminChurch = this.$can(actions.VIEW, subjects.MEMBERS_MODULE_CHURCH_ADMIN_CHURCH_DETAILS)

      return adminMaster || adminChurch
    },
  },

  created() {
    if (!this.getChurchUniqueName) {
      this.$router.replace({ name: this.generalRoutes.homeRouter.name })

      return false
    }

    if (!this.isEnabledToView()) {
      this.$router.replace({ name: this.generalRoutes.notAuthorized.name })

      return false
    }

    return this.handleGetChurchByUniqueName()
  },

  methods: {
    async handleGetChurchByUniqueName() {
      this.loading = true

      await getChurchUniqueName(this.getChurchUniqueName)
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

          this.churchData.header = {
            id,
            profileImg: image ? image.path : null,
            name,
          }

          this.churchData.general = {
            name,
            phone,
            email,
            youtube,
            facebook,
            instagram,
            active: active ? 'Ativo' : 'Inativo',
          }

          this.churchData.address = {
            zipCode: zip_code,
            address,
            numberAddress: number_address,
            complement,
            district,
            city,
            uf,
          }
        })
        .catch(() => {
          warningMessage(messages.impossible)
        })

      this.loading = false
    },

    isEnabledToView() {
      const userLogged = this.$store.state.sessions.userData

      return this.getAbilityView && userLogged.churches.find(e => e.unique_name === this.getChurchUniqueName)
    },

    showGeneralData(tab) {
      this.currentTab = tab
    },

    showAddressData(tab) {
      this.currentTab = tab
    },

    showMembersData(tab) {
      this.currentTab = tab
    },
  },
}
/* eslint-disable global-require */
</script>

<style lang="scss">
@import '@core/scss/vue/pages/page-profile.scss';
</style>
