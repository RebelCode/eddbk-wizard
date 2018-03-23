<template>
  <div :class="{ 'session-loading': ui.sessionLoading }">
    <div class="edd-booking-wizard__info">
      {{ $_('You are booking a ') }} <strong>{{ selectedService.title }}</strong>
    </div>
    <div class="inline-form-control">
      <label>{{ $_('Select a date') }}</label>
      <calendar/>
    </div>
  </div>
</template>

<script>
// @flow
import Calendar from '../StepDate/Calendar.vue'
import { mapStore } from '@/utils/vuex'

export default {
  components: {
    Calendar
  },

  data () {
    return {
      ui: {
        sessionLoading: false
      }
    }
  },

  created () {
    this.$eventBus.$on('fetchingSessions:start', this.showLoader)
    this.$eventBus.$on('fetchingSessions:end', this.hideLoader)
  },

  computed: {
    ...mapStore('services', {
      'selectedService': 'selected'
    })
  },

  methods: {
    showLoader () {
      this.ui.sessionLoading = true
    },

    hideLoader () {
      this.ui.sessionLoading = false
    }
  }
}
</script>

<style>
  .session-loading {
    position: relative;
    filter: blur(3px);
  }
  .session-loading:after {
    content: '';
    position: absolute;
    display: block;
    width: 100%;
    height: 100%;
    top: 0;
    background: rgba(255, 255, 255, 0.75);
  }
</style>
