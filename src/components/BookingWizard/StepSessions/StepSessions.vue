<template>
  <div :class="{ 'session-loading': ui.sessionLoading }">
    <div class="edd-booking-wizard__info">
      {{ $_('You are booking a ') }} <strong>{{ selectedService.title }}</strong>
    </div>
    <div class="inline-form-control">
      <label>{{ $_('Select duration') }}</label>
      <div>
        <select v-model="activeDuration" :disabled="isNoDurations" class="eddb-control">
          <option v-for="duration in activeDateDurations" :value="duration.duration"> {{ duration.title }}</option>
        </select>
      </div>
    </div>
    <div class="inline-form-control">
      <label>{{ $_('Select available time') }}</label>
      <div class="eddb-control eddb-control-appointment">
        <div class="eddb-control-appointment__header">
          <span><button @click="goPrevDate" :disabled="prevDate === null">&#9664;</button></span>
          <span>{{ activeDayFormatted }}</span>
          <span><button @click="goNextDate" :disabled="nextDate === null">&#9654;</button></span>
        </div>
        <div class="eddb-control-appointment__body" v-if="activeSessions.length">
          <button
                  :class="{ selected: session === selectedSession }"
                  v-for="session in activeSessions"
                  @click="selectedSession = session"
                  class="session__item"
          >
            {{ session.start | epochToFormat('time') }}
          </button>
        </div>
      </div>
    </div>
    <div class="inline-form-control">
      <label>{{ $_('Additional notes') }}</label>
      <textarea rows="4" v-model="form.notes" class="eddb-control" :placeholder="$_('Have you got any special requests for the service provider? If yes, please note them down here')"></textarea>
    </div>
  </div>
</template>

<script>
// @flow
import moment from '@/utils/moment'
import { mapStore } from '@/utils/vuex'
import Vue from 'vue'

export default {
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
    ...mapStore('services', {
      'selectedService': 'selected'
    }),

    ...mapStore('calendar', [
      'activeDate',
      'activeDuration',
      'activeDateSessions',
      'activeSessions',
      'nextDate',
      'prevDate',
      'activeLoadedDays',
      'selectedSession'
    ]),

    activeDateDurations () {
      const durations = this.$sm.get('calendar.activeDateDurations')
      return durations.map(Number).map(d => {
        return {
          title: moment.duration(d, 'seconds').humanize(),
          duration: d
        }
      })
    },

    isNoDurations () {
      return !this.activeDateDurations.length
    },

    activeDayFormatted () {
      if (!this.activeDate.day) return this.$_('Please select a date')
      return moment(this.activeDate).format(this.$config.dateFormats.displayDay)
    }
  },

  methods: {
    goNextDate () {
      this.activeDate = this.nextDate
    },

    goPrevDate () {
      this.activeDate = this.prevDate
    },

    showLoader () {
      this.ui.sessionLoading = true
    },

    hideLoader () {
      this.ui.sessionLoading = false
    }
  },

  watch: {
    activeDateDurations (durations: Array<Object>) {
      if (!durations.length) return
      const isActiveDurationInList = this.activeDateDurations.filter(d => d.duration === this.activeDuration).length
      // no need to change the duration if it's still in the list
      if (isActiveDurationInList) return
      // set first duration as selected by default if sth changed
      this.activeDuration = durations[0].duration
    }
  },

  filters: {
    epochToFormat (timestamp: Number, format: String) {
      return moment.unix(timestamp).format(Vue.$config.dateFormats[format])
    }
  }

}
</script>

<style>
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
