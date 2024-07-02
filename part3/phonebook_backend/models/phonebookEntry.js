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
    name: {
        type: String,
        minLength: 3,
        required: true
    },
    number: {
        type: String,
        minLength: 8,
        required: true,
        validate: {
            validator: function(v) {
                return /^\d{2,3}-\d+$/gm.test(v)
            },
            message: props => `${props.value} is not a valid phone number!`
        }
    },
})

phonebookEntrySchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Phonebook Entry', phonebookEntrySchema)