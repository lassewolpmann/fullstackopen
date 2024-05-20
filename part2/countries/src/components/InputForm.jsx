const InputForm = ({ country, setCountry, setSelectedCountry }) => {
    const handleChange = (event) => {
        setCountry(event.target.value);
        setSelectedCountry(null);
    }

    return (
        <form>
            <div>
                find countries <input value={country} onChange={handleChange}/>
            </div>
        </form>
    )
}

export default InputForm