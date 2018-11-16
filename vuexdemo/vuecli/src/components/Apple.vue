<template>
    <div>
      <h1>{{msg}}</h1>
      <button>买一个{{msg}}</button>
    </div>
</template>

<script>
export default {
  name: 'Apple',
  data: () => {
    return {
      msg: 'iPhone XS 两个肾都买不起'
    }
  }
}
</script>

<style scoped>

</style>
