class Person {
    constructor(
        public name: string,
        public readonly age: number
    ) {}

    hello() {
        return `Hello, my name is ${this.name}.` 
    }
}


class Student extends Person {
    constructor(name: string, age: number) {
        super(name, age)
    }

    politelySay(greeting: string) {
        console.log(greeting)
    }
}

const student = new Student("Nathan", 15)
student.politelySay(student.hello())