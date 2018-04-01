import React from 'react'
import peopleService from './services/peoples.js'
import './index.css'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    persons: [
    ],
      newName: 'Lisää tähän muistiinpano',
      newNumber: 'Lisää numero',
      filtteri: '',
      filteredPersons : [],
      message: null
    }
  }

  handleNoteChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
    if (event.target.name === 'filtteri'){
      console.log('Filtteröidään')
      const filterObject = this.filterItems(event.target.value)
      this.setState({ filteredPersons: filterObject })
    }
  }

  componentDidMount() {
    console.log('will mount')
    peopleService
      .getAll()
      .then(response => {
        console.log('promise fulfilled')
        this.setState({ persons: response.data })
      })
  }

  filterItems = (query) => {
    return this.state.persons.filter((el) => 
      el.name.indexOf(query) > -1
    )
  }

  removeNote = (id) =>{
    return () =>{
      peopleService
        .remove(id)
        .then (response => {
          console.log(response)
          this.componentDidMount()
          this.messagePing(`Poistit henkilön`)
        })
    }
  }

  addNote = (event) => {
    event.preventDefault()
    console.log('nappia painettu')
    const personObject = {
      name: this.state.newName,
      number: this.state.newNumber
    }

      const duplikaatti = (props) => {
          return props.name === personObject.name
      }

      let uniikki = this.state.persons.some(duplikaatti)


      if (!uniikki) {
        console.log('Syöte on uniikki arvo. Lisätään luetteloon!')

      peopleService
        .create(personObject)
        .then(response => {
          const persons = this.state.persons.concat(personObject)

          this.setState({
            persons,
            newName : '',
            newNumber: ''
          })
        this.componentDidMount()
        this.messagePing(`Lisäsit ${personObject.name} tiedot `)
        })
    }
    else {      
      const changedPerson = this.state.persons.find(n => n.name === personObject.name)

      peopleService
        .update(changedPerson.id, personObject)
        .then(response => {
          this.componentDidMount()
          this.messagePing(`Muutin ${personObject.name} tietoja `)
        })
        .catch(error => {
          alert(`muistiinpano '${personObject.name}' on jo valitettavasti poistettu palvelimelta. Luon hänet sinne uudestaan.`)
           peopleService
          .create(personObject)
          .then(response => {
            const persons = this.state.persons.concat(personObject)

            this.setState({
              persons,
              newName : '',
              newNumber: ''
            })
          this.componentDidMount()
          })
        })
    
    }
  }

  messagePing = (message) =>{
          this.setState({
            message
          })
          setTimeout(() => {
            this.setState({message: null})
          }, 5000)
   }

  render() {
    return (
      <div>
        <h2>Puhelinluettelo</h2>
        <Notification message={this.state.message}/>
        <div>
          Filtteröi <input onChange={this.handleNoteChange} name='filtteri' value={this.state.filtteri}/>
        </div>
        <Formi state={this.state} addNote={this.addNote} handleNoteChange ={this.handleNoteChange}/>
        <h2>Numerot</h2>
        {this.state.filteredPersons.map(person => 
          <Person key={person.name} person={person} removeNote= {this.removeNote}/>
        )}
        {this.state.persons.map(person => 
          <Person key={person.name} person={person} removeNote= {this.removeNote} filtteri={this.state.filtteri}/>
        )}
      </div>
    )
  }
}


const Person = (props) =>{
  if (!props.filtteri){
  return (
    <div>
  <div>{props.person.name} {props.person.number}   <button onClick={props.removeNote(props.person.id)}>Poista {props.person.name} </button></div> 

  </div>
  )    
}
return null
}


const Formi = (props) =>{
  console.log(props)
  return (
        <form onSubmit={props.addNote}>
          <div>
          nimi: <input value={props.state.newName} name='newName' 
          onChange={props.handleNoteChange}/>
          </div>
          <div>
          numero: <input value={props.state.newNumber} name='newNumber' 
          onChange={props.handleNoteChange}/>
          </div>
          <div>
            <button type="submit">lisää</button>
          </div>
        </form>

    )
}

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }
  return (
    <div className="message">
      {message}
    </div>
  )
}



export default App
