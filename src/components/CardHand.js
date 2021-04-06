import React from 'react'
import '../css/CardHand.css'

export default function cardHand ({ name, cards }) {


  return (
    <div className={`${name} hand`}>
      {cards.map(card => <div key={card.code}>
        <div className="card-container">
          <img className="card-img" src={card.images.png} alt={`${card.value} of ${card.suit}`} />
          {/* <p className="label">{card.value} of {card.suit} </p> */}
        </div>
      </div>
      )}
    </div>
  )
}
