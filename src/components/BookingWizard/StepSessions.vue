<template>
  <div>
    <div class="">
      {{ $_('You are booking a ') }} <strong>{{ selectedService.title }}</strong>
    </div>
    <div class="">
      <datepicker v-model="selectedDate" :inline="true"></datepicker>
    </div>

  </div>
</template>

<script>
// @flow
import Datepicker from 'vuejs-datepicker'

export default {
  components: {
    Datepicker
  },
  computed: {
    selectedService () { return this.$st.get('services.selected') },
    selectedDate: {
      get () {
        return this.$st.get('dates.selected')
      },
      set (value: any) {
        return this.$st.set('dates.selected', value)
      }
    }
  }
}
</script>
