<template>
  <overlay
    class-name="card p-3"
    :show="loading"
  >
    <b-row class="mb-3">
      <b-col
        cols="12"
      >
        <b-form-group
          label-for="image"
          label="Imagem de Perfil"
        />
        <Upload
          ref="upload"
          :upload-data="getUploadData"
          :image="getFormData.image"
          @clearUploadData="handleConfirmToRemove"
        />
      </b-col>
    </b-row>

    <b-row>
      <b-col
        cols="12"
        class="text-right"
      >
        <button
          v-if="getUploadData.files.length > 0"
          type="button"
          class="btn button-form button-custom-size"
          @click="update"
        >
          <feather-icon
            icon="CheckIcon"
          />
          Salvar alterações
        </button>
      </b-col>
    </b-row>
  </overlay>
</template>

<script>
import {
  BRow,
  BCol,
  BFormGroup,
} from 'bootstrap-vue'
import { statusForm } from '@core/utils/statusForm'
import { confirmAction, successMessage, warningMessage } from '@/libs/alerts/sweetalerts'
import { messages } from '@core/utils/validations/messages'
import Overlay from '@/views/components/custom/Overlay.vue'
import Upload from '@/views/components/custom/Upload.vue'
import { removeUserImageAvatar, saveUserImageAvatar } from '@core/utils/requests/users'

export default {
  components: {
    Upload,
    Overlay,
    BRow,
    BCol,
    BFormGroup,
  },

  data() {
    return {
      loading: false,
    }
  },

  computed: {
    getFormData() {
      return this.$store.getters['membershipModuleMembers/getFormData']
    },

    getUploadData() {
      return this.$store.getters['membershipModuleMembers/getUploadData']
    },
  },

  methods: {
    async update() {
      this.loading = true

      const { userId } = this.getFormData

      if (this.getUploadData.files.length > 0 && userId) {
        const formDataUpload = new FormData()

        formDataUpload.append('image', this.getUploadData.files[0])
        formDataUpload.append('userId', userId)

        await saveUserImageAvatar(formDataUpload)
          .then(() => {
            successMessage(messages.successSave)
          })
          .catch(() => {
            warningMessage(messages.errorUploadImage)
          })
      }

      this.loading = false
    },

    handleConfirmToRemove() {
      confirmAction(messages.confirmRemoveUserAvatar)
        .then(() => {
          this.removeUserAvatar()
        })
    },

    async removeUserAvatar() {
      this.loading = true

      const { userId } = this.getFormData

      await removeUserImageAvatar(userId)
        .then(() => {
          successMessage(messages.successSave)

          this.clearUploadData()
        })
        .catch(error => {
          this.handleError(error.response)
        })

      this.loading = false
    },

    clearUploadData() {
      this.$store.commit('membershipModuleMembers/setUploadData', { files: [] })
      this.getFormData.image = {
        id: '',
        type: '',
        path: '',
      }
    },

    handleError(errorResponse) {
      if (errorResponse && errorResponse.status === 400) {
        return warningMessage(errorResponse.data.error)
      }

      return warningMessage(messages.impossible)
    },
  },
}
</script>
