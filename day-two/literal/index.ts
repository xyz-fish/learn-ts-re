// part 1
let changingString = 'hello world';

changingString = 'xyz-fish'

changingString

const constantString = 'hello world'

constantString

// part 2
function printText(s: string, alignment: 'left' | 'center' | 'right') {
	// ...
}

printText('Hello World', 'left')
printText('xyz', 'bottom')

// part 3
interface Options {
  width: number;
}
function configure(x: Options | "auto") {
  // ...
}
configure({ width: 100 });
configure("auto");
configure("automatic");

// Literal Inference

const string = 'hi xyz'

const obj = { counter: 0 };
if (true) {
  obj.counter = 1;
}

const handleRequest = (url: string, method: 'GET' | 'POST') => {
	// ...
}

// part 1
// Change 1:
const req = { url: "https://example.com", method: "GET" } as const
handleRequest(req.url, req.method)
