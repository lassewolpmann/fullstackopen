import { useState } from 'react'

const Button = ({text, handleClick}) => (
    <button onClick={handleClick}>
        {text}
    </button>
)

const Statistic = ({name, count}) => (
    <p>{name} {count}</p>
)

const Average = ({good, neutral, bad, total}) => {
    const score = good + (bad * -1)

    return <p>average {score/total}</p>
}

const Positive = ({good, neutral, bad, total}) => {
    const positivePercent = (good / total) * 100

    return <p>positive {positivePercent} %</p>
}

const Statistics = ({good, neutral, bad}) => {
    const total = good + neutral + bad

    if (total === 0) return <p>No feedback given</p>

    return (
        <div>
            <Statistic name={"good"} count={good}/>
            <Statistic name={"neutral"} count={neutral}/>
            <Statistic name={"bad"} count={bad}/>
            <p>all {total}</p>
            <Average good={good} neutral={neutral} bad={bad} total={total}/>
            <Positive good={good} neutral={neutral} bad={bad} total={total}/>
        </div>
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