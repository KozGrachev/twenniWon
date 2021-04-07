
import { useEffect, useReducer } from 'react';
import { initialState, reducer } from './GameStateReducer'

export default function useGameState () {

  const [gameState, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    switch (gameState.playerAction) {
      case "stand":
        if (gameState.dealerScore < 17 && !gameState.endOfRound) {
        } else if (gameState.dealerScore > 21 || gameState.dealerScore < gameState.playerScore) {
          dispatch({ type: 'set-end-of-round', payload: true });
          dispatch({ type: 'update-high-score' });
          dispatch({ type: 'update-message', payload: 'YOU WIN\n🏆' });
        } else if (gameState.dealerScore > gameState.playerScore) {
          dispatch({ type: 'set-end-of-round', payload: true });
          dispatch({ type: 'reset-high-score' });
          dispatch({ type: 'update-message', payload: 'YOU LOSE\n😖' });
        } else if (gameState.dealerScore === gameState.playerScore) {
          dispatch({ type: 'set-end-of-round', payload: true });
          dispatch({ type: 'update-message', payload: 'PUSHED\n👉' });
        } else if (gameState.dealerScore === 21) {
          dispatch({ type: 'set-end-of-round', payload: true });
          dispatch({ type: 'reset-high-score' });
          dispatch({ type: 'update-message', payload: 'TWENTY-ONE\nYOU LOSE\n😖' });
        }
        break;

      case "hit":
        if (gameState.playerScore > 21) {
          dispatch({ type: 'reset-high-score' });
          dispatch({ type: 'update-message', payload: 'BUST\n💀' });
          dispatch({ type: 'set-end-of-round', payload: true });
        } else if (gameState.playerScore === 21) {
          dispatch({ type: 'update-high-score' });
          dispatch({ type: 'update-message', payload: 'TWENTY-ONE\nYOU WIN\n🎉' })
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
        return gameState
    }

  }, [gameState]);



  return [gameState, dispatch];
}


