// part1 1
const myCanvas1 = document.querySelector('#canvas_id') as HTMLCanvasElement;
const myCanvas2 = <HTMLCanvasElement>document.querySelector('#canvas_id')

const canvas = document.querySelector('canvas') as Element

// part 2
const x = 'hello' as number

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

let wordCorrect = word as Word
let wordError = word as OtherWord

let word2Correct = word2 as BigWord
let word2Error = word2 as OtherWord

