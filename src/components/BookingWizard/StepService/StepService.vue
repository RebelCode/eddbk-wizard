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
</template>

<script>
// @flow

import Multiselect from 'vue-multiselect'
import _ from 'lodash'
import moment from '@/utils/moment'

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
        this.$eventBus.$emit('service:changed', value)
        this.$emit('input', value)
      }
    },
    isOtherAvailable () {
      if (!this.selectedService) return false
      return Object.keys(this.selectedService.sessionLengths).length > 1
    },
    minServiceSession () {
      if (!this.selectedService) return null
      const sessionLengths = this.selectedService.sessionLengths
      const prices = _.map(sessionLengths, s => s.price.amount).map(Number)
      const minPrice = _.min(prices)
      return _.find(sessionLengths, s => s.price.amount === minPrice)
    },
    pricePreview () {
      if (!this.selectedService) return null
      const minSessionPrice = this.minServiceSession.price.formatted
      const minSessionLength = this.minServiceSession.length
      const minSessionLengthHumanized = moment.duration(minSessionLength, 'seconds').humanize()
      return this.$_('Price: %1$s per %2$s appointment', [
        minSessionPrice,
        minSessionLengthHumanized
      ])
    }
  }
}
</script>
