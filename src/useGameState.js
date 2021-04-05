
import { useEffect, useReducer } from 'react';
import { initialState, reducer } from './GameStateReducer'

export default function useGameState () {

  const [gameState, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    console.log('\n\n*********************** USE EFFECT **********************')
    switch (gameState.playerAction) {
      case "stand":
        console.log('STAND, dealer score: ', gameState.dealerScore)
        if (gameState.dealerScore < 17 && !gameState.endOfRound) {
          console.log('DEALING TO DEALER');
        } else if (gameState.dealerScore > 21 || gameState.dealerScore < gameState.playerScore) {
          console.log("***YOU WIN***");
          dispatch({ type: 'set-end-of-round', payload: true });
          dispatch({ type: 'update-high-score' });
          dispatch({ type: 'update-message', payload: 'YOU WIN\n🏆' });
        } else if (gameState.dealerScore > gameState.playerScore) {
          console.log("***YOU LOSE***");
          dispatch({ type: 'set-end-of-round', payload: true });
          dispatch({ type: 'reset-high-score' });
          dispatch({ type: 'update-message', payload: 'YOU LOSE\n😖' });
        } else if (gameState.dealerScore === gameState.playerScore) {
          console.log("***PUSHED***");
          dispatch({ type: 'set-end-of-round', payload: true });
          dispatch({ type: 'update-message', payload: 'PUSHED\n👉' });
        } else if (gameState.dealerScore === 21) {
          console.log("***BLACKJACK***");
          console.log("***YOU LOSE***");
          dispatch({ type: 'set-end-of-round', payload: true });
          dispatch({ type: 'reset-high-score' });
          dispatch({ type: 'update-message', payload: '♠BLACKJACK♠\nYOU LOSE\n😖' });
        }
        break;

      case "hit":
        if (gameState.playerScore > 21) {
          dispatch({ type: 'reset-high-score' });
          dispatch({ type: 'update-message', payload: 'BUST\n💀' });
          dispatch({ type: 'set-end-of-round', payload: true });
        } else if (gameState.playerScore === 21) {
          dispatch({ type: 'update-high-score' });
          dispatch({ type: 'update-message', payload: '♠BLACKJACK♠\nYOU WIN\n🎉' })
          dispatch({ type: 'set-end-of-round', payload: true });
        }
        break;

      case "start-round":
        dispatch({ type: 'set-end-of-round', payload: false });
        if (gameState.playerScore === 21) {
          dispatch({ type: 'update-high-score' });
          dispatch({ type: 'update-message', payload: '♠BLACKJACK♠\nYOU WIN\n🎉' })
        }
        break;

      default:
        console.log(
          "ERROR: Invalid Action. Cannot evaluate action: " + gameState.playerAction
        );
        console.log("game state: ", gameState);
    }

  }, [gameState]);



  return [gameState, dispatch];
}


