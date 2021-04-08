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

## 02_interfaces
declare a template object  
adding `[key: type]` allows you to add additional (string) keys with `any` type
```ts
let user: {
    name: string
    age: number
    [key: string]: any
}

user = {
    name: "Nathan",
    age: 16
}

user.surname = "Pham"
```
you can reuse templates in the form of **interfaces** (exact same syntax)  
allows you to declare your own "types"  
```ts
interface Person {
    name: string
    age: number
    [key: string]: any
}

let user: Person = {
    name: "Nathan",
    age: 16
}
```