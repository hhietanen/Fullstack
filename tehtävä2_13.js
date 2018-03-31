import React from 'react';
import axios from 'axios'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    countries: [],
    filtteri: '',
    filteredCountries : [],
    greetings : 'Hello world'
    }
  }

 componentDidMount() {
    axios.get('https://restcountries.eu/rest/v2/all').then(response => {
      console.log('promise fulfilled')
      this.setState({ countries: response.data })
    })
  }


  handleNoteChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
    if (event.target.name === 'filtteri'){
      console.log('Filtteröidään')
      const filterObject = this.filterItems(event.target.value)
      this.setState({ filteredCountries: filterObject })
    }
  }

  clicker = (country) =>{
    return () =>{
      this.setState({filtteri : country})
      const filterObject = this.filterItems(country)
      this.setState({ filteredCountries: filterObject })
    }
  }

  filterItems = (query) => {
  return this.state.countries.filter((el) => 
    el.name.indexOf(query) > -1
  )
  }

  render() {
    return (
      <div>
        <div>
          Find countries 
          <input onChange={this.handleNoteChange} name='filtteri' value={this.state.filtteri}/>
          <Content countries={this.state.filteredCountries} clicker={this.clicker}/>
        </div>
      </div>
    )
  }
}



      
const Content = ({countries, clicker}) =>{
  console.log(countries.length)
  console.log(clicker)
  
  if (countries.length === 1){
    let country = countries[0]
    return (
      <div>
   
        <div>
          <h2>{country.name} {country.nativeName} </h2>
          <div>capital: {country.capital} </div>
          <div>population: {country.population} </div>
          <img src={country.flag}/>
          </div>
        </div>
    )
  }
  else if (countries.length < 10){
    return (
      <div>
      {countries.map(country => 
        <CountryList key={country.name} name={country.name} clicker={clicker}/>
      )}
      </div>
    )    
  }
  return (
    <div> Too many matches</div>
  )
}

const CountryList = (props) =>{
  console.log(props)
  return (
  <button onClick={props.clicker(props.name)}>{props.name}</button>
  )    
}


export default App
