<template>
  <div>
    <datepicker
      v-model="selectedDate"
      :inline="true"
      :full-month-name="true"
      :day-view-only="true"
      :disabled="datesRange"
      :format="dateFormatter"
      @changedMonth="monthChanged"
      />
  </div>
</template>

<script>
// @flow
import Datepicker from 'vuejs-datepicker'
import moment from '@/utils/moment'

import { dateFormats } from '@/config'

export default {
  components: {
    Datepicker
  },

  computed: {
    datesRange () {
      return {
        to: moment().subtract(1, 'days').toDate(), // disable all days before today
        dates: this.$sm.get('calendar.visibleMonthDisabledDates')
      }
    },

    activeDate () { return this.$sm.get('calendar.activeDate') },
    visibleMonth () { return this.$sm.get('calendar.visibleMonth') },
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
    }
  },

  methods: {
    dateFormatter (date: string) {
      return moment(date).format(dateFormats.date)
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
    }
  },

  watch: {
    activeDate (value: Object) {
      const newMonth = value
      // no need to update the month if it's not changed
      if (this.visibleMonth.month === newMonth.month && this.visibleMonth.year === newMonth.year) return true
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
