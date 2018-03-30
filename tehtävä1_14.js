import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: 0,
      pisteet : [0, 0, 0, 0, 0, 0,],
      maksimipisteet : 0
    }
  }

randomGenerator = (numero) => {
  let arvonta = Math.floor(Math.random() * numero)
  return () => {
    this.setState({ 
      selected : arvonta
    })
   }
}


vote = (pisteet, muutos) => {
  const kopio = [...pisteet]
  kopio[this.state.selected] += 1 
//  let arr = Object.values(kopio)
  let max = Math.max(...kopio)
  console.log({max})

return () => {
    this.setState({ 
pisteet : kopio,
maksimipisteet : max
    })
   }
  }


  render() {

    const Button = ({ handleClick, text }) => (
     <button onClick={handleClick}>
      {text}
     </button>
    )

    const VoteButton = ({ handleClick, text }) => (
     <button onClick={handleClick}>
      {text}
     </button>
    )

    return (
   <div>
      <div>
        {this.props.anecdotes[this.state.selected]}
      </div>
      <div>has {this.state.pisteet[this.state.selected]} votes</div>
      <VoteButton handleClick = {this.vote(this.state.pisteet)} text="Vote anecdote"/>
      <Button handleClick = {this.randomGenerator(6)} text="next anecdote"/>
      <h2>anecdote with most votes:</h2>
      <div>{this.props.anecdotes[this.state.pisteet.indexOf(this.state.maksimipisteet)]}</div>
      <div>has {this.state.maksimipisteet} votes </div>

</div>
    )
  }
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(   <App anecdotes={anecdotes} />,
document.getElementById('root') )
