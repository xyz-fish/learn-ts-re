## null & undefined

### 看下官方解释

JavaScript has two primitive values used to signal absent or uninitialized value: null and undefined.

JavaScript 有两个用于表示缺失或未初始化值的基本值: null 和 undefined。

- 来看下相对应的tsconfig.json的配置

	strickNullChecks
	打开和关闭来判断是否去严格校验

- 遇到这种情况的一些处理
	通过 ! 运算符 这样可以省去null 和 undefined 的判断
	```typescript
	function liveDangerously(x?: number | null) {
		// No error
		console.log(x!.toFixed());
	}
	```

## enums ---- 先过一遍

## Less Common Primitives 不太常见的原语

1、bignit 类型 去用Bignit的时候 tsconfig里target: es2020

2、symbol
```typescript
const firstName = Symbol('name') // 类型 typeof firstName
const secondName = Symbol('name') // 类型 typeof secondName
```

