// 类型收缩

// 先拉个列子看下什么叫做类型收缩
function padLeft(padding: number | string, input: string) {
	if (typeof padding === 'number') {
		return new Array(padding + 1).join('') + input
	}

	return padding + input
}

// 真实缩小
function printAll(strs: string | string[] | null) {
	// 存在不是null typeof object => string[]
  if (strs && typeof strs === "object") {
    for (const s of strs) {
      console.log(s);
    }
  } else if (typeof strs === "string") {
    console.log(strs);
  }
}

// 平等缩小
function example(x: string | number, y: string | boolean) {
  if (x === y) {
    // We can now call any 'string' method on 'x' or 'y'.
    x.toUpperCase();
    y.toLowerCase();
  } else {
    console.log(x);
    console.log(y);
  }
}

interface Container {
  value: number | null | undefined;
}

function multiplyValue(container: Container, factor: number) {
  if (container.value != null) {
    console.log(container.value);
    container.value *= factor;
  }
}

// assignments 工作分配
let xy = Math.random() < 0.5 ? 10 : 'xyz'

xy = 1
xy = 'bye'

x = true

// 控制流分析
function example2() {
	let x: number | string | boolean

	x = Math.random() < 0.5

	if (Math.random() < 0.3) {
		x = 'hello'
	} else {
		x = 100
	}

	return x
}

// 使用类型谓词
type Fish = { swim: () => void; name: string };
type Bird = { fly: () => void; name: string };

declare function getSmallPet(): Fish | Bird;

function isFish(pet: Fish | Bird): pet is Fish {
	return (pet as Fish).swim !== undefined
}

let pet = getSmallPet();

if (isFish(pet)) {
  pet.swim();
} else {
  pet.fly();
}

const zoo: (Fish | Bird)[] = [getSmallPet(), getSmallPet(), getSmallPet()];
const underWater1: Fish[] = zoo.filter(isFish);
// or, equivalently
const underWater2: Fish[] = zoo.filter(isFish) as Fish[];

// The predicate may need repeating for more complex examples
const underWater3: Fish[] = zoo.filter((pet): pet is Fish => {
  if (pet.name === "sharkey") return false;
  return isFish(pet);
});


// Discriminated unions 区分联合类型
interface Shape {
  kind: "circle" | "square";
  radius?: number;
  sideLength?: number;
}

// ---cut---
function handleShape(shape: Shape) {
  // oops!
  if (shape.kind === "rect") {
    // ...
  }
}

function getArea(shape: Shape) {
	if (shape.kind === 'circle') {
		return Math.PI * shape.radius ** 2
	}
	return shape.sideLength **2
}

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

interface Circle {
  kind: "circle";
  radius: number;
}

interface Square {
  kind: "square";
  sideLength: number;
}
// ---cut---
type Shape3 = Circle | Square | { kind: 'a', b: number };

function getArea3(shape: Shape3) {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "square":
      return shape.sideLength ** 2;
		default:
      const _exhaustiveCheck: never = shape;
      return _exhaustiveCheck;
  }
}