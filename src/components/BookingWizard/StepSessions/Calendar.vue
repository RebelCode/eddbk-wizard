<template>
  <div>
    <datepicker
      v-model="selectedDate"
      :inline="true"
      :full-month-name="true"
      :day-view-only="true"
      :disabled="datesRange"
      :format="dateFormatter"
      />
  </div>
</template>

<script>
// @flow
import Datepicker from 'vuejs-datepicker'
import moment from 'moment'

import { dateFormats } from '@/config'

export default {
  components: {
    Datepicker
  },

  data () {
    return {
      visibleMonth: null
    }
  },

  created () {
    this.updateVisibleMonth(new Date())
  },

  computed: {
    datesRange () {
      return {
        to: moment().subtract(1, 'days').toDate(), // disable all days before today
        dates: [
        ]
      }
    },
    selectedDate: {
      get () {
        const activeDate = this.$sm.get('calendar.activeDate')
        return new Date(activeDate.year, activeDate.month, activeDate.day)
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
    }
  }
}
</script>
