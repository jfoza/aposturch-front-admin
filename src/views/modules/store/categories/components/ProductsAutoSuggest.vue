<template>
  <b-form-group
    :label="labelName"
    label-for="companiesAutoSuggest"
  >
    <vue-autosuggest
      ref="autocomplete"
      v-model="chooseProduct"
      :suggestions="suggestions"
      :input-props="inputProps"
      :render-suggestion="renderSuggestion"
      :get-suggestion-value="getSuggestionValue"
      variant="primary"
      @selected="handleSelect"
      @input="fetchResults"
      @change="checkChange"
    />
  </b-form-group>
</template>

<script>
import { VueAutosuggest } from 'vue-autosuggest'
import { BFormGroup } from 'bootstrap-vue'
import { getAllProducts } from '@core/utils/requests/products'

export default {
  components: {
    VueAutosuggest,
    BFormGroup,
  },

  data() {
    return {
      labelName: 'Nome do Produto',

      chooseProduct: null,
      results: [],
      timeout: null,
      selected: null,
      debounceMilliseconds: 300,
      usersUrl: 'https://jsonplaceholder.typicode.com/users',
      inputProps: {
        id: 'autosuggest__input',
        onInputChange: this.fetchResults,
        placeholder: '',
        class: 'form-control',
        name: 'nome',
      },
      suggestions: [],
      result: [],
    }
  },

  methods: {
    checkChange() {
      this.chooseProduct = null
    },
    handleSelect({ item }) {
      const { product_name, product_code } = item

      // eslint-disable-next-line camelcase
      this.chooseProduct = product_name

      this.$emit('setProductName', {
        productNameSuggest: product_name,
        productCodeSuggest: product_code,
      })
    },

    fetchResults(val) {
      clearTimeout(this.timeout)
      if (this.result.length === 0) {
        this.timeout = setTimeout(() => {
          const params = {
            perPage: 100,
            page: 1,
            name: this.chooseProduct,
          }

          getAllProducts(params)
            .then(response => {
              const { data } = response.data

              this.suggestions = []
              this.selected = null
              this.result = data

              const products = this.filterResults(
                this.result,
                val,
                'product_name',
              )
              products.length
                && this.suggestions.push({ data: products })
            })
        }, this.debounceMilliseconds)
      } else {
        this.suggestions = []
        this.selected = null

        const products = this.filterResults(this.result, val, 'product_name')
        products.length && this.suggestions.push({ data: products })
      }
    },

    filterResults(data, text, field) {
      return data
        .filter(item => {
          if (item[field].toLowerCase().indexOf(text.toLowerCase()) > -1) {
            return item[field]
          }
        })
        .sort()
    },

    renderSuggestion(suggestion) {
      return suggestion.item.product_name
    },

    getSuggestionValue(suggestion) {
      const { item } = suggestion
      return item.product_name
    },
  },
}
</script>

<style>
#autosuggest__input {
  outline: none;
  position: relative;
  display: block;
  padding: 10px;
  width: 100%;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
}

#autosuggest__input.autosuggest__input-open {
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

.autosuggest__results-container {
  position: relative;
  width: 100%;
}

.autosuggest__results {
  position: absolute;
  z-index: 100;
  width: 100%;
  border: 1px solid #e0e0e0;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  max-height: 200px;
  overflow-y: scroll;
  background: white;
}

.autosuggest__results ul {
  list-style: none;
  padding-left: 0;
}
.autosuggest__results li {
  padding-bottom: 7px;
  padding-top: 7px;
  padding-left: 15px;
}

.autosuggest__results {
  cursor: pointer;
}
.autosuggest__results-item:hover {
  background-color: rgba(39,114,192,0.2);;
  color: #2772C0;
}
</style>
