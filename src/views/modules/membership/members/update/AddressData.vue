<template>
  <section class="card p-3">
    <validation-observer
      ref="addressData"
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
          <!-- Zip Code -->
          <b-col
            sm="12"
            lg="6"
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
                  v-model="formData.zipCode"
                  v-mask="'#####-###'"
                  :state="errors.length > 0 ? false : null"
                  autocomplete="off"
                  @keyup="getAddressByZipCode"
                />

                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>

          <!-- UF -->
          <b-col
            sm="12"
            lg="6"
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
                  id="categories"
                  v-model="formData.state"
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
            sm="12"
            lg="6"
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
                  v-model="formData.city"
                  :options="cities"
                  variant="custom"
                  item-text="description"
                  item-value="id"
                  placeholder="Cidades"
                  label="description"
                  :disabled="!formData.state"
                />

                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>

          <!-- Address -->
          <b-col
            sm="12"
            lg="6"
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
                  v-model="formData.address"
                  :state="errors.length > 0 ? false : null"
                  autocomplete="off"
                />

                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>

          <!-- Number Address -->
          <b-col
            sm="12"
            lg="6"
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
                  v-model="formData.numberAddress"
                  :state="errors.length > 0 ? false : null"
                  autocomplete="off"
                />

                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>

          <!-- Complement -->
          <b-col
            sm="12"
            lg="6"
          >
            <b-form-group
              label="Complemento"
              label-for="complement"
            >
              <b-form-input
                id="complement"
                v-model="formData.complement"
                autocomplete="off"
              />
            </b-form-group>
          </b-col>

          <!-- District -->
          <b-col
            sm="12"
            lg="6"
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
                  v-model="formData.district"
                  :state="errors.length > 0 ? false : null"
                  autocomplete="off"
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
  BFormInput,
  BSpinner,
} from 'bootstrap-vue'
import { min, required } from '@validations'
import vSelect from 'vue-select'
import { getAddressByZipCode } from '@core/utils/requests/zipCode'
import { states } from '@core/utils/states'
import { getCitiesByUf } from '@core/utils/requests/cities'
import { messages } from '@core/utils/validations/messages'
import { successMessage, warningMessage } from '@/libs/alerts/sweetalerts'
import { strClear } from '@core/helpers/helpers'
import { updateAddressData } from '@core/utils/requests/members'

export default {
  components: {
    ValidationObserver,
    ValidationProvider,
    BRow,
    BCol,
    BForm,
    BFormGroup,
    BFormInput,
    BSpinner,
    vSelect,
  },

  data() {
    return {
      required,
      min,
      states,

      loading: true,

      formData: {
        zipCode: '',
        address: '',
        numberAddress: '',
        complement: '',
        district: '',
        city: null,
        state: null,
      },

      cities: [],
    }
  },

  computed: {
    getMemberInUpdate() {
      return this.$store.state.chooseDataMembershipModule.memberInUpdate
    },
  },

  mounted() {
    this.handlePopulateSelects()
  },

  methods: {
    async handlePopulateSelects() {
      this.loading = true

      await this.setFormData()
      await this.getCitiesByUFSelect()

      this.loading = false
    },

    setFormData() {
      const {
        zipCode,
        address,
        numberAddress,
        complement,
        district,
        city,
        state,
      } = this.getMemberInUpdate

      this.formData = {
        zipCode,
        address,
        numberAddress,
        complement,
        district,
        city,
        state,
      }
    },

    async getCitiesByUFSelect() {
      if (this.formData.state) {
        await getCitiesByUf(this.formData.state.uf)
          .then(response => {
            if (response.status === 200) {
              this.cities = response.data
            }
          })
      } else {
        this.clearZipCodeAddress()
      }
    },

    async handleFormSubmit() {
      const result = new Promise((resolve, reject) => {
        this.$refs.addressData.validate()
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
        await this.update()
      }
    },

    async update() {
      this.loading = true

      const { userId } = this.getMemberInUpdate

      const formData = {
        zipCode: strClear(this.formData.zipCode),
        address: this.formData.address,
        numberAddress: this.formData.numberAddress,
        complement: this.formData.complement,
        district: this.formData.district,
        cityId: this.formData.city.id,
        uf: this.formData.state.uf,
      }

      await updateAddressData(userId, formData)
        .then(response => {
          if (response.status === 200) {
            successMessage(messages.successSave)
          }
        })
        .catch(error => {
          this.handleError(error.response)
        })

      this.loading = false
    },

    async getAddressByZipCode() {
      if (this.formData.zipCode.length === 9) {
        this.loading = true

        await getAddressByZipCode(strClear(this.formData.zipCode))
          .then(response => {
            const res = response.data

            this.formData.numberAddress = ''
            this.formData.complement = ''
            this.cities = res.citiesByUF

            this.formData.address = res.address
            this.formData.district = res.district

            this.states.forEach(obj => {
              if (obj.uf === res.city.uf) {
                this.formData.state = obj
              }
            })

            this.formData.city = res.city
          })
          .catch(error => {
            this.clearZipCodeAddress()

            if (error.response.status === 404) {
              warningMessage(error.response.data.error)
            } else {
              warningMessage(messages.impossible)
            }
          })

        this.loading = false
      }
    },

    // setFormData() {
    //   return {
    //     zipCode: strClear(this.formData.zipCode),
    //     address: this.formData.address,
    //     numberAddress: this.formData.numberAddress,
    //     complement: this.formData.complement,
    //     district: this.formData.district,
    //     cityId: this.formData.city.id,
    //     uf: this.formData.state.uf,
    //   }
    // },

    handleError(response) {
      const errors = response.status === 400 || response.status === 404

      if (errors) {
        return warningMessage(response.data.error)
      }

      return warningMessage(messages.impossible)
    },

    clearZipCodeAddress() {
      this.formData.zipCode = ''
      this.formData.address = ''
      this.formData.numberAddress = ''
      this.formData.complement = ''
      this.formData.district = ''
      this.formData.city = null
      this.formData.state = null
      this.cities = []
    },
  },
}
</script>

<style scoped>

</style>
