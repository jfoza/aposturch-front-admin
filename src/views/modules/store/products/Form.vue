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

          <!-- Categories -->
          <b-col
            sm="6"
            lg="3"
            class="mb-1"
          >
            <b-form-group
              label="Categorias"
              label-for="quantity"
            >
              <v-select
                id="regions"
                v-model="getFormData.categories"
                :options="categories"
                variant="custom"
                item-text="name"
                item-value="id"
                placeholder="Selecione uma ou mais"
                label="name"
                :disabled="categoriesLoading"
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
            md="12"
            lg="6"
            class="mb-1"
          >
            <b-alert
              v-model="imagesLinkLimitAlert"
              v-height-fade.appear
              variant="warning"
              dismissible
            >
              <div class="alert-body">
                São permitidos no máximo 3 links de imagem.
              </div>
            </b-alert>

            <div
              v-for="(item, key) in getFormData.imageLinks"
              :key="key"
              class="mb-2"
            >
              <small class="img-links-title">
                {{ `Imagem link ${key + 1}` }}
              </small>

              <div class="img-links-btn-inputs">
                <validation-provider
                  #default="{ errors }"
                  rules="url"
                  class="img-links-container-input"
                >
                  <b-form-input
                    id="link1"
                    v-model="item.path"
                    autocomplete="off"
                  />

                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>

                <div class="img-links-btn-plus">
                  <button-rounded-circle
                    v-if="key === getFormData.imageLinks.length - 1"
                    button-size="22"
                    feather-icon="PlusIcon"
                    @action="handlePushImageLink"
                  />

                  <button-icon
                    v-else
                    color="#0B132B"
                    size="18"
                    feather-icon="Trash2Icon"
                    @action="handleRemoveImageLink(key)"
                  />
                </div>
              </div>
            </div>
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
  BAlert,
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
import { getAllCategories } from '@core/utils/requests/categories'
import { getArrayAttr } from '@core/utils/utils'
import ButtonRoundedCircle from '@/views/components/custom/ButtonRoundedCircle.vue'
import ButtonIcon from '@/views/components/custom/ButtonIcon.vue'
import { heightFade } from '@core/directives/animations'

export default {
  components: {
    ButtonIcon,
    ButtonRoundedCircle,
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
    BAlert,
    Money,
  },

  directives: {
    'b-tooltip': VBTooltip,
    'height-fade': heightFade,
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
      categories: [],

      productBalance: '',

      quantityBalanceError: '',

      imagesLinkLimitAlert: false,

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
      categoriesLoading: false,

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
      let categoriesId = []

      if (this.getFormData.categories.length > 0) {
        categoriesId = getArrayAttr(this.getFormData.categories, 'id')
      }

      let imageLinks = this.getFormData.imageLinks.length > 0
        ? getArrayAttr(this.getFormData.imageLinks, 'path')
        : []

      imageLinks = imageLinks.filter(i => i.trim())

      const formData = {
        productName: this.getFormData.productName,
        productDescription: this.getFormData.productDescription,
        productCode: this.getFormData.productCode,
        value: this.getFormData.productValue,
        quantity: parseInt(this.getFormData.productQuantity, 10),
        highlightProduct: this.getFormData.highlightProduct,
        imageLinks,
        categoriesId,
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

      await getAllCategories()
        .then(response => {
          if (response.status === 200) {
            this.categories = response.data
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
      }
      this.quantityBalanceError = ''

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

    handlePushImageLink() {
      if (this.getFormData.imageLinks.length >= 3) {
        this.imagesLinkLimitAlert = true

        return
      }

      this.$store.commit('storeModuleProducts/handlePushImageLink')
    },

    handleRemoveImageLink(item) {
      this.$store.commit('storeModuleProducts/handleRemoveImageLink', item)
    },
  },
}
</script>

<style lang="scss" scoped>
.image-links-title {

}

.img-links-container-input {
  width: calc(100% - 22px);
}

.img-links-btn-inputs {
  display: flex;
}

.img-links-btn-plus {
  width: 30px;
  display: flex;
  justify-content: end;
  align-items: center
}

@media(max-width: 400px) {
  .button-custom-size {
    width: 100%;
    margin-bottom: 1rem;
  }
}
</style>
