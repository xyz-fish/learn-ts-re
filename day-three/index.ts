// 1.函数类型表达式
function greeter(fn: (a: string) => void) { // 函数类型表达式
	fn('hello world')
}

function printToConsole(s: string) {
	console.log(s)
}

greeter(printToConsole)

function t0(string): void {
	console.log(string)
}

type GreetFunction = (a: string) => void; // 类型别名
function greet1(fn: GreetFunction) { }

// Call Signatures 呼叫签名
type DescriptionFunction = {
	description: string
	(someArg: number): boolean
}

function doSomething(fn: DescriptionFunction) {
	console.log(fn.description + ' returned' + fn(2))
}

// 定义的返回的类型 没有想函数式声明 用 =>

/* ------------------------- */

// Construct Signatures 构造签名
	// js里函数可以用 new 操作符 调用 so

type SomeObject = {}

type SomeConstructor = {
	new (s: string): SomeObject
}

function fn(ctor: SomeConstructor) {
	return new ctor('hello')
}

interface CallOrConstruct {
	new (s: string): Date
	(n?: number): number
}

/* ---------------------- */
// Generick Fucntions 公用函数类型
// function firstElement(arr: any[]) {
// 	return arr[0]
// }

function firstElement<T>(arr: T[]): T | undefined {
	return arr[0]
}
firstElement([1, 2, 3])
firstElement([1, '3'])
firstElement([])
// 类型TS都可以自行推导出 number nubmer | string undefined

// 当有多个参数
function map<Input, Output>(arr: Input[], func: (args: Input) => Output): Output[] {
	return arr.map(func)
}
// Parameter 'n' is of type 'string'
// 'parsed' is of type 'number[]'
const parsed = map(['1', '2', '3'], (n) => parseInt(n))

/* --------------------- */

// Constraints 约束







