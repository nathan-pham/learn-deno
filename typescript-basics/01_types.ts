const add = (a: number, b: number) => a + b
const allNumbers = [1, 2, 3, 4, 5]

const result: number = allNumbers.reduce((acc: number, cur: number) => add(acc, cur), 0)

console.log(result)
