<template>
  <section>
    <validation-observer
      ref="church"
    >
      <b-form>
        <b-row class="mb-2">
          <b-col cols="12">
            <h6>Escolha a igreja em que o novo membro estará vinculado:</h6>
          </b-col>
        </b-row>
        <b-row
          class="mb-2"
        >
          <!-- Church -->
          <b-col
            sm="6"
            lg="4"
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
                  v-model="getFormData.church"
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
            md="6"
            class="text-left"
          >
            <button-prev
              class-name="button-custom-size mb-1"
              @action="handlePrevTab"
            />
          </b-col>

          <b-col
            md="6"
            class="text-right"
          >
            <button-next
              class-name="button-custom-size mb-1"
              @action="handleFormSubmit"
            />
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
} from 'bootstrap-vue'
import { required } from '@validations'
import vSelect from 'vue-select'
import ButtonNext from '@/views/components/custom/ButtonNext.vue'
import ButtonPrev from '@/views/components/custom/ButtonPrev.vue'
import { getChurchesUserLogged } from '@core/utils/requests/churches'

export default {
  components: {
    ValidationObserver,
    ValidationProvider,
    BRow,
    BCol,
    BForm,
    BFormGroup,
    ButtonNext,
    ButtonPrev,
    vSelect,
  },

  data() {
    return {
      required,

      churches: [],
    }
  },

  computed: {
    getFormData() {
      return this.$store.getters['membershipModuleMembers/getFormData']
    },
  },

  mounted() {
    this.index()
  },

  methods: {
    async index() {
      this.setLoading(true)

      await getChurchesUserLogged().then(response => {
        this.churches = response.data
      })

      this.setLoading(false)
    },

    async handleFormSubmit() {
      const result = new Promise((resolve, reject) => {
        this.$refs.church.validate()
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
        this.$emit('handleNextTab')
      }
    },

    handleResetForm() {
      this.$refs.church.reset()
    },

    setLoading(loading) {
      this.$store.commit('membershipModuleMembers/setLoadingFormWizard', loading)
    },

    handlePrevTab() {
      this.$emit('handlePrevTab')
    },
  },
}
</script>

<style scoped>

</style>
