require('dotenv').config()
const express = require('express')
const morgan = require('morgan')

const app = express()

const cors = require('cors')
const Person = require('./models/person')

app.use(cors())
app.use(express.static('dist'))

app.use(express.json())
//app.use(morgan('tiny'))

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :json'));

morgan.token('json', function(req, res){ return JSON.stringify(req.body); })



/* if (process.argv.length<3) {
  console.log('give password as argument')
  console.log(process.argv)
  process.exit(1)
}

const password = process.argv[2]

const url =
    `mongodb+srv://hennakari:${password}@cluster0.t5hcsyp.mongodb.net/peopleApp?retryWrites=true&w=majority` */

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

morgan.token('type', function (req, res) { return req.headers['content-type'] })

app.get('/', (req, res) => {
    res.send('<h1>Hello!</h1>')
})
  
app.get('/api/persons', (request, response) => {
    Person.find({}).then(people => {
        response.json(people)
      })
})

app.get('/api/notes', (request, response) => {
    Note.find({}).then(notes => {
      response.json(notes)
    })
  })

app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id).then(person => {
      response.json(person)
    })
})

/* app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
}) */

/* const getRandomInt = (min, max) => {
    min = Math.ceil(min)
    max = Math.floor(max)
    const id =  Math.floor(Math.random() * (max - min) + min)
    const idExisting = persons.find(person => person.id === id)
    if (idExisting !== undefined) {
        console.log("Id must be unique")
        return 0
    }
    return id
} */

app.post('/api/persons', (request, response) => {
    const body = request.body
  
    if (body.name === undefined) {
      return response.status(400).json({ error: 'name missing' })
    }

    if (body.number === undefined) {
        return response.status(400).json({ error: 'number missing' })
      }
  
    const person = new Person({
        name: body.name,
        number: body.number
    })
  
    person.save().then(savedPerson => {
      response.json(savedPerson)
    })
  })

/* app.post('/api/persons', (request, response) => {

    const person = request.body
    console.log(person)

    let id = getRandomInt(1,100)
    while (id === 0){
        id = getRandomInt(1,100)
    }

    if ((!person.name) || (person.name.trim() === "")) {
        return response.status(400).json({ 
            error: 'name missing' 
        })    
    }

    if ((!person.number) || (person.number.trim() === "")) {
        return response.status(400).json({ 
            error: 'number missing' 
        })    
    }

    const names = persons.map(person => person.name)
    if (names.includes(person.name)) {
        return response.status(400).json({ 
            error: 'name must be unique' 
        })    
    }

    const newPerson = {
        id: id,
        name: person.name,
        number: person.number,
    }

    persons = persons.concat(newPerson)
    console.log(newPerson)
    response.json(newPerson)  
}) */


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

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})