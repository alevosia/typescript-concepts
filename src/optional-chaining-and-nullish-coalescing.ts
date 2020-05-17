const fetchedUserData = {
    id: '001',
    name: 'Alex',
    job: {
        title: 'CEO',
        description: 'My own company'
    }
}

// optional chaining
console.log(fetchedUserData?.job?.title)

// nullish coalescing
let userInput = 0

const storedData = userInput ?? 'DEFAULT'

console.log(storedData)