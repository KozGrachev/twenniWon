# twenniWon Testing Plan



### Mocks



U1)	single card objects: number card, picture card, ace, invalid card

U2)	an array of 2 cards:  a picture card and an ace

I4)	  Player winning condition: `playerAction: 'stand'`, `dealerScore: 19`, `playerScore: 20`

I5, I11)	  Player losing condition 1: `playerAction: 'stand'`, `dealerScore: 20 `, `playerScore: 19`

I8)	  Player Bust condition: `playerAction: 'hit'`, `playerScore: 22`

I10)	Dealer Bust condition: `playerAction: 'stand'`, `dealerScore: 22`



### Units

1. card values are extracted correctly
2. hand total is counted correctly
3. top score displays correct score



### Integrations

1. HIT and STAND buttons are disabled when cards are dealt, 
2. deal button is disabled after cards are dealt
3. hit button is disabled after stand is clicked
4. if player wins, player score is added to current streak
5. if player loses, current streak gets reset to 0
6. if current streak is higher than top score, top score gets updated 
7. if the player score is 21, message is 'TWENTY ONE, you win'
8. if dealer score is 21, message is 'TWENTY ONE, you lose'
9. if player hits and goes over 21, message is 'BUST'
10. if dealer goes over 21, message is 'YOU WIN'
11. if player stands and dealer score is between 17 and 20,  message is 'YOU LOSE'



### e2e

1. When app first loads, message 'Let's play' is shown
2. After close (x) button on message is clicked the message stops displaying - message is set to empty string
3. clicking DEAL at the start results in the player having 2 cards and the dealer, 1 card
4. Clicking HIT gives the player one card 
5. Clicking STAND gives dealer 1 card and disables Hit button



