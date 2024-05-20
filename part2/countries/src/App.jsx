import { useState, useEffect } from 'react'
import InputForm from "./components/InputForm";
import Countries from "./components/Countries";
import countryService from "./services/countries";

function App() {
  const [country, setCountry] = useState('')
  const [countries, setCountries] = useState([])

  const hook = () => {
    countryService
        .getAll()
        .then(initialCountries => setCountries(initialCountries))
  }

  useEffect(hook, [])

  return (
    <>
      <InputForm country={country} setCountry={setCountry} />
      <Countries countries={countries} filter={country} />
    </>
  )
}

export default App
