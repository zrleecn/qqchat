<template>
  <div>
    <h1>{{msg}}</h1>
    <button @click="add_one">买一个{{msg}}</button>
    <button @click="down_one">丢个{{msg}}</button>

  </div>
</template>

<script>
const price = 5
export default {
  name: 'Banana',
  data: () => {
    return {
      msg: '香蕉啊'
    }
  },
  methods: {
    add_one () {
      this.$store.commit('ADD_PRICE', price)
    },
    down_one () {
      // dispatch函数是【异步调用】commit函数是【同步调用】
      this.$store.dispatch('downPrice', price)

    }
  }
}
</script>

<style scoped>

</style>
