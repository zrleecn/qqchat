<template>
  <div>
    <h1>{{ msg }}</h1>
    <button @click="addOne">买一个{{ msg }}</button>
    <button @click="downOne">丢一个{{ msg }}</button>
  </div>
</template>

<script type="text/javascript">
var bananaPrice = 10
export default {
  // 数据
  data: function () {
    return {
      msg: '香蕉🍌'
    }
  },
  methods: {
    addOne () {
      this.$store.commit('ADD_PRICE', bananaPrice)
    },
    downOne () {
      // dispatch函数是【异步调用】commit函数是【同步调用】
      this.$store.dispatch('downPrice', bananaPrice)
    }
  }
}
</script>

<style>
</style>
