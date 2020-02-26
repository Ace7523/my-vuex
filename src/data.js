this.root = {
        _raw: {
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
        },
        _children: {
            a: {
                _raw: {
                    state: {
                        age: 100
                    },
                    mutations : {
                        increment (state, n) {
                          console.log('modules-a-increment')
                        } 
                    },
                },
                _children: {},
                state: {
                    age: 100
                }
            },
            b: {
                _raw: {
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
                },
                _children: {
                    c: {
                        _raw: {
                            state: {
                                age: 300
                            },
                            mutations : {
                                increment (state, n) {
                                  console.log('modules-c-increment')
                                } 
                            },
    
                        },
                        _children: {},
                        state: {
                            age: 300
                        }
                    }
                },
                state: {
                    age: 200
                }
            }
        },
        state: {
            age : 19
        }
}