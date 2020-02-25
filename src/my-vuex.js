let Vue

class Store{
    constructor(options) {
        this._s = options.state
    }
    get state() {
        return this._s
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