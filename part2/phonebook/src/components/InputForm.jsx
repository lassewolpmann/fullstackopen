import { useState } from "react";
import personService from "../services/persons";

const InputForm = ({ persons, setPersons }) => {
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')

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
            }
        } else {
            personService
                .create(personObject)

            setPersons(persons.concat(personObject))
        }

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