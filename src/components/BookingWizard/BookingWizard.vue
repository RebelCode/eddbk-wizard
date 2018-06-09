<template>
  <div class="edd-booking-wizard">
    <form-wizard :title="$_('Book an Appointment')"
                 v-bind="$attrs"
                 subtitle=""
                 :nextButtonText="$_('Next')"
                 :backButtonText="$_('Back')"
                 :finishButtonText="$_('Finish')"
                 v-if="!isThankYouVisible"
                 ref="bookingWizard"

    >
      <tab-content :title="$_('Service')" :before-change="beforeServiceTabSwitch">
        <step-service v-model="selectedService" :list="servicesList" v-if="!preselectedServiceFound || !isServicePreselected"/>
        <div class="div" v-else>
          {{ $_('Loading service information...') }}
        </div>
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
            {{ $_('More appointment durations available in the next step.') }}
          </div>
        </div>

        <div class="wizard-footer-clear" v-if="selectedSession && props.activeTabIndex === 2">
          {{ sessionInfo }}
          <!--{{ $_('Click Add to cart to continue.') }}-->
        </div>

        <div class="wizard-footer-clear" style="color: red" v-if="errorMessage">
          {{ errorMessage }}
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
                         :disabled="isBookingCreating ? 'disabled' : false"
          >{{props.isLastStep ? $_('Book Now') : $_('Next')}}</wizard-button>
        </div>
      </template>
    </form-wizard>
    <thank-you-page @book-new-session="hideThankYouPage" v-else />
  </div>
</template>

<script>
// @flow
import _ from 'lodash'
import { FormWizard, TabContent, WizardButton } from 'vue-form-wizard'

import StepService from './StepService/StepService.vue'
import StepDate from './StepDate/StepDate.vue'
import StepSessions from './StepSessions/StepSessions.vue'
import ThankYouPage from './ThankYouPage/ThankYouPage.vue'

import { mapStore } from '@/utils/vuex'
import moment from '@/utils/moment'
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      /**
       * @property {boolean} UI indicator that telling that booking is creating.
       */
      isBookingCreating: false,

      /**
       * @property {boolean} UI indicator that telling that thank you page is visible.
       */
      isThankYouVisible: false,

      /**
       * @property {boolean} Is preselected service found.
       */
      preselectedServiceFound: true,

      /**
       * @property {string} errorMessage Error message if booking is not created.
       */
      errorMessage: null
    }
  },
  components: {
    FormWizard,
    TabContent,
    WizardButton,
    ThankYouPage,

    StepService,
    StepDate,
    StepSessions
  },

  mounted () {
    this.fetchServices().then(this.tryToSelectPredefinedService)
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
    ]),
    /**
     * @since [*next-version*]
     *
     * @param {string} redirectUrl URL for redirection after booking is created.
     */
    redirectUrl () {
      return this.$config.redirectUrl
    },
    /**
     * @since [*next-version*]
     *
     * @param {boolean} isServicePreselected Is service preselected in config.
     */
    isServicePreselected () {
      return !!this.$config.service
    }
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
    /**
     * Create booking using selected session.
     */
    createBooking () {
      this.isBookingCreating = true
      const timezone = this._getTimezone()
      this.bookSession({ bookingSession: this.selectedSession, timezone }).then(() => {
        this.isBookingCreating = false
        this.handleBookSuccess()
      }, this.handleBookError)
    },
    /**
     * Handler for case when booking was successfully created.
     *
     * @since [*next-version*]
     */
    handleBookSuccess () {
      if (this.redirectUrl) {
        this.redirectTo(this.redirectUrl)
        return
      }
      this.showThankYouPage()
    },
    /**
     * Handler for case when booking was not created.
     *
     * @since [*next-version*]
     */
    handleBookError (error) {
      this.isBookingCreating = false
      const responseDate = error.response.data
      this.errorMessage = responseDate.data.errors[0] || responseDate.message
    },
    /**
     * Redirect browser to given URL.
     *
     * @since [*next-version*]
     *
     * @param {string} redirectUrl URL on which browser should be redirected.
     */
    redirectTo (redirectUrl) {
      window.location.replace(redirectUrl)
    },
    /**
     * Show thank you page, after successful creation of booking
     */
    showThankYouPage () {
      this.isThankYouVisible = true
    },
    /**
     * Hide thank you page
     */
    hideThankYouPage () {
      this.isThankYouVisible = false
    },
    /**
     * Detect browser timezone.
     *
     * @since [*next-version*]
     *
     * @return {string} Detected browser timezone.
     */
    _getTimezone () {
      const fallbackTimezone = 'UTC+0'
      return moment.tz.guess() || fallbackTimezone
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
    },

    /**
     * If wizard is created with service ID, it will select service automatically.
     *
     * @since [*next-version*]
     */
    tryToSelectPredefinedService () {
      if (!this.$config.service) {
        return
      }
      const preselectedService = this.servicesList.find((service) => {
        return parseInt(service.id) === parseInt(this.$config.service)
      })
      if (!preselectedService) {
        this.preselectedServiceFound = false
        return
      }
      this.selectedService = preselectedService
      this.$nextTick(() => {
        this.$refs.bookingWizard.nextTab()
      })
    }
  }
}

</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
