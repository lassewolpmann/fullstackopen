import personService from "../services/persons";

const Person = ({ person, persons, setPersons, filter }) => {
    const name = person.name.toLowerCase()

    const handleDelete = () => {
        if (window.confirm(`Delete ${person.name}?`)) {
            const copy = [...persons]
            const index = copy.indexOf(person)
            copy.splice(index)
            setPersons(copy)

            personService
                .remove(person.id)
        }
    }

    if (name.includes(filter)) {
        return (
            <p>{person.name} {person.number} <button onClick={handleDelete}>delete</button></p>
        )
    }
}

const Persons = ({ persons, setPersons, filter }) => (
    <div>
        {persons.map(person =>
            <Person key={person.id} person={person} persons={persons} setPersons={setPersons} filter={filter.toLowerCase()} />
        )}
    </div>
)

export default Persons