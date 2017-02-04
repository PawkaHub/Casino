// NPM
import express from 'express';

// Models
import Blackjack from 'project/server/models/games/blackjack';
import Hand from 'project/server/models/hand';

const router = express.Router();

export default router.post('/api/blackjack/hit', (req, res) => {
  const { body, auth } = req;
  const { playerId } = auth;

  // Initialize a game of blackjack for this player, and hit their hand
  const game = new Blackjack({ playerId });

  // Hit
  game.hit(game.playerHand);
  const { data } = game;

  console.log('DECK:');
  console.log(game.deck.cards);
  console.log('PLAYER HAND:');
  console.log(game.playerHand.cards);
  console.log('DEALER HAND:');
  console.log(game.dealerHand.cards);

  /* var session = req.session;

  //check to see if we're trying to hit before the deal
  if (session.game === null) {
    res.status(400).json("{ message: HIT action is not available at this time }");
  } else {
    var game = Game.clone(session.game);

    game.playerHand.hit(game.deck.draw());

    //if the player busts, run out the rest of the dealer hand
    if (game.playerHand.isBusto()) {
      do {
        game.dealerHand.hit(game.deck.draw());
      } while (game.dealerHand.score() < Hand.DEALER_STAND);
    }

    //put the game into the session for the next interaction
    session.game = game;

    // if the player busts, let them know they lost
    var message = game.getGamestate();
    if (game.playerHand.isBusto()) {
      message += " Bust! You lose $" + game.bet;
      // and clear the game from the session
      session.game = null;
    }

    res.status(200).json("{ message: " + message + " }");
  }*/

  res.status(200).json({
    hello: 'Api Hit Result!',
  });
});