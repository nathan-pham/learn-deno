import { surveysCollection } from "../mongo.ts"

export default class Survey {
    public id: string
    public name: string
    public userId: string
    public description: string
    
    constructor({ id = '', name = '', userId = '', description = '' }) {
        this.id = id
        this.name = name
        this.userId = userId
        this.description = description
    }

    async create() {
        const id = await surveysCollection.insertOne({
            ...this,
            id: undefined
        })

        this.id = await id.toString()

        return this
    }

    static async findByUser(userId = ''): Promise<Survey[]> {
        const surveys = await surveysCollection.find({ userId }, { noCursorTimeout: false } as any).toArray()
        return surveys.map((survey: any) => Survey.prepare(survey))
    }

    private static prepare(survey: any): Survey {
        return new Survey({
            ...survey,
            id: survey._id,
            _id: undefined,
        })
    }
}