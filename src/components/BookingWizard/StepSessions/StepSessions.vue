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
        <span><button @click="prevDay" :disabled="prevDayIndex === null">&#9664;</button></span>
        <span>{{ activeDayFormatted }}</span>
        <span><button @click="nextDay" :disabled="nextDayIndex === null">&#9654;</button></span>
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
    activeMonthDays () { return this.$sm.get('calendar.activeMonthDays') },
    activeDayFormatted () { return moment(this.activeDate).format(dateFormats.displayDay) },
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
    },

    currentDayIndex () {
      const currentIndex = this.activeMonthDays.indexOf(this.activeDate.day)
      if (currentIndex < 0) return null
      return currentIndex
    },

    nextDayIndex () {
      const nextIndex = this.currentDayIndex + 1
      if (typeof this.activeMonthDays[nextIndex] === 'undefined') return null
      return nextIndex
    },

    prevDayIndex () {
      const prevIndex = this.currentDayIndex - 1
      if (typeof this.activeMonthDays[prevIndex] === 'undefined') return null
      return prevIndex
    }
  },

  methods: {
    setDefaultDates () {
      this.setActiveDate(new Date())
    },

    setActiveDate (date: Date) {
      const mDate = moment(date)
      const dateObj = {
        year: mDate.year(),
        month: mDate.month(),
        day: mDate.date()
      }
      this.$sm.set('calendar.activeDate', dateObj)
    },

    nextDay () {
      const nextDay = this.activeMonthDays[this.nextDayIndex]
      if (nextDay) {
        const nextDate = Object.assign({}, this.activeDate, { day: nextDay })
        this.$sm.set('calendar.activeDate', nextDate)
      }
    },

    prevDay () {
      const prevDay = this.activeMonthDays[this.prevDayIndex]
      if (prevDay) {
        const prevDate = Object.assign({}, this.activeDate, { day: prevDay })
        this.$sm.set('calendar.activeDate', prevDate)
      }
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
