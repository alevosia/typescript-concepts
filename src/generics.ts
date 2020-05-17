// GENERICS ==============================================
// flexibility without using any type which ensures type safety

function mergeTwoObjects<T, U>(objA: T, objB: U) {
    return Object.assign(objA, objB)
}

// const mergedObject = mergeTwoObjects<{ name: string }, { age: number }>({ name: 'Alex' }, { age: 21 })
const mergedObject = mergeTwoObjects({ name: 'Alex' }, { age: 21 })
console.log(mergedObject)

const mergedObject2 = mergeTwoObjects({ name: 'Alex', hobbies: ['Games', 'Coding'] }, { age: 21 })
console.log(mergedObject2)

// failes due to constraints
console.log(mergedObject2)



// CONSTRAINTS ========================================== 
function mergeTwoObjectsWithConstraints<T extends object, U extends object>(objA: T, objB: U) {
    return Object.assign(objA, objB)
}

// error due to type constraints
// const mergedObject3 = mergeTwoObjectsWithConstraints({ name: 'Xander' }, 21)


interface Lengthy {
    length: number
}

// parameter must have a length property
function countAndDescribe<T extends Lengthy>(element: T): [T, string] {
    let descriptionText = 'Got no value.'

    if (element.length > 0) {
        descriptionText = `Got ${element.length} elements.`
    }

    return [element, descriptionText]
}

const cad = countAndDescribe('Hi there!')
console.log(cad)

const cad2 = countAndDescribe([1, 2, 3])
console.log(cad2)

// error
// const cad3 = countAndDescribe(5)



// KEYOF CONSTRAINT =====================================
// second parameter must ba a propert or a key of first parameter object
function extractAndConvert<T extends object, U extends keyof T>(obj: T, key: U) {
    return `Value: ${obj[key]}`
}

const keyofObject = {
    name: 'Alex',
    age: 21
}

const val = extractAndConvert(keyofObject, 'name')
console.log(val)



// GENERIC CLASSES =======================================
// generic class that is flexible and reusable to store any type of data array
class DataStorage<T> {
    private data: T[] = []

    addItem(item: T) {
        this.data.push(item)
    }

    removeItem(item: T) {
        if (this.data.indexOf(item) === -1) {
            return
        }

        this.data.splice(this.data.indexOf(item), 1)
    }

    getItems() {
        return [...this.data]
    }
}

// specify what type of data to store
const textStorage = new DataStorage<string>()

// error
// textStorage.addItem(5)

textStorage.addItem('Sample')
textStorage.addItem('Item')
textStorage.addItem('Test')
textStorage.removeItem('Item')
console.log(textStorage.getItems())

// restrict to primitive values only
class PrimitiveDataStorage<T extends string | number | boolean> {
    private data: T[] = []

    addItem(item: T) {
        this.data.push(item)
    }

    removeItem(item: T) {
        if (this.data.indexOf(item) === -1) {
            return
        }
        
        this.data.splice(this.data.indexOf(item), 1)
    }

    getItems() {
        return [...this.data]
    }
}

const numbersStorage = new PrimitiveDataStorage<number>()

numbersStorage.addItem(1)
numbersStorage.addItem(2)
numbersStorage.addItem(3)
numbersStorage.removeItem(2)
console.log(numbersStorage.getItems())


// GENERIC UTILITY TYPES =======================================
interface CourseGoal {
    title: string
    description: string
    completeUntil: Date
}

function createCourseGoal(title: string, description: string, date: Date): CourseGoal {
    // make properties optional temporarily
    let courseGoal: Partial<CourseGoal> = {}

    courseGoal.title = title
    courseGoal.description = description
    courseGoal.completeUntil = date

    // cast to required return type
    return courseGoal as CourseGoal
}

const names: Readonly<string[]> = ['Alex', 'Paul']
// names.push('Joey') <-- Error