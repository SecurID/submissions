import { useState, useEffect } from 'react'
import { Persons } from './components/Persons'
import { Filter } from './components/Filter'
import { PersonForm } from './components/PersonForm'
import { Notification } from './components/Notification'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState(null)
  const [type, setType] = useState('success')

  useEffect(() => {
      personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addNumber = (event) => {
    event.preventDefault() 
    const numberObject = {
      name: newName,
      number: newNumber,
    }

    if (persons.some(function (element){
      return element.name.toLowerCase() === numberObject.name.toLowerCase()
    })) {
      if(window.confirm(`${newName} is already added to phonebook so his number will be updated`)) {
        let personToUpdate = persons.find((element) => element.name.toLowerCase() === numberObject.name.toLowerCase())
        personService
        .update(personToUpdate.id, numberObject)
        .then(response => {
          setPersons(persons.map(person => person.id !== personToUpdate.id ? person : response))
          setMessage(
            `Person '${response.name}' was updated`
          )
          setType(
            'success'
          )
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
        .catch(error => {
          setMessage(
            `Person could not be updated.`
          )
          setType(
            'error'
          )
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
      }
    } else {
      personService
        .create(numberObject)
        .then(response => {
          setPersons(persons.concat(response))
          setMessage(
            `Person '${response.name}' was created`
          )
          setType(
            'success'
          )
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
        .catch(error => {
          setMessage(
            `Person could not be created.`
          )
          setType(
            'error'
          )
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
    }
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const handleDelete = (id) => {
    if(window.confirm(`Delete ${persons.find((person) => person.id === id).name} ?`)) {
      personService
      .deleteNumber(id)
      .then((response) => {
        setMessage(
          `Person was deleted`
        )
        setType(
          'success'
        )
        setTimeout(() => {
          setMessage(null)
        }, 5000)
        setPersons(persons.filter(person => person.id !== id))
      })
      .catch(error => {
        setMessage(
          `Person could not be deleted.`
        )
        setType(
          'error'
        )
        setTimeout(() => {
          setMessage(null)
        }, 5000)
        setPersons(persons.filter(n => n.id !== id))
      })
    }
  }

  const personsToShow = filter === ''
  ? persons
  : persons.filter(function(person) {
      return person.name.toLowerCase().includes(filter.toLowerCase())
  })

  return (
    <>
      <h2>Phonebook</h2>
      <Notification message={message} type={type} />
      <Filter filter={filter} onChange={handleFilterChange} />
      <h3>add a new</h3>
      <PersonForm onSubmit={addNumber} nameValue={newName} nameOnChange={handleNameChange} numberValue={newNumber} numberOnChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} handleDelete={handleDelete} />
    </>
  )
}

export default App