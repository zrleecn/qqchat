# vue-resource

## 简介

**vue-resource**是Vue.js的**一款插件**，它可以通过**XMLHttpRequest或JSONP(跨域)**发起请求并处理响应。

github地址：	[vue-resource](https://github.com/pagekit/vue-resource)

## Promise对象

因为**vue-resource**中使用了**ES6中promise这个新特性**，所以先介绍下**promise**

### promise简介

**Promise 是异步编程的一种解决方案**，比传统的解决方案——回调函数和事件——更合理和更强大。

所谓`Promise`，简单说就是一个**容器**，里面保存着某个未来时刻才会结束的事件（通常是一个异步操作）的结果。从语法上说，**Promise 是一个对象**，从它里面可以

**获取异步操作的消息**。Promise 提供统一的 API，各种异步操作都可以用同样的方法进行处理。

### 传统的异步操作转【Promise】

传统回调函数写法：

```javascript
function async(a,b,cb){
	setTimeout(function (){
		cb(a+b)
	},200)
}	
async(1,2,function (result){
	// 延迟200ms后执行
	if (result>2){
		async(result,2,function(result){
			if (result>4){
				console.log(result)
			}
		})
	}
})
```

es6-promise写法：

```javascript
function async(a,b){
	//resolve异步操作成功时调用
	//reject失败时调用
	return new Promise(function(resolve,reject){
		if (typeof a !== "number" ||typeof b !== "number"){
			reject(new Error("不是一个number"));
		}
		setTimeout(function (){
			resolve(a+b);
		},1000)
	})
}
//不管是成功或者失败都会调用then这个方法
//然后接受两个函数作为参数，第一个是成功的
/*
promise:更加优雅，逻辑更加清晰
*/
async(1,'a')
	.then(function (result){
		console.log("第一次返回的值"+result)
		if (result > 2){
			return async(result,2)
		}
	},function (error){
		console.log("第一次错误:"+error)
		return 5;
	})
	.then(function (result){
		console.log("第二次返回的值"+result)
		if (result > 4){
			return async(result,2)
		}
	})
	.then(function (result){
		console.log("第三次返回的值"+result)
	})
	//catch捕获错误
	.catch(function(error){
		console.log("第二次错误:"+error)
	})
```

================================================================

## 使用【vue-resourse】

进入项目目录后安装：`npm install vue-resource --save`或者--save放在前面也可以，如下：`npm install - -save vue-resource`也行

其实想升级引入任何一款插件的做法都是：

npm install xxxx  - -save   如果是Mac系统，没有权限则在最前面添加sudo，

而最后的`--save`表示是`生产版本`  如果想存放在`开发版本`，则使用`--save-dev`

在项目中使用`vue-resource`：

```javascript
import Resource from 'vue-resource'

//使用vue-resourece
Vue.use(Resource)
```

然后就可以在项目中通过`this.$http`来调用对应的get或post方法

比如**调用get和post请求**：

```javascript
created:function (){
  this.$http.post("getList",{user:'OWin老师'})
    .then(function (data){
      console.log(data);
  })
}
//[注意]形参data是json文件中得到的json对象，假设json文件中有一个products数组，那么data.body就是拿到这个products数组，可以把它赋值给我们的数据模型以便使用，比如：this.products = data.body; (其中products是我们的数据模型的数组)
```

其他的方法: [api文档](https://github.com/pagekit/vue-resource/blob/develop/docs/http.md)

https://github.com/pagekit/vue-resource/blob/develop/docs/http.md

=============================================================

## 【json-server模拟数据】-扩展内容

如果会**node服务器**，可以使用node来模拟接口,或者也可以使用json-server，在它的帮助下，你能在半分钟之内搭建一个REST API服务器，支持CURD(增删改查)操作,**在前端将数据跑通后，再跟后端去协调**。

[github地址](https://github.com/typicode/json-server)

安装：`cnpm install json-server --save-dev`

【注意】这里- -save-dev是连着写的，- -save和-dev之间没有空格。表示将依赖安装到【开发环境】

因为这个json-server它不是一个插件，它只是一个开发的时候用于测试的一个代码。

在项目中使用：

首先创建一个**db.json**，放在根目录(src目录)下就可以了，它用于存放接口调用时的数据.比如：

```json
{
  "posts": [
    { "id": 1, "title": "json-server", "author": "typicode" }
  ],
  "comments": [
    { "id": 1, "body": "some comment", "postId": 1 }
  ],
  "profile": { "name": "typicode" }
}
```

`posts`,`comments`,`profile`是**我的【接口的router**】，它代表的意思是路由。

然后在dev-server.js中的var server = app.listen(port);之前添加如下代码：

```javascript
const jsonServer = require('json-server')
const apiServer = jsonServer.create()
const apiRouter = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

apiServer.use(middlewares)
apiServer.use(apiRouter)
apiServer.listen(port+1, () => {
  console.log('JSON Server is running');
})
```

【注意】将这块代码放在`var server = app.listen(port)`之前就行，现在在浏览器中访问`http://localhost:8081`应该就能进到**jsonserver页面中**

但因为`json-server`服务器的端口号跟我们的服务器端口不一样，也就是**跨域了**，所以可以在vue-cli中设置代理:

### 【设置代理的插件】http-proxy-middleware

在`config/index.js`中**设置proxyTable的值**为：

```javascript
	proxyTable: {
      //原来/api表示target路径的地址
      '/api': {
        target: 'http://127.0.0.1:8081/',
        //该属性表示是否要改变原来的地址
        changeOrigin: true,
        //重写地址后变成了/根目录代表target所对应的地址
        //其中的^符号是通配符
        pathRewrite: {
          '^/api': '/'
        }
      }
    }
```

其中'/api' 为匹配项，target 为被请求的地址

也就是说我们在浏览器中访问：http://localhost:8080/api的话，它就会跳转到这个target所代表的地址并默认追加成http://localhost:8081/api。因为在 ajax 的 url 中加了前缀 '/api'，而原本的接口是没有这个前缀的。所以需要**通过 pathRewrite 来重写地址，将前缀 '/api' 转为 '/'**

如果本身的接口地址就有 '/api' 这种通用前缀，就可以把 pathRewrite 删掉，不需要重写地址了。

也就是说，虽然被追加成http://localhost:8081/api了，但是又被pathRewrite修改成：

http://localhost:8081了。所以可以在浏览器中直接输入：

http://localhost:8080/api，但是可以访问到http://localhost:8081的地址。

这样就实现了【跨域】了。所谓跨域，就是在一个网址里访问到另一个网址中的内容。

==============================================================

【代理练习】

豆瓣电影的接口：

https://api.douban.com/v2/movie/top250

==============================================================

//配置代理

​    proxyTable: {

​    		'/posts' : {

​			//这样写表示target路径是http://127.0.0.1:8081

​			//而这里访问的是该路径下的/posts目录

​    			target : 'http://127.0.0.1:8081'

​    		},

​    		'/comments' : {

​    			target : 'http://127.0.0.1:8081'

​    		},

​    		'/profile' : {

​    			target : 'http://127.0.0.1:8081'

​    		}

​    },

在vue文件中

//数据源

​		created(){

​			this.$http.get('/posts').then(function(jsonData){

​				console.log(jsonData.body);

​			});

​			this.$http.get('/comments').then(function(jsonData){

​				console.log(jsonData.body);

​			});

​			this.$http.get('/profile').then(function(jsonData){

​				console.log(jsonData.body);

​			});

​		},

========================================================================

# 如何直接在vue组件的style使用less

在项目目录下执行命令：

`sudo  cnpm  install  less-loader  less  --save-dev`

【注意】如果是使用普通的css，则需要执行

`sudo  cnpm  install  css-loader  --save-dev`   这个css-loader一般默认会“安装”。

然后就可以在组件的style处直接写如下：

<style  lang='less'>

</style>

如果不做上面的配置，写lang=‘less’无疑会报错如下：

![屏幕快照 2017-04-26 上午10.54.24](/Users/mac/Desktop/屏幕快照 2017-04-26 上午10.54.24.png)

注意报错信息中的：vue-style-loader  css-loader说的就是没有执行：

**sudo  cnpm  install  less-loader  less  - -save-dev**

==============================================================

# 项目

馋口街
走客
平安口袋银行
中国电动车网
可及返利
豆瓣音乐人
掌中广材
助助
尾酒网
陪你宅
9平米
北京交警
一倍半
乐贴外卖
爱影订座
穷游网
酒尾网APP
晓调
魅玩
赔理宅
懒投资
酒仙网
魅玩帮
辣妈商城
饿了么
卷皮网
掌厨
康爱多
滴滴出行
美团外卖



==============================================================