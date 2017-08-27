<template>
  <div>
    <div class="">
      {{ $_('You are booking a ') }} <strong>{{ selectedService.title }}</strong>
    </div>
    <div class="">
      <div class="">{{ $_('Step 1. Select a date') }}</div>
      <calendar/>
    </div>
    <div class="">
      <div class="">{{ $_('Step 2. Select duration') }}</div>
      <div>
        <select v-model="selectedDuration">
          <option :value="null">{{ $_('All') }}</option>
          <option v-for="duration in activeDateDurations" :value="duration.duration"> {{ duration.title }}</option>
        </select>
      </div>
    </div>
    <div class="">
      <div>{{ $_('Step 3. Choose available appointment time') }}</div>
      <div>
        <span><button @click="prevDay">&#9664;</button></span>
        <span>{{ activeDayFormatted }}</span>
        <span><button @click="nextDay">&#9654;</button></span>
      </div>
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

  computed: {
    selectedService () { return this.$sm.get('services.selected') },
    activeDateDurations () { return this.$sm.get('calendar.activeDateDurations') },
    activeDateSessions () { return this.$sm.get('calendar.activeDateSessions') },
    activeSessions () { return this.$sm.get('calendar.activeSessions') },
    activeDate () { return this.$sm.get('calendar.activeDate') },
    activeDayFormatted () { return moment(this.activeDate, dateFormats.date).format(dateFormats.displayDay) },
    selectedDuration: {
      get () {
        return this.$sm.get('calendar.selectedDuration')
      },
      set (duration: number) {
        this.$sm.set('calendar.selectedDuration', duration)
      }
    }
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
    },

    nextDay () {
      const activeDateMoment = moment(this.activeDate, dateFormats.date)
      const nextDate = activeDateMoment.add(1, 'days').format(dateFormats.date)
      this.$sm.set('calendar.activeDate', nextDate)
    },

    prevDay () {
      const activeDateMoment = moment(this.activeDate, dateFormats.date)
      const prevDate = activeDateMoment.subtract(1, 'days').format(dateFormats.date)
      this.$sm.set('calendar.activeDate', prevDate)
    }
  }

}
</script>
