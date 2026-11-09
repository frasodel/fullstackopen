import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [search, setSearch] = useState('')
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
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

    if (exist) {
      alert(`${newName} is already added to phonebook`)
    }
    else {
      axios
      .post('http://localhost:3001/persons', newPerson)
      .then(response => {
        console.log(response)
        setPersons(persons.concat(newPerson))
        setNewName('')
        setNewPhone('')
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
      <Persons persons={filterPersons}/>
    </div>
  )
}

export default App
