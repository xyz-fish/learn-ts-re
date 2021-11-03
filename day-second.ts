
// type- 类型断言 1 as 2 <> 尖括号 <>有限制
// tip: 类型断言适用
var ele = document.createElement('canvas') as HTMLCanvasElement;
var ele2 = <HTMLCanvasElement>document.createElement('canvas')

// Literal Types 文字类型

let changingString = "Hello World";
changingString = "Olá Mundo";
// Because `changingString` can represent any possible string, that
// is how TypeScript describes it in the type system
changingString;

let changingString: string

const constantString = "Hello World";
// Because `constantString` can only represent 1 possible string, it
// has a literal type representation
constantString;