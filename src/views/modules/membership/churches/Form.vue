<template>
  <overlay
    class-name="card"
    :show="loading"
  >
    <div class="p-card-form">
      <validation-observer
        ref="formUser"
      >
        <h2>{{ getFormData.name }}</h2>

        <b-form>
          <b-row class="mb-3 mt-2">
            <b-col
              cols="12"
            >
              <b-form-group
                label-for="image"
              />
              <Upload
                ref="upload"
                :upload-data="uploadData"
                :image="getFormData.image"
                @clearUploadData="clearUploadData"
              />
            </b-col>
          </b-row>

          <b-row>
            <!-- Name -->
            <b-col
              sm="6"
              lg="4"
            >
              <b-form-group
                label="Nome"
                label-for="name"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Nome"
                  rules="required"
                >
                  <b-form-input
                    id="name"
                    v-model="getFormData.name"
                    :state="errors.length > 0 ? false : null"
                    autocomplete="off"
                  />

                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>

            <!-- Phone -->
            <b-col
              sm="6"
              lg="4"
            >
              <b-form-group
                label="Telefone"
                label-for="phone"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Telefone"
                  rules="required|min:13"
                >
                  <b-form-input
                    id="phone"
                    v-model="getFormData.phone"
                    v-mask="'(##) #####-####'"
                    :state="errors.length > 0 ? false : null"
                    autocomplete="off"
                  />

                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>

            <!-- Email -->
            <b-col
              sm="6"
              lg="4"
            >
              <b-form-group
                label="E-mail"
                label-for="email"
              >
                <validation-provider
                  #default="{ errors }"
                  name="E-mail"
                  rules="required|email"
                >
                  <b-form-input
                    id="email"
                    v-model="getFormData.email"
                    :state="errors.length > 0 ? false : null"
                    placeholder="email@email.com"
                    autocomplete="off"
                    type="email"
                  />

                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>

            <!-- Active -->
            <b-col
              sm="6"
              lg="4"
            >
              <b-form-group
                label="Status"
                label-for="status"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Status"
                  rules="required"
                >
                  <v-select
                    id="categories"
                    v-model="getFormData.active"
                    :options="statusForm"
                    variant="custom"
                    item-text="description"
                    item-value="id"
                    placeholder="Selecione o status"
                    label="description"
                  />

                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>

            <!-- Zip Code -->
            <b-col
              sm="6"
              lg="4"
            >
              <b-form-group
                label="CEP"
                label-for="zipCode"
              >
                <validation-provider
                  #default="{ errors }"
                  name="CEP"
                  rules="required|min:9"
                >
                  <b-form-input
                    id="zipCode"
                    v-model="getFormData.zip_code"
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
              sm="6"
              lg="4"
            >
              <b-form-group
                label="UF"
                label-for="uf"
              >
                <validation-provider
                  #default="{ errors }"
                  name="UF"
                  rules="required"
                >
                  <v-select
                    id="categories"
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
                label="Cidade"
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
                label="Endereço"
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
                    :state="errors.length > 0 ? false : null"
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
                label="Número"
                label-for="numberAddress"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Número"
                  rules="required"
                >
                  <b-form-input
                    id="numberAddress"
                    v-model="getFormData.number_address"
                    :state="errors.length > 0 ? false : null"
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
                label="Bairro"
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
                    :state="errors.length > 0 ? false : null"
                    autocomplete="off"
                  />

                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>

            <!-- YouTube -->
            <b-col
              sm="6"
              lg="4"
            >
              <b-form-group
                label="YouTube"
                label-for="youTube"
              >
                <b-form-input
                  id="youTube"
                  v-model="getFormData.youtube"
                  autocomplete="off"
                />

              </b-form-group>
            </b-col>

            <!-- Facebook -->
            <b-col
              sm="6"
              lg="4"
            >
              <b-form-group
                label="Facebook"
                label-for="facebook"
              >
                <b-form-input
                  id="facebook"
                  v-model="getFormData.facebook"
                  autocomplete="off"
                />
              </b-form-group>
            </b-col>

            <!-- Instagram -->
            <b-col
              sm="6"
              lg="4"
            >
              <b-form-group
                label="Instagram"
                label-for="instagram"
              >
                <b-form-input
                  id="instagram"
                  v-model="getFormData.instagram"
                  autocomplete="off"
                />
              </b-form-group>
            </b-col>

            <b-col
              cols="12"
              class="mt-3"
            >
              <button
                type="button"
                class="btn button-form button-custom-size mr-2"
                @click="formSubmit(true)"
              >
                <feather-icon
                  icon="CheckIcon"
                />
                Salvar igreja
              </button>

              <button
                v-if="getMode === formActions.insertAction"
                type="button"
                class="btn button-form button-custom-size mr-2"
                @click="formSubmit(false)"
              >
                <feather-icon
                  icon="CheckIcon"
                />
                Salvar e cadastrar novo
              </button>

              <button
                type="button"
                class="btn btn-outline-danger button-custom-size"
                @click="cancel"
              >
                <feather-icon
                  icon="XIcon"
                />
                Cancelar
              </button>
            </b-col>
          </b-row>
        </b-form>
      </validation-observer>
    </div>
  </overlay>
</template>

<script>
/* eslint-disable import/extensions */
import {
  BRow,
  BCol,
  BForm,
  BFormGroup,
  BFormInput,
} from 'bootstrap-vue'
import Upload from '@/views/components/custom/Upload'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import {
  required, email, min,
} from '@validations'
import { statusForm } from '@core/utils/statusForm'
import vSelect from 'vue-select'
import { successMessage, warningMessage } from '@/libs/alerts/sweetalerts'
import { formActions } from '@core/utils/formActions'
import { getAddressByZipCode } from '@core/utils/requests/zipCode'
import { states } from '@core/utils/states'
import { strClear } from '@core/utils/utils'
import { getCitiesByUf } from '@core/utils/requests/cities'
import { messages } from '@core/utils/validations/messages'
import membershipModuleRoutes from '@/views/modules/membership/routes'
import { createChurch, saveChurchImage, updateChurch } from '@core/utils/requests/churches'
import { actions, subjects } from '@/libs/acl/rules'
import Overlay from '@/views/components/custom/Overlay.vue'

export default {
  components: {
    Overlay,
    Upload,
    ValidationProvider,
    ValidationObserver,
    vSelect,
    BRow,
    BCol,
    BForm,
    BFormGroup,
    BFormInput,
  },

  props: {
    mode: {
      type: String,
      default: 'insert',
    },

    formData: {
      type: Object,
      default: null,
    },
  },

  data() {
    return {
      states,
      required,
      email,
      min,
      statusForm,
      titlePage: '',

      cities: [],

      churchCreated: null,

      uploadData: {
        files: [],
      },

      redirect: false,

      loading: true,

      profiles: [],

      formActions,
    }
  },

  computed: {
    getMode() {
      return this.mode
    },

    getFormData() {
      return this.formData
    },

    getAdminMasterRule() {
      return this.$can(actions.VIEW, subjects.MEMBERSHIP_MODULE_CHURCH_ADMIN_MASTER)
    },
  },

  mounted() {
    if (this.getMode === this.formActions.updateAction) {
      this.getCitiesByUFSelect()
    }
  },

  methods: {
    async getAddressByZipCode() {
      if (this.getFormData.zip_code.length === 9) {
        this.loading = true

        await getAddressByZipCode(strClear(this.getFormData.zip_code))
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
            if (this.getMode === this.formActions.updateAction) {
              this.getCitiesByUFSelect()
            }
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

    async getCitiesByUFSelect() {
      this.loading = true

      if (this.getFormData.state) {
        await getCitiesByUf(this.getFormData.state.uf)
          .then(response => {
            if (response.status === 200) {
              this.cities = response.data
            }
          })
      } else {
        this.clearZipCodeAddress()
      }

      this.loading = false
    },

    async formSubmit(redirect) {
      this.redirect = redirect

      const result = new Promise((resolve, reject) => {
        this.$refs.formUser.validate()
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
        await this.core()
      }
    },

    async core() {
      if (this.getMode === this.formActions.insertAction) {
        await this.handleCreateChurch()
      }

      if (this.getMode === this.formActions.updateAction) {
        await this.handleUpdateChurch()
      }
    },

    async handleCreateChurch() {
      this.loading = true

      const formData = this.setFormData()

      await createChurch(formData)
        .then(response => {
          if (response.status === 200) {
            this.churchCreated = response.data

            this.clear()
            successMessage(messages.successSave)
          }
        })
        .catch(error => {
          this.handleError(error.response)
        })

      if (this.uploadData.files.length > 0 && this.churchCreated.id) {
        await this.handleUploadImage(this.churchCreated.id)
      }

      this.loading = false
    },

    async handleUpdateChurch() {
      this.loading = true

      const { id } = this.getFormData

      const formData = this.setFormData()

      await updateChurch(id, formData)
        .then(response => {
          if (response.status === 200) {
            this.clear()
            successMessage(messages.successSave)
          }
        })
        .catch(error => {
          this.handleError(error.response)
        })

      if (this.uploadData.files.length > 0) {
        await this.handleUploadImage(id)
      }

      this.loading = false
    },

    async handleUploadImage(churchId) {
      const formDataUpload = new FormData()

      formDataUpload.append('image', this.uploadData.files[0])
      formDataUpload.append('churchId', churchId)

      await saveChurchImage(formDataUpload)
        .then(() => {
          this.clearUploadData()
        })
        .catch(() => {
          warningMessage(messages.errorUploadImage)
        })
    },

    setFormData() {
      return {
        name: this.getFormData.name,
        email: this.getFormData.email,
        youtube: this.getFormData.youtube,
        facebook: this.getFormData.facebook,
        instagram: this.getFormData.instagram,
        active: this.getFormData.active.boolValue,
        phone: strClear(this.getFormData.phone),
        zipCode: strClear(this.getFormData.zip_code),
        address: this.getFormData.address,
        numberAddress: this.getFormData.number_address,
        complement: this.getFormData.complement,
        district: this.getFormData.district,
        cityId: this.getFormData.city.id,
        uf: this.getFormData.state.uf,
      }
    },

    handleError(response) {
      const errors = response.status === 400 || response.status === 404

      if (errors) {
        return warningMessage(response.data.error)
      }

      return warningMessage(messages.impossible)
    },

    cancel() {
      if (this.getMode === this.formActions.insertAction) {
        this.redirect = true
        this.clear()
      } else {
        this.$router.replace({
          name: membershipModuleRoutes.churches.name,
          params: {
            dispatchList: true,
          },
        })
      }
    },

    clear() {
      this.$emit('clear')
      this.$store.commit('membershipModuleStore/SET_CHOOSE_CHURCH', null)

      if (this.redirect) {
        this.$router.replace({
          name: membershipModuleRoutes.churches.name,
          params: {
            dispatchList: true,
          },
        })
      }
    },

    clearUploadData() {
      this.uploadData.files = []
      this.getFormData.image.path = ''
    },

    clearZipCodeAddress() {
      if (this.getMode === this.formActions.insertAction) {
        this.getFormData.zip_code = ''
        this.getFormData.address = ''
        this.getFormData.numberAddress = ''
        this.getFormData.complement = ''
        this.getFormData.district = ''
        this.getFormData.city = null
        this.getFormData.state = null
        this.cities = []
      } else {
        this.getFormData.zip_code = ''
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@media(max-width: 400px) {
  .button-custom-size {
    width: 100%;
    margin-bottom: 1rem;
  }
}
</style>
