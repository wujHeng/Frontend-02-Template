学习笔记
Js 运算符和表达式  
最高优先级 member类型  .获取属性值；``；super(构造函数内)；new.target;带括号的new a() 优先级高与 new a;
      引用类型 object;key;delete;assign;
	Call expressions new a()[‘b’]
	Update a++ a-- --a ++a
unary delete a.b; viod foo()//空格回车 ;typeof ;+a; -a;!;await    exponential ** 乘方//重右开始运算；
等号
&^|  异或 相位或
&&；||
?:
类型转换
	拆箱转换  objec转换成其他的类型
		Object相加
先走[stmbol.toPrimitive](){}里面的代码;2走->valueOf;3走->toString;
当对象作为对象的属性名
先走[stmbol.toPrimitive](){}里面的代码2走->toString;
3走->valueOf
	装箱转换
	Js语句
		简单语句Throw/countinue/break/return
		复合语句if/block {}/switch/iteration (while,for,for in,for of,for await(of)) /with/labelled/try  （label break 可以一下子跳出多个循环） 
		声明 function(*:generator,async异步)/lexical(let;const)
		预处理（）作用域（{var}作用域在函数体内，{const}作用域在{}内）
	Js执行粒度	宏任务 (setTimeout/定时器/script ;传给js引擎的任务) 微任务（promise /.then  ;在js引擎内部的任务）同一事件循环中 微任务永远在宏任务之前执行  事件循环（等待加上获取代码）
