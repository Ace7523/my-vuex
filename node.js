// 第一次提交  
// main.js 创建根实例 ， store作为参数传给根实例的options选项上
// store.js 中 vue.use(vuex) , 所以vuex 肯定暴露一个 install 方法
// export default new Vuex.Store 说明vueX 还会暴露一个Store构造函数
// 在创建根实例之前 store中的逻辑， 加了一个全局的mixin 也就是接下来的所有组件，包括根组件，都会执行那个mixin的状态机
// mixin 中 beforeCreate 可以发现组件是先渲染父级 再渲染子级 从外到里 逐层深入 ，
// 但是渲染完成顺序是反过来的，所有的子组件全结束了，父组件才算渲染完。

// 利用上述渲染规则特性  在根组件上挂载$store ， 子组件寻找父组件的$store 实现全局单例


// 第二次提交  
// vuex 最核心的代码 state 是如何响应式的


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

// 第四次提交
// mutation 其实就是函数劫持，使用的时候  this.$store.commit('funName', param)
// 逆推的话，就是 Store的每个实例，都有一个commit方法，接收两个参数
// 但是在写store的时候 却是内部又给传了一个参数
// mutations : {
//     increment (state, n) {
//       state.age += n
//     } 
// }
// 所以在源码的层面，通过函数劫持，把这个state参数给加了进去
// 就是类似下面的代码， 日常业务也会挺有用的
// this.mutations = {}
// Object.keys(mutations).forEach(mutationName => {
//     this.mutations[mutationName] = (payload) =>{
//         mutations[mutationName](this.state, payload)
//     }
// })

// 第五次提交 
// 实现action 和mutation大致一样，参数不同，dispatch第一个参数是store实例本身，所以在源码层
// 面，传的参数就是this 

// 第六次提交

// 注意 ，模块名 不能个根state中的状态名一致，否则会覆盖
// 这次提交主要是实现一个moduleCollection的方法，把传进来的options 数据格式，
// 进行一次格式化，方便后面模块的注册
// 这也是一种思想 让用户传进来的数据格式尽可能简单易懂 方便使用。 然后内部为了实现更为复杂一点的功能，
// 自己进行格式化一下
