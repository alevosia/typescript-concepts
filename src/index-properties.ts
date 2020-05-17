// index properties
// { email: 'Not a valid email', username: 'Must start with a character' }
interface ErrorContainer {
    [prop: string]: string
}

const errorBag: ErrorContainer = {
    email: 'Not a valid email!',
    username: 'Must start with'
}