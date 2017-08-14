<template>
  <div>
    <form-wizard :title="$t('Book an appointment')" subtitle="" :nextButtonText="$t('Next')" :baclButtonText="$t('Back')" :finishButtonText="$t('Finish')">
      <tab-content :title="$t('Service')">
        Service tab content
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
import {FormWizard, TabContent} from 'vue-form-wizard'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'

export default {
  components: {
    FormWizard,
    TabContent
  }
}

</script>
