const InputForm = ({ country, setCountry }) => {
    const handleChange = (event) => {
        setCountry(event.target.value);
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