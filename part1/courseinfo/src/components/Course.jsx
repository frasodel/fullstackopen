const Header = (props) => {
  return (
    <div>
      <h2>{props.course}</h2>
    </div>
  )
}

const Content = (props) => {
  const result = props.parts.map(part =>
    <Part key={part.id} part={part.name} exercises={part.exercises} />
  )
  return (
    <div>
      {result}
    </div>
  )
}

const Part = (props) => {
  return (
    <p>
      {props.part} {props.exercises}
    </p>
  )
}

const Total = (props) => {
  const suma = props.parts.reduce((total, part) => total + part.exercises, 0)
  return (
    <div>
      <p><strong>Number of exercises {suma}</strong></p>
    </div>
  )
}

const Course = ({course}) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default Course
