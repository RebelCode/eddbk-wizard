<template>
  <div class="todos">
    <div>
      <button @click="fetch">Fetch</button>
    </div>
    <div v-for="item in todos">
      <label><input type="checkbox" :checked="item.completed"> {{ item.title }}</label>
    </div>
  </div>
</template>

<script>
export default {
  name: 'todos',
  data () {
    return {
      todos: []
    }
  },

  methods: {
    fetch () {
      this.todos = []
      this.$services.fetchTodos().then(
        response => {
          this.todos = response.data
        }
      )
    }
  },

  mounted () {
    this.$services.log('test')
  }
}
</script>
