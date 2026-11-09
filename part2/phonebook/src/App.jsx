import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personsService from './services/persons'


const App = () => {
  const [persons, setPersons] = useState([])
  const [search, setSearch] = useState('')
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')

  useEffect(() => {
    personsService
    .getAll()
    .then(initialPersons => {
      setPersons(initialPersons)
    })
  }, [])

  const filterPersons = persons.filter(person =>
    person.name.toLowerCase().includes(search.toLowerCase())
  )

  const addPerson = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
    const newPerson = {
      name: newName,
      number: newPhone
    }

    const exist = persons.some(person => person.name === newPerson.name)
    const existingPerson = persons.find(person => person.name === newPerson.name)


    if (existingPerson) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        personsService
          .update(existingPerson.id, newPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== existingPerson.id ? person : newPerson))
            setNewName('')
            setNewPhone('')
          })
      }
    }
    else {
      personsService
        .create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewPhone('')
        })
    }
  }

  const removePerson = (id) => {
    const person = persons.find(person => person.id === id)
    if (window.confirm(`Delete ${person.name}?`)) {
      personsService
        .remove(id)
        .then(returnedPerson => {
          console.log(returnedPerson)
          setPersons(persons.filter(person => person.id !== id))
        })
    }
  }

  const handleSearchChange = (event) => {
    console.log(event.target.value)
    setSearch(event.target.value)
  }
  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  const handlePhoneChange = (event) => {
    console.log(event.target.value)
    setNewPhone(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={search} onChange={handleSearchChange} />

      <h3>add a new</h3>
      <PersonForm name={newName} onChangeName={handleNameChange} phone={newPhone} onChangePhone={handlePhoneChange} onSubmit={addPerson} />

      <h3>Numbers</h3>
      <Persons persons={filterPersons} removePerson={removePerson}/>
    </div>
  )
}

export default App
