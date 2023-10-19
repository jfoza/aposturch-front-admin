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
                  autocomplete="off"
                />

                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>

          <b-col
            sm="6"
            lg="4"
          >
            <b-form-group
              label="Descrição"
              label-for="description"
            >
              <b-form-input
                id="name"
                v-model="getFormData.description"
                autocomplete="off"
              />
            </b-form-group>
          </b-col>

          <b-col
            sm="6"
            lg="4"
          >
            <b-form-group
              label="Categoria"
              label-for="category"
            >
              <validation-provider
                #default="{ errors }"
                name="Categoria"
                rules="required"
              >
                <v-select
                  id="category"
                  v-model="getFormData.category"
                  :options="categories"
                  variant="custom"
                  item-text="name"
                  item-value="id"
                  placeholder="Selecione uma categoria"
                  label="name"
                />

                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>
        </b-row>
      </b-form>
    </validation-observer>

    <products-table
      ref="productsTableRef"
      class-name="mt-4"
      :mode="getMode"
      @setProducts="setProducts"
    />

    <b-row>
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
          Salvar categoria
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
          Salvar e cadastrar nova
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
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import {
  required,
} from '@validations'
import { statusForm } from '@core/utils/statusForm'
import { successMessage, warningMessage } from '@/libs/alerts/sweetalerts'
import { formActions } from '@core/utils/formActions'
import { messages } from '@core/utils/validations/messages'
import { getAllCategories } from '@core/utils/requests/categories'
import Overlay from '@/views/components/custom/Overlay.vue'
import ProductsTable from '@/views/modules/store/subcategories/components/ProductsTable.vue'
import vSelect from 'vue-select'
import { createSubcategory, updateSubcategory } from '@core/utils/requests/subcategories'
import { getArrayAttr } from '@core/utils/utils'

export default {
  components: {
    vSelect,
    Overlay,
    ProductsTable,
    ValidationProvider,
    ValidationObserver,
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
  },

  data() {
    return {
      required,
      statusForm,
      titlePage: '',

      redirect: false,

      loading: false,

      categories: [],

      formActions,
    }
  },

  computed: {
    getMode() {
      return this.mode
    },

    getFormData() {
      return this.$store.getters['storeModuleSubcategories/getSubcategoriesForm']
    },

    getStoreModuleRoutes() {
      return this.$store.getters['routes/getStoreModuleRoutes']
    },

    getFormItems() {
      return {
        name: this.getFormData.name,
        description: this.getFormData.description,
        categoryId: this.getFormData.category ? this.getFormData.category.id : null,
        productsId: this.getFormData.products.length > 0 ? getArrayAttr(this.getFormData.products, 'id') : null,
      }
    },
  },

  mounted() {
    this.handleGetCategories()
  },

  methods: {
    async handleGetCategories() {
      this.loading = true

      await getAllCategories()
        .then(response => {
          if (response.status === 200) {
            this.categories = response.data
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

      const formData = this.getFormItems

      await createSubcategory(formData)
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

      const formData = this.getFormItems

      await updateSubcategory(id, formData)
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

    setProducts(products) {
      this.getFormData.products = products
    },

    handleError(response) {
      const errors = response.status === 400 || response.status === 404

      if (errors) {
        return warningMessage(response.data.error)
      }

      return warningMessage(messages.impossible)
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
          name: this.getStoreModuleRoutes.subcategories.name,
          params: {
            dispatchList: true,
          },
        })
      }
    },

    clear() {
      this.$store.commit('storeModuleSubcategories/clearSubcategoriesForm')

      if (this.redirect) {
        this.$router.replace({
          name: this.getStoreModuleRoutes.subcategories.name,
          params: {
            dispatchList: true,
          },
        })
      }

      this.$refs.productsTableRef.clear()

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
