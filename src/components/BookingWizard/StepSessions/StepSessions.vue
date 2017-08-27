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
      if (!this.$sm.get('dates.activeDate')) {
        const activeDate = moment().format(dateFormats.date)
        this.$sm.set('dates.activeDate', activeDate)
      }
      if (!this.$sm.get('dates.activeMonth')) {
        const activeMonth = moment().format(dateFormats.month)
        this.$sm.set('dates.activeMonth', activeMonth)
      }
    }
  },

  computed: {
    selectedService () { return this.$sm.get('services.selected') },
    activeDateDurations () { return this.$sm.get('sessions.activeDateDurations') },
    activeDateSessions () { return this.$sm.get('sessions.activeDateSessions') },
    activeSessions () { return this.$sm.get('sessions.activeSessions') },
    selectedDuration: {
      get () {
        return this.$sm.get('sessions.selectedDuration')
      },
      set (duration: number) {
        this.$sm.set('sessions.selectedDuration', duration)
      }
    }
  }
}
</script>
