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
            id: undefined
        })

        this.id = await id.toString()

        return this
    }

    static async findOne(params: object) {
        const user: any = await usersCollection.findOne(params, { noCursorTimeout: false } as any)

        return User.prepare(user)
    }

    private static prepare(user: any): User {
        return new User({
            ...user,
            id: user._id,
            _id: undefined
        })
    }
}