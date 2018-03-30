import React from 'react'

const Nimi =({nimi}) => <h1>{nimi}</h1>

const Rivit = ({osa}) =>{
  return(
    <div>
      {osa.nimi} {osa.tehtavia}
    </div>
  )
}

const Kurssi = ({kurssi}) => {

const summa = kurssi.osat.reduce((sum, juttu) => 
	sum + juttu.tehtavia, 0)

	return (
		<div>
		<Nimi nimi={kurssi.nimi}/>
		{kurssi.osat.map((osa)=><Rivit key={osa.id} osa={osa}/>)}
		<div>yhteenä {summa} tehtävää</div>
</div>
		)
}

export default Kurssi