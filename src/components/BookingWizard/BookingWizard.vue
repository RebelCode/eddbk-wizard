<template>
  <div>
    <form-wizard :title="$_('Book an appointment')" subtitle="" :nextButtonText="$_('Next')" :baclButtonText="$_('Back')" :finishButtonText="$_('Finish')">
      <tab-content :title="$_('Service')" :before-change="beforeServiceTabSwitch">
        <step-service v-model="selectedService" :list="servicesList" />
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
// @flow

import { mapGetters, mapActions } from 'vuex'
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

  created () {
    this.fetchServices()
  },

  computed: {
    ...mapGetters({
      servicesList: 'services/list'
    }),
    selectedService: {
      get () {
        return this.$store.getters['services/selected']
      },
      set (value) {
        this.$store.commit('services/setSelected', { service: value })
      }
    }
  },

  methods: {
    ...mapActions({
      fetchServices: 'services/fetch'
    }),
    beforeServiceTabSwitch () {
      return this.selectedService !== null
    }
  }
}

</script>
