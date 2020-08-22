import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  state:{
    cartList:[],
  },
  getters,
  mutations:{
    addCar(state,payLoad){
      let oldProduct = state.cartList.find(item => item.iid === payLoad.iid)
     
      if(oldProduct){
        oldProduct.count += 1
      }else{
        payLoad.count = 1
        state.cartList.push(payLoad)
      }
    }
  }
})

export default store