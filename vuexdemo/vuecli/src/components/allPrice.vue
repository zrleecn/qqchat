<template>
    <div>
      总金额{{allPrice}}
    </div>
</template>

<script>
export default {
  name: 'allPrice',
  // 计算属性
  computed: {
    allPrice () {
      return this.$store.state.allPrice
    }
  }
}
</script>

<style scoped>

</style>
