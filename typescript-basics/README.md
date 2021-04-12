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

## 05_enum
recommended for constants  
```ts
enum UserRole {
    ADMIN = "ADMIN",
    SCRUB = "SCRUB"
}

function isAdmin(user: UserRole) {
    return user === UserRole.ADMIN
}

const user = UserRole.ADMIN

console.log(isAdmin(user)) // true
```

## Deno CMD
```
deno install -n custom-name --allow-write index.ts
deno bundle in.ts out.bundle.ts
```
### CLI
```
deno run index.ts arguments
```
```ts
const path = Deno.args[0]
console.log("path", path)
console.log(await Deno.readTextFile(path))
```

### File Exists
```ts
function exists(path: string) {
    try {
        await Deno.lstat(path)
        return true
    } catch(e) {
        if(e instanceof Deno.errors.NotFound) {
            return false
        }

        throw e
    }
}
```

### Creating Directories
requires `--allow-read` and `--allow-write`
```ts
await Deno.mkdir("example")
await Deno.rename("example", "example-1")
await Deno.remove("example-1")
```

## Create Require
allows you to import modules from the node ecosystem  
requires `--unstable` and `--allow-read`  
```ts
import { createRequire } from "https://deno.land/std/node/module.ts"
const require = createRequire(import.meta.url)

const moment = require("moment")
console.log(moment().format("MMMM Do YYYY"))
```

## Common Questions
add the `--reload` flag to refresh dependencies  

### Lock.json
create a lock file to verify the integrity of files  
```
deno cache --lock-write --lock=deno-lock.json index.ts
```
confirm the integrity values; if a dependency is invalid it will throw an error  
```
deno cache --reload --lock=deno-lock.json index.ts 
```