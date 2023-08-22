const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
    `mongodb+srv://hennakari:${password}@cluster0.t5hcsyp.mongodb.net/peopleApp?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const peopleSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', peopleSchema)

if (process.argv.length === 3) {
    Person.find({}).then(result => {
        console.log('phonebook:')
        result.forEach(person => {  
          console.log(person.name, person.number)
        })
        mongoose.connection.close()
    })
} else if (process.argv.length === 5) {
    const person = new Person({
        name: process.argv[3],
        number: process.argv[4],
    })
    
    person.save().then(result => {
      console.log(`added ${person.name} number ${person.number} to phonebook`)
      mongoose.connection.close()
    })
} else {
    console.log('please give correct amount of arguments')
    process.exit(1)
}



