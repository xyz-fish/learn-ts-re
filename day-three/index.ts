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

// exp1: 约束参数要有 length属性 属性值是一个number
function longest<T extends { length: number}>(a: T, b: T) {
	if (a.length >= b.length) {
		return a
	} else {
		return b
	}
}

const longerArray = longest([1, 2, 3], [1, 2])

const longerString = longest('hello world', 'xyz')

// Error! Number dont have a "length" property
const notOk = longest(10, 200)

/* 泛型都是关于用同一类型关联两个或多个值的！ */

// Working with Constrained Values 使用的约束

// exp1
function mininumlength<T extends { length: number }>(obj: T, minnum: number): T {
	if (obj.length >= minnum) {
		return obj
	}
	return {length: minnum}
}

const arrMinnum = mininumlength([1, 2, 3], 6)

console.log(arrMinnum.slice(0))

// Specifying Type Arguments 指定类型参数
function combine<T>(arr1: T[], arr2: T[]) : T[]{
	return arr1.concat(arr2)
}

combine<number | string>([1, 2, 3], ['xyz'])


// Guidelines for writing good generic function 编写良好的通用函数的指南


// 尽可能的处理参数本身的类型
function firstElement1<T>(arr: T[]): T {
	return arr[0]
}

function firstElement2<T extends any[]>(arr: T) {
	return arr[0]
}

// 类型参数的数量尽量少一些
function filter1<T>(arr: T[], func: (arg: T) => boolean): T[] {
	return arr.filter(func)
}

function filter2<T, Func extends (arg: T) => boolean>(arr: T[], func: Func): T[] {
	return arr.filter(func)
}



