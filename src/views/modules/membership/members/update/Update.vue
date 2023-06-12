<template>
  <b-tabs
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
        <span class="font-weight-bold">Perfil e Módulos</span>
      </template>

      <profile-and-modules />
    </b-tab>
  </b-tabs>
</template>

<script>
import { BTabs, BTab } from 'bootstrap-vue'
import GeneralInfo from './GeneralInfo.vue'
import AddressData from './AddressData.vue'
import Churches from './Churches.vue'
import ProfileAndModules from './ProfileAndModules.vue'

export default {
  components: {
    BTabs,
    BTab,
    GeneralInfo,
    AddressData,
    Churches,
    ProfileAndModules,
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
