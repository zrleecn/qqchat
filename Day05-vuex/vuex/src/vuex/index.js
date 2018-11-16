import Vue from 'vue'
import Vuex from 'vuex'

// Vue使用Vuex
Vue.use(Vuex)

/**
 * 【共享的状态集】state
 * 这个allPrice是state对象的一个属性，所以可以state.allPrice
 */
const state = {
  allPrice: 210
}
/**
 * 【操作状态】变化：mutations
 * mutations中定义的方法需要使用commit进行触发
 * 非异步的操作方法写在mutations中。可以操作state中的数据。
 */
const mutations = {
  // 加价
  ADD_PRICE (state, price) {
    state.allPrice += price
  },
  DOWN_PRICE (state, price) {
    state.allPrice -= price
  }
}
/**
 * actions只能调用muations，可以处理一些异步的操作，但是不能
 * 直接操作state
 */
const actions = {
  downPrice ({ commit }, price) {
    setTimeout(function () {
      commit('DOWN_PRICE', price)
    }, 1000)
  }
}
/**
 */
export default new Vuex.Store({
  state,
  mutations,
  actions
})
