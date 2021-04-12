import { MongoClient } from "./package.ts"

const client = new MongoClient()
await client.connect(`mongodb+srv://deno_survey:${Deno.env.get("MONGO_PASSWORD")}@cluster0.n1jw5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`)

const db = client.database("deno_survey")
const usersCollection = db.collection("users")

export {
    usersCollection
}