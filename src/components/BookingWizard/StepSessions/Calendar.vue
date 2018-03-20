<template>
  <div>
    <datepicker
      v-model="selectedDate"
      :inline="true"
      :full-month-name="true"
      :day-view-only="true"
      :disabled="calendarDisabledDates"
      :format="dateFormatter"
      @changedMonth="monthChanged"
      />
  </div>
</template>

<script>
// @flow
import Datepicker from 'vuejs-datepicker'
import _ from 'lodash'
import moment from '@/utils/moment'

export default {
  components: {
    Datepicker
  },

  computed: {
    activeDate () { return this.$sm.get('calendar.activeDate') },

    visibleMonth () { return this.$sm.get('calendar.visibleMonth') },

    visibleMonthDays () { return this.$sm.get('calendar.visibleMonthDays') },

    selectedDate: {
      get () {
        if (!this.activeDate.day) return null
        return new Date(this.activeDate.year, this.activeDate.month, this.activeDate.day)
      },
      set (date: any) {
        const activeDate = {
          year: date.getFullYear(),
          month: date.getMonth(),
          day: date.getDate()
        }
        this.$sm.set('calendar.activeDate', activeDate)
      }
    },

    // inversion for visibleMonthDays, converted to Date objects
    visibleMonthDisabledDates () {
      if (!this.visibleMonthDays) return []
      const daysInMonth = moment([this.visibleMonth.year, this.visibleMonth.month]).daysInMonth()
      const monthRange = _.range(1, daysInMonth + 1)
      const disabledDays = monthRange.filter(d => !this.visibleMonthDays.includes(d))
      return disabledDays.map(date => new Date(this.visibleMonth.year, this.visibleMonth.month, date))
    },

    calendarDisabledDates () {
      return {
        to: moment().subtract(1, 'days').toDate(), // disable all days before today
        dates: this.visibleMonthDisabledDates
      }
    }
  },

  methods: {
    dateFormatter (date: string) {
      return moment(date).format(this.$config.dateFormats.date)
    },

    monthChanged (value: Date) {
      const newMonth = {
        year: value.getFullYear(),
        month: value.getMonth()
      }
      this.updateVisibleMonth(newMonth)
    },

    updateVisibleMonth (newMonth: Object) {
      this.$sm.dispatch('calendar/loadSessionsByMonth', { month: newMonth })
      this.$sm.set('calendar.visibleMonth', newMonth)
    }
  },

  watch: {
    activeDate (value: Object) {
      if (!value.day) return
      const newMonth = value
      // no need to update the month if it's not changed
      if (this.visibleMonth.month === newMonth.month && this.visibleMonth.year === newMonth.year) return
      this.updateVisibleMonth(newMonth)
    }
  }
}
</script>

<style>
.vdp-datepicker__calendar .cell.today {
    border: 1px solid pink;
}
</style>
