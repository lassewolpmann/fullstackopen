const DetailedCountry = ({ country }) => {
    const name = country["name"]["common"]
    const capitals = country["capital"]
    const area = country["area"]
    const languages = Object.values(country["languages"])
    const flag = country["flags"]["svg"]
    const flagAlt = country["flags"]["alt"]

    return (
        <div>
            <h2>{name}</h2>
            <p>capital(s): {capitals.join(", ")}</p>
            <p>area: {area}</p>

            <h3>languages:</h3>
            <ul>
                {languages.map((language) => (
                    <li key={language}>{language}</li>
                ))}
            </ul>

            <img src={flag} alt={flagAlt} width="128px" />
        </div>
    )
}

const Country = ({ country }) => (
    <p>{country["name"]["common"]}</p>
)

const Countries = ({ countries, filter }) => {
    const filteredCountries = countries.filter((country) => {
        const name = country["name"]["common"].toLowerCase()

        return name.includes(filter.toLowerCase())
    })

    if (filteredCountries.length > 10) {
        return (
            <p>Too many matches, specify another filter</p>
        )
    } else if (filteredCountries.length === 1) {
        return (
            <>
                <DetailedCountry country={filteredCountries[0]} />
            </>
        )
    } else {
        return (
            <>
                {filteredCountries.map(country =>
                    <Country key={country["cca2"]} country={country} />
                )}
            </>
        )
    }
}

export default Countries