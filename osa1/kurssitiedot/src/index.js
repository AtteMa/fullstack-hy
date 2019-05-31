import React from 'react'
import ReactDOM from 'react-dom'

function sum(a, b, c) {
  return a+b+c
}

const Header = (props) => {
  return (
    <div>
      <p>{props.course.name}</p>
    </div>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part part={props.course.parts[0].name} exercises={props.course.parts[0].exercises} />
      <Part part={props.course.parts[1].name} exercises={props.course.parts[1].exercises} />
      <Part part={props.course.parts[2].name} exercises={props.course.parts[2].exercises} />
    </div>
  )
}

const Total = (props) => {
  return (
    <div>
      <p>number of exercises {sum(props.course.parts[0].exercises, props.course.parts[1].exercises, 
        props.course.parts[2].exercises)}</p>
    </div>
  )
}

const Part = (props) => {
  return (
    <div>
      <p>{props.Part} {props.exercises}</p>
    </div>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        parts: 10
      },
      {
        name: 'Using props to pass data',
        parts: 7
      },
      {
        name: 'State of a component',
        parts: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
