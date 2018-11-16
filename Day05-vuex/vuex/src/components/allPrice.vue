<template>
  <div>总金额{{ allPrice }}</div>
</template>

<script type="text/javascript">
export default {
  // 【计算属性】
  computed: {
    allPrice () {
      return this.$store.state.allPrice
    }
  }
}
</script>

<style>
</style>
