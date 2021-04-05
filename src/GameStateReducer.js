export function reducer (state, action) {
  switch (action.type) {
    case 'deal-player':
      console.log("CARD PAYLOAD ::: ", action.payload)
      return { ...state, playerHand: [...state.playerHand, ...action.payload] };
    case 'deal-dealer':
      console.log("CARD PAYLOAD ::: ", action.payload)
      return { ...state, dealerHand: [...state.dealerHand, ...action.payload] };
    case 'count-player':
      return { ...state, playerScore: getHandTotal(state.playerHand) };
    case 'count-dealer':
      return { ...state, dealerScore: getHandTotal(state.dealerHand) };
    // case 'reset-hands':
    //   return { ...state, playerHand: [], dealerHand: [] };
    case 'set-end-of-round':
      return { ...state, playerAction: null, endOfRound: action.payload };
    case 'take-turn':
      if (action.payload === 'start-round') {
        return {
          ...state,
          playerAction: action.payload,
          playerHand: [],
          dealerHand: []
        };
      }
      return { ...state, playerAction: action.payload };
    case 'update-message':
      return { ...state, message: action.payload };
    case 'update-high-score':
      return { ...state, highScore: state.highScore + state.playerScore };
    case 'reset-high-score':
      return { ...state, highScore: 0 };
    case 'set-cards-dealt':
      return { ...state, cardsDealt: action.payload }
    case 'error':
      return { ...state, error: action.payload };
    default: throw new Error(`Action ${JSON.stringify(action)} doesn't exist!`);
  }
}

export const initialState = {
  playerHand: [],
  dealerHand: [],
  playerScore: 0,
  dealerScore: 0,
  highScore: 0,
  cardsDealt: false,
  endOfRound: false,
  playerAction: '',
  message: "Let's play",
};

function getHandTotal (hand) {
  let total = 0;
  for (let card of hand) {
    total += getCardValue(card);
  }
  return total;
}

function getCardValue (card) {
  if (card.value === 'ACE') return 11;

  const intVal = parseInt(card.value);
  if (intVal) return intVal;
  if (card.value) return 10
  else throw new Error('Invalid card value: ' + card.value)
}





















