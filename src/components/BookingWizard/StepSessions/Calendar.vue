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

  computed: {
    datesRange () {
      return {
        to: moment().subtract(1, 'days').toDate() // disable all days before today
      }
    },
    selectedDate: {
      get () {
        const selectedDate = this.$sm.get('dates.activeDate')
        return moment(selectedDate, dateFormats.date).toDate()
      },
      set (value: any) {
        const selectedDate = moment(value).format(dateFormats.date)
        this.$sm.set('dates.activeDate', selectedDate)
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
