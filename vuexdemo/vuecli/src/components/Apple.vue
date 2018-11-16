<template>
    <div>
      <h1>{{msg}}</h1>
      <button @click="add_one">买一个</button>
    </div>
</template>

<script>

const price = 5
export default {
  name: 'Apple',
  data: () => {
    return {
      msg: 'iPhone XS 两个肾都买不起'
    }
  },
  methods: {
    add_one () {
      this.$store.commit('ADD_PRICE', price)
    }
  }
}
</script>

<style scoped>

</style>
