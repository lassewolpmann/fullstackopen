const mongoose= require('mongoose')
mongoose.set('strictQuery',false)

const url = process.env.MONGODB_URL

mongoose.connect(url)
    .then(result => {
        console.log("Connected to MongoDB")
    })
    .catch(error => {
        console.log("Error connecting to MongoDB: ", error.message)
    })

const phonebookEntrySchema = new mongoose.Schema({
    name: String,
    number: String,
})

phonebookEntrySchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Phonebook Entry', phonebookEntrySchema)