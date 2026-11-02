import { useState } from 'react'

const Statistics = ({good, neutral, bad}) => {
  if (good == 0 && neutral == 0 && bad == 0) {
    return (
      <div>
        <h1>statistics</h1>
        <div>
          No feedback given
        </div>
      </div>
    )
  }
  return (
    <div>
      <h1>statistics</h1>
      <StatisticLine text="good" value={good} />
      <StatisticLine text="neutral" value={neutral} />
      <StatisticLine text="bad" value={bad} />
      <StatisticLine text="all" value={good + neutral + bad} />
      <StatisticLine text="average" value={((good*1)+(neutral*0)+(bad*-1))/(good + neutral + bad)} />
      <StatisticLine text="positive" value={(100 * good)/ (good + neutral + bad)} />
    </div>
  )
}

const StatisticLine = ({text, value}) => {
  return (
    <div>{text} {value}</div>
  )
}

const Button = ({onClick}) => {
  return (
    <button onClick={onClick}>
      good
    </button>
  )
}

const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={() => setGood(good + 1)} />
      <Button onClick={() => setNeutral(neutral + 1)} />
      <Button onClick={() => setBad(bad + 1)} />

      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
