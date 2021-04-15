import { RouterContext } from "../package.ts"
import User from "../models/User.ts"

class AuthController {
    login(ctx: RouterContext) {
        console.log("login")
    }
    async register(ctx: RouterContext) {
        const result = ctx.request.body()
        try {
            if(result.type === "json") {
                const value = await result.value
    
                const user = await User.findOne({ 
                    email: value.email 
                })
        
                if(user) {
                    ctx.response.body = {
                        message: "email already in use"
                    }
                }
            }
        } catch(e) {
            console.log(e)
        }
    }
}

const authController = new AuthController()
export default authController