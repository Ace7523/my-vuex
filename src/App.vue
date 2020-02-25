<template>
  <div id="app">
   rootage: {{this.$store.state.age}}
   rootgetters: {{this.$store.getters.addAge}}
   <!-- <div>
     a age : {{this.$store.state.a.age}}
   </div>
   <div>
     b age : {{this.$store.state.b.age}}
   </div>
   <div>
     c age : {{this.$store.state.b.c.age}}
   </div> -->
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

