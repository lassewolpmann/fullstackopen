import { useState, useEffect } from 'react'

import Persons from "./components/Persons.jsx";
import InputForm from "./components/InputForm.jsx";
import Filter from "./components/Filter.jsx";

import axios from "axios";

const App = () => {
    const [persons, setPersons] = useState([])

    const hook = () => {
        axios
            .get('http://localhost:3001/persons')
            .then(response => {
                setPersons(response.data)
            })
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
            <Persons persons={persons} filter={filter} />
        </div>
    )
}

export default App