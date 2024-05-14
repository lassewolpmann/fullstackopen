import { useState } from 'react'

const Button = ({text, handleClick}) => (
    <button onClick={handleClick}>
        {text}
    </button>
)

const Statistic = ({name, count}) => (
    <p>{name} {count}</p>
)

const App = () => {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    return (
        <div>
            <h1>give feedback</h1>
            <Button text={"good"} handleClick={() => setGood(good + 1)} />
            <Button text={"neutral"} handleClick={() => setNeutral(neutral + 1)} />
            <Button text={"bad"} handleClick={() => setBad(bad + 1)} />

            <h1>statistics</h1>
            <Statistic name={"good"} count={good} />
            <Statistic name={"neutral"} count={neutral} />
            <Statistic name={"bad"} count={bad} />
        </div>
    )
}

export default App