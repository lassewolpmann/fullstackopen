import { useState, useEffect } from 'react'
import InputForm from "./components/InputForm";
import Countries from "./components/Countries";
import countryService from "./services/countries";

function App() {
  const [country, setCountry] = useState('')
  const [countries, setCountries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState(null)

  const hook = () => {
    countryService
        .getAll()
        .then(initialCountries => setCountries(initialCountries))
  }

  useEffect(hook, [])

  return (
    <>
      <InputForm country={country} setCountry={setCountry} setSelectedCountry={setSelectedCountry} />
      <Countries countries={countries} filter={country} selectedCountry={selectedCountry}
                 setSelectedCountry={setSelectedCountry} />
    </>
  )
}

export default App
