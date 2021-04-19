import { RouterContext, hash, compare, makeJwt, setExpiration } from "../package.ts"
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

            const user: any = await User.findOne({
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

                return
            }

            const jwt = await makeJwt({ alg: "HS512", typ: "JWT" }, {
                iss: user.email,
                exp: setExpiration(new Date().getTime() * 60 * 60 * 1000)
            }, Deno.env.get("JWT_SECRET")!)
            

            ctx.response.body = {
                jwt,
                ...user,
                password: undefined
            }
        } else {
            Object.assign(ctx.response, {
                status: 422,
                body: {
                    message: "payload must be json"
                }
            })
        }
    }
    async register(ctx: RouterContext) {
        const result = ctx.request.body()
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
        } else {
            Object.assign(ctx.response, {
                status: 422,
                body: {
                    message: "payload must be json"
                }
            })
        }
    }
}

const authController = new AuthController()
export default authController