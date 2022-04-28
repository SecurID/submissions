import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Title title='give Feedback' />
      <Button onClick={() => setGood(good+1)} title='good' />
      <Button onClick={() => setNeutral(neutral+1)} title='neutral' />
      <Button onClick={() => setBad(bad+1)} title='bad' />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

const Title = ({title}) => {
  return (
    <h1>{title}</h1>
  )
}

const Button = ({onClick, title}) => {
  return (
    <button onClick={onClick}>
      {title}
    </button>
  )
}

const Counter = ({title, counter}) => {
  return (
    <span>{title} {counter}</span>
  )
}

const Sum = ({sum}) => {
  return (
    <span>all {sum}</span>
  )
}

const Average = ({average}) => {
  return (
    <span>average {average}</span>
  )
}

const Positive = ({positive}) => {
  return (
    <span>positive {positive}%</span>
  )
}

const Statistics = (props) => {
  if (props.good == 0 && props.neutral == 0 && props.bad == 0) {
    return (
      <><Title title='statistics' />
      <div>No feedback given</div></>
    )
  }
  let sum = props.good+props.neutral+props.bad
  let average = sum/3
  let positive = props.good/sum*100

  return (
    <div>
      <Title title='statistics' />
      <Counter title='good' counter={props.good} /><br />
      <Counter title='neutral' counter={props.neutral} /><br />
      <Counter title='bad' counter={props.bad} /><br />

      <Sum sum={sum} /><br />
      <Average average={average} /><br />
      <Positive positive={positive} />
    </div>
  )
}
export default App
