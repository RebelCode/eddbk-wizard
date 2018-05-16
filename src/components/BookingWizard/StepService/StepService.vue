<template>
  <div>
    <div class="inline-form-control">
      <label>{{ $_('Select a service') }}</label>
      <select v-model="selectedService" class="eddb-control">
        <option :value="null" disabled selected>{{ $_('Select option') }}</option>
        <option :value="item" v-for="item in list">{{ item.name }}</option>
      </select>
    </div>

    <div class="service">
      <div v-if="selectedService" class="service__image">
        <img :src="selectedService.imageSrc" alt="">
      </div>

      <div v-if="selectedService" class="service__description">
        {{ selectedService.description }}
      </div>
    </div>
  </div>
</template>

<script>
// @flow

export default {
  props: {
    list: Array,
    value: Object
  },

  computed: {
    selectedService: {
      get () {
        return this.value
      },
      set (value: ?Object) {
        this.$eventBus.$emit('service:changed', value)
        this.$emit('input', value)
      }
    }
  }
}
</script>
