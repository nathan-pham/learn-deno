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
        const id = await usersCollection.insertOne({
            ...this,
            id: null
        })

        this.id = await id.toString()

        return this
    }

    static async findOne(params: object) {
        const user: any = await usersCollection.findOne(params, { noCursorTimeout: false } as any)
        const id = await user._id.toString()

        delete user._id
        user.id = id

        return new User(user)
    }
}