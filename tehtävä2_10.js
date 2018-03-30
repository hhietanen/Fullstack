import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    persons: [
      { name: 'Arto Hellas', number: '040-123456' },
      { name: 'Martti Tienari', number: '040-123456' },
      { name: 'Arto Järvinen', number: '040-123456' },
      { name: 'Lea Kutvonen', number: '040-123456' }
    ],
      newName: 'Lisää tähän muistiinpano',
      newNumber: 'Lisää numero',
      filtteri: '',
      filteredPersons : []
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

  filterItems = (query) => {
  return this.state.persons.filter((el) => 
    el.name.indexOf(query) > -1
  )
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
    const persons = this.state.persons.concat(personObject)

    this.setState({
      persons,
      newName : '',
      newNumber: ''
    })
  }

    else {
      console.log('Arvo ei ole uniikki. Lisääminen estetty')
      alert('OMG toi on jo tuolla. En lisää.')
    }
  }



  render() {
    return (
      <div>
        <h2>Puhelinluettelo</h2>
        <div>
          Filtteröi <input onChange={this.handleNoteChange} name='filtteri' value={this.state.filtteri}/>
        </div>
        <Formi state={this.state} addNote={this.addNote} handleNoteChange ={this.handleNoteChange}/>
        <h2>Numerot</h2>
        {this.state.filteredPersons.map(person => 
          <Person key={person.name} person={person}/>
        )}
        {this.state.persons.map(person => 
          <Person key={person.name} person={person} filtteri={this.state.filtteri}/>
        )}
      </div>
    )
  }
}


const Person = (props) =>{
  if (!props.filtteri){
  return (
  <div>{props.person.name} {props.person.number}</div>
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



export default App
