import { MongoClient } from "./package.ts"

const client = new MongoClient()
await client.connect({
    db: "denoSurveyAPI",
    tls: true,
    servers: [
        { 
            host: "cluster0-shard-00-02.n1jw5.mongodb.net",
            port: 27017,
        },
    ],
    credential: {
        username: "denoSurveyAuth",
        password: Deno.env.get("MONGO_PASSWORD"),
        mechanism: "SCRAM-SHA-1",
        db: "denoSurveyAPI"
    }
})

const db = client.database("denoSurveyAPI")
const usersCollection = db.collection("users")

export {
    usersCollection
}