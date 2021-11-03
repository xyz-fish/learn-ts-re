## Literal Types 文字类型

下面的例子: 根据 let const var 的特性 changingString 类型 是 string 而 constantString的类型是 ’hello world‘ constantString 就是文字类型
```typescript
let changingString = 'hello world';

changingString = 'xyz-fish'

changingString

const constantString = 'hello world'

constantString
```

可以文字类型合联合， 数值文字类型一行的
--- ant-design源码里tuple tupleNum很好的利用这个
```typescript
function printText(s: string, alignment: 'left' | 'center' | 'right') {
	// ...
}

printText('Hello World', 'left')
printText('xyz', 'bottom') // Argument of type '"bottom"' is not assignable to parameter of type '"left" | "center" | "right"'
```

单独的文字类型也可以和其他类型结合起来一起用
```typescript
interface Options {
  width: number;
}
function configure(x: Options | "auto") {
  // ...
}
configure({ width: 100 });
configure("auto");
configure("automatic"); // Argument of type '"automatic"' is not assignable to parameter of type 'Options | "auto"'.ts(2345)
```

附带： boolean 就是 true | false 的别名

## Literal Inference 字面推理

呈上---- 我们字面类型 const stringA = 'string' 是可以推理出string的类型是 string 来看看下面的
```typescript
const obj = { counter: 0 }
if (true) {
	obi.counter = 1
}
```
这里申请一个变量是Object 属性值是0 推理出的类型 counter: number

再来一个例子
```typescript
const handleRequest = (url: string, method: 'GET' | 'POST') => { // ... }

const req = { url: "https://example.com", method: "GET"};
handleRequest(req.url, req.method) // Argument of type 'string' is not assignable to parameter of type '"GET" | "POST"'
```
情况当然可以定义给req定义一个类型 `interface Req { url: string; method: 'GET‘ | ’POST‘ }`

来看看利用文本类型处理
```typescript
// 1
const req = { url: "https://example.com", method: "GET" as "GET" };
// 2: as const 会把req素有属性类型斗战成 文本类型 => { readonly url: "https://example.com"; readonly method: "GET";}
const req = { url: "https://example.com", method: "GET" } as const;
```






