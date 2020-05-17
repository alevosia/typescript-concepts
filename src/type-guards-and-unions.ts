// objects
type Admin = {
    name: string
    privileges: string[]
}

type Employee = {
    name: string
    startDate: Date
}

// intersection types
type ElevatedEmployee = Admin & Employee

const el: ElevatedEmployee = {
    name: 'Alex',
    privileges: ['create-server'],
    startDate: new Date()
}


// primitive type unions
type Combinable = string | number
type Numeric = number | boolean

// intersection types
type Universal = Combinable & Numeric

// object type unions
type UnknownEmployee = Employee | Admin

function printEmployeeInformation(emp: UnknownEmployee) {
    console.log('Name: ' + emp.name)

    // check if property exists
    if ('privileges' in emp) {
        console.log('Privileges: ' + emp.privileges)
    }

    if ('startDate' in emp) {
        console.log('Start Date: ' + emp.startDate)
    }
}

printEmployeeInformation(el)

class Car {
    drive() {
        console.log('Driving a car')
    }
}

class Truck {
    drive() {
        console.log('Driving a truck')
    }

    loadCargo(amount: number) {
        console.log('Loading cargo: ' + amount)
    }
}

type Vehicle = Car | Truck

const v1 = new Car()
const v2 = new Truck()

function useVehicle(vehicle: Vehicle) {
    vehicle.drive()

    // check if the vehicle is an instance of Truck class
    if (vehicle instanceof Truck) {
        vehicle.loadCargo(1000)
    }
}

useVehicle(v1)
useVehicle(v2)

interface Bird {
    type: 'bird'
    flyingSpeed: number
}

interface Horse {
    type: 'horse'
    runningSpeed: number
}

// discriminated union
type Animal = Bird | Horse

function moveAnimal(animal: Animal) {
    let speed
    
    switch (animal.type) {
        case 'bird':
            speed = animal.flyingSpeed
            break

        case 'horse':
            speed = animal.runningSpeed
            break

        default:
            throw 'Invalid animal type'
    }

    console.log(`${animal.type} moving at speed: ${speed}`)
}

moveAnimal({ type: 'bird', flyingSpeed: 5 })
moveAnimal({ type: 'horse', runningSpeed: 15 })
