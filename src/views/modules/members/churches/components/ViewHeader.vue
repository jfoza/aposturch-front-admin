<template>
  <b-card
    class="profile-header mb-2"
    :img-src="getChooseImage"
    img-top
    alt="cover photo"
    body-class="p-0"
  >
    <!-- profile picture -->
    <div class="position-relative">
      <div class="profile-img-container d-flex align-items-center">
        <div class="profile-img">
          <b-img
            :src="getProfileImage"
            rounded
            fluid
            class="bg-image"
            alt="profile photo"
          />
        </div>
        <!-- profile title -->
        <div class="profile-title ml-3">
          <h2 class="text-white">
            {{ headerData.name }}
          </h2>
        </div>
        <!--/ profile title -->
      </div>
    </div>
    <!--/ profile picture -->

    <!-- profile navbar -->
    <div class="profile-header-nav">
      <b-navbar
        toggleable="md"
        type="light"
      >
        <!-- toggle button -->
        <b-navbar-toggle
          class="ml-auto"
          target="nav-text-collapse"
        >
          <feather-icon
            icon="AlignJustifyIcon"
            size="21"
          />
        </b-navbar-toggle>
        <!--/ toggle button -->

        <!-- collapse -->
        <b-collapse
          id="nav-text-collapse"
          is-nav
        >
          <b-tabs
            pills
            class="profile-tabs mt-1 mt-md-0"
            nav-class="mb-0"
          >
            <template #tabs-start>
              <b-nav-item
                v-for="(tab, index) in tabs"
                :key="index"
                role="presentation"
                :active="tab.id === currentTab"
                class="font-weight-bold"
                @click="handleChooseTab(tab)"
              >
                <span class="d-none d-md-block">{{ tab.description }}</span>
                <feather-icon
                  icon="RssIcon"
                  class="d-block d-md-none"
                />
              </b-nav-item>
            </template>

            <!-- edit buttons -->
            <template #tabs-end>
              <b-button
                variant="outline-colors-palette2"
                class="ml-auto"
              >
                <feather-icon
                  icon="EditIcon"
                  class="d-block d-md-none"
                />
                <span class="font-weight-bold d-none d-md-block">Editar</span>
              </b-button>
            </template>
            <!-- edit buttons -->
          </b-tabs>

        </b-collapse>
        <!--/ collapse -->
      </b-navbar>
    </div>
    <!--/ profile navbar -->
  </b-card>
</template>

<script>
import {
  BCard, BImg, BNavbar, BNavbarToggle, BCollapse, BTabs, BNavItem, BButton,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import bg1 from '@/assets/images/custom/background/bg-view-1.png'
import bg2 from '@/assets/images/custom/background/bg-view-2.png'
import bg3 from '@/assets/images/custom/background/bg-view-3.png'
import bg4 from '@/assets/images/custom/background/bg-view-4.png'
import bg5 from '@/assets/images/custom/background/bg-view-5.png'
import bg6 from '@/assets/images/custom/background/bg-view-6.png'
import bg7 from '@/assets/images/custom/background/bg-view-7.png'
import defaultProfileImage from '@/assets/images/custom/logo/default-church.png'
import { randomNumberInterval } from '@core/helpers/helpers'

export default {
  components: {
    BCard,
    BTabs,
    BButton,
    BNavItem,
    BNavbar,
    BNavbarToggle,
    BCollapse,
    BImg,
  },
  directives: {
    Ripple,
  },
  props: {
    headerData: {
      type: Object,
      default: () => {},
    },
  },

  data() {
    return {
      currentTab: 1,

      defaultProfileImage,

      tabs: [
        {
          id: 1,
          event: 'generalData',
          description: 'Geral',
        },

        {
          id: 2,
          event: 'addressData',
          description: 'Endereço',
        },

        {
          id: 3,
          event: 'membersData',
          description: 'Membros',
        },
      ],

      images: [
        bg1,
        bg2,
        bg3,
        bg4,
        bg5,
        bg6,
        bg7,
      ],
    }
  },

  computed: {
    getChooseImage() {
      const initialNumber = 0
      const finalNumber = (this.images.length - 1)

      const index = randomNumberInterval(initialNumber, finalNumber)

      return this.images[index]
    },

    getProfileImage() {
      if (!this.headerData.profileImg) {
        return this.defaultProfileImage
      }

      return this.headerData.profileImg
    },
  },

  methods: {
    handleChooseTab(tab) {
      this.currentTab = tab.id
      this.$emit(tab.event, tab.id)
    },
  },
}
</script>

<style scoped lang="scss">
  @import '@/assets/scss/variables/_variables.scss';

  .card-img-top {
    max-height: 280px;
    object-fit: cover;
    object-position: center;
  }

  .nav-pills .nav-link.active {
    background-color: $colors-palette2;
    color: $white !important;
    border-color: $colors-palette2;
    box-shadow: 0 4px 18px -4px rgba(28, 37, 65, 0.65);
  }
</style>
