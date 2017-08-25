<template>
  <div>
    <label>{{ $_('Select a service') }}</label>
    <multiselect
      v-model="selectedService"
      :options="list"
      track-by="title"
      label="title"
      :searchable="false"
      :allow-empty="false"
      :show-labels="false"
      >
    </multiselect>

    <div v-if="selectedService" class="service__image">
      <img :src="selectedService.imageSrc" alt="">
    </div>

    <div v-if="selectedService" class="service__description">
      {{ selectedService.description }}
    </div>

    <div v-if="selectedService" class="service__pricePreview">
      {{ pricePreview }}
    </div>

    <div v-if="isOtherAvailable" class="service__pricePreview">
      {{ $_('Other appointment lengths available') }}
    </div>

    </div>
  </div>
</template>

<script>
// @flow

import Multiselect from 'vue-multiselect'
import _ from 'lodash'
import moment from 'moment'

export default {
  components: {
    Multiselect
  },

  props: {
    list: Array,
    value: Object
  },

  computed: {
    selectedService: {
      get () {
        return this.value
      },
      set (value: ?Object) {
        this.$emit('input', value)
      }
    },
    isOtherAvailable () {
      if (!this.selectedService) return false
      return Object.keys(this.selectedService.sessionLengthPrices).length > 1
    },
    minServiceLength () {
      const lengths = _.keys(this.selectedService.sessionLengthPrices).map(Number)
      const minLength = Math.min.apply(Math, lengths)
      return moment.duration(minLength, 'seconds').humanize()
    },
    minServicePrice () {
      const prices = _.map(this.selectedService.sessionLengthPrices).map(Number)
      const minPrice = Math.min.apply(Math, prices)
      return minPrice
    },
    pricePreview () {
      return this.$_('Price: %1$s per %2$s appointment', [
        this.minServicePrice,
        this.minServiceLength
      ])
    }
  }
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
