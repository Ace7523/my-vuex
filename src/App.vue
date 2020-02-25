<template>
  <div id="app">
   {{this.$store.state.age}}
   {{this.$store.getters.addAge}}
   <button @click="change()">按钮</button>
   <button @click="asyncChange()">按钮 测试异步</button>
  </div>
</template>

<script>

export default {
  name: 'App',
  mounted() {
    console.log('store   ', this.$store)
  },
  methods: {
    change() {
      this.$store.commit('increment', 10)
    },
    asyncChange() {
      this.$store.dispatch('asyncIncrement', 200)
    }
  }
}
</script>

