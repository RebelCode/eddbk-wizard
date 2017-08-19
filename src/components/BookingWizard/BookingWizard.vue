<template>
  <div>
    <form-wizard :title="$_('Book an appointment')" subtitle="" :nextButtonText="$_('Next')" :baclButtonText="$_('Back')" :finishButtonText="$_('Finish')">
      <tab-content :title="$_('Service')" :before-change="beforeServiceTabSwitch">
        <step-service/>
      </tab-content>
      <tab-content :title="$_('Date &amp; time')">
          Date &amp; time tab content
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
