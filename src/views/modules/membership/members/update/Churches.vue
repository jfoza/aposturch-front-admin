<template>
  <section class="card p-3">
    <validation-observer
      ref="churches"
    >
      <div
        v-if="loading"
        class="spinner-area"
      >
        <b-spinner
          variant="custom"
          label="Loading..."
        />
      </div>

      <b-form
        v-if="!loading"
      >
        <b-row
          class="mb-2"
        >
          <!-- Church -->
          <b-col
            sm="12"
            lg="6"
          >
            <b-form-group
              label="Igreja *"
              label-for="church"
            >
              <validation-provider
                #default="{ errors }"
                name="Igreja"
                rules="required"
              >
                <v-select
                  id="church"
                  v-model="formData.church"
                  :options="churches"
                  variant="custom"
                  item-text="name"
                  item-value="id"
                  placeholder="Escolha uma igreja"
                  label="name"
                />

                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>
        </b-row>

        <b-row>
          <b-col
            cols="12"
            class="text-right"
          >
            <button
              type="button"
              class="btn button-form button-custom-size"
              @click="handleFormSubmit"
            >
              <feather-icon
                icon="CheckIcon"
              />
              Salvar alterações
            </button>
          </b-col>
        </b-row>
      </b-form>
    </validation-observer>
  </section>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import {
  BRow,
  BCol,
  BForm,
  BFormGroup,
  BSpinner,
} from 'bootstrap-vue'
import { required } from '@validations'
import vSelect from 'vue-select'

export default {
  components: {
    ValidationObserver,
    ValidationProvider,
    BRow,
    BCol,
    BForm,
    BFormGroup,
    BSpinner,
    vSelect,
  },

  data() {
    return {
      required,

      loading: false,

      formData: {
        church: null,
      },

      churches: [],
    }
  },

  methods: {
    async handleFormSubmit() {
      const result = new Promise((resolve, reject) => {
        this.$refs.churches.validate()
          .then(success => {
            if (success) {
              resolve(true)
            }
          })
          .catch(() => {
            reject()
          })
      })

      if (await result) {
        //
      }
    },
  },
}
</script>

<style scoped>

</style>
