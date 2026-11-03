import React from 'react'
import Person from './Person'

const Persons = ({persons, deletePerson}) => {
    const showPersons = persons.filter(person => person.show)
    const rows = () => showPersons.map(person =>
        <Person 
            person={person} 
            key={person.name}
            deletePerson={deletePerson} />)

    return <div>{rows()}</div>
}

export default Persons