<template>
  <section>
    <validation-observer
      ref="address"
    >
      <b-form>
        <b-row class="mb-2">
          <b-col cols="12">
            <h6>Agora vamos definir os dados de endereço do novo membro:</h6>
          </b-col>
        </b-row>
        <b-row
          class="mb-2"
        >
          <!-- Zip Code -->
          <b-col
            sm="6"
            lg="4"
          >
            <b-form-group
              label="CEP *"
              label-for="zipCode"
            >
              <validation-provider
                #default="{ errors }"
                name="CEP"
                rules="required|min:9"
              >
                <b-form-input
                  id="zipCode"
                  v-model="getFormData.zipCode"
                  v-mask="'#####-###'"
                  autocomplete="off"
                  @keyup="getAddressByZipCode"
                />

                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>

          <!-- UF -->
          <b-col
            sm="6"
            lg="4"
          >
            <b-form-group
              label="UF *"
              label-for="uf"
            >
              <validation-provider
                #default="{ errors }"
                name="UF"
                rules="required"
              >
                <v-select
                  id="uf"
                  v-model="getFormData.state"
                  :options="states"
                  variant="custom"
                  item-text="uf"
                  item-value="uf"
                  placeholder="Estados"
                  label="uf"
                  @input="getCitiesByUFSelect"
                />

                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>

          <!-- Cidade -->
          <b-col
            sm="6"
            lg="4"
          >
            <b-form-group
              label="Cidade *"
              label-for="city"
            >
              <validation-provider
                #default="{ errors }"
                name="Cidade"
                rules="required"
              >
                <v-select
                  id="categories"
                  v-model="getFormData.city"
                  :options="cities"
                  variant="custom"
                  item-text="description"
                  item-value="id"
                  placeholder="Cidades"
                  label="description"
                  :disabled="!getFormData.state"
                />

                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>

          <!-- Address -->
          <b-col
            sm="6"
            lg="4"
          >
            <b-form-group
              label="Endereço *"
              label-for="address"
            >
              <validation-provider
                #default="{ errors }"
                name="Endereço"
                rules="required"
              >
                <b-form-input
                  id="address"
                  v-model="getFormData.address"
                  autocomplete="off"
                />

                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>

          <!-- Number Address -->
          <b-col
            sm="6"
            lg="4"
          >
            <b-form-group
              label="Número *"
              label-for="numberAddress"
            >
              <validation-provider
                #default="{ errors }"
                name="Número"
                rules="required"
              >
                <b-form-input
                  id="numberAddress"
                  v-model="getFormData.numberAddress"
                  autocomplete="off"
                />

                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>

          <!-- Complement -->
          <b-col
            sm="6"
            lg="4"
          >
            <b-form-group
              label="Complemento"
              label-for="complement"
            >
              <b-form-input
                id="complement"
                v-model="getFormData.complement"
                autocomplete="off"
              />
            </b-form-group>
          </b-col>

          <!-- District -->
          <b-col
            sm="6"
            lg="4"
          >
            <b-form-group
              label="Bairro *"
              label-for="district"
            >
              <validation-provider
                #default="{ errors }"
                name="Bairro"
                rules="required"
              >
                <b-form-input
                  id="district"
                  v-model="getFormData.district"
                  autocomplete="off"
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
            <button
              type="button"
              class="btn button-form button-custom-size mb-1"
              @click="handleFormSubmit"
            >
              <feather-icon
                icon="CheckIcon"
              />
              Finalizar
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
  BFormInput,
} from 'bootstrap-vue'
import { min, required } from '@validations'
import vSelect from 'vue-select'
import ButtonPrev from '@/views/components/custom/ButtonPrev.vue'
import { getAddressByZipCode } from '@core/utils/requests/zipCode'
import { states } from '@core/utils/states'
import { getArrayAttr, strClear } from '@core/utils/utils'
import { getCitiesByUf } from '@core/utils/requests/cities'
import { successMessage, warningMessage } from '@/libs/alerts/sweetalerts'
import { messages } from '@core/utils/validations/messages'
import { createUserMember } from '@core/utils/requests/members'

export default {
  components: {
    ValidationObserver,
    ValidationProvider,
    BRow,
    BCol,
    BForm,
    BFormGroup,
    BFormInput,
    ButtonPrev,
    vSelect,
  },

  data() {
    return {
      required,
      min,
      states,

      cities: [],
    }
  },

  computed: {
    getFormData() {
      return this.$store.getters['membershipModuleMembers/getFormData']
    },
  },

  mounted() {
    this.getCitiesByUFSelect()
  },

  methods: {
    async getCitiesByUFSelect() {
      if (this.getFormData.state) {
        this.setLoading(true)

        await getCitiesByUf(this.getFormData.state.uf)
          .then(response => {
            if (response.status === 200) {
              this.cities = response.data
            }
          })

        this.setLoading(false)
      } else {
        this.clearZipCodeAddress()
      }
    },

    async handleFormSubmit() {
      const result = new Promise((resolve, reject) => {
        this.$refs.address.validate()
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
        await this.$emit('handleFinish')
      }
    },

    setLoading(loading) {
      this.$store.commit('membershipModuleMembers/setLoadingFormWizard', loading)
    },

    handleNextTab() {
      this.$emit('handleNextTab')
    },

    handlePrevTab() {
      this.$emit('handlePrevTab')
    },

    handleResetForm() {
      this.$refs.address.reset()
    },

    async getAddressByZipCode() {
      if (this.getFormData.zipCode.length === 9) {
        this.setLoading(true)

        await getAddressByZipCode(strClear(this.getFormData.zipCode))
          .then(response => {
            const res = response.data

            this.getFormData.numberAddress = ''
            this.getFormData.complement = ''
            this.cities = res.citiesByUF

            this.getFormData.address = res.address
            this.getFormData.district = res.district

            this.states.forEach(obj => {
              if (obj.uf === res.city.uf) {
                this.getFormData.state = obj
              }
            })

            this.getFormData.city = res.city
          })
          .catch(error => {
            this.clearZipCodeAddress()

            if (error.response.status === 404) {
              warningMessage(error.response.data.error)
            } else {
              warningMessage(messages.impossible)
            }
          })

        this.setLoading(false)
      }
    },

    clearZipCodeAddress() {
      this.getFormData.zipCode = ''
      this.getFormData.address = ''
      this.getFormData.numberAddress = ''
      this.getFormData.complement = ''
      this.getFormData.district = ''
      this.getFormData.city = null
      this.getFormData.state = null
      this.cities = []
    },
  },
}
</script>

<style scoped>

</style>
