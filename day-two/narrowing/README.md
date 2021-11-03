## Narrowing  类型收缩

先来个例子看下什么叫做类型收缩

```typescript
function padLeft(padding: number | string, input: string) {
	if (typeof padding === 'number') {
		return new Array(padding + 1).join('') + input
	}

	return padding + input
}
```