<template>
  <div>
    <BookingWizard color="#17a7dd" step-size="sm"/>
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
  }
}
</script>

<style lang="scss">
  $color: #17a7dd;
  .edd-booking-wizard {
    .wizard-icon-circle.checked {
      background-color: $color;
    }
    .session__item.selected {
      background-color: $color;
    }
    .vdp-datepicker__calendar .cell.selected, .vdp-datepicker__calendar .cell.selected:hover {
      background-color: $color !important;
      border-color: $color !important;
      color: #fff;
    }
  }
</style>