<template>
  <div
    v-if="showModalImg"
    id="myModal"
    class="modal"
  >
    <div class="close">
      <span
        @click="closeModalImage"
      >
        <feather-icon
          icon="XIcon"
          size="30"
        />
      </span>
    </div>

    <img
      class="modal-content img-fluid"
      :alt="getAltName"
      :src="getSrcName"
    >
  </div>
</template>

<script>
export default {
  props: {
    altName: {
      type: String,
      default: '',
    },

    srcName: {
      type: String,
      default: '',
    },
  },

  data() {
    return {
      showModalImg: false,
    }
  },

  computed: {
    getAltName() {
      return this.altName
    },

    getSrcName() {
      return this.srcName
    },
  },

  methods: {
    closeModalImage() {
      this.showModalImg = false
    },
  },
}
</script>

<style lang="scss">
.modal {
  display: block;
  position: fixed;
  left: 0;
  top: 0;
  padding: 2rem;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0,0,0);
  background-color: rgba(0,0,0,0.9);
}

.modal-content {
  margin: auto;
  display: block;
  width: auto;
}

.close {
  width: 100%;
  display: flex;
  justify-content: end;
  margin-bottom: 70px;
}

@keyframes zoom {
  from {transform:scale(0)}
  to {transform:scale(1)}
}

.close:hover,
.close:focus {
  color: #bbb;
  text-decoration: none;
  cursor: pointer;
}

@media(width < 992px) {
  .modal {
    padding: 1rem;
  }
}

</style>
