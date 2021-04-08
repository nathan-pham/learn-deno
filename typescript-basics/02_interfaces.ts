interface Person {
    name: string
    age: number
    [key: string]: any
}

const user: Person = {
    name: "Nathan",
    age: 16
}