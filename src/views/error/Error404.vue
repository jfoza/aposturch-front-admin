<template>
  <custom-misc>
    <span class="icon-page-misc mb-2">
      <AlertCircleIcon />
    </span>

    <div class="text-center mb-1">
      <h2 class="text-center">
        Página não encontrada
      </h2>
      <p class="text-center">
        Não foi possível carregar sua requisição.
      </p>
    </div>

    <load-button
      :message="getMessageButton"
      @action="handleRedirect"
    />
  </custom-misc>
</template>

<script>
import CustomMisc from '@/views/components/custom/CustomMisc.vue'
import LoadButton from '@/views/components/custom/LoadButton.vue'
import { AlertCircleIcon } from 'vue-feather-icons'

export default {
  components: {
    CustomMisc,
    LoadButton,
    AlertCircleIcon,
  },

  computed: {
    getMessageButton() {
      if (this.$store.getters['sessions/isLoggedIn']) {
        return 'Voltar para o início'
      }

      return 'Ir para o login'
    },
  },

  methods: {
    handleRedirect() {
      this.$router.replace({
        name: this.$store.getters['sessions/isLoggedIn']
          ? 'home'
          : 'auth-login',
      })
    },
  },
}
</script>
