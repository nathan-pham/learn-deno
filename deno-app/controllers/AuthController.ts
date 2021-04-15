import { RouterContext, hash, compare } from "../package.ts"
import User from "../models/User.ts"

class AuthController {
    async login(ctx: RouterContext) {
        const result = ctx.request.body()

        if(result.type == "json") {
            const value = await result.value

            if(!value.email || !value.password) {
                Object.assign(ctx.response, {
                    status: 422,
                    body: {
                        message: "provide an email and password"
                    }
                })

                return
            }

            const user = await User.findOne({
                email: value.email
            })

            if(!user) {
                Object.assign(ctx.response, {
                    status: 422,
                    body: {
                        message: "an account associated with this email does not exist"
                    }
                })

                return
            }
            
            const match = await compare(value.password, user.password)
            if(!match) {
                Object.assign(ctx.response, {
                    status: 422,
                    body: {
                        message: "incorrect password"
                    }
                })
            }
        }
    }
    async register(ctx: RouterContext) {
        const result = ctx.request.body()
        try {
        if(result.type === "json") {
            const value = await result.value
    
            const userExists = await User.findOne({ 
                email: value.email 
            })
        
            if(userExists) {
                Object.assign(ctx.response, {
                    status: 422,
                    body: {
                        message: "email is already in use"
                    }
                })

                return
            }

            const user = new User({ 
                ...value,
                password: await hash(value.password)
            })

            await user.save()

            Object.assign(ctx.response, {
                status: 201,
                body: {
                    id: user.id,
                    name: user.name,
                    email: user.email
                }
            })
        }
    }catch(e) { console.log(e) }
    }
}

const authController = new AuthController()
export default authController