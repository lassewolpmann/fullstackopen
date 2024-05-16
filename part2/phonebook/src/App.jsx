import { useState, useEffect } from 'react'

import Persons from "./components/Persons";
import InputForm from "./components/InputForm";
import Filter from "./components/Filter";
import personService from "./services/persons";

const App = () => {
    const [persons, setPersons] = useState([])

    const hook = () => {
        personService
            .getAll()
            .then(initialPersons => setPersons(initialPersons))
    }

    useEffect(hook, [])

    const [filter, setFilter] = useState('')

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter filter={filter} setFilter={setFilter} />

            <h3>add a new</h3>
            <InputForm persons={persons} setPersons={setPersons} />

            <h3>Numbers</h3>
            <Persons persons={persons} setPersons={setPersons} filter={filter} />
        </div>
    )
}

export default App