import { useState } from "react";
import personService from "../services/persons";
import Notification from "./Notification.jsx";

const InputForm = ({ persons, setPersons }) => {
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [message, setMessage] = useState(null)
    const [messageStatus, setMessageStatus] = useState('')

    const addPerson = (event) => {
        event.preventDefault()
        const personObject = {
            name: newName,
            number: newNumber,
            id: (persons.length + 1).toString()
        }

        const duplicate = persons.find(person => person.name === newName)
        if (duplicate) {
            if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
                const copy = [...persons]
                const index = copy.indexOf(duplicate)
                copy[index].number = personObject.number
                setPersons(copy)

                personService
                    .update(duplicate.id, personObject)
                    .catch((error) => {
                        setMessage(`Information of ${newName} has already been removed from the server`)
                        setMessageStatus('error')
                    })

                setMessage(`Changed number of ${newName}`)
                setMessageStatus('success')
            }
        } else {
            personService
                .create(personObject)

            setPersons(persons.concat(personObject))
            setMessage(`Added ${newName}`)
            setMessageStatus('success')
        }

        setTimeout(() => {
            setMessage(null)
            setMessageStatus('')
        }, 5000)

        setNewName('')
        setNewNumber('')
    }

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }

    return (
        <form onSubmit={addPerson}>
            <Notification message={message} className={messageStatus} />
            <div>
                name: <input value={newName} onChange={handleNameChange}/>
            </div>
            <div>
                number: <input value={newNumber} onChange={handleNumberChange}/>
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default InputForm