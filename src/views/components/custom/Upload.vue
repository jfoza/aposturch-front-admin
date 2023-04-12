<template>
  <div class="file-upload">
    <section class="mr-2 image-area">
      <div class="box">
        <feather-icon
          v-if="!getImage.path"
          icon="ImageIcon"
          size="30"
        />
        <span
          v-if="getImage.path"
          class="image-preview"
        >
          <img
            :src="getImage.path"
            class="image-preview__img"
            alt=""
          >
        </span>
      </div>
    </section>

    <section class="d-flex">
      <div>
        <input
          id="photo-upload-button"
          type="file"
          name="photo-upload-button"
          accept="image/*"
          class="input-file"
          @change="previewThumb"
        >
        <label for="photo-upload-button">
          <feather-icon
            icon="EditIcon"
          />
        </label>
      </div>

      <button
        :disabled="!getImage.path"
        type="button"
        class="btn btn-outline-form custom-btn-remove"
        @click="clearUploadData"
      >
        <feather-icon
          icon="Trash2Icon"
        />
      </button>
    </section>
  </div>
</template>

<script>

export default {
  props: {
    uploadData: {
      type: Object,
      default: null,
    },
    image: {
      type: Object,
      default: null,
    },
  },

  computed: {
    getUploadData() {
      return this.uploadData
    },
    getImage() {
      return this.image
    },
  },

  watch: {
    imagePath(value) {
      return value
    },
  },

  methods: {
    previewThumb(event) {
      const input = event.target
      if (input.files && input.files[0]) {
        const reader = new FileReader()
        reader.onload = e => {
          this.getImage.path = e.target.result
        }
        reader.readAsDataURL(input.files[0])
        this.getUploadData.files = input.files
      }
    },

    clearUploadData() {
      this.$emit('clearUploadData')
    },

    setFormData(productId) {
      const formData = new FormData()

      formData.append('image', this.files[0])
      formData.append('productId', productId)
      formData.append('_method', 'PUT')
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/upload.scss';
</style>
