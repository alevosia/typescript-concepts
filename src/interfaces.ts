// type AddFn = (a: number, b: number) => number

interface AddFn {
    (a: number, b: number): number
}

let add: AddFn

add = (n1: number, n2: number) => {
    return n1 + n2
}

console.log(add(5, 6))

interface Named {
    readonly name?: string
    outputName?: string
}

interface Greetable extends Named {
    greet(phrase: string): void
}

class Human implements Greetable {
    name?: string
    age = 21

    constructor(name?: string) {
        if (name) {
            this.name = name
        }
    }

    greet(phrase: string) {
        console.log(`${phrase} ${this.name ?? 'Unknown'}.`)
    }
}

let human: Greetable

human = new Human()
human.greet('Hi there')