<template>
  <div class="edd-booking-wizard">
    <form-wizard :title="$_('Book an Appointment')"
                 v-bind="$attrs"
                 subtitle=""
                 :nextButtonText="$_('Next')"
                 :backButtonText="$_('Back')"
                 :finishButtonText="$_('Finish')"

    >
      <tab-content :title="$_('Service')" :before-change="beforeServiceTabSwitch">
        <step-service v-model="selectedService" :list="servicesList" />
      </tab-content>
      <tab-content :title="$_('Date')" :before-change="beforeDateTabSwitch">
        <step-date v-if="selectedService" />
      </tab-content>
      <tab-content :title="$_('Available Time')" :before-change="beforeSessionTabSwitch">
        <step-sessions v-if="activeDate.day" />
      </tab-content>

      <template slot="footer" scope="props">
        <div class="wizard-footer-left" v-if="selectedService && props.activeTabIndex === 0">
          <div>{{ serviceInfo.pricePreview }}</div>
          <div style="opacity: .6" v-if="serviceInfo.isOtherSessionsAvailable">
            {{ $_('Other options available in the next step') }}
          </div>
        </div>

        <div class="wizard-footer-clear" v-if="selectedSession && props.activeTabIndex === 2">
          {{ sessionInfo }}
          <!--{{ $_('Click Add to cart to continue.') }}-->
        </div>

        <div class="wizard-footer-right">
          <!--&& !props.isLastStep-->
          <wizard-button v-if="props.activeTabIndex > 0"
                         @click.native="props.prevTab()"
                         class="wizard-footer-back"
                         :style="props.fillButtonStyle">
            {{ $_('Back') }}
          </wizard-button>

          <wizard-button @click.native="props.isLastStep ? createBooking() : props.nextTab()"
                         :class="['wizard-footer-right', props.isLastStep ? 'finish-button' : '']"
                         :style="props.fillButtonStyle"
          >{{props.isLastStep ? $_('Add to cart') : $_('Next')}}</wizard-button>
        </div>
      </template>
    </form-wizard>
  </div>
</template>

<script>
// @flow
import _ from 'lodash'
import { FormWizard, TabContent, WizardButton } from 'vue-form-wizard'

import StepService from './StepService/StepService.vue'
import StepDate from './StepDate/StepDate.vue'
import StepSessions from './StepSessions/StepSessions.vue'

import { mapStore } from '@/utils/vuex'
import { mapActions } from 'vuex'

export default {
  components: {
    FormWizard,
    TabContent,
    WizardButton,

    StepService,
    StepDate,
    StepSessions
  },

  created () {
    this.fetchServices()
  },

  computed: {
    ...mapStore('services', {
      'selectedService': 'selected',
      'serviceInfo': 'serviceInfo',
      'servicesList': 'list'
    }),
    ...mapStore('calendar', [
      'selectedSession',
      'activeDate',
      'sessionInfo'
    ])
  },

  methods: {
    ...mapActions('calendar', [
      'loadSessionsByMonth',
      'resetSessionsForNewService'
    ]),
    ...mapActions('services', {
      'fetchServices': 'fetch'
    }),
    ...mapActions('sessions', [
      'bookSession'
    ]),
    createBooking () {
      this.bookSession({ bookingSession: this.selectedSession })
    },
    beforeServiceTabSwitch () {
      if (this.selectedService) {
        this.loadSessionsByMonth({}).then(result => {
          const firstSession = _.first(result)
          const firstSessionTime = _.get(firstSession, 'start')
          if (firstSessionTime) this.resetSessionsForNewService({ firstSessionTime })
        })
      }
      return !!this.selectedService
    },

    beforeDateTabSwitch () {
      return !!this.activeDate.day
    },

    beforeSessionTabSwitch () {
      return !!this.selectedSession
    }
  }
}

</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
