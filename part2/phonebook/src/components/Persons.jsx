const Persons = ({persons}) => {
    const phoneList = persons.map(person =>
        <li key={person.name}>{person.name} {person.number}</li>
    )

    return (
        <ul>
            {phoneList}
        </ul>
    )
}

export default Persons
