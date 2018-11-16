// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// 引入
import Router from 'vue-router'
import OWin from './components/Owin'
import Profile from './components/Profile'
import HelloWorld from './components/HelloWorld'
import SubHelloWorld from './components/SubHelloWorld'
Vue.config.productionTip = false
// 使用
Vue.use(Router)

// 实例化

const router = new Router({
  // URL 改变时候
  mode : "history",
	routes :[
		{
			path: "/Owin",
			component:OWin,
		},
		{
			path:"/Profile",
			component:Profile
		},
		{
			path:"/HelloWorld",
			component:HelloWorld,
			children:[
				{
					path:"/SubHelloWorld",
					component:SubHelloWorld
				}
			]
		},
    {
      path: "/Owin/:name",
      component:OWin,
    },
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
  template: '<App/>',

})
