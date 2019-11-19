import React, { useState, useEffect } from 'react'
import PersonForm from './components/AddPersonForm'
import personService from './services/persons'
import Persons from './components/Persons'
import Filter from './components/FilterForm'
import Notification from './components/Notification'

const App = () => {

  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ searchName, setSearchName ] = useState('')
  const [ errorMessage, setErrorMessage ] = useState(null)
  const [ styleName, setStyleName ] = useState(null)

  useEffect(() => {
    personService.getAll().then(response => {
        setPersons(response.data)
    })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
      show: true
    }
    let personExists = persons.find(person => 
      person.name.toLowerCase() === personObject.name.toLowerCase())
    if (personExists) {
      if (window.confirm(`${personObject.name} is already in the phonebook,
      replace old number with a new one?`)) {
        personService
          .update(personExists.id, personObject)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== personObject.id ? person : returnedPerson))
          })
          .catch(error => {
            setPersons(persons.filter(p => p.id !== personExists.id))
            setErrorMessage(`Information of ${personExists.name} has already been removed from the server`)
            setStyleName('error')
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          })
        personExists.number = newNumber
        setPersons(persons)
        setErrorMessage(
          `Number of ${personExists.name} changed`
        )
        setStyleName('notification')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      }
    } else {
      personService
        .create(personObject)
        .then(response => {
          setPersons(persons.concat(response.data))
          setNewName('')
          setNewNumber('')
        })
      setErrorMessage(
        `${personObject.name} added to phonebook`
      )
      setStyleName('notification')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const deletePerson = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .deleteObject(person.id)
      const newPersons = persons.filter(p=>p.id !== person.id)
      setPersons(newPersons)
      setErrorMessage(
        `Number of ${person.name} deleted`
      )
      setStyleName('notification')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleNameChange = (event) => {
      setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
      setNewNumber(event.target.value)
  }

  const handleNameSearch = (event) => {
      event.preventDefault()
      setSearchName(event.target.value)

      persons.filter(p => !p.name.toLowerCase()
        .includes(event.target.value.toLowerCase()))
        .map(p => p.show = false)
      
        persons.filter(p => p.name.toLowerCase()
        .includes(event.target.value.toLowerCase()))
        .map(p => p.show = true)  
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification 
        message={errorMessage} 
        styleName={styleName} />
      <Filter
        searchName={searchName} 
        handleNameSearch={handleNameSearch} />
      <h2>Add a new number</h2>
      <PersonForm 
        addPerson={addPerson} 
        newName={newName} newNumber={newNumber} 
        handleNameChange={handleNameChange} 
        handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <Persons 
        persons={persons} 
        deletePerson={deletePerson} />
    </div>
  )
}

export default App;
