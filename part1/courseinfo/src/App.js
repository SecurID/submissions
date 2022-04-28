const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

const Header = (props) => {
  return (
    <h1>{props.name}</h1>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part title={props.parts[0].name} exercise={props.parts[0].exercises}/>
      <Part title={props.parts[1].name} exercise={props.parts[1].exercises}/>
      <Part title={props.parts[2].name} exercise={props.parts[2].exercises}/>
    </div>
  )
}

const Part = (props) => {
  return(
    <p>
      {props.title} {props.exercise}
    </p>
  )
}

const Total = (props) => {
  let sum = props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises
  return (
    <p>Number of exercises {sum}</p>
  )
}
export default App
