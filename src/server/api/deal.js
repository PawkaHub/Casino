// NPM
import express from 'express';

// Models
import Game from 'project/server/models/game';
import Hand from 'project/server/models/hand';

const router = express.Router();

export default router.post('/api/deal', (req, res) => {
  const { body } = req;
  console.log('Api Deal Post Body', body);

  /* if (session.game) {
    res.status(400).json({
      message: 'You cannot start a new game of Blackjack when one is already in progress.',
    });
  } else {
    const { bed } = body;
    const game = new Game({ bed });
  }*/

  /* var session = req.session;

  //check to see if deal has already been called
  if (req.session.game) {
    res.status(400).json("{ message: DEAL action is not available at this time }");
  } else {

    //create a new game
    var game = new Game(req.body.bet);

    //deal two Cards to the player
    game.playerHand.hit(game.deck.draw());
    game.playerHand.hit(game.deck.draw());

    //deal one Card to the dealer
    game.dealerHand.hit(game.deck.draw());

    //if the player has a blackjack, run the dealer hand out
    if (game.playerHand.isBlackjack()) {
      do {
        game.dealerHand.hit(game.deck.draw());
      } while (game.dealerHand.score() < Hand.DEALER_STAND);
    }

    //put the game into the session for the next interaction
    session.game = game;

    var message = game.getGamestate();
    if (game.playerHand.isBlackjack()) {
      message += "Blackjack! You win $" + (game.bet * 3)/2;
    }

    res.status(200).json("{ message: " + message + " }");
  }*/

  res.status(200).json({
    hello: 'Api Deal Result!',
  });
});
