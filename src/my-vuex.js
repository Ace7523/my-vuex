let Vue

let forEach = (obj, cb) => {
    Object.keys(obj).forEach(key => {
        cb(key, obj[key])
    })
}

class Store{
    constructor(options) {
        // vuex 最核心的几句代码 保证更改vuex中state状态后 
        // 整个vue中用到的地方全都刷新
        // 所以 vuex强依赖vue环境
        this.vm = new Vue({
            data: ()=>{
                return {
                    state: options.state
                }
            }
        })

        // 遍历用户传来的getters 
        let getters = options.getters
        this.getters = {}
        // Object.keys(getters).forEach(funName => {
        //     Object.defineProperty(this.getters, funName, {
        //         get: ()=>{
        //             return getters[funName](this.state)
        //         }
        //     })
        // })
        forEach(getters, (key, value)=>{
            Object.defineProperty(this.getters, key, {
                get: ()=>{
                    return value(this.state)
                }
            })
        })

        let mutations = options.mutations
        this.mutations = {}
        forEach(mutations, (key, value) => {
            // this.mutations[key] = value()
            // 这么写不容易传参, 所以还是要劫持一下
            this.mutations[key] = (payload) => {
                value(this.state, payload)
            }

        })
    }
    // 为什么要this.vm = new Vue 这么写 为了使state是响应式的对象
    get state() {
        return this.vm.state
    }
    // 下面的commit写法
    // 等价于 在 constructor中这么写
    // let commit = options.commit
    // this.commit = () => {
    //     commit()
    // }
    // 因为会这样调用this.$store.commit， 所以commit是vue实例上的方法，
    // 这么写保证this永远指向实例
    commit = (mutationName, payload)=>{
        this.mutations[mutationName](payload)
    }
}

const install = _Vue => {
    console.log('install')
    Vue = _Vue
    // 给每个组件都加
    Vue.mixin({
        beforeCreate(){
            // 通过这个可以知道，vue先渲染父组件，后渲染子组件，深度优先子组件全渲染完了后，才算父组件渲染结束
            console.log(this.$options.name)
            if(this.$options && this.$options.store) {
                this.$store = this.$options.store
            } else {
                this.$store = this.$parent && this.$parent.$store
            }
        }
    })
}

export default {
    install,
    Store
}

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

