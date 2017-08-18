<template>
  <div>
    <label>{{ $t('Select a service') }}</label>
    <multiselect
      v-model="selectedService"
      :options="services"
      track-by="title"
      label="title"
      :searchable="false"
      :allow-empty="false"
      :show-labels="false"
      >
    </multiselect>
    <div v-if="selectedService">
      <div class="service__image">
        <img :src="selectedService.imageSrc" alt="">
      </div>
      <div class="service__description">
        {{ selectedService.description }}
      </div>
    </div>
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect'

export default {
  components: {
    Multiselect
  },

  data () {
    return {
      services: [],
      selectedService: null
    }
  },

  mounted () {
    this.$s.fetchServices().then(response => {
      this.services = response.data
    })
  }
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
