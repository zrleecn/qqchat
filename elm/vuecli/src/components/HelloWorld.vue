<template>
  <div class="hello">
    <h1>{{ msg }}</h1>

    <div @click="getQuery">getQuery</div>
     <!-- 相当于子视图容器 -->
    <router-view></router-view>

  </div>


</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'github.com/zrleecn'
    }
  },
  methods: {
    getQuery(){
      console.log(this.$route.query)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
