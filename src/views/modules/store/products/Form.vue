<template>
  <overlay
    :show="loading"
    class-name="card p-card-form"
  >
    <validation-observer
      ref="formItems"
    >
      <b-form>
        <b-row>
          <!-- Name -->
          <b-col
            md="12"
            lg="6"
            class="mb-1"
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
                  v-model="getFormData.productName"
                  autocomplete="off"
                />

                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>
        </b-row>

        <b-row>
          <!-- Code -->
          <b-col
            sm="6"
            lg="3"
          >
            <b-form-group
              label="Código"
              label-for="productCode"
            >
              <validation-provider
                #default="{ errors }"
                name="Código"
                rules="required"
              >
                <b-input-group>
                  <cleave
                    id="productCode"
                    v-model="getFormData.productCode"
                    autocomplete="off"
                    placeholder="AA000000"
                    class="form-control text-uppercase"
                    :raw="false"
                    :options="inputOptions.productCode"
                  />
                  <b-input-group-append>
                    <button
                      type="button"
                      class="btn btn-outline-form"
                      @click="handleGenerateProductUniqueCode"
                    >
                      <feather-icon
                        icon="RepeatIcon"
                      />
                    </button>
                  </b-input-group-append>
                </b-input-group>

                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>

          <!-- Value -->
          <b-col
            sm="6"
            lg="3"
          >
            <b-form-group
              label="Valor do produto"
              label-for="productValue"
            >
              <validation-provider
                #default="{ errors }"
                name="Valor do produto"
                rules="required"
              >
                <money
                  ref="vMoney"
                  v-model="getFormData.productValue"
                  v-bind="money"
                  class="form-control"
                />

                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>

          <!-- Quantity -->
          <b-col
            sm="6"
            lg="3"
          >
            <b-form-group
              label="Quantidade"
              label-for="quantity"
            >
              <validation-provider
                #default="{ errors }"
                name="Quantidade"
                rules="required"
              >
                <cleave
                  id="quantity"
                  v-model="getFormData.productQuantity"
                  autocomplete="off"
                  class="form-control"
                  :raw="false"
                  :options="inputOptions.productQuantityBalance"
                />

                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>

          <!-- Balance -->
          <b-col
            v-if="getMode === 'update'"
            sm="6"
            lg="3"
          >
            <b-form-group
              label="Saldo"
              label-for="balance"
            >
              <validation-provider
                #default="{ errors }"
                name="Saldo"
                rules="required"
              >
                <cleave
                  id="balance"
                  v-model="getFormData.productBalance"
                  autocomplete="off"
                  class="form-control"
                  :raw="false"
                  :options="inputOptions.productQuantityBalance"
                />

                <small class="text-danger">{{ getBalanceValidator ? getBalanceValidator : errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>

          <!-- Subcategories -->
          <b-col
            sm="6"
            lg="3"
            class="mb-1"
          >
            <b-form-group
              label="Subcategorias"
              label-for="quantity"
            >
              <v-select
                id="regions"
                v-model="getFormData.subcategories"
                :options="subcategories"
                variant="custom"
                item-text="name"
                item-value="id"
                placeholder="Selecione uma ou mais"
                label="name"
                :disabled="subcategoriesLoading"
                :multiple="true"
              >
                <template
                  v-slot:no-options
                >
                  Nenhum registro encontrado.
                </template>
              </v-select>
            </b-form-group>
          </b-col>

          <!-- Description -->
          <b-col
            sm="12"
            md="6"
            class="mb-1"
          >
            <b-form-group
              label="Descrição do produto"
              label-for="productDescription"
            >
              <b-form-textarea v-model="getFormData.productDescription" />
            </b-form-group>
          </b-col>

          <!-- Highlight -->
          <b-col
            sm="6"
            lg="3"
            class="mb-1"
          >
            <b-form-group>
              <template v-slot:label>
                <span
                  class="template-label"
                >
                  Em destaque
                </span>
                <feather-icon
                  v-b-tooltip.hover.top="'Produtos exibidos em uma área de destaque na visualização pública.'"
                  icon="InfoIcon"
                  class="mr-50 my-icon"
                />
              </template>

              <validation-provider
                #default="{ errors }"
                name="Em destaque"
                rules="required"
              >
                <b-form-checkbox
                  v-model="getFormData.highlightProduct"
                  class="custom-control-success"
                  name="check-button"
                  switch
                >
                  <span class="switch-icon-left">
                    <feather-icon icon="CheckIcon" />
                  </span>
                  <span class="switch-icon-right" />
                </b-form-checkbox>

                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>

        </b-row>

        <b-row>
          <b-col
            cols="12"
            class="mt-3"
          >
            <button
              type="button"
              class="btn button-form button-custom-size mr-2 mb-1"
              @click="formSubmit(true)"
            >
              <feather-icon
                icon="CheckIcon"
              />
              Salvar produto
            </button>

            <button
              v-if="getMode === formActions.insertAction"
              type="button"
              class="btn button-form button-custom-size mr-2 mb-1"
              @click="formSubmit(false)"
            >
              <feather-icon
                icon="CheckIcon"
              />
              Salvar e cadastrar novo
            </button>

            <button
              type="button"
              class="btn btn-outline-danger button-custom-size mb-1"
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
  BInputGroup,
  BInputGroupAppend,
  BFormCheckbox,
  BFormTextarea,
  VBTooltip,
} from 'bootstrap-vue'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import { Money } from 'v-money'
import {
  required,
} from '@validations'
import { statusForm } from '@core/utils/statusForm'
import { successMessage, warningInfoMessage, warningMessage } from '@/libs/alerts/sweetalerts'
import { formActions } from '@core/utils/formActions'
import { messages } from '@core/utils/validations/messages'
import Overlay from '@/views/components/custom/Overlay.vue'
import vSelect from 'vue-select'
import Cleave from 'vue-cleave-component'
import { createProduct, updateProduct } from '@core/utils/requests/products'
import { generateUniqueCode, getAllPrefixes } from '@core/utils/requests/prefixes'
import { getAllSubcategories } from '@core/utils/requests/subcategories'
import { getArrayAttr } from '@core/utils/utils'

export default {
  components: {
    vSelect,
    Overlay,
    Cleave,
    ValidationProvider,
    ValidationObserver,
    BRow,
    BCol,
    BForm,
    BFormGroup,
    BFormInput,
    BInputGroup,
    BInputGroupAppend,
    BFormCheckbox,
    BFormTextarea,
    Money,
  },

  directives: {
    'b-tooltip': VBTooltip,
  },

  props: {
    mode: {
      type: String,
      default: 'insert',
    },
  },

  data() {
    return {
      required,
      statusForm,
      titlePage: '',

      money: {
        decimal: ',',
        thousands: '.',
        prefix: 'R$ ',
        suffix: '',
        precision: 2,
        masked: false,
      },

      prefixes: [],
      subcategories: [],

      productBalance: '',

      quantityBalanceError: '',

      inputOptions: {
        productCode: {
          prefix: '',
          blocks: [15],
          uppercase: true,
        },

        productQuantityBalance: {
          numericOnly: true,
          blocks: [10],
        },
      },

      redirect: false,

      loading: false,
      subcategoriesLoading: false,

      formActions,
    }
  },

  computed: {
    getMode() {
      return this.mode
    },

    getFormData() {
      return this.$store.getters['storeModuleProducts/getProductsForm']
    },

    getFormDataPrefix() {
      return this.getFormData.prefix
    },

    getFormDataQuantity() {
      return this.getFormData.productQuantity
    },

    getFormDataBalance() {
      return this.getFormData.productBalance
    },

    getStoreModuleRoutes() {
      return this.$store.getters['routes/getStoreModuleRoutes']
    },

    getBalanceValidator() {
      if (parseInt(this.getFormDataBalance, 10) > parseInt(this.getFormDataQuantity, 10)) {
        return 'O saldo não pode ser maior que a quantidade'
      }

      return ''
    },

    generateFormData() {
      let subcategoriesId = []

      if (this.getFormData.subcategories.length > 0) {
        subcategoriesId = getArrayAttr(this.getFormData.subcategories, 'id')
      }

      const formData = {
        productName: this.getFormData.productName,
        productDescription: this.getFormData.productDescription,
        productCode: this.getFormData.productCode,
        value: this.getFormData.productValue,
        quantity: parseInt(this.getFormData.productQuantity, 10),
        highlightProduct: this.getFormData.highlightProduct,
        subcategoriesId,
      }

      if (this.getMode === 'update') {
        formData.balance = parseInt(this.getFormData.productBalance, 10)
      }

      return formData
    },
  },

  watch: {
    getFormDataPrefix(value) {
      if (!value) {
        this.getFormData.productCode = ''
        this.formReset()
      }
    },
  },

  mounted() {
    this.$refs.vMoney.formattedValue = ''

    this.index()

    this.formReset()
  },

  methods: {
    async index() {
      this.loading = true

      await getAllPrefixes()
        .then(response => {
          if (response.status === 200) {
            this.prefixes = response.data
          }
        })

      await getAllSubcategories()
        .then(response => {
          if (response.status === 200) {
            this.subcategories = response.data
          }
        })

      this.loading = false
    },

    async handleGenerateProductUniqueCode() {
      this.loading = true

      await generateUniqueCode({ uniqueCodeType: 'products' })
        .then(response => {
          if (response.status === 200) {
            this.getFormData.productCode = response.data.code
          }
        })

      this.loading = false
    },

    async formSubmit(redirect) {
      this.redirect = redirect

      const result = new Promise((resolve, reject) => {
        this.$refs.formItems.validate()
          .then(success => {
            if (success) {
              resolve(true)
            }
          })
          .catch(() => {
            reject()
          })
      })

      const balanceValidator = parseInt(this.getFormDataBalance, 10) <= parseInt(this.getFormDataQuantity, 10)

      if (!balanceValidator && this.getMode === 'update') {
        this.quantityBalanceError = 'O saldo não pode ser maior que a quantidade'

        return
      } else {
        this.quantityBalanceError = ''
      }

      if (await result) {
        await this.core()
      }
    },

    async core() {
      if (this.getMode === this.formActions.insertAction) {
        await this.handleInsert()
      }

      if (this.getMode === this.formActions.updateAction) {
        await this.handleUpdate()
      }
    },

    async handleInsert() {
      this.setLoading(true)

      const formData = this.generateFormData

      await createProduct(formData)
        .then(response => {
          if (response.status === 201) {
            this.clear()
            successMessage(messages.successSave)
          }
        })
        .catch(error => {
          this.handleError(error.response)
        })

      this.setLoading(false)
    },

    async handleUpdate() {
      this.setLoading(true)

      const { id } = this.getFormData

      const formData = this.generateFormData

      await updateProduct(id, formData)
        .then(response => {
          if (response.status === 200) {
            this.clear()
            successMessage(messages.successSave)
          }
        })
        .catch(error => {
          this.handleError(error.response)
        })

      this.setLoading(false)
    },

    handleError(response) {
      const errors = response.status === 400 || response.status === 404

      if (errors) {
        warningInfoMessage(
          response.data.error,
          'Confira os dados e depois salve o registro.',
          'Entendido',
        )
      } else {
        warningMessage(messages.impossible)
      }
    },

    setLoading(loading) {
      this.loading = loading
    },

    cancel() {
      if (this.getMode === this.formActions.insertAction) {
        this.redirect = true
        this.clear()
      } else {
        this.$router.replace({
          name: this.getStoreModuleRoutes.products.name,
          params: {
            dispatchList: true,
          },
        })
      }
    },

    clear() {
      this.$store.commit('storeModuleProducts/clearProductsForm')
      this.$store.commit('storeModuleProducts/clearChooseProduct')

      if (this.redirect) {
        this.$router.replace({
          name: this.getStoreModuleRoutes.products.name,
          params: {
            dispatchList: true,
          },
        })
      }
    },

    formReset() {
      this.$refs.formItems.reset()
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
