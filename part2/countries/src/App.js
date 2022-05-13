import { useState, useEffect } from 'react'
import axios from 'axios'
import { Filter } from './components/Filter'
import { Countries } from './components/Countries'

const App = () => {
  const [filter, setFilter] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3/all')
      .then(response => {
          setCountries(response.data)
        })
  }, [])

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const countriesToShow = filter === ''
  ? countries
  : countries.filter(function(country) {
      return country.name.common.toLowerCase().includes(filter.toLowerCase())
  })

  return (
    <div>
      <h2>Find countries</h2>
      <Filter filter={filter} onChange={handleFilterChange} />
      <h2>Countries</h2>
      <Countries countriesToShow={countriesToShow} setFilter={setFilter}/>
    </div>
  )
}

export default App