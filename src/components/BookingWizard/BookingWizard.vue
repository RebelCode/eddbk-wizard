<template>
  <div>
    <form-wizard :title="$t('Book an appointment')" subtitle="" :nextButtonText="$t('Next')" :baclButtonText="$t('Back')" :finishButtonText="$t('Finish')">
      <tab-content :title="$t('Service')" :before-change="beforeServiceTabSwitch">
        <step-service/>
      </tab-content>
      <tab-content :title="$t('Date &amp; time')">
          Date &amp; time tab content
       </tab-content>
       <tab-content :title="$t('Payment')">
         Payment tab content
       </tab-content>
       <tab-content :title="$t('Confirmation')">
         Confirmation tab content
       </tab-content>
    </form-wizard>
  </div>
</template>

<script>
import { FormWizard, TabContent } from 'vue-form-wizard'
import StepService from './StepService.vue'

export default {
  components: {
    FormWizard,
    TabContent,
    StepService
  },

  data () {
    return {
    }
  },

  methods: {
    beforeServiceTabSwitch () {
      return true
    }
  }
}

</script>

