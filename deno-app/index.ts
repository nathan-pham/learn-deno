import * as http from "https://deno.land/std@0.92.0/http/server.ts"

const port = 8080

const app: http.Server = http.serve({ port })
console.log(`started server on http://localhost:${ port }`)

for await (const req: http.ServerRequest of app) {
    switch(req.url) {
        case '/':
            req.respond({ body: "hello world" })
            break
        case '/about':
            req.respond({ body: "about page" })
            break
        default:
            req.respond({ body: "404" })
    }
}