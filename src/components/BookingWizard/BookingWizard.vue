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
      <tab-content :title="$_('Date &amp; time')" :before-change="beforeSessionTabSwitch">
        <step-sessions v-if="selectedService" />
      </tab-content>
      <tab-content :title="$_('Payment')">
        Payment tab content
      </tab-content>
      <tab-content :title="$_('Confirmation')">
        Confirmation tab content
      </tab-content>

      <template slot="footer" scope="props">
        <div class="wizard-footer-left" v-if="selectedService && props.activeTabIndex === 0">
          <div>{{ serviceInfo.pricePreview }}</div>
          <div style="opacity: .6" v-if="serviceInfo.isOtherSessionsAvailable">
            {{ $_('Other options available in the next step') }}
          </div>
        </div>

        <div class="wizard-footer-clear" v-if="selectedSession && props.activeTabIndex === 1">
          {{ sessionInfo }} {{ $_('Click Next to start the payment process.') }}
        </div>

        <div class="wizard-footer-right">
          <wizard-button v-if="props.activeTabIndex > 0 && !props.isLastStep"
                         @click.native="props.prevTab()"
                         class="wizard-footer-back"
                         :style="props.fillButtonStyle">
            {{ $_('Back') }}
          </wizard-button>

          <wizard-button @click.native="props.isLastStep ? alert('Done') : props.nextTab()"
                         :class="['wizard-footer-right', props.isLastStep ? 'finish-button' : '']"
                         :style="props.fillButtonStyle"
          >{{props.isLastStep ? $_('Done') : $_('Next')}}</wizard-button>
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
import StepSessions from './StepSessions/StepSessions.vue'
import { mapState, mapGetters } from 'vuex'

export default {
  components: {
    FormWizard,
    TabContent,
    WizardButton,
    StepService,
    StepSessions
  },

  created () {
    this.$sm.dispatch('services/fetch')
  },

  computed: {
    ...mapGetters('services', [
      'serviceInfo'
    ]),
    ...mapState('calendar', [
      'selectedSession'
    ]),
    ...mapGetters('calendar', [
      'sessionInfo'
    ]),
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
