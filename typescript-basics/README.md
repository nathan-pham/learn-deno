# Typescript Basics

## 01_types

### Explicit Type
`: type` explicitly define a type  
```ts
let age: number = 10

age = "string" // throws an error
```

### Suppressing Errors
`!` suffix on line to ignore errors    
```ts
const randomFunction = (n: number) => n % 2 === 0 ? "even" : null

let isEven = randomFunction(4)! // ts knows it can return null, generally don't suppress this warning
isEven.substring(1)
```

### Arrays
functions that do not return anything have a **void** type  
```ts
let fruits: string[] = ["banana", "orange", "apple"]

fruits.push(4) // throws an error; array of strings not numbers
```
you can also have a multi-typed array
```ts
let fruits: (string | boolean)[] = ["banana", "orange", "apple"]
fruits.push(true) // fine
```