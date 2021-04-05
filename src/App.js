import React, { useEffect, useState } from 'react';
import * as api from './Api-service';
import './App.css';
import CardHand from './components/CardHand';
import useGameState from './useGameState'


function App () {

  const [deckId, setDeckId] = useState('ghctraahm14k');
  const [gameState, dispatch] = useGameState();

  useEffect(() => {
    (async () => {
      await api.shuffleDeck(deckId);
    })();
  }, [deckId]);

  async function deal (recipient, numCards = 1) {
    try {
      const drawResult = await api.drawCard(deckId, numCards);
      if (drawResult.success) {
        console.log('drawResult:: ', drawResult.cards);
        switch (recipient) {
          case 'player':
            dispatch({ type: 'deal-player', payload: drawResult.cards })
            dispatch({ type: 'count-player' })
            break;
          case 'dealer':
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

  };

  async function startRound () {
    dispatch({ type: 'take-turn', payload: 'start-round' });
    await deal('player', 2);
    await deal('dealer', 1);
  }

  async function shuffleDeck () {
    console.log(await api.shuffleDeck(deckId))
  }

  return (
    <div className="app-container">
      <header className="header">
        <div className="title">
          tuenniWon
        </div>
        <div className="dealer score">
          Dealer: {gameState.dealerScore}
        </div>
        <div className="top score">
          Top score: {gameState.highScore}
        </div>
      </header>

      <main className="game-area">

        <CardHand name="dealer" cards={gameState.dealerHand}></CardHand>
        <CardHand name="player" cards={gameState.playerHand}></CardHand>

      </main>

      <footer>
        <div className="player score">
          Player: {gameState.dealerScore}
        </div>
        <div className="controls-panel">
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
          {gameState.error ? <div>
            Oops... there was an error: {gameState.error.message}
            <button onClick={() => dispatch({ type: 'error', payload: null })}>OK</button>
          </div> : null}
          <button onClick={shuffleDeck}>Shuffle</button>
        </div>
      </footer>

      {gameState.endOfRound ? <h1>{gameState.message}</h1> : null}
    </div>
  );
}

export default App;
