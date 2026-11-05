import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [search, setSearch] = useState('')
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')

  const filterPersons = persons.filter(person =>
    person.name.toLowerCase().includes(search.toLowerCase())
  )

  const addPerson = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
    const newPerson = {
      name: newName,
      phone: newPhone
    }

    const exist = persons.some(person => person.name === newPerson.name)

    if (exist) {
      alert(`${newName} is already added to phonebook`)
    }
    else {
      setPersons(persons.concat(newPerson))
      setNewName('')
      setNewPhone('')
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
