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
        <select v-model="activeDuration">
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
      <div>
        <button
          :class="{ selected: session === selectedSession }"
          v-for="session in activeSessions"
          @click="selectedSession = session"
          class="session__item"> {{ session.start | epochToFormat('time') }}</button>
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
    activeDateDurations () {
      const durations = this.$sm.get('calendar.activeDateDurations')
      return durations.map(Number).map(d => {
        return {
          title: moment.duration(d, 'seconds').humanize(),
          duration: d
        }
      })
    },
    activeDateSessions () { return this.$sm.get('calendar.activeDateSessions') },
    activeSessions () { return this.$sm.get('calendar.activeSessions') },
    activeDate () { return this.$sm.get('calendar.activeDate') },
    activeDayFormatted () { return moment(this.activeDate, dateFormats.date).format(dateFormats.displayDay) },
    activeDuration: {
      get () {
        return this.$sm.get('calendar.activeDuration')
      },
      set (duration: number) {
        this.$sm.set('calendar.activeDuration', duration)
      }
    },
    selectedSession: {
      get () {
        return this.$sm.get('calendar.selectedSession')
      },
      set (session: {}) {
        this.$sm.set('calendar.selectedSession', session)
      }
    }
  },

  methods: {
    setDefaultDates () {
      //
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
  },

  filters: {
    epochToFormat (timestamp: Number, format: String) {
      return moment.unix(timestamp).format(dateFormats[format])
    }
  }

}
</script>


<style>
  button.session__item.selected {
    background: #e74c3c;
    color: #fff;
    border: none;
    border-radius: 50px;
  }
</style>
