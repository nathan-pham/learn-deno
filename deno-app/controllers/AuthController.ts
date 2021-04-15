import { RouterContext } from "../package.ts"
import { usersCollection } from "../mongo.ts"

class AuthController {
    login(ctx: RouterContext) {
        console.log("login")
    }
    async register(ctx: RouterContext) {
        const result = ctx.request.body()
        
        if(result.type === "json") {
            const value = await result.value
            console.log(value)
        }
    }
}

const authController = new AuthController()
export default authController