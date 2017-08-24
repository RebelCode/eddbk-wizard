<template>
  <div>
    <div class="">
      {{ $_('You are booking a ') }} <strong>{{ selectedService.title }}</strong>
    </div>
    <div class="">
      <calendar/>
    </div>
  </div>
</template>

<script>
// @flow
import Calendar from './Calendar.vue'

export default {
  components: {
    Calendar
  },
  computed: {
    selectedService () { return this.$sm.get('services.selected') }
  }
}
</script>
