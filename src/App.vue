<template>
  <div id="app">
   {{this.$store.state.age}}
   <button @click="$store.state.age = 100">按钮</button>
  </div>
</template>

<script>

export default {
  name: 'App',
  mounted() {
    console.log('store   ', this.$store)
  }
}
</script>

