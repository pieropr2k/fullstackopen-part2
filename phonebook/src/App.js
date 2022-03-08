import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import Notification from './components/Notification'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import { peopleService } from './services/persons'

const App = () => {
  const [newFilter, setNewFilter] = useState('')
  const [persons, setPersons] = useState([])
  
  /*const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])*/
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [isError, setIsError] = useState(false)

  const personHook = () => {
    console.log('effect')
    //axios.get('http://localhost:3001/persons')
    peopleService.getAll()
      .then(initialPeople => {
        console.log('promise fulfilled')
        console.log(initialPeople)
        setPersons(initialPeople)
    })
  }
  useEffect(personHook, [])
  //console.log('render', notes.length, 'notes')

  const popUpAdvicer = (text, handleError) => {
    setIsError(handleError)
    setErrorMessage(text)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  const addUser = (newUser) => {
    peopleService.create(newUser)
        .then(returnedPerson => {
          popUpAdvicer(`Added ${returnedPerson.name}`, false)
          setPersons(persons.concat(returnedPerson))   
        }).catch(error => {
          console.log('fail')
          console.log(error)
        })
  }

  const updateUserNumber = (newUser) => {
    // boolean value, evaluates if the user wants to update his number
    const userWantsToUpdate = window.confirm(
      `${newName} is already added to phonebook, replace the old number with a new one?`
    );
    const repeatedUser = persons.filter(person => person.name === newName)[0]
    //console.log(repeatedUser) the info of the person who is already repeated
    if (userWantsToUpdate) {
      peopleService.update(repeatedUser.id, newUser)
        .then(returnedPerson =>{
          popUpAdvicer(`Updated ${returnedPerson.name} number`, false)
          setPersons(persons.map(person => person.id === repeatedUser.id ? returnedPerson : person))
        }).catch(error => {
          popUpAdvicer(
            `Information of ${repeatedUser.name} has already been removed from server`,
            true
          )
          setPersons(persons.filter(person => person.id !== repeatedUser.id))
          console.log(error)
        })
    }
  }

  const handleAddUser = (event) => {
    event.preventDefault();
    const newPerson = {
      id: persons[persons.length-1].id + 1, 
      name: newName, 
      number: newNumber
    }
    // test if the user exists already
    if(!persons.map(person=>person.name).includes(newName)){
      //adds a new user
      addUser(newPerson)
    } else {
      //alert and asks if the user wants to update the number
      updateUserNumber(newPerson)
    }
    setNewName('');
    setNewNumber('');
  }

  const handleFilterChange = (event) => {
    console.log(event.target.value);
    setNewFilter(event.target.value);
  }

  const handleNameChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value);
    setNewNumber(event.target.value);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} isError={isError}/>
      <Filter filterValue={newFilter} onChange={handleFilterChange}/>
      <h3>Add a new</h3>
      <PersonForm addUser={handleAddUser} 
        inputValues={{newName, newNumber}} 
        eventHandlers={{handleNameChange, handleNumberChange}}
      />
      <h3>Numbers</h3>
      <Persons persons={persons} filterValue={newFilter} setPersons={setPersons}/>
    </div>
  )
}

export default App