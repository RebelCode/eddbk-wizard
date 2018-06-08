<template>
  <div>
    <div class="inline-form-control">
      <label>{{ $_('Select a service') }} <span class="eddbk-loading-inline" v-if="isServicesLoading" style="margin-left: 3px"></span></label>
      <select v-model="selectedService" class="eddb-control" :disabled="isServicesLoading ? 'disabled' : false">
        <option :value="null" disabled selected>{{ $_('Select option') }}</option>
        <option :value="item" v-for="item in list">{{ item.name }}</option>
      </select>
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

export default {
  data () {
    return {
      /**
       * @var {boolean} isServicesLoading Is services are loading
       */
      isServicesLoading: false
    }
  },

  props: {
    list: Array,
    value: Object
  },

  created () {
    this.$eventBus.$on('fetchingServices:start', this.showLoader)
    this.$eventBus.$on('fetchingServices:end', this.hideLoader)
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
  },

  methods: {
    /**
     * Show services loading indicator.
     *
     * @since [*next-version*]
     */
    showLoader () {
      this.isServicesLoading = true
    },

    /**
     * Hide services loading indicator.
     *
     * @since [*next-version*]
     */
    hideLoader () {
      this.isServicesLoading = false
    }
  }
}
</script>
