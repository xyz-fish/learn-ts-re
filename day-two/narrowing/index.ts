// 类型收缩

// 先拉个列子看下什么叫做类型收缩
function padLeft(padding: number | string, input: string) {
	if (typeof padding === 'number') {
		return new Array(padding + 1).join('') + input
	}

	return padding + input
}

// part 1
