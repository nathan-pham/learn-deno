import { RouterContext } from "../package.ts"

class SurveyController {
    async getAllForUser(ctx: RouterContext) {
        ctx.response.body = []
    }

    async getSingle(ctx: RouterContext) {

    }
    
    async create(ctx: RouterContext) {
        const result = ctx.request.body()

        if(result.type == "json") {
            const value = await result.value
            

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