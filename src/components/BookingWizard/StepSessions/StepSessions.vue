<template>
  <div>
    <div class="">
      {{ $_('You are booking a ') }} <strong>{{ selectedService.title }}</strong>
    </div>
    <div class="">
      <calendar/>
    </div>
    <div class="">
      <select v-model="selectedDuration">
        <option :value="null">{{ $_('All') }}</option>
        <option v-for="duration in activeDateDurations" :value="duration.duration"> {{ duration.title }}</option>
      </select>
    </div>
  </div>
</template>

<script>
// @flow
import Calendar from './Calendar.vue'
import moment from 'moment'
import { dateFormats } from '@/config'

export default {
  components: {
    Calendar
  },

  created () {
    this.setDefaultDates()
  },

  methods: {
    setDefaultDates () {
      if (!this.$sm.get('calendar.activeDate')) {
        const activeDate = moment().format(dateFormats.date)
        this.$sm.set('calendar.activeDate', activeDate)
      }
      if (!this.$sm.get('calendar.activeMonth')) {
        const activeMonth = moment().format(dateFormats.month)
        this.$sm.set('calendar.activeMonth', activeMonth)
      }
    }
  },

  computed: {
    selectedService () { return this.$sm.get('services.selected') },
    activeDateDurations () { return this.$sm.get('calendar.activeDateDurations') },
    activeDateSessions () { return this.$sm.get('calendar.activeDateSessions') },
    activeSessions () { return this.$sm.get('calendar.activeSessions') },
    selectedDuration: {
      get () {
        return this.$sm.get('calendar.selectedDuration')
      },
      set (duration: number) {
        this.$sm.set('calendar.selectedDuration', duration)
      }
    }
  }
}
</script>
