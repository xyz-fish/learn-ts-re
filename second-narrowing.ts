// 缩小范围

// function padLeft(padding: number | string, input: string): string{
// 	return new Array(padding + 1).join(' ') + input
// }

function padLeft(padding: number | string, input: string): string {
	if (typeof padding === 'number') {
		return new Array(padding + 1).join(' ') + input
	}
	return padding + input
}
