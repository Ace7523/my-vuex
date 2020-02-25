
import Vue from 'vue'
// import Vuex from 'vuex'
import Vuex from './my-vuex'

Vue.use(Vuex)

export default new Vuex.Store(
    {
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
                }, 3000)
            }
        }
    }
)