const Person = ({ person, filter }) => {
    const name = person.name.toLowerCase()
    if (name.includes(filter)) {
        return <p>{person.name} {person.number}</p>
    }
}

const Persons = ({ persons, filter }) => (
    <div>
        {persons.map(person =>
            <Person key={person.id} person={person} filter={filter.toLowerCase()} />
        )}
    </div>
)

export default Persons