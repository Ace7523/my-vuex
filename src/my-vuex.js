let Vue

let forEach = (obj, cb) => {
    Object.keys(obj).forEach(key => {
        cb(key, obj[key])
    })
}
class moduleCollection{
    constructor(options) {
        this.register([], options)
    }
    register(path, rootModule){
        let rawModule = {
            _raw: rootModule,
            _children: {},
            state: rootModule.state
        }
        if(!this.root){
            this.root = rawModule
        } else {
            let parentModule = path.slice(0, -1).reduce((root, current) => {
                return root._children[current]
            }, this.root)
            parentModule._children[path[path.length - 1]] = rawModule
        }

        if(rootModule.modules){
            forEach(rootModule.modules, (key, value) => {
                this.register(path.concat(key), value)
            })
        }
    }
}
function installModule(store, rootState, path, rawModule){

    if(path.length > 0){
        let parentState = path.slice(0, -1).reduce((root, current)=>{
            return rootState[current]
        }, rootState)
        Vue.set(parentState, path[path.length - 1], rawModule.state)
    }

    let getters = rawModule._raw.getters
    if (getters) {
        forEach(getters, (key, value) => {
            Object.defineProperty(store.getters, key, {
                get: () => {
                    return value(rawModule.state)
                }
            })
        })
    }
    let mutations = rawModule._raw.mutations
    if (mutations) {
        forEach(mutations, (key, value) => {
            // 如果有的话，就直接用 ，没有的话，就是把这个赋值为数组
            let arr = store.mutations[key] || (store.mutations[key] = [])
            arr.push(payload => {
                value(rawModule.state, payload)
            })
        })
    }

    let actions = rawModule._raw.actions
    if (actions) {
        forEach(actions, (key, value) => {
            // 如果有的话，就直接用 ，没有的话，就是把这个赋值为数组
            let arr = store.actions[key] || (store.actions[key] = [])
            arr.push(payload => {
                value(store, payload)
            })
        })
    }

    forEach(rawModule._children, (key, value)=>{
        installModule(store, rootState, path.concat(key), value)
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
        this.getters = {}
        this.mutations = {}
        this.actions = {}

        this.modules = new moduleCollection(options)
        console.log(this.modules)
        installModule(this, this.state, [], this.modules.root)
        console.log(this)

        // ****************************************
        // // 遍历用户传来的getters 
        // let getters = options.getters
        // this.getters = {}
        // // Object.keys(getters).forEach(funName => {
        // //     Object.defineProperty(this.getters, funName, {
        // //         get: ()=>{
        // //             return getters[funName](this.state)
        // //         }
        // //     })
        // // })
        // forEach(getters, (key, value)=>{
        //     Object.defineProperty(this.getters, key, {
        //         get: ()=>{
        //             return value(this.state)
        //         }
        //     })
        // })

        // let mutations = options.mutations
        // this.mutations = {}
        // forEach(mutations, (key, value) => {
        //     // this.mutations[key] = value()
        //     // 这么写不容易传参, 所以还是要劫持一下
        //     this.mutations[key] = (payload) => {
        //         value(this.state, payload)
        //     }

        // })

        // let actions = options.actions
        // this.actions = {}
        // forEach(actions, (key, value) => {
        //     // this.mutations[key] = value()
        //     // 这么写不容易传参, 所以还是要劫持一下
        //     this.actions[key] = (payload) => {
        //         value(this, payload)
        //     }

        // })
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
        this.mutations[mutationName].forEach(fn => fn(payload))
    }
    dispatch = (actionName, payload) => {
        this.actions[actionName].forEach(fn => fn(payload))
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

