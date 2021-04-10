// --allow-read
console.log("current working directory:", Deno.cwd())
console.log("read text file", await Deno.readTextFile("./read.txt"))

Deno.writeTextFile("./write.txt", "1 2 3")