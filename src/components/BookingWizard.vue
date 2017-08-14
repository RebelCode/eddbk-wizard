<template>
  <div>
    <form-wizard title="Book an appointment" subtitle="">
      <tab-content title="Service">
        Service tab content
      </tab-content>
      <tab-content title="Date &amp; time">
          Date &amp; time tab content
       </tab-content>
       <tab-content title="Payment">
         Payment tab content
       </tab-content>
       <tab-content title="Confirmation">
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
