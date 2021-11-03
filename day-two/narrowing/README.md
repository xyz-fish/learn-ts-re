## Narrowing  类型收缩

先来个例子看下什么叫做类型收缩
```typescript
function padLeft(padding: number | string, input: string) {
	if (typeof padding === 'number') {
		return new Array(padding + 1).join('') + input
	}

	return padding + input
}
```
###### 个人理解：对多种类型判断的判断分解处理 ---- 像我们学完后要做的项目 xufei的类型象棋 很多 extends ? 条件判断等

### typeof type guard 类型保
	对于typeof 的判断也是根据js的判断来执行的： 对于 typeof === 'object' 的处理需要考虑到null、array的情况

### 有哪些类型收缩？
- Truthiness narrowing 真实性缩小
	在js中可于 (== 或者 !! Boolean) false 的时候
	1. 0
	2. NaN
	3. "" (the empty string)
	4. 0n (the bigint version of zero)
	5. null
	6. undefined

- Equality narrowing 平等缩小
	使用 switch 语句和相等性检查，比如 = = = 、 ! = = 、 = = 和! = 来缩小类型:
	```tyepscript
	function example(x: string | number, y: string | boolean) {
		if (x === y) {
			// 这里x, y只能是 string
			x.toUpperCase();
			y.toLowerCase();
		} else {
			console.log(x);
			console.log(y);
		}
	}
	```
	**ts的强大在逐渐展露出来了**

	官方文档还给了一个例子：!= null 也可以 但一般建议去全等


- The in operator narrowing - in 操作缩小
	js里遍历 for in 的特性

- instanceof 通过实例的判断

- Assignments 工作分配
	根据条件推理出联合类型

- Control flow analysis 控制流分析

	通过一些代码, TS会分子你的代码 把 定义的类型缩小 string | number | boolean => string | number
	```typscript
	function example2() {
		let x: number | string | boolean

		// 代码流程开始
		x = Math.random() < 0.5

		if (Math.random() < 0.3) {
			x = 'hello'
		} else {
			x = 100
		}
		// 代码流程结束
		return x // 最终TS 分析 这里 类型是 number | string
	}
	```

- Using type predicates 使用类型判断的关键字

	使用方式： `{param} is <type>`

	**感觉重点又来了**
	代码来分析下吧
	```typescript
	type Fish = { swim: () => void };
	type Bird = { fly: () => void };

	// 我们的值的类型是一个联合类型 怎么去使用呢
	declare function getSmallPet(): Fish | Bird;

	function isFish(pet: Fish | Bird): pet is Fish {
		return (pet as Fish).swim !== undefined
	}

	let pet = getSmallPet(); // 这列类型是 Fish | Bird

	if (isFish(Fish)) {
		pet.swim(); // 这里我们的pet类型缩小成 Fish
	} else {
		pet.fly(); // 这里pet 类型缩小成了 Bird
	}

	// 可能会有这样的写法
	if (pet.swim) { // 但是TS会提示 pet.swim 不存在 Fish | Bird, 也不能存在 Bird 
		// xxx
	} else {}

	```
	所以这里 遇到联合类型的时候通过is来去缩小类型 然后再去在确定类型的块去写代码 TS 越来越香了

	看下对于官方数组的一个类型缩小
	```typescript
	type Fish = { swim: () => void; name: string };
	type Bird = { fly: () => void; name: string };
	declare function getSmallPet(): Fish | Bird;
	function isFish(pet: Fish | Bird): pet is Fish {
		return (pet as Fish).swim !== undefined;
	}
	// ---cut---
	const zoo: (Fish | Bird)[] = [getSmallPet(), getSmallPet(), getSmallPet()];
	const underWater1: Fish[] = zoo.filter(isFish);
	// or, equivalently
	const underWater2: Fish[] = zoo.filter(isFish) as Fish[];

	// The predicate may need repeating for more complex examples
	const underWater3: Fish[] = zoo.filter((pet): pet is Fish => {
		if (pet.name === "sharkey") return false;
		return isFish(pet);
	});
	```

- Discriminated unions 区分联合类型

	先来个问题场景：我们要绘制一个图： 这个图可以是： 圆形，也可以是：正方形;
	圆形的时候要知道半径，正方形的时候要获知边长
	```typescript
	// 定义一个参数类型
	interface Shape {
		kind: 'circle' | 'square'
		raduis?: number
		sideLength?: number
	}

	// 定义画图的方法
	function getArea(shape: Shape) {
		if (shape.kind === 'circle') {
			return Math.PI * shape.radius ** 2 // Object is possibly 'undefined'
		}
		return shape.sideLength **2 // also   Object is possibly 'undefined'
	}
	```
	上述情况可咋搞呢？？？重点又来了。。
	```typescript
	interface Circle {
		kind: "circle";
		radius: number;
	}

	interface Square {
		kind: "square";
		sideLength: number;
	}

	type ShapeCorret = Circle | Square;

	function getArea2(shape: ShapeCorret) {
		if (shape.kind === 'circle') {
			return Math.PI * shape.radius ** 2
		}
		return shape.sideLength **2
	}
	```
	上面的代码完美解决了 很多时候 和 累次判断is一起使用 很舒服

- never
	当类型被缩小到没有其他选项的时候 会有一个never的类型

- Exhaustiveness checking 彻底检查
	使我们的类型缩小 代码更加严谨
	```typescript
	interface Circle {
		kind: "circle";
		radius: number;
	}

	interface Square {
		kind: "square";
		sideLength: number;
	}

	interface Three {
		kind: 'three',
		value: number
	}

	type Shape3 = Circle | Square;

	function getArea3(shape: Shape3) {
		switch (shape.kind) {
			case "circle":
				return Math.PI * shape.radius ** 2;
			case "square":
				return shape.sideLength ** 2;
			default:
				const _exhaustiveCheck: never = shape; // 这里去检测没有其他的kind
				return _exhaustiveCheck;
		}
	}

	// 如果 Shape3 = Circle | Square | Three 贼会报错
	```




