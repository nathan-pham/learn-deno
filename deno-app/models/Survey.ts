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

    create() {

    }
}