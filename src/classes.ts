abstract class Person {
    protected _name: string
    protected _age: number
    protected _money: number

    constructor(name: string, age: number, money: number) {
        this._name = name
        this._age = age
        this._money = money
    }

    get name() {
        return this._name
    }

    get age() {
        return this._age
    }

    get money() {
        return this._money
    }

    set name(name: string) {
        this._name = name
    }

    abstract work(): number
    abstract print(): void

    birthday(): number {
        console.log(`Happy Birthday!`)
        return this._age++
    }
}

class Programmer extends Person {
    constructor(name: string, age: number, money: number) {
        super(name, age, money)
    }

    work() {
        console.log(`Working...`)
        return this._money += 50
    }

    print() {
        console.log(`Name: ${this._name}\nAge: ${this._age}\nMoney: ${this._money}`)
    }

    jog() {
        console.log('Phew!')
    }
}

const me = new Programmer('Alex', 21, 15000)

me.print()
me.work()
me.print()
me.birthday()
me.print()
