import React, { useCallback, useContext, useEffect, useMemo, useReducer, useState } from 'react';
import { initialState, reducer, wrapAsync } from './GameStateReducer'
import * as api from './Api-service';
import './App.css';



function App () {

  const [deckId, setDeckId] = useState('ghctraahm14k');
  // const [deckId, setDeckId] = useState();

  const [gameState, dispatch] = useReducer(reducer, initialState);
  const GameStateContext = useContext([gameState, dispatch]);

  const deal = useCallback(async (recipient, numCards = 1, roundEnded) => {
    console.log('Has the round ended: ', roundEnded);
    if (!roundEnded) {
      console.log('The round has not ended! endOfRound=', roundEnded);


      try {
        const drawResult = await api.drawCard(deckId, numCards);
        if (drawResult.success && !roundEnded) {
          console.log('drawResult:: ', drawResult.cards);
          switch (recipient) {
            case 'player':
              dispatch({ type: 'deal-player', payload: drawResult.cards })
              dispatch({ type: 'count-player' })
              break;
            case 'dealer':
              console.log('CARD DEALT TO DEALER. endOfRound: ', roundEnded);
              dispatch({ type: 'deal-dealer', payload: drawResult.cards });
              dispatch({ type: 'count-dealer' })
              break
            default:
              break;
          }

          dispatch({ type: 'set-cards-dealt', payload: true })
        } else {
          dispatch({ type: 'error', payload: drawResult.error });
        }
      } catch (error) {
        console.error('CATCHING ERROR: ', error);
        dispatch({ type: 'error', payload: error });
      }
    }
  }, [deckId]);


  useEffect(() => {
    (async () => {
      await api.shuffleDeck(deckId);
    })();
  }, [deckId]);

  // useEffect(() => {
  //   console.log('\n\n*********************** USE EFFECT **********************')
  //   switch (gameState.playerAction) {
  //     case "stand":
  //       console.log('STAND, dealer score: ', gameState.dealerScore)
  //       if (gameState.dealerScore < 17 && !gameState.endOfRound) {
  //         console.log('DEALING TO DEALER');
  //       } else if (gameState.dealerScore > 21 || gameState.dealerScore < gameState.playerScore) {
  //         console.log("***YOU WIN***");
  //         dispatch({ type: 'set-end-of-round', payload: true });
  //         dispatch({ type: 'update-high-score' });
  //         dispatch({ type: 'update-message', payload: 'YOU WIN\n🏆' });
  //       } else if (gameState.dealerScore > gameState.playerScore) {
  //         console.log("***YOU LOSE***");
  //         dispatch({ type: 'set-end-of-round', payload: true });
  //         dispatch({ type: 'reset-high-score' });
  //         dispatch({ type: 'update-message', payload: 'YOU LOSE\n😖' });
  //       } else if (gameState.dealerScore === gameState.playerScore) {
  //         console.log("***PUSHED***");
  //         dispatch({ type: 'set-end-of-round', payload: true });
  //         dispatch({ type: 'update-message', payload: 'PUSHED\n👉' });
  //       } else if (gameState.dealerScore === 21) {
  //         console.log("***BLACKJACK***");
  //         console.log("***YOU LOSE***");
  //         dispatch({ type: 'set-end-of-round', payload: true });
  //         dispatch({ type: 'reset-high-score' });
  //         dispatch({ type: 'update-message', payload: '♠BLACKJACK♠\nYOU LOSE\n😖' });
  //       }
  //       break;

  //     case "hit":
  //       if (gameState.playerScore > 21) {
  //         dispatch({ type: 'reset-high-score' });
  //         dispatch({ type: 'update-message', payload: 'BUST\n💀' });
  //         dispatch({ type: 'set-end-of-round', payload: true });
  //       } else if (gameState.playerScore === 21) {
  //         dispatch({ type: 'update-high-score' });
  //         dispatch({ type: 'update-message', payload: '♠BLACKJACK♠\nYOU WIN\n🎉' })
  //         dispatch({ type: 'set-end-of-round', payload: true });
  //       }
  //       break;

  //     case "start-round":
  //       dispatch({ type: 'set-end-of-round', payload: false });
  //       if (gameState.playerScore === 21) {
  //         dispatch({ type: 'update-high-score' });
  //         dispatch({ type: 'update-message', payload: '♠BLACKJACK♠\nYOU WIN\n🎉' })
  //       }
  //       break;

  //     default:
  //       console.log(
  //         "ERROR: Invalid Action. Cannot evaluate action: " + gameState.playerAction
  //       );
  //       console.log("game state: ", gameState);
  //   }

  // }, [
  //   gameState,
  //   deal,
  // ]);

  async function startRound () {
    dispatch({ type: 'take-turn', payload: 'start-round' });
    await deal('player', 2);
    await deal('dealer', 1);
  }

  async function shuffleDeck () {
    console.log(await api.shuffleDeck(deckId))
  }

  return (
    <GameStateContext.Provider>
      <div className="app-container">
        <button onClick={shuffleDeck}>Shuffle</button>
        <button disabled={!gameState.endOfRound && gameState.cardsDealt} onClick={startRound}>Deal...</button>
        <button disabled={gameState.endOfRound || !gameState.cardsDealt} onClick={() => {
          console.log("HIT");
          deal('player', 1);
          dispatch({ type: 'take-turn', payload: 'hit' })
        }}>HIT</button>
        <button disabled={gameState.endOfRound || !gameState.cardsDealt} onClick={() => {
          console.log("STAND");
          deal('dealer', 1);
          dispatch({ type: 'take-turn', payload: 'stand' });
        }}>STAND</button>
        <div style={{ display: "flex" }}>
          <div className="hand">
            <h3>Player hand:  {gameState.playerScore}</h3>
            {gameState.playerHand.map(card => <div key={card.code}>
              <p>{card.value} of {card.suit}</p>
            </div>
            )}
          </div>
        ______
        <div className="hand">
            <h3>Dealer hand: {gameState.dealerScore}</h3>
            {gameState.dealerHand.map(card => <div key={card.code}>
              <p>{card.value} of {card.suit} </p>
            </div>
            )}
          </div>
        </div>
        {gameState.error ? <div>
          Oops... there was an error: {gameState.error.message}
          <button onClick={() => dispatch({ type: 'error', payload: null })}>OK</button>
        </div> : null}
        {gameState.endOfRound ? <h1>{gameState.message}</h1> : null}
      </div>
    </GameStateContext.Provider>
  );
}

export default App;
