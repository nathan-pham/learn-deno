class User {
    constructor(public name: string) {}
}

function wait<T>(value: T): Promise<T> {
    return new Promise((res) => {
        setTimeout(() => res(value), 1000)
    })
}


console.log(await wait<User>(new User("Nathan")))