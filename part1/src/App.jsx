import { useState } from 'react'

const Button = ({text, handleClick}) => (
    <button onClick={handleClick}>
        {text}
    </button>
)

const Statistic = ({name, count}) => (
    <tr><td>{name}</td><td>{count}</td></tr>
)

const Average = ({good, neutral, bad, total}) => {
    const score = good + (bad * -1)

    return <tr><td>average</td><td>{score/total}</td></tr>
}

const Positive = ({good, neutral, bad, total}) => {
    const positivePercent = (good / total) * 100

    return <tr><td>positive</td><td>{positivePercent} %</td></tr>
}

const Statistics = ({good, neutral, bad}) => {
    const total = good + neutral + bad

    if (total === 0) return <p>No feedback given</p>

    return (
        <table>
            <tbody>
                <Statistic name={"good"} count={good}/>
                <Statistic name={"neutral"} count={neutral}/>
                <Statistic name={"bad"} count={bad}/>
                <tr><td>all</td><td>{total}</td></tr>
                <Average good={good} neutral={neutral} bad={bad} total={total}/>
                <Positive good={good} neutral={neutral} bad={bad} total={total}/>
            </tbody>
        </table>
    )
}

const App = () => {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const total = good + neutral + bad

    return (
        <div>
            <h1>give feedback</h1>
            <Button text={"good"} handleClick={() => setGood(good + 1)}/>
            <Button text={"neutral"} handleClick={() => setNeutral(neutral + 1)}/>
            <Button text={"bad"} handleClick={() => setBad(bad + 1)}/>

            <h1>statistics</h1>
            <Statistics good={good} neutral={neutral} bad={bad}/>
        </div>
    )
}

export default App