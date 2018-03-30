import React from 'react'
import ReactDOM from 'react-dom'


class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            hyva: 0,
            neutraali: 0,
            huono: 0,
            tilastot : []
        }
    }


asetaArvoon = (arvo, nimi, toimitus) => {
  return () => {
    this.setState({ 
      [nimi] : arvo,
      tilastot: this.state.tilastot.concat(toimitus) 
    })
   }
  }


  render(){

    const Button = ({ handleClick, text }) => (
     <button onClick={handleClick}>
      {text}
     </button>
    )

const Statistics = (props) => {
const tilastot = this.state.tilastot
    let sum = 0
    for( var i = 0; i < tilastot.length; i++ ){
    sum += parseInt( tilastot[i], 10 ); //don't forget to add the base
    }    
    let avg = sum / tilastot.length;
  
  let positive = this.state.hyva /tilastot.length *100
  let positive2 = positive + " %"

  if (this.state.tilastot.length === 0) {
    return (
      <div>
        <em>Ei yhtään palautetta annettu</em>
      </div>
    )
  }
    return (
<div>
<h2>Statistiikka</h2>

<table>
<tbody>
<Statistic message ="Hyvä" number = {this.state.hyva}/>
<Statistic message ="Neutraali" number = {this.state.neutraali}/>
<Statistic message ="Huono" number = {this.state.huono}/>
<Statistic message ="Keskiarvo" number ={avg}  />
<Statistic message ="Positiivisia" number={positive2} />
</tbody>
</table>
</div>
    );
}

  const Statistic = (props) => {
  return (
    <tr><td>{props.message}</td><td>{props.number}</td></tr>
    );
  }


        return ( 
          <div> 
          <h2>Anna palautetta</h2>
<Button handleClick = {this.asetaArvoon(this.state.hyva+1, "hyva", '+1')} text = "Hyvä"/>

<Button handleClick = {this.asetaArvoon(this.state.neutraali+1, "neutraali", '0')} text = "Neutraali"/>

<Button handleClick = {this.asetaArvoon(this.state.huono+1, "huono", '+1')} text = "Huono"/>
       <Statistics/>
          </div>
        )
    }

}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)