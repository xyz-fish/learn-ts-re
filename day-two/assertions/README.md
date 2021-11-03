 ## 类型断言 
 ### 方式有两种: 1、as <type>  2、尖括号 <type>

### PART 1: 使用

 没有断言的时候 myCanvas 的类型推导是Element | null 加上 HTMLCanvasElement 的类型断言 类型就是变成 HTMLCanvasElement
```typescript
const myCanvas1 = document.querySelector('#canvas_id') as HTMLCanvasElement;
const myCanvas2 = <HTMLCanvasElement>document.querySelector('#canvas_id')
```
> tips: 一般使用as的方式 尖括号的的写法回合很多写法有冲突 除非是在.tsx文件。as 的写法也意思表达更明确

> Reminder: Because type assertions are removed at compile-time, there is no runtime checking associated with a type assertion. There won’t be an exception or null generated if the type assertion is wrong. 提醒: 因为类型断言是在编译时删除的，所以不存在与类型断言关联的运行时检查。如果类型断言错误，则不会生成异常或 null。

 这段内容 个人理解 是 被断言的类型是指定被赋予的类型，不会去额外的类型推到，所以使用的时候一定要对as的类型走出准确的定义


### PART 2 使用要求

当然类型断言也不是绝对的任由你随意转变类型

```typescript
const x = 'hello' as number
```
TS提示信息： `Conversion of type 'string' to type 'number' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first`

文档解释：TypeScript only allows type assertions which convert to a more specific or less specific version of a type. This rule prevents “impossible” coercions like:
限制： 只允许断言类型转化为更具体或更不具体的类型：
个人理解这段话：[A-Z] as A 这可以 [A-Z] => 1 是不可以的 A as [A-Z] 是可以的 1 => [A-Z] 是不可以的 被断言的两个类型需要与从属的关系 并且是相互的
来验证下:
```typescript
type Word = {
	prop1: number
}

type BigWord = {
	prop2: string
} & Word

type OtherWord = {
	otherProp: number
}

let word: BigWord = {
	prop1: 1,
	prop2: 'word'
}

let word2 = {
	prop1: 2
}

// 从属关系 [A-Z] => A
let wordCorrect = word as Word // is OK
let wordError = word as OtherWord
// Conversion of type 'BigWord' to type 'OtherWord' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first. Property 'otherProp' is missing in type 'BigWord' but required in type 'OtherWord'

// 从属关系 A => [A-Z]
let word2Correct = word2 as BigWord // is OK
let word2Error = word2 as OtherWord
 // Conversion of type '{ prop1: number; }' to type 'OtherWord' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first. Property 'otherProp' is missing in type '{ prop1: number; }' but required in type 'OtherWord'.ts(2352)
```
比如我们的第一个as 的例子即使 HTMLCanvasElement 是从属 ELement
```typescript
const canvas = document.querySelector('canvas') as Element // is OK
```
**温故而知新**
**确实是有了新的认知啊**

### part 3 any 来了 强制修改的方式
```typescript
const a = (expr as any) as T // 把 expr 强制改成T
```






