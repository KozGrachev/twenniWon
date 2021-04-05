export async function newDeck () {
  try {
    const res = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');

    const jsonRes = await res.json();
    return jsonRes
  } catch (error) {
    return error;
  }
}

export async function drawCard (deckId, numCards) {
  const res = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=${numCards}`);
  if (res.ok) {
    return res.json();
  } else throw new Error(`OMG THERE WAS AN ERROR D: ${res.status}`); //${res.status < 500 ? ''}
}

export async function shuffleDeck (deckId) {
  try {
    const res = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/shuffle/`);
    const jsonRes = await res.json();
    return jsonRes;
  } catch (error) {
    return error;
  }
}


