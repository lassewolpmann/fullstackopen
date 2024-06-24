const mongoose= require('mongoose')

const password = encodeURIComponent(process.argv[2])

if (!password) {
    console.log("No password provided")
    process.exit(1)
}

const name = process.argv[3]
const number = process.argv[4]

const url =
    `mongodb+srv://lassewolpmann:${password}@fullstackopen.f24iplu.mongodb.net/?retryWrites=true&w=majority&appName=FullstackOpen`

mongoose.set('strictQuery',false)

mongoose.connect(url)

const phonebookEntrySchema = new mongoose.Schema({
    name: String,
    number: String,
})

const PhonebookEntry = mongoose.model('Phonebook Entry', phonebookEntrySchema)

if (!name || !number) {
    // List all phonebook entries
    PhonebookEntry.find({})
        .then(result => {
            console.log("Phonebook:")
            result.forEach(entry => {
                console.log(`${entry.name} ${entry.number}`)
            })

            mongoose.connection.close()
                .then(r => console.log("Closed connection"))
        });
} else {
    // Create new entry
    const entry = new PhonebookEntry({
        name: name,
        number: number
    })

    entry.save()
        .then(result => {
            console.log(`added ${name} number ${number} to phonebook`)
            mongoose.connection.close()
                .then(r => console.log("Closed connection"))
        })
}