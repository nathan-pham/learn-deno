import { usersCollection } from "../mongo.ts"

export default class User {
    public id: string
    public name: string
    public email: string
    public password: string

    constructor({ id='', name='', email='', password='' }) {
        this.id = id
        this.name = name
        this.email = email
        this.password = password
    }

    async save() {
        const id = await usersCollection.insertOne(this)
        console.log(id)

        return this
    }

    static findOne(params: object) {
        return usersCollection.findOne(params, { noCursorTimeout: false } as any)
    }
}