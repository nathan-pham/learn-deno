import { MongoClient } from "./package.ts"

const client = new MongoClient()
const dbName = "denoSurveyAPI"

await client.connect({
    db: dbName,
    tls: true,
    servers: [{ 
        host: "cluster0-shard-00-02.n1jw5.mongodb.net",
        port: 27017,
    }],
    credential: {
        username: "denoSurveyAuth",
        password: Deno.env.get("MONGO_PASSWORD"),
        mechanism: "SCRAM-SHA-1",
        db: dbName
    }
}).catch((e: string) => console.error(e))

const db = client.database(dbName)

export const usersCollection = db.collection("users")
export const surveysCollection = db.collection("surveys")