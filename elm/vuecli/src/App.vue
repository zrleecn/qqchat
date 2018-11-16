<template>
  <div id="app">

    <img src="./assets/logo.png">


    <!--     <HelloWorld/>

        <Owin/> -->
    <!-- 相当于视图容器 -->
    <router-view></router-view>

    <br>
    <router-link :to="{path:'/Profile'}">

      <div class="btn btn-primary">Go To Profile</div>

    </router-link>
    <br>
    <router-link :to="{path:'/HelloWorld'}">Go to Helloworld</router-link>
    <br>
    <router-link v-bind:to="{path:'/Owin'}">
      Go To Owin
    </router-link>
    <br>
    <router-link v-bind:to="{path:'/SubHelloWorld'}">
      Go To SubHelloWorld
    </router-link>
    <br>

    <router-link v-bind:to="{path:'/Owin/广东油大'}">
      Go To Owin 获取路由参数
    </router-link>
    <br>
    <router-link :to="{path:'/HelloWorld', query:{'name':'张三'}}">Go to Helloworld Query</router-link>
    <br>

  </div>

</template>

<script>
  // 导入组件
  import HelloWorld from './components/HelloWorld'
  import Owin from './components/Owin'
  import Profile from './components/Profile'

  export default {
    name: 'App',
    // 注册所依赖的对象
    components: {
      HelloWorld,
      Owin,
      Profile
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
<link rel="stylesheet" href="https://cdn.staticfile.org/twitter-bootstrap/3.3.7/css/bootstrap.min.css">
<script src="https://cdn.staticfile.org/jquery/2.1.1/jquery.min.js"></script>
<script src="https://cdn.staticfile.org/twitter-bootstrap/3.3.7/js/bootstrap.min.js"></script>
