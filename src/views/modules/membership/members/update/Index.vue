<template>
  <div class="content-wrapper">
    <overlay
      :show="loading"
    >
      <page-header
        screen-name="Editar membro"
        :link-items="linkItems"
      />

      <b-tabs
        v-if="!loading"
        vertical
        content-class="col-12 col-md-9 mt-1 mt-md-0"
        pills
        nav-wrapper-class="col-md-3 col-12"
        nav-class="nav-left"
      >
        <b-tab :disabled="disableMenus">
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

        <b-tab :disabled="disableMenus">
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

        <b-tab :disabled="disableMenus">
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

        <b-tab :disabled="disableMenus">
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

        <b-tab :disabled="disableMenus">
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

        <b-tab :disabled="disableMenus">
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
    </overlay>
  </div>
</template>

<script>
import { BTabs, BTab } from 'bootstrap-vue'
import { getProfiles } from '@core/utils/requests/users'
import { getModules } from '@core/utils/requests/modules'
import { getMemberUserId } from '@core/utils/requests/members'
import { getChurchesUserLogged } from '@core/utils/requests/churches'
import profileTypes from '@core/utils/profileTypes'
import Overlay from '@/views/components/custom/Overlay.vue'
import PageHeader from '@/views/components/custom/PageHeader.vue'
import GeneralInfo from './forms/GeneralInfo.vue'
import AddressData from './forms/AddressData.vue'
import Churches from './forms/Churches.vue'
import Profile from './forms/Profile.vue'
import Modules from './forms/Modules.vue'
import Passwords from './forms/Passwords.vue'

export default {
  components: {
    PageHeader,
    Overlay,
    BTabs,
    BTab,
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
      chooseMemberUser: this.$store.state.membershipModuleMembers.chooseMemberUser,

      disableMenus: false,

      linkItems: [
        {
          name: 'Gerenciar membros',
          active: true,
          routeName: '',
        },
        {
          name: '...',
          active: true,
        },
      ],
    }
  },

  computed: {
    getItemInStore() {
      return this.$store.getters['membershipModuleMembers/getChooseMemberUser']
    },

    getMembershipModuleRoutes() {
      return this.$store.getters['routes/getMembershipModuleRoutes']
    },
  },

  created() {
    if (!this.getItemInStore) {
      this.redirectToMainPage()

      return false
    }
    this.linkItems[0].routeName = this.getMembershipModuleRoutes.members.name

    return this.index()
  },

  methods: {
    async index() {
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

        this.$store.commit('membershipModuleMembers/setProfilesInUpdate', profiles)
      })
    },

    async handleGetModules() {
      await getModules().then(response => {
        const modules = response.data

        this.$store.commit('membershipModuleMembers/setModulesInUpdate', modules)
      })
    },

    async handleGetChurches() {
      await getChurchesUserLogged().then(response => {
        const churches = response.data

        this.$store.commit('membershipModuleMembers/setChurchesInUpdate', churches)
      })
    },

    async handleGetMemberUserId() {
      const { user_id } = this.getItemInStore

      await getMemberUserId(user_id).then(response => {
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
          'membershipModuleMembers/setFormData',
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
            church,
            profile: { id: profileId, description: profileDescription },
          },
        )

        this.linkItems[1].name = name
      })
    },

    redirectToMainPage() {
      this.$router.replace({ name: this.getMembershipModuleRoutes.members.name })
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
