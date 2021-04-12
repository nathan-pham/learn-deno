import { Application } from "./package.ts"
import router from "./router.ts"

const app = new Application()

app.use(router.routes())
app.use(router.allowedMethods())

app.addEventListener("listen", ({ hostname="localhost", secure, port }) => {
    console.log(`listening on http${secure ? 's' : '' }://${hostname}:${port}`)
})

await app.listen({ port: 8080 })