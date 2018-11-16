
<template>

<div class="wrap">
	<h1>你好， {{user}}</h1>
  <div @click="getParams"> 获取参数</div>
</div>
	
</template>


<!-- script -->

<script type="text/javascript">
	export default{
		data(){
			return {
				user:"zrlee"
			}
		},
		methods:{
      getParams(){
        // 获取参数
        console.log(this.$route.params)
      }
		}
	}

</script>



<!--  style -->
<style>
	
</style>
