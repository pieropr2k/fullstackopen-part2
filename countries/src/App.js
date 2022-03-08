import axios from 'axios'
import { useEffect, useState } from 'react'
import Filter from './components/Filter.js'
import Countries from './components/Countries.js'

const App = () => {
  const [newFilter, setNewFilter] = useState('')
  const [countries, setCountries] = useState([])

  const searchHook = () => {
    console.log('effect')
    axios
      .get(`https://restcountries.com/v3.1/all`)
      .then(response => {
        console.log('promise fulfilled')
        //console.log(response)
        setCountries(response.data)
      })
      .catch(err => console.log(err))    
  }
  useEffect(searchHook, [])

  //console.log('render', countries.length, 'notes')

  const handleShowInfo = (country) => {
    setNewFilter(country)
  }

  const handleFilterChange = (event) => {
    //console.log(event.target.value);
    setNewFilter(event.target.value);
  }

  return (
    <div>
      <Filter filterValue={newFilter} onChange={handleFilterChange}/>
      <Countries countries={countries} filterValue={newFilter} handleShowInfo={handleShowInfo}/>
    </div>
  )
}

export default App