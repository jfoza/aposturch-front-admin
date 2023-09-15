<template>
  <div>
    <div
      v-if="loading"
      class="spinner-area"
    >
      <b-spinner
        variant="custom"
        label="Loading..."
      />
    </div>

    <b-tabs
      v-if="!loading"
      vertical
      content-class="col-12 col-md-9 mt-1 mt-md-0"
      pills
      nav-wrapper-class="col-md-3 col-12"
      nav-class="nav-left"
    >
      <b-tab>
        <!-- title -->
        <template #title>
          <feather-icon
            icon="UserIcon"
            size="18"
            class="mr-50"
          />
          <span class="font-weight-bold">Informações Gerais</span>
        </template>

        <general-info />
      </b-tab>

      <b-tab>
        <!-- title -->
        <template #title>
          <feather-icon
            icon="MapPinIcon"
            size="18"
            class="mr-50"
          />
          <span class="font-weight-bold">Endereço</span>
        </template>

        <address-data />
      </b-tab>

      <b-tab>
        <!-- title -->
        <template #title>
          <feather-icon
            icon="BookOpenIcon"
            size="18"
            class="mr-50"
          />
          <span class="font-weight-bold">Igrejas</span>
        </template>

        <churches />
      </b-tab>

      <b-tab>
        <!-- title -->
        <template #title>
          <feather-icon
            icon="UserCheckIcon"
            size="18"
            class="mr-50"
          />
          <span class="font-weight-bold">Perfil</span>
        </template>

        <profile />
      </b-tab>

      <b-tab>
        <!-- title -->
        <template #title>
          <feather-icon
            icon="LayersIcon"
            size="18"
            class="mr-50"
          />
          <span class="font-weight-bold">Módulos</span>
        </template>

        <modules />
      </b-tab>

      <b-tab>
        <!-- title -->
        <template #title>
          <feather-icon
            icon="LockIcon"
            size="18"
            class="mr-50"
          />
          <span class="font-weight-bold">Senha</span>
        </template>

        <passwords />
      </b-tab>
    </b-tabs>
  </div>
</template>

<script>
import { BTabs, BTab, BSpinner } from 'bootstrap-vue'
import { getProfiles } from '@core/utils/requests/users'
import { getModules } from '@core/utils/requests/modules'
import { getMemberUserId } from '@core/utils/requests/members'
import { getChurchesUserLogged } from '@core/utils/requests/churches'
import profileTypes from '@core/utils/profileTypes'
import GeneralInfo from './GeneralInfo.vue'
import AddressData from './AddressData.vue'
import Churches from './Churches.vue'
import Profile from './Profile.vue'
import Modules from './Modules.vue'
import Passwords from './Passwords.vue'

export default {
  components: {
    BTabs,
    BTab,
    BSpinner,
    GeneralInfo,
    AddressData,
    Churches,
    Profile,
    Modules,
    Passwords,
  },

  data() {
    return {
      loading: true,
      chooseMemberUserId: this.$store.state.chooseDataMembershipModule.chooseMemberUserId,
    }
  },

  mounted() {
    this.handlePopulateSelects()
  },

  methods: {
    async handlePopulateSelects() {
      this.loading = true

      await this.handleGetProfiles()
      await this.handleGetModules()
      await this.handleGetChurches()
      await this.handleGetMemberUserId()

      this.loading = false
    },

    async handleGetProfiles() {
      await getProfiles({ profileTypeUniqueName: profileTypes.MEMBERSHIP }).then(response => {
        const profiles = response.data

        this.$store.commit('chooseDataMembershipModule/SET_PROFILES_IN_UPDATE_MEMBER', profiles)
      })
    },

    async handleGetModules() {
      await getModules().then(response => {
        const modules = response.data

        this.$store.commit('chooseDataMembershipModule/SET_MODULES_IN_UPDATE_MEMBER', modules)
      })
    },

    async handleGetChurches() {
      await getChurchesUserLogged().then(response => {
        const churches = response.data

        this.$store.commit('chooseDataMembershipModule/SET_CHURCHES_IN_UPDATE_MEMBER', churches)
      })
    },

    async handleGetMemberUserId() {
      await getMemberUserId(this.chooseMemberUserId).then(response => {
        const {
          userId,
          name,
          email,
          phone,
          zipCode,
          address,
          numberAddress,
          complement,
          district,
          cityId,
          cityDescription,
          uf,
          profileId,
          profileDescription,
          church,
          modules,
        } = response.data

        this.$store.commit(
          'chooseDataMembershipModule/SET_MEMBER_IN_UPDATE',
          {
            userId,
            name,
            email,
            phone,
            zipCode,
            address,
            numberAddress,
            district,
            complement,
            modules,
            city: { id: cityId, description: cityDescription },
            state: { uf },
            church: { id: church.id, name: church.name },
            profile: { id: profileId, description: profileDescription },
          },
        )
      })
    },
  },
}
</script>

<style lang="scss">
@import '@/assets/scss/variables/_variables.scss';

.nav-pills .nav-link.active {
  background-color: $colors-palette3;
  border-color: $colors-palette3;
  box-shadow: 0 4px 18px -4px rgba(58, 80, 107, 0.65);
}
</style>
