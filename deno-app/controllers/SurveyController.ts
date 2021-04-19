import { RouterContext } from "../package.ts"
import Survey from "../models/Survey.ts"

class SurveyController {
    async getAllForUser(ctx: RouterContext) {
        // TODO: return value based on user id
        try {
            ctx.response.body = await Survey.findByUser('')
        } catch(e) { console.log(e) }
    }

    async getSingle(ctx: RouterContext) {

    }
    
    async create(ctx: RouterContext) {
        const result = ctx.request.body()


        // TODO: verify user jwt token
        if(result.type == "json") {
            const value = await result.value

            const survey = new Survey({ 
                name: value.name, 
                description: value.description 
            })

            await survey.create()

            Object.assign(ctx.response, {
                status: 201,
                body: survey
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
    
    async update(ctx: RouterContext) {

    }
    
    async delete(ctx: RouterContext) {

    }
}

const surveyController = new SurveyController()
export default surveyController