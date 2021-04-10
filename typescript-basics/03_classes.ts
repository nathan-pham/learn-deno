class Person {
    constructor(
        public name: string,
        public readonly age: number
    ) {}

    hello() {
        console.log("Hello, my name is", this.name + '.')
    }
}


const user = new Person("Joe", 10)
user.hello()