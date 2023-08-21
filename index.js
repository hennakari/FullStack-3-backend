const express = require('express')
const app = express()

app.use(express.json())

let persons = [
    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456",
        
      },
      {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523",
        
      },
      {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345",
        
      },
      {
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122",
        
      }
  ]

app.get('/', (req, res) => {
    res.send('<h1>Hello!</h1>')
})
  
app.get('/api/persons', (req, res) => {
    console.log(persons)
    res.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
})

const getRandomInt = (min, max) => {
    min = Math.ceil(min)
    max = Math.floor(max)
    const id =  Math.floor(Math.random() * (max - min) + min)
    const idExisting = persons.find(person => person.id === id)
    if (idExisting !== undefined) {
        console.log("Id must be unique")
        return 0
    }
    return id
}

app.post('/api/persons', (request, response) => {
    let id = getRandomInt(1,100)
    while (id === 0){
        id = getRandomInt(1,100)
    }
    const person = request.body
    person.id = id
    persons = persons.concat(person)
    console.log(person)
    response.json(person)  
})


app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
    console.log(persons)
    response.status(204).end()
})

app.get('/info', (req, res) => {
    const dataLength = persons.length
    const date = new Date()
    res.send("<p>Phonebook has info for "+dataLength+" people</p><p>"+date+"<p>")
})

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)