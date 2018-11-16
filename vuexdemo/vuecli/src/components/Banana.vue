<template>
  <div>
    <h1>{{msg}}</h1>
    <button>买一个{{msg}}</button>
    <button>丢个{{msg}}</button>

  </div>
</template>

<script>
export default {
  name: 'Banana',
  data: () => {
    return {
      msg: '香蕉啊'
    }
  }
}
</script>

<style scoped>

</style>
