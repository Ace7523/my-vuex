import Vue from 'vue'
import App from './App.vue'
import store from './store'

Vue.config.productionTip = false

new Vue({
  name: 'root',
  store,
  render: h => h(App),
}).$mount('#app')



// 第一次提交  
// main.js 创建根实例 ， store作为参数传给根实例的options选项上
// store.js 中 vue.use(vuex) , 所以vuex 肯定暴露一个 install 方法
// export default new Vuex.Store 说明vueX 还会暴露一个Store构造函数
// 在创建根实例之前 store中的逻辑， 加了一个全局的mixin 也就是接下来的所有组件，包括根组件，都会执行那个mixin的状态机
// mixin 中 beforeCreate 可以发现组件是先渲染父级 再渲染子级 从外到里 逐层深入 ，
// 但是渲染完成顺序是反过来的，所有的子组件全结束了，父组件才算渲染完。

// 利用上述渲染规则特性  在根组件上挂载$store ， 子组件寻找父组件的$store 实现全局单例


// 第三次提交
// 处理用户传的getters es6写法 
// fun = function() {}
// obj= {
//   fun
// }
// 等同于
// obj={
//   fun: function(){

//   }
// }
// 然后用自己封装的forEach 遍历 getters 对象 ， 用户传来的getters对象中的方法，通过defineProperty
// 方式，定义在stoer对象的getters属性上