
import Vue from 'vue'
// import Vuex from 'vuex'
import Vuex from './my-vuex'

Vue.use(Vuex)

export default new Vuex.Store(
    {
        modules: {
            a: {
                state: {
                    age: 100
                },
                mutations : {
                    increment (state, n) {
                      console.log('modules-a-increment')
                    } 
                },
            },
            b: {
                state: {
                    age: 200
                },
                mutations : {
                    increment (state, n) {
                      console.log('modules-b-increment')
                    } 
                },
                modules: {
                    c: {
                        state: {
                            age: 300
                        },
                        mutations : {
                            increment (state, n) {
                              console.log('modules-c-increment')
                            } 
                        },

                    }
                }
            }
        },
        state : {
            age : 19
        },
        getters : {
            addAge(state){
                return state.age + 10
            }
        },
        mutations : {
            increment (state, n) {
              state.age += n
            } 
        },
        actions : {
            asyncIncrement (store, n) {
                setTimeout(()=>{
                    store.commit('increment', n)
                }, 1000)
            }
        }
    }
)