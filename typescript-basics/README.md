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
properties defined within an interface are required  
```ts
interface Person {
    readonly name: string
    age: number
    [key: string]: any
    hello(): string
}

let user: Person = {
    name: "Nathan",
    age: 16,
    hello(): string { return `Hello ${this.name}` }
}

user.name = "Test" // throws error
```
`readonly` properties cannot be reassigned  

## 03_classes
data modifiers: 
- `public`: can be referenced outside of a class (by default)
- `private`: invisible outside of a class
- `protected`: private + cannot be referenced from a child class
- `readonly`: cannot be altered
```ts
class Person {
    name: string
    readonly age: number
    constructor(name: string, age: number) {
        this.name = name
        this.age = age
    }
}

// similar alternative
class Person {
    constructor(
        public name: string,
        public readonly age: number
    ) {

    }
}
```
### Extending Classes
```ts
class Student extends Person {
    constructor(name: string, age: number) {
        super(name, age)
    }
}
```

## 04_generics
placed between `<types>`  
generics add abstraction & reusability  
can be applied to functions, interfaces, and classes  
placeholders to specify your own type later on 
```ts
function identity<T>(arg: T): T {
    return arg
}

// with ES6
const identity = <T> (arg: T): T => arg

identity<number>(1)
identity<string>("Hello World")
```
allows extensibility without sacrificing types with `any`
```ts
function wait<T>(value: T): Promise<T> {
    return new Promise((res, rej) => {
        setTimeout(() => res(value), 1000)
    })
}

console.log(await wait<number>(1))
```