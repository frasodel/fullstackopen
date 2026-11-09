const Persons = ({persons, removePerson}) => {
    const phoneList = persons.map(person =>
        <li key={person.name}>
            {person.name} {person.number}
            <button onClick={() => removePerson(person.id)}>delete</button>
        </li>
    )

    return (
        <ul>
            {phoneList}
        </ul>
    )
}

export default Persons
