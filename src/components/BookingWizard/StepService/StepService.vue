<template>
  <div>
    <div class="inline-form-control">
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
    </div>

    <div class="service">
      <div v-if="selectedService" class="service__image">
        <img :src="selectedService.imageSrc" alt="">
      </div>

      <div v-if="selectedService" class="service__description">
        {{ selectedService.description }}
      </div>
    </div>
  </div>
</template>

<script>
// @flow

import Multiselect from 'vue-multiselect'

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
    }
  }
}
</script>
