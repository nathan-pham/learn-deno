// deno run --flags file.ts
// --allow-read or --allow-read=C:/Users/nathan-pham/Desktop/projects/learn-deno
console.log("current working directory:", Deno.cwd())
console.log("read text file", await Deno.readTextFile("./read.txt"))

// --allow-write
Deno.writeTextFile("./write.txt", "1 2 3")

// --allow-env
Deno.env.get("EXAMPLE_PROPERTY")

// --allow-net or --allow-net=exact-domains
console.log(await fetch("https://jsonplaceholder.typicode.com/todos/1").then(res => res.json()))