<template>
  <div>
    <h1>{{ msg }}</h1>
    <button @click="addOne">买一个{{ msg }}</button>
  </div>
</template>

<script type="text/javascript">
export default {
  // 数据
  data: function () {
    return {
      msg: '苹果🍎'
    }
  },
  methods: {
    addOne () {
      /**
       * 这里使用ADD_PRICE函数是来自vuex的mutations中的方法
       * 可见【任何组件都能够获取状态或者触发行为】
       * 触发行为的方法用commit
       * ADD_PRICE函数会触发【状态集】中的state.allPrice
       * 这个Apple组件中一旦修改，那么allPrice组件中也会同步修改
       * （跨组件）  price = 5
       */
      this.$store.commit('ADD_PRICE', 5)
    }
  }
}
</script>

<style>
</style>
