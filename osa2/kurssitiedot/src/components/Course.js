import React from 'react'

const Total = (props) => {
  const reducer = (sum, current) => sum += current.exercises
  const summa = props.parts.reduce(reducer, 0)
  return (
    <p>Total of {summa} exercises</p>
  )
}

const Header = (props) => {
  return (
    <div>
      <h2>{props.course}</h2>
    </div>
  )
}

const Content = (props) => props.parts.map(part =>
  <li key={part.id}>
    {part.name}  {part.exercises}
  </li>
)
  
const Part = (props) => {
  return (
    <div>
      <p>{props.part.name} {props.part.exercises}</p>
    </div>
  )
}

const Course = (props) => {
  const course = props.course
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default Course