<template>
  <div>
    <form-wizard :title="$_('Book an appointment')" subtitle="" :nextButtonText="$_('Next')" :baclButtonText="$_('Back')" :finishButtonText="$_('Finish')">
      <tab-content :title="$_('Service')" :before-change="beforeServiceTabSwitch">
        <step-service v-model="selectedService" :list="servicesList" />
      </tab-content>
      <tab-content :title="$_('Date &amp; time')" :before-change="beforeSessionTabSwitch">
        <step-sessions v-if="selectedService" />
      </tab-content>
      <tab-content :title="$_('Payment')">
        Payment tab content
      </tab-content>
      <tab-content :title="$_('Confirmation')">
        Confirmation tab content
      </tab-content>
    </form-wizard>
  </div>
</template>

<script>
// @flow
import _ from 'lodash'
import { FormWizard, TabContent } from 'vue-form-wizard'
import StepService from './StepService/StepService.vue'
import StepSessions from './StepSessions/StepSessions.vue'

export default {
  components: {
    FormWizard,
    TabContent,
    StepService,
    StepSessions
  },

  created () {
    this.$sm.dispatch('services/fetch')
  },

  computed: {
    servicesList () {
      return this.$sm.get('services.list')
    },
    selectedService: {
      get () {
        return this.$sm.get('services.selected')
      },
      set (value: Object) {
        this.$sm.set('services.selected', value)
      }
    },
    selectedSession () { return this.$sm.get('calendar.selectedSession') }
  },

  methods: {
    beforeServiceTabSwitch () {
      if (this.selectedService) {
        this.$sm.dispatch('calendar/loadSessionsByMonth', {}).then(result => {
          const firstSession = _.first(result)
          const firstSessionTime = _.get(firstSession, 'start')
          if (firstSessionTime) this.$sm.dispatch('calendar/resetSessionsForNewService', { firstSessionTime })
        })
      }
      return !!this.selectedService
    },

    beforeSessionTabSwitch () {
      return !!this.selectedSession
    }
  }
}

</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
