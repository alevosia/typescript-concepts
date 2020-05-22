// Decorators ====================================
function Logger(constructor: Function) {
    console.log('\nLogging...')
    console.log(constructor)
}

@Logger
class Alien {
    name = 'Alex'

    constructor() {
        console.log('Creating alien object...')
    }
}

const alien = new Alien()
console.log(alien)

// Decorator Factories ===========================
function LoggerFactory(logString: string) {
    return function(constructor: Function) {
        console.log(logString)
        console.log(constructor)
    }
}

function WithTemplate(template: string, hookId: string) {
    console.log('Template Factory')

    return function<T extends { new(...args: any[]): { name: string } }>(originalConstructor: T) {
        
        return class extends originalConstructor {
            constructor(..._: any[]) {
                super()

                console.log('Rendering template...')
                const hookEl = document.getElementById(hookId)

                if (hookEl) {
                    hookEl.innerHTML = template
                    hookEl.querySelector('h1')!.textContent = this.name
                }
            }
        }
    }
}

@LoggerFactory('\nLogging - Centaur')
@WithTemplate('<h1></h1>', 'app')
class Centaur {
    name = 'Diosys'

    constructor() {
        console.log('Creating centaur object...')
    }
}

const centaur = new Centaur()
console.log(centaur)


function LogProperty(target: any, propertyName: string | Symbol) {
    console.log('\n--- Property Decorator ---')
    console.log(target)
    console.log(propertyName)
}

function LogAccessor(target: any, name: string | Symbol, descriptor: PropertyDescriptor) {
    console.log('\n--- Accessor Decorator ---')
    console.log(target)
    console.log(name)
    console.log(descriptor)
}

function LogMethod(target: any, name: string | Symbol, descriptor: PropertyDescriptor) {
    console.log('\n--- Method Decorator ---')
    console.log(target)
    console.log(name)
    console.log(descriptor)
}

function LogParameter(target: any, name: string | Symbol, position: number) {
    console.log('\n--- Parameter Decorator ---')
    console.log(target)
    console.log(name)
    console.log(position)
}

class Product {

    @LogProperty
    title: string
    private _price: number

    constructor(t: string, p: number) {
        this.title = t
        this._price = p
    }

    @LogAccessor
    get price() {
        return this._price
    }

    set price(val: number) {
        if (val > 0) {
            this._price = val
        } else {
            throw new Error('Invalid price - must be positive!')
        }
    }

    @LogMethod
    getPriceWithTax(@LogParameter tax: number) {
        return this.price * (1 + tax)
    }
}


// AUTOBIND ========================================

function Autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value

    const adjDescriptor: PropertyDescriptor = {
        configurable: true,
        enumerable: false,
        get() {
            const boundFn = originalMethod.bind(this)
            return boundFn
        }
    }
    
    return adjDescriptor
}

class Printer {
    message = 'This works!'

    @Autobind // replace the descriptor
    showMessage() {
        console.log(this.message)
    }
}

const printer = new Printer()

const button = document.querySelector('button')!

button.addEventListener('click', printer.showMessage)


// VALIDATION ===================================

interface ValidatorConfig {
    [property: string]: {
        [validatableProp: string]: string[] // ['required', 'positive']
    }
}

const registeredValidators: ValidatorConfig = {}

function Required(target: any, propName: string) {
    registeredValidators[target.constructor.name] = {
        ...registeredValidators[target.constructor.name],
        [propName]: ['required']
    }
}

function PositiveNumber(target: any, propName: string) {
    registeredValidators[target.constructor.name] = {
        ...registeredValidators[target.constructor.name],
        [propName]: ['positive']
    }
}

function validate(obj: any) {
    const objValidatorConfig = registeredValidators[obj.constructor.name]

    if (!objValidatorConfig) {
        return true
    }

    let isValid = true

    for (const prop in objValidatorConfig) {
        for (const validator of objValidatorConfig[prop]) {
            switch (validator) {
                case 'required':
                    isValid = isValid && obj[prop] && obj[prop].length > 0
                    break
                case 'positive':
                    isValid = isValid && obj[prop] > 0
                    break
            }
        }
    }

    return isValid
}

class Course {
    @Required
    title: string

    @PositiveNumber
    price: number

    constructor(t: string, p: number) {
        this.title = t
        this.price = p
    }
}

const courseForm = document.querySelector('form')!


courseForm.addEventListener('submit', (event) => {
    event.preventDefault()

    const titleEl = document.getElementById('title') as HTMLInputElement
    const priceEl = document.getElementById('price') as HTMLInputElement

    const title = titleEl.value
    const price = +priceEl.value

    const createdCourse = new Course(title, price)
    console.log(createdCourse)

    if (!validate(createdCourse)) {
        alert('Invalid input. Please try again!')
        return
    }
})
