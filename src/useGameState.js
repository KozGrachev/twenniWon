
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
          dispatch({ type: 'update-message', payload: 'YOU WIN\nš' });
        } else if (gameState.dealerScore > gameState.playerScore) {
          dispatch({ type: 'set-end-of-round', payload: true });
          dispatch({ type: 'reset-high-score' });
          dispatch({ type: 'update-message', payload: 'YOU LOSE\nš' });
        } else if (gameState.dealerScore === gameState.playerScore) {
          dispatch({ type: 'set-end-of-round', payload: true });
          dispatch({ type: 'update-message', payload: 'PUSHED\nš' });
        } else if (gameState.dealerScore === 21) {
          dispatch({ type: 'set-end-of-round', payload: true });
          dispatch({ type: 'reset-high-score' });
          dispatch({ type: 'update-message', payload: 'TWENTY-ONE\nYOU LOSE\nš' });
        }
        break;

      case "hit":
        if (gameState.playerScore > 21) {
          dispatch({ type: 'reset-high-score' });
          dispatch({ type: 'update-message', payload: 'BUST\nš' });
          dispatch({ type: 'set-end-of-round', payload: true });
        } else if (gameState.playerScore === 21) {
          dispatch({ type: 'update-high-score' });
          dispatch({ type: 'update-message', payload: 'TWENTY-ONE\nYOU WIN\nš' })
          dispatch({ type: 'set-end-of-round', payload: true });
        }
        break;

      case "start-round":
        dispatch({ type: 'set-end-of-round', payload: false });
        if (gameState.playerScore === 21) {
          dispatch({ type: 'update-high-score' });
          dispatch({ type: 'update-message', payload: 'ā BLACKJACKā \nYOU WIN\nš' })
        }
        break;

      default:
        return gameState
    }

  }, [gameState]);



  return [gameState, dispatch];
}


