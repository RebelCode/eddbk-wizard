<template>
  <div id="app">
    <BookingWizard/>
  </div>
</template>

<script>
// @flow

import BookingWizard from './components/BookingWizard/BookingWizard.vue'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'

export default {
  name: 'app',
  components: {
    BookingWizard
  },
  created () {
    window.$vm = this // debug
  }
}

</script>
