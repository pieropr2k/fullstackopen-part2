import { peopleService } from "../services/persons";

const Person = ({name, number, handleDeleteUser}) => {
    return (
      <div>
          {`${name} ${number}`}
          <button onClick={handleDeleteUser}>delete</button>
      </div>
    )
}

const Persons = ({persons, filterValue, setPersons}) => {
    const deleteUser = ({id, name}) => () => {
        const userWantsToDelete = window.confirm(`Delete ${name}`);
        if(userWantsToDelete){
            peopleService.deletePerson(id)
            setPersons(persons.filter(person => person.id!==id))
        }
    }

    return (
        <div>
            {persons
            .filter(person => person.name.toLowerCase().includes(filterValue.toLowerCase()))
            .map(person => <Person
                key={person.id} 
                name={person.name} 
                number={person.number} 
                handleDeleteUser={deleteUser(person)}
            />)}
        </div>
    )
}

export default Persons;