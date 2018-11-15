// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// 引入
import Router from 'vue-router'
import OWin from './components/Owin'
import Profile from './components/Profile'
Vue.config.productionTip = false
// 使用
Vue.use(Router)

// 实例化

var router = new Router({
	routers :[
		{
			path: "/Owin",
			component:OWin
		},
		{
			path:"/Profile",
			components:Profile
		}
	]
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  // router:router,
  router, // ES6
  components: { 
  	App

   },
  template: '<App/>'
})
