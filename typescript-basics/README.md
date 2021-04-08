# Typescript Basics

## 01_types
`!` suffix on line to ignore errors    
`: type` explicitly define a type  
```ts
const randomFunction = (n: number) => n % 2 === 0 ? "even" : null

let isEven = randomFunction(4)! // ts knows it can return null, generally don't suppress this warning
isEven.substring(1)

```
functions that do not return anything have a **void** type  
```ts
let fruits: string[] = ["banana", "orange", "apple"]

fruits.push(4) // throws an error; array of strings not numbers
```