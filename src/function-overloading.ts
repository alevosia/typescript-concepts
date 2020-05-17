function addNumbersOrStrings(a: number, b:number): number
function addNumbersOrStrings(a: string, b:string): string
function addNumbersOrStrings(a: number, b:string): string
function addNumbersOrStrings(a: string, b:number): string
function addNumbersOrStrings(a: Combinable, b: Combinable) {
    // type guard
    if (typeof a ==='string' || typeof b === 'string') {
        return a.toString() + b.toString()
    }

    return a + b
}

const result = addNumbersOrStrings('Alex', 'ander')
console.log(result)

const sum = addNumbersOrStrings(5, 4)
console.log(sum)