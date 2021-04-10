import { green, underline } from "https://deno.land/std/fmt/colors.ts"

function test(sentence: string): string {
    return `This is some ${sentence} text`
}

const log = (...args: string[]) => console.log(...args)

log(test(green("green")))
log(test(underline("underlined")))