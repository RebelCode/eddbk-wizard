<template>
  <div :class="{ 'session-loading': ui.sessionLoading }">
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
        <select v-model="activeDuration" :disabled="isNoDurations">
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
          class="session__item"> {{ session.start | epochToFormat('time') }} — {{ session.end | epochToFormat('time') }}</button>
      </div>
    </div>
    <div class="">
      <div class="">{{ $_('Step 4. Additional notes') }}</div>
      <textarea rows="8" v-model="form.notes" :placeholder="$_('Have you got any special requests for the service provider? If yes, please note them down here')"></textarea>
    </div>
    <div class="" v-if="selectedSession">
      <span>{{ $_('Total cost for booking:') }}</span>
      <span>{{ selectedSession.data.price.formatted }}</span>
    </div>
  </div>
</template>

<script>
// @flow
import Calendar from './Calendar.vue'
import moment from '@/utils/moment'
import { dateFormats } from '@/config'

let loadingTimer = null
const loadingTimerDelay = 100

export default {
  components: {
    Calendar
  },

  data () {
    return {
      form: {
        notes: ''
      },
      ui: {
        sessionLoading: false
      }
    }
  },

  created () {
    this.$eventBus.$on('fetchingSessions:start', this.showLoader)
    this.$eventBus.$on('fetchingSessions:end', this.hideLoader)
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

    activeDuration: {
      get () {
        return this.$sm.get('calendar.activeDuration')
      },
      set (duration: number) {
        this.$sm.set('calendar.activeDuration', duration)
      }
    },

    isNoDurations () {
      return !this.activeDateDurations.length
    },

    activeDateSessions () { return this.$sm.get('calendar.activeDateSessions') },

    activeSessions () { return this.$sm.get('calendar.activeSessions') },

    activeDate () { return this.$sm.get('calendar.activeDate') },

    activeMonthDays () { return this.$sm.get('calendar.activeMonthDays') },

    activeDayFormatted () {
      if (!this.activeDate.day) return this.$_('Please select a date')
      return moment(this.activeDate).format(dateFormats.displayDay)
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
    },

    showLoader () {
      loadingTimer = setTimeout(() => {
        this.ui.sessionLoading = true
      }, loadingTimerDelay)
    },

    hideLoader () {
      clearTimeout(loadingTimer)
      this.ui.sessionLoading = false
    }
  },

  watch: {
    activeDateDurations (durations: Array<Object>) {
      // set first duration as selected by default
      if (!durations.length) return
      this.$sm.set('calendar.activeDuration', durations[0].duration)
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
  .session-loading {
    position: relative;
    filter: blur(3px);
  }
  .session-loading:after {
    content: '';
    position: absolute;
    display: block;
    width: 100%;
    height: 100%;
    top: 0;
    background: rgba(255, 255, 255, 0.75);
  }
</style>