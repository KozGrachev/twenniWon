import React from 'react'

export default function cardHand ({ name, cards }) {


  return (
    <div className={`${name} hand`}>
      {cards.map(card => <div key={card.code}>
        <img src={card.images.png} alt={`${card.value} of ${card.suit}`} />
        <p>{card.value} of {card.suit} </p>
      </div>
      )}
    </div>
  )
}
