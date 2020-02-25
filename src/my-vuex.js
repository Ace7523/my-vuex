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

    }
    // 为什么要this.vm = new Vue 这么写 为了使state是响应式的对象
    get state() {
        return this.vm.state
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