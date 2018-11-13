# vue第二节课

## Class 与 Style 绑定

在 `v-bind` 用于 `class` 和 `style` 时， Vue.js 专门增强了它。表达式的结果类型除了字符串之外，还可以是对象或数组。

### 绑定class

对象语法：

我们可以传给 `v-bind:class` 一个对象，以动态地切换 class 。

```html
<div v-bind:class="{ active: isActive }"></div>
```

上面的语法表示 class`active` 的更新将取决于数据属性 `isActive` 是否为[真值](https://developer.mozilla.org/en-US/docs/Glossary/Truthy) 。

```html
<!DOCTYPE html>
<html lang="en>
<head>
	<meta charset="UTF-8">
	<title>Document</title>
	<style type="text/css">
	.active{
		color: red;
	}
	.f30{
		font-size: 30px;
	}
	.b1{
		border:1px solid green;
	}
	</style>
	<script type="text/javascript" src="js/vue.js"></script>
</head>
<body>
	<div id="app">
		<!-- <div v-bind:class="{active:isActive}">我是文字内容</div> -->
		<div class="b1" v-bind:class="{active:isActive,f30:isFont}">我是文字内容</div>
	</div>
	
</body>
<script type="text/javascript">
	
	var app = new Vue({
		el:"#app",
		data:{
			isActive:true,
			isFont:false
		}
	});
</script>
</html>
```

你也可以直接绑定数据data里的一个对象：

```html
<body>
	<div id="app">
		<!-- <div v-bind:class="{active:isActive}">我是文字内容</div> -->
		<!-- <div class="b1" v-bind:class="{active:isActive,f30:isFont}">我是文字内容</div> -->
		<div class="b1" v-bind:class="classObject">我是文字内容</div>
	</div>
	
</body>
<script type="text/javascript">
	var app = new Vue({
		el:"#app",
		data:{
			classObject:{
				active:false,
				f30:true
			}
		}
	});
</script>
</html>
```

渲染的结果和上面一样。我们也可以在这里绑定返回对象的[计算属性](http://cn.vuejs.org/v2/guide/computed.html)。这是一个常用且强大的模式：

```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
	<style type="text/css">
	.active{
		color: red;
	}
	.text-danger{
		color: #a94442;
	}
	</style>
	<script type="text/javascript" src="js/vue.js"></script>
</head>
<body>
	<div id="app">
      	 //此时的classObject是一个计算属性
		<div v-bind:class="classObject">我是文字内容</div>
	</div>
	
</body>
<script type="text/javascript">
	
	var app = new Vue({
		el:"#app",
		data:{
			isActive:true,
			error:{
				text:'错误',
				type:'fatal'
			}
			// error:null
		},
		computed:{
			classObject:function () {
				return {
                  	 //该计算属性中依赖isActive和error属性
					active: this.isActive && !this.error,
      				'text-danger': this.error && 
                  			this.error.type === 'fatal',
				}
			}
		}
	});
</script>
</html>
```

==================================================================

### 绑定内联样式

绑定`内联样式`的语法跟绑定class非常相似，比如对象语法：

```html
<div v-bind:style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>
```

js:

```javascript
data: {
  activeColor: 'red',
  fontSize: 30
}
```

也可以跟绑定class一样绑定到一个`样式对象`：

```html
<div v-bind:style="styleObject"></div>
```

js:

```javascript
data: {
  styleObject: {
    color: 'red',
    fontSize: '13px'
  }
}
```

当然，也同样可以使用`计算属性`.

ps:当 `v-bind:style` 使用需要特定前缀的 CSS 属性时，如 `transform` ，Vue.js 会自动侦测并添加相应的前缀.



## 条件渲染

`v-if`,`v-else`条件渲染

```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
	<script type="text/javascript" src="js/vue.js"></script>
</head>
<body>
	<div id="app">
		<h1 v-if="ok">Yes</h1>
		<h1 v-else>No</h1>
	</div>
	
</body>
<script type="text/javascript">
	
	var app = new Vue({
		el:"#app",
		data:{
			ok:true
		}
	});
</script>
</html>
```

### template条件组

如果我们想切换多个元素，我们可以把一个 `<template>` 元素当做`包装元素`，并在上面使用 `v-if`。最终的渲染结果不会包含 `<template>` 元素。

```html
<template v-if="ok">
  <h1>Title</h1>
  <p>Paragraph 1</p>
  <p>Paragraph 2</p>
</template>
```

### v-else-if

`v-else-if`，顾名思义，充当 `v-if` 的“else-if 块”。可以链式地使用多次

```html
<div v-if="type === 'A'">
  A
</div>
<div v-else-if="type === 'B'">
  B
</div>
<div v-else-if="type === 'C'">
  C
</div>
<div v-else>
  Not A/B/C
</div>
```

### v-show

另一个用于根据条件展示元素的选项是 `v-show` 指令。用法大致一样：

```html
<h1 v-show="ok">Hello!</h1>
```

跟`v-if`的区别是`v-if`是“真正的”条件渲染，因为它会确保在切换过程中条件块内的事件监听器和子组件适当地被销毁和重建.

`v-if` 也是**惰性的**：如果在初始渲染时条件为假，则什么也不做——直到条件第一次变为真时，才会开始渲染条件块。

相比之下， `v-show` 就简单得多——不管初始条件是什么，元素总是会被渲染，并且只是简单地基于 CSS 进行切换。

一般来说， `v-if` 有更高的切换开销，而 `v-show` 有更高的初始渲染开销。因此，如果需要非常频繁地切换，则使用 `v-show` 较好；如果在运行时条件不太可能改变，则使用 `v-if` 较好

### v-for

用的最多的就是`item in items` 。`items`是源数据数组并且 `item` 是数组元素迭代的别名。

```html
<li v-for="item in items">
    {{ item.message }}
  </li>
```

有时候我们也可能需要获取当前项的索引:

```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
	<script type="text/javascript" src="js/vue.js"></script>
</head>
<body>
	<div id="app">
		<li v-for="(item, index) in items">
          	<!--index为索引-->
		    {{ parentMessage }} - {{ index }} - {{ item.message }}
		</li>
	</div>
	
</body>
<script type="text/javascript">
	
	var app = new Vue({
		el:"#app",
		data:{
			parentMessage: 'Parent',
			items: [
		      { message: 'Foo' },
		      { message: 'Bar' }
		    ]
		}
	});
</script>
</html>
```

除了可以循环数组意外，我们还可以通过`v-for`来`循环对象`，

有两个参数的分别为【value---key】

有三个参数的分别为【value—key---index】。

### 在组件中使用v-for

因为组件有自己独立的作用域。为了传递迭代数据到组件里，我们要用 `props`：

```html
<my-component
  v-for="(item, index) in items"
  v-bind:item="item"
  v-bind:index="index">
</my-component>
```

item和index是要传入组件的数据，得通过`v-bind:item`props属性的方式传进去

## vue组件-核心

### 什么是组件

组件（Component）是 Vue.js 最强大的功能之一 。`组件可以扩展 HTML 元素`，`封装可重用的代码`。在架构层面上，组件是自定义元素， Vue.js 的编译器为它添加特殊功能。在有些情况下，组件也可以是原生 HTML 元素的形式，以 js 特性扩展。

### 使用组件

注册组件

#### 一、全局组件

```javascript
Vue.component('my-component', {
  // 选项
})
```

#### 二、局部注册

不必在全局注册每个组件。通过使用组件实例选项注册，可以使组件仅在另一个实例/组件的作用域中可用，如下方式注册：

```java
var Child = {
  template: '<div>A custom component!</div>'
}
new Vue({
  // ...
  components: {
    // <my-component> 将只在父模板可用
    'my-component': Child
  }
})
```

如果要在局部注册的组件中再引入一个子组件可以通过***`components`嵌套***：

```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
	<script type="text/javascript" src="vue.js"></script>
</head>
<body>
	<div id="app">
		<parent>
			我是OWin老师！！！
		</parent>
		<child><child>
	</div>
	
</body>
<script type="text/javascript">
	//我是定义的一个【全局组件】
	Vue.component('parent',{
		template:`
			<div>
				<slot>当没有传东西的时候我会显示</slot>
				我是其他内容
			</div>
		`
	});	
	
	new Vue({
		el:"#app",
		components:{
			child:{
              	 //注意：template只能有一个顶级元素。
				template:`<div>
					我是child组件内容
					<inner></inner>
				</div>`,
				components:{
					inner:{
						template:`<div>我是inner组件内容</div>`
					}
				}
			}
		}
	});
  
</script>
</html>
```

这里需要注意，inner这个组件只能在child中使用，`如果在全局使用是不会出现的`：

```html
<div id="app">
  <parent>
    我是OWin老师！！！
  </parent>
  <!-- 不能直接调用inner -->
  <inner></inner>
  <!-- <child><child> -->
</div>
```

如果想在全局中调用，那么你需要在全局声明该组件。如下：

​		//组件

​		components : {

​			'child' : Child,

​			'inner' : Inner

​		}

==================================================================

#### 三、以一个.vue的单文件作为组件(推荐)

一般在.vue独立文件中包含3个部分内容:

* template部分，放的是组件中的html代码
* script部分，放的是组件的js代码
* style部分,放的是组件中的css代码

```html
<template>
  <div id="toolbar">
    <i @click="addOne" class="glyphicon glyphicon-plus"></i>
    <i @click="toggleFavorite" class="glyphicon glyphicon-star" v-bind:class="{starred:activeNote.favorite}"></i>
    <i @click="deleteNote" class="glyphicon glyphicon-remove"></i>
  </div>
</template>

<script>
export default {
  computed:{
    activeNote(){
      return this.$store.getters.activeNote
    }
  },
  methods:{
    addOne(){
      //通过dispatch分发到actions中的addNote
      this.$store.dispatch('addNote')
    },
    toggleFavorite(){
      this.$store.dispatch('toggleFavorite')
    },
    deleteNote(){
      this.$store.dispatch('deleteNote')
    }
  }
}
</script>
<style type="text/css">
	
#toolbar {
  float: left;
  width: 80px;
  height: 100%;
  background-color: #30414D;
  color: #767676;
  padding: 35px 25px 25px 25px;
}
#toolbar i {
  font-size: 30px;
  margin-bottom: 35px;
  cursor: pointer;
  opacity: 0.8;
  transition: opacity 0.5s ease;
}

#toolbar i:hover {
  opacity: 1;
}
.starred {
  color: #F7AE4F;
}
</style>
```

但使用.vue单文件组件需要`vue-loader这个模块`来处理它，当然最佳实践是使用`vue-cli这个脚手架中webpack模板`。

### 组件中的data必须是一个函数

看一个例子：

```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
	<script type="text/javascript" src="js/vue.js"></script>
</head>
<body>
	<div id="app">
		<my-btn></my-btn>
		<my-btn></my-btn>
		<my-btn></my-btn>
	</div>
</body>
<script type="text/javascript">
	var data = {counter:0}
	Vue.component('my-btn',{
		template:'<button v-on:click="counterUp">{{ counter }}</button>',
		data:function (){
			// 引用了同一个对象(会牵一发而动全身，一动百动)
			return data;
		},
		methods:{
			counterUp(){
				this.counter++;
			}
		}
	});
	var app = new Vue({
		el:"#app",
		data:{
			message:'hello Vue!'
		}
	});
</script>
</html>
```

点击任意一个另外一个组件中的值也发生了改变，因为引用了同一个对象，正确做法：

```javascript
    // var data = {counter:0} //这个不要
	Vue.component('my-btn',{
		template:'<button v-on:click="counterUp">{{ counter }}</button>',
		data:function (){
			// 这样写【每次都是返回一个新的对象】
			return {
				counter:0
			};
		},
		methods:{
			counterUp(){
				this.counter++;
			}
		}
	});
```

这样写的一个意思就是`每次都返回一个新的对象`。

==================================================================

#### 自定义事件

### 组件案例-todolist：

```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
	<script type="text/javascript" src="js/vue.js"></script>
</head>
<body>
	<div id="app">
		<input type="text" v-model="newTodoText" v-on:keyup.enter="addNewTodo" placeholder="Add a todo">
		<ul>
			<todo-item v-for="(todo, index) in todos" v-bind:title="todo" v-on:remove="removeFn(index)"></todo-item>
		</ul>
	</div>
	
</body>
<script type="text/javascript">
	Vue.component('todo-item',{
		template:`
			<li>
				{{title}}
				<button v-on:click="$emit('remove')">X</button>
			</li>
		`,
		props:['title']
	});	

	var app = new Vue({
		el:"#app",
		data:{
			newTodoText:'',
			todos:[]
		},
		methods:{
			addNewTodo:function (){
				this.todos.push(this.newTodoText);
				this.newTodoText = "";
			},
			removeFn:function (index){
				this.todos.splice(index, 1);
			}
		}
	});
</script>
</html>
```

================================================================

### 扩展—【非父子关系的数据交互】

有时候`两个非父子关系的组件也需要通信`。在简单的场景下，可以`使用一个空的 Vue 实例`作为**中央事件总线**：

```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
	<style type="text/css">
	
	</style>
	<script type="text/javascript" src="js/vue.js"></script>
</head>
  ==================================================================
<body>
	<div id="app">
		<h1>todo app</h1>
		<new-todo></new-todo>
		<todo-list></todo-list>
	</div>
</body>
  //=================================================================
<script>
	//中央事件总线
	var eventHub = new Vue( {
         //data数据
		data(){
			return{
				todos: []
			}
		},
         //计算属性
		created:function () {
			this.$on('add', this.addTodo)
			this.$on('delete', this.deleteTodo)
		},
		beforeDestroy:function () {
			this.$off('add', this.addTodo)
			this.$off('delete', this.deleteTodo)
		},
         //methods方法
		methods: {
			addTodo: function (newTodo) {
				this.todos.push(newTodo)
			},
			deleteTodo: function (i) {
				this.todos.splice(i,1)
			}
		}
	})
    //======================================================================
    //newTodo组件
	var newTodo = {
		template:`<div><input type="text" autofocus v-model="newtodo"/><button @click="add">add</button></div>`,
		data(){
			return{
				newtodo:''
			}
		},
		methods:{
			add:function(){
					eventHub.$emit('add', this.newtodo)
					this.newtodo = ''
				}
			}
		}
    //==================================================================
    //todoList组件
	var todoList = {
			template:`<ul><li v-for="(item,index) in items">{{item}} \
	          <button @click="rm(index)">X</button></li> \
	          </ul>`,
	          data(){
		          return{
		          	items:eventHub.todos
		          }
	          },
	          methods:{
	          rm:function(i){
	          	eventHub.$emit('delete',i)
	          }
	    }
	}
   // ===========================================================
	var app= new Vue({
		el:'#app',
		components:{
			newTodo: newTodo,
			todoList: todoList
		}
	})
</script>
</html>
```

**更好的方法是使用vuex**，我们在后面的vuex内容中会做介绍。



=============================END============================