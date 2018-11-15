<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <img src="https://wx.zrlee.cn/img/me.png" >
    <HelloWorld/>
    
    <Owin/>

    
   

    <p>
      <router-link to="/Profile">Go to Profile</router-link>
    </p>
  </div>

</template>

<script>
// 导入组件
import HelloWorld from './components/HelloWorld'
import Owin from './components/Owin'
export default {
  name: 'App',
  // 注册所依赖的对象
  components: {
    HelloWorld,
    Owin
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
