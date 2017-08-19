<template>
  <div>
    <label>{{ $_('Select a service') }}</label>
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

    <div v-if="selectedService" class="service__image">
      <img :src="selectedService.imageSrc" alt="">
    </div>

    <div v-if="selectedService" class="service__description">
      {{ selectedService.description }}
    </div>

    <div v-if="selectedService" class="service__pricePreview">
      {{ pricePreview }}
    </div>

    <div v-if="selectedService && selectedService.pricePreview.otherAvailable" class="service__pricePreview">
      {{ $_('Other appointment lengths available') }}
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

  computed: {
    pricePreview () {
      if (!this.selectedService) return null
      return this.$_('Price: %1$s per %2$s appointment', [
        this.selectedService.pricePreview.minPrice,
        this.selectedService.pricePreview.minLength
      ])
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
