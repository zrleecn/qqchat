import Vue from 'vue'
import Vuex from 'vuex'

// Vue使用Vuex
Vue.use(Vuex)

/**
 * 共享的状态集state
 * 这个allPrice是state对象的一个属性 所以不可以使用state.allPrice
 * @type {{allPrice: number}}
 */
const state = {
  allPrice: 200
}


/**
 * 操作状态 变化 mutations
 * mutations 中定义的方法需要使用commit 进行触发
 * 非异步的操作方法写在mutations中。可以操作state中的数据。
 * @type {{ADD_PRICE(*, *): void, DOWN_PRICE(*, *): void}}
 */
const mutations = {
  ADD_PRICE (state, price) {
    state.allPrice += price
  },
  DOWN_PRICE (state, price) {
    state.allPrice -= price
  }
}

/**
 * actions 只能调用mutations 可以处理一些一部的操作但是不能直接操作state
 * @type {{downPrice({commit: *}, *=): void}}
 */
const actions = {
  downPrice ({ commit }, price){
    setTimeout(function(){
      commit('DOWN_PRICE', price)
    }, 1000)
  }
}

/**
 *
 */
export default new Vuex.Store({
  state,
  mutations,
  actions
})
