import {
    Application,
    Router,
    RouterContext
} from "https://deno.land/x/oak@v6.5.0/mod.ts"

const app = new Application()
const router = new Router()

router.get('/', (ctx: RouterContext) => {
    ctx.response.body = "Hello World"
})

app.use(router.routes())
app.use(router.allowedMethods())

app.addEventListener("listen", ({ hostname="localhost", secure, port }) => {
    console.log(`listening on http${secure ? 's' : '' }://${hostname}:${port}`)
})

await app.listen({ port: 8080 })